// lib/actions.ts
"use server";

import { revalidatePath } from 'next/cache';
import { query } from './db';
import { 
  getSession, 
  loginUser, 
  logoutUser, 
  hashPassword, 
  verifyPassword 
} from './auth';

// Helper de auditoría
async function logAudit(userId: string | null, action: string, details: string) {
  try {
    await query`
      INSERT INTO audit_logs (user_id, action, details)
      VALUES (${userId}, ${action}, ${details})
    `;
  } catch (err) {
    console.error('Error al registrar log de auditoría:', err);
  }
}

// 1. Iniciar sesión
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, introduce tu correo y contraseña.' };
  }

  try {
    // Buscar usuario en base de datos
    const users = await query`
      SELECT id, email, password_hash, role, full_name as "fullName" 
      FROM users 
      WHERE email = ${email.toLowerCase().trim()}
    `;

    if (users.length === 0) {
      return { error: 'Correo o contraseña incorrectos.' };
    }

    const user = users[0];
    const isPasswordCorrect = verifyPassword(password, user.password_hash);

    if (!isPasswordCorrect) {
      return { error: 'Correo o contraseña incorrectos.' };
    }

    // Iniciar sesión (guarda la cookie)
    await loginUser({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    });

    await logAudit(user.id, 'Inicio de Sesión', `El usuario inició sesión en el portal.`);

    return { success: true };
  } catch (error) {
    console.error('Error en loginAction:', error);
    return { error: 'Ocurrió un error inesperado al iniciar sesión.' };
  }
}

// 1b. Iniciar sesión como Demo (acceso rápido con 1 click)
export async function loginAsDemoAction(role: 'paciente' | 'especialista' | 'admin_ti' | 'coordinador') {
  try {
    const emailMap = {
      paciente: 'paciente@cip.com',
      especialista: 'doctor@cip.com',
      admin_ti: 'admin@cip.com',
      coordinador: 'coordinador@cip.com',
    };

    const targetEmail = emailMap[role];
    
    const users = await query`
      SELECT id, email, role, full_name as "fullName" 
      FROM users 
      WHERE email = ${targetEmail}
    `;

    if (users.length === 0) {
      return { error: `La cuenta de prueba para ${role} no existe. Por favor ejecute la siembra.` };
    }

    const user = users[0];

    await loginUser({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    });

    await logAudit(user.id, 'Inicio de Sesión (Demo)', `El usuario ingresó usando acceso rápido como ${role}.`);

    return { success: true };
  } catch (error) {
    console.error('Error en loginAsDemoAction:', error);
    return { error: 'Error al iniciar sesión de prueba.' };
  }
}


// 2. Cerrar sesión
export async function logoutAction() {
  const session = await getSession();
  if (session) {
    await logAudit(session.id, 'Cierre de Sesión', `El usuario cerró sesión.`);
  }
  await logoutUser();
  revalidatePath('/portal');
}

// 3. Paciente: Actualizar Peso y Altura (recalcula IMC)
export async function updatePatientMetricsAction(weight: number, height: number) {
  const session = await getSession();
  if (!session || session.role !== 'paciente') {
    return { error: 'Acceso no autorizado.' };
  }

  if (weight <= 0 || height <= 0) {
    return { error: 'Valores de peso y estatura inválidos.' };
  }

  try {
    const imc = parseFloat((weight / ((height / 100) ** 2)).toFixed(2));
    
    // Actualizar perfil
    await query`
      UPDATE patient_profiles
      SET weight = ${weight}, height = ${height}, imc = ${imc}
      WHERE user_id = ${session.id}
    `;

    await logAudit(session.id, 'Actualización de Métricas', `Métricas actualizadas. Nuevo peso: ${weight}kg, IMC: ${imc}`);
    
    revalidatePath('/portal/dashboard');
    return { success: true, imc };
  } catch (error) {
    console.error('Error al actualizar métricas:', error);
    return { error: 'Error en la base de datos.' };
  }
}

// 4. Especialista: Añadir Nota de Caso Clínico
export async function addCaseNoteAction(caseId: string, noteContent: string) {
  const session = await getSession();
  if (!session || session.role !== 'especialista') {
    return { error: 'Acceso no autorizado.' };
  }

  if (!noteContent.trim()) {
    return { error: 'El contenido de la nota no puede estar vacío.' };
  }

  try {
    // Insertar la nota
    await query`
      INSERT INTO case_notes (case_id, author_id, note_content)
      VALUES (${caseId}, ${session.id}, ${noteContent.trim()})
    `;

    // Actualizar timestamp del caso
    await query`
      UPDATE cases
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ${caseId}
    `;

    await logAudit(session.id, 'Añadir Nota de Caso', `Nota añadida al caso clínico ${caseId}.`);
    
    revalidatePath('/portal/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error al añadir nota:', error);
    return { error: 'Error en la base de datos.' };
  }
}

// 5. Especialista: Modificar el estado del caso clínico
export async function updateCaseStatusAction(caseId: string, newStatus: 'abierto' | 'en_revision' | 'resuelto') {
  const session = await getSession();
  if (!session || session.role !== 'especialista') {
    return { error: 'Acceso no autorizado.' };
  }

  try {
    await query`
      UPDATE cases
      SET status = ${newStatus}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${caseId}
    `;

    await logAudit(session.id, 'Actualización de Estado de Caso', `Estado del caso ${caseId} cambiado a: ${newStatus}`);

    revalidatePath('/portal/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar estado del caso:', error);
    return { error: 'Error en la base de datos.' };
  }
}

// 6. Administrador TI: Cambiar Rol de un Usuario
export async function changeUserRoleAction(targetUserId: string, newRole: 'paciente' | 'especialista' | 'admin_ti' | 'coordinador') {
  const session = await getSession();
  if (!session || session.role !== 'admin_ti') {
    return { error: 'Acceso no autorizado.' };
  }

  if (targetUserId === session.id) {
    return { error: 'No puedes cambiar tu propio rol por seguridad.' };
  }

  try {
    // Actualizar rol
    await query`
      UPDATE users
      SET role = ${newRole}
      WHERE id = ${targetUserId}
    `;

    // Si cambia a especialista o paciente, verificar si tiene perfil básico creado, si no, crear uno por defecto
    if (newRole === 'especialista') {
      const spec = await query`SELECT 1 FROM specialist_profiles WHERE user_id = ${targetUserId}`;
      if (spec.length === 0) {
        await query`
          INSERT INTO specialist_profiles (user_id, specialty, license_number)
          VALUES (${targetUserId}, 'Medicina General', 'P-999999')
        `;
      }
    } else if (newRole === 'paciente') {
      const pat = await query`SELECT 1 FROM patient_profiles WHERE user_id = ${targetUserId}`;
      if (pat.length === 0) {
        await query`
          INSERT INTO patient_profiles (user_id, height, weight, imc)
          VALUES (${targetUserId}, 170.0, 70.0, 24.22)
        `;
      }
    }

    await logAudit(
      session.id, 
      'Modificación de Rol', 
      `Rol del usuario ID ${targetUserId} modificado a: ${newRole}`
    );

    revalidatePath('/portal/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error al cambiar rol:', error);
    return { error: 'Error en la base de datos.' };
  }
}

// 7. Coordinador: Registrar un nuevo Paciente (Alta Manual)
export async function createPatientAction(formData: {
  fullName: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  height: number;
  weight: number;
  attempts: string;
  score: number;
}) {
  const session = await getSession();
  if (!session || session.role !== 'coordinador') {
    return { error: 'Acceso no autorizado.' };
  }

  if (!formData.fullName || !formData.email || !formData.height || !formData.weight) {
    return { error: 'Por favor, llena los campos requeridos (Nombre, Correo, Estatura, Peso).' };
  }

  try {
    // Verificar si el correo ya existe
    const existing = await query`SELECT 1 FROM users WHERE email = ${formData.email.toLowerCase().trim()}`;
    if (existing.length > 0) {
      return { error: 'Este correo electrónico ya está registrado.' };
    }

    // Contraseña por defecto para nuevos pacientes
    const defaultPasswordHash = hashPassword('paciente123');
    const imc = parseFloat((formData.weight / ((formData.height / 100) ** 2)).toFixed(2));

    // Crear usuario
    const userRes = await query`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES (${formData.email.toLowerCase().trim()}, ${defaultPasswordHash}, 'paciente', ${formData.fullName})
      RETURNING id
    `;
    const newUserId = userRes[0].id;

    // Crear perfil
    await query`
      INSERT INTO patient_profiles (user_id, dob, gender, phone, height, weight, imc, historial_de_intentos, candidate_score)
      VALUES (${newUserId}, ${formData.dob || null}, ${formData.gender || null}, ${formData.phone || null}, ${formData.height}, ${formData.weight}, ${imc}, ${formData.attempts}, ${formData.score || 0})
    `;

    // Crear caso clínico por defecto
    await query`
      INSERT INTO cases (patient_id, title, description, status)
      VALUES (${newUserId}, 'Expediente Inicial: ' || ${formData.fullName}, 'Paciente ingresado al sistema por el coordinador de citas. Altura: ' || ${formData.height} || 'cm, Peso: ' || ${formData.weight} || 'kg, IMC inicial: ' || ${imc} || '.', 'abierto')
    `;

    await logAudit(
      session.id, 
      'Registro de Paciente', 
      `Nuevo paciente registrado: ${formData.fullName} (Email: ${formData.email})`
    );

    revalidatePath('/portal/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error al registrar paciente:', error);
    return { error: 'Error en la base de datos al registrar.' };
  }
}

// 8. Coordinador: Agendar Cita
export async function scheduleAppointmentAction(
  patientId: string,
  specialistId: string,
  appointmentDateStr: string,
  notes: string,
  googleEventId?: string
) {
  const session = await getSession();
  if (!session || session.role !== 'coordinador') {
    return { error: 'Acceso no autorizado.' };
  }

  if (!patientId || !specialistId || !appointmentDateStr) {
    return { error: 'Paciente, Especialista y Fecha son requeridos.' };
  }

  try {
    const finalEventId = googleEventId || `evt_${Math.random().toString(36).substr(2, 9)}`;

    await query`
      INSERT INTO appointments (patient_id, specialist_id, appointment_date, google_event_id, notes)
      VALUES (${patientId}, ${specialistId}, ${appointmentDateStr}, ${finalEventId}, ${notes})
    `;

    await logAudit(
      session.id, 
      'Creación de Cita', 
      `Cita agendada para Paciente ID ${patientId} con Especialista ID ${specialistId} para la fecha: ${appointmentDateStr}`
    );

    revalidatePath('/portal/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error al agendar cita:', error);
    return { error: 'Error en la base de datos al agendar.' };
  }
}

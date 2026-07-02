// lib/auth.ts
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { query } from './db';

const SESSION_SECRET = process.env.SESSION_SECRET || 'cip-clinica-default-super-secret-key-123456';
const COOKIE_NAME = 'cip_session';

// Tipado de usuario
export interface UserSession {
  id: string;
  email: string;
  role: 'paciente' | 'especialista' | 'admin_ti' | 'coordinador';
  fullName: string;
}

// 1. Hash de contraseñas nativo usando PBKDF2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(':');
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === checkHash;
  } catch {
    return false;
  }
}

// 2. Manejo de tokens de sesión con firma HMAC
export function createToken(payload: UserSession, expiresInDays = 7): string {
  const exp = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const data = JSON.stringify({ ...payload, exp });
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  return `${Buffer.from(data).toString('base64')}.${signature}`;
}

export function verifyToken(token: string): (UserSession & { exp: number }) | null {
  try {
    const [base64Data, signature] = token.split('.');
    if (!base64Data || !signature) return null;
    const data = Buffer.from(base64Data, 'base64').toString('utf8');
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
    if (signature !== expectedSignature) return null;
    const payload = JSON.parse(data);
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// 3. Obtener sesión actual (Server Side)
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// 4. Iniciar sesión y guardar cookie (Server Action Friendly)
export async function loginUser(session: UserSession) {
  const token = createToken(session);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 días
    path: '/',
  });
}

// 5. Cerrar sesión (Server Action Friendly)
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// 6. Sembrar datos de prueba si la base de datos está vacía
export async function seedDemoAccounts() {
  try {
    const usersCount = await query`SELECT COUNT(*) FROM users`;
    const count = parseInt(usersCount[0]?.count || '0', 10);
    
    if (count > 0) {
      console.log('Las cuentas demo ya existen.');
      return;
    }

    console.log('Sembrando cuentas demo...');

    // Contraseña por defecto para demostración
    const defaultPasswordHash = hashPassword('clinica123');

    // 1. Paciente Demo
    const pRes = await query`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES ('paciente@cip.com', ${defaultPasswordHash}, 'paciente', 'Carlos Gómez')
      RETURNING id
    `;
    const pacienteId = pRes[0].id;
    await query`
      INSERT INTO patient_profiles (user_id, dob, gender, phone, height, weight, imc, historial_de_intentos, candidate_score)
      VALUES (${pacienteId}, '1990-05-15', 'Masculino', '555-0199', 175.0, 95.0, 31.02, 'Intentó dieta keto en 2024 y ayuno intermitente sin supervisión médica, con rebote de 5kg.', 85)
    `;

    // 2. Especialista Demo
    const eRes = await query`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES ('doctor@cip.com', ${defaultPasswordHash}, 'especialista', 'Dra. Elena Centeno')
      RETURNING id
    `;
    const especialistaId = eRes[0].id;
    await query`
      INSERT INTO specialist_profiles (user_id, specialty, license_number)
      VALUES (${especialistaId}, 'Nutrición y Control Metabólico', 'MET-894723')
    `;

    // 3. Administrador TI Demo
    await query`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES ('admin@cip.com', ${defaultPasswordHash}, 'admin_ti', 'Ing. Jorge Rodríguez')
    `;

    // 4. Coordinador Demo
    const cRes = await query`
      INSERT INTO users (email, password_hash, role, full_name)
      VALUES ('coordinador@cip.com', ${defaultPasswordHash}, 'coordinador', 'Mónica Sánchez')
      RETURNING id
    `;
    const coordinadorId = cRes[0].id;

    // Crear un caso clínico inicial para el paciente, asignado
    const caseRes = await query`
      INSERT INTO cases (patient_id, title, description, status)
      VALUES (${pacienteId}, 'Caso 01-CG: Obesidad Grado I con Resistencia a la Insulina', 'Paciente varón de 36 años con IMC de 31.02. Muestra fatiga crónica y dificultad para perder peso. Exámenes de laboratorio indican glucosa en ayunas elevada (108 mg/dL) e insulina alta.', 'abierto')
      RETURNING id
    `;
    const caseId = caseRes[0].id;

    // Agregar una nota inicial del especialista
    await query`
      INSERT INTO case_notes (case_id, author_id, note_content)
      VALUES (${caseId}, ${especialistaId}, 'Se recomienda iniciar el protocolo de optimización metabólica de 4 pilares. Ajustar carbohidratos en dieta y programar cita de seguimiento en 2 semanas.')
    `;

    // Agregar una cita de prueba
    await query`
      INSERT INTO appointments (patient_id, specialist_id, appointment_date, google_event_id, notes)
      VALUES (${pacienteId}, ${especialistaId}, NOW() + INTERVAL '3 days', 'evt_gcal_abc123xyz', 'Primera cita de ajuste del protocolo nutricional y control de bioimpedancia.')
    `;

    // Agregar logs de auditoría iniciales
    await query`
      INSERT INTO audit_logs (user_id, action, details)
      VALUES (${coordinadorId}, 'Creación de Cita', 'Cita agendada para el paciente Carlos Gómez con la Dra. Elena Centeno para el día ' || (NOW() + INTERVAL '3 days')::text)
    `;
    await query`
      INSERT INTO audit_logs (user_id, action, details)
      VALUES (${especialistaId}, 'Añadir Nota de Caso', 'Nota clínica añadida al caso del paciente Carlos Gómez (Caso 01-CG).')
    `;

    console.log('¡Siembra completada con éxito!');
  } catch (error) {
    console.error('Error al sembrar cuentas demo:', error);
  }
}

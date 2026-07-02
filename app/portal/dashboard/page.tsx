// app/portal/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

// Componentes de Vistas de Dashboard por Rol
import PatientDashboard from '@/views/portal/PatientDashboard';
import SpecialistDashboard from '@/views/portal/SpecialistDashboard';
import ITAdminDashboard from '@/views/portal/ITAdminDashboard';
import CoordinatorDashboard from '@/views/portal/CoordinatorDashboard';

export const metadata = {
  title: 'Dashboard Portal Clínico | CIP',
  description: 'Panel de control de Clínica Integral del Peso.',
};

export default async function DashboardPage() {
  const session = await getSession();

  // Si no hay sesión, mandar a login
  if (!session) {
    redirect('/portal');
  }

  const userId = session.id;
  const role = session.role;

  // Cargar datos del servidor en base al Rol usando SQL puro
  if (role === 'paciente') {
    // 1. Obtener perfil del paciente
    const profiles = await query`
      SELECT p.*, u.full_name as "fullName", u.email 
      FROM patient_profiles p 
      JOIN users u ON u.id = p.user_id 
      WHERE p.user_id = ${userId}
    `;
    const patientProfile = profiles[0] || null;

    // 2. Obtener citas del paciente
    const appointments = await query`
      SELECT a.id, a.appointment_date as "appointmentDate", a.notes, a.google_event_id as "googleEventId",
             u.full_name as "specialistName", sp.specialty
      FROM appointments a 
      JOIN users u ON u.id = a.specialist_id 
      JOIN specialist_profiles sp ON sp.user_id = a.specialist_id 
      WHERE a.patient_id = ${userId} 
      ORDER BY a.appointment_date ASC 
      LIMIT 5
    `;

    // 3. Obtener casos clínicos del paciente
    const cases = await query`
      SELECT id, title, description, status, created_at as "createdAt"
      FROM cases 
      WHERE patient_id = ${userId}
      ORDER BY created_at DESC
    `;

    return (
      <PatientDashboard 
        session={session}
        profile={patientProfile}
        appointments={appointments}
        cases={cases}
      />
    );
  }

  if (role === 'especialista') {
    // 1. Obtener casos clínicos activos
    const cases = await query`
      SELECT c.id, c.title, c.description, c.status, c.created_at as "createdAt", c.updated_at as "updatedAt",
             u.full_name as "patientName", u.email as "patientEmail",
             pp.height, pp.weight, pp.imc, pp.historial_de_intentos as "attemptsHistory"
      FROM cases c 
      JOIN users u ON u.id = c.patient_id 
      LEFT JOIN patient_profiles pp ON pp.user_id = c.patient_id 
      ORDER BY c.updated_at DESC
    `;

    // 2. Obtener todas las notas de casos para el hilo de comentarios
    const caseNotes = await query`
      SELECT cn.id, cn.case_id as "caseId", cn.note_content as "noteContent", cn.created_at as "createdAt",
             u.full_name as "authorName", u.role as "authorRole"
      FROM case_notes cn 
      JOIN users u ON u.id = cn.author_id 
      ORDER BY cn.created_at ASC
    `;

    // 3. Obtener perfil del especialista
    const specProfiles = await query`
      SELECT specialty, license_number as "licenseNumber" 
      FROM specialist_profiles 
      WHERE user_id = ${userId}
    `;
    const specialistProfile = specProfiles[0] || null;

    return (
      <SpecialistDashboard 
        session={session}
        profile={specialistProfile}
        cases={cases}
        caseNotes={caseNotes}
      />
    );
  }

  if (role === 'admin_ti') {
    // 1. Obtener lista de todos los usuarios
    const users = await query`
      SELECT id, email, role, full_name as "fullName", created_at as "createdAt"
      FROM users 
      ORDER BY role ASC, full_name ASC
    `;

    // 2. Obtener logs de auditoría
    const auditLogs = await query`
      SELECT al.id, al.action, al.details, al.created_at as "createdAt",
             u.full_name as "userName", u.role as "userRole"
      FROM audit_logs al 
      LEFT JOIN users u ON u.id = al.user_id 
      ORDER BY al.created_at DESC 
      LIMIT 100
    `;

    // 3. Diagnóstico de base de datos rápido
    let dbStatus = 'Conectado';
    let dbTime = '';
    try {
      const timeQuery = await query`SELECT NOW() as "now"`;
      dbTime = timeQuery[0]?.now || '';
    } catch (err) {
      dbStatus = 'Error';
    }

    return (
      <ITAdminDashboard 
        session={session}
        users={users}
        auditLogs={auditLogs}
        systemStats={{
          dbStatus,
          dbTime,
          nodeVersion: process.version,
          env: process.env.NODE_ENV
        }}
      />
    );
  }

  if (role === 'coordinador') {
    // 1. Obtener lista de pacientes
    const patients = await query`
      SELECT u.id, u.full_name as "fullName", u.email, 
             pp.height, pp.weight, pp.imc, pp.phone, pp.dob
      FROM users u 
      JOIN patient_profiles pp ON pp.user_id = u.id 
      WHERE u.role = 'paciente'
      ORDER BY u.full_name ASC
    `;

    // 2. Obtener lista de especialistas
    const specialists = await query`
      SELECT u.id, u.full_name as "fullName", sp.specialty 
      FROM users u 
      JOIN specialist_profiles sp ON sp.user_id = u.id 
      WHERE u.role = 'especialista'
      ORDER BY u.full_name ASC
    `;

    // 3. Obtener citas agendadas
    const appointments = await query`
      SELECT a.id, a.appointment_date as "appointmentDate", a.notes, a.google_event_id as "googleEventId",
             p.full_name as "patientName", s.full_name as "specialistName"
      FROM appointments a 
      JOIN users p ON p.id = a.patient_id 
      JOIN users s ON s.id = a.specialist_id 
      ORDER BY a.appointment_date ASC
    `;

    return (
      <CoordinatorDashboard 
        session={session}
        patients={patients}
        specialists={specialists}
        appointments={appointments}
      />
    );
  }

  // Fallback si el rol no coincide
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
        <h1 className="text-xl font-bold text-red-500 font-title mb-2">Rol No Reconocido</h1>
        <p className="text-sm text-slate-400">Por favor cierra sesión y contacta a soporte.</p>
      </div>
    </div>
  );
}

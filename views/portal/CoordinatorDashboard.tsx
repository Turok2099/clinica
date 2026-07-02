// views/portal/CoordinatorDashboard.tsx
"use client";

import { useState, useTransition } from 'react';
import { CalendarRange, UserPlus, Scale, Calendar, ClipboardCheck, User, Users, Clock, PlusCircle } from 'lucide-react';
import { createPatientAction, scheduleAppointmentAction } from '@/lib/actions';
import DashboardHeader from './DashboardHeader';

interface CoordinatorDashboardProps {
  session: {
    fullName: string;
    email: string;
    role: string;
  };
  patients: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    dob: string | null;
    height: string;
    weight: string;
    imc: string;
  }>;
  specialists: Array<{
    id: string;
    fullName: string;
    specialty: string;
  }>;
  appointments: Array<{
    id: string;
    appointmentDate: string;
    notes: string | null;
    googleEventId: string | null;
    patientName: string;
    specialistName: string;
  }>;
}

export default function CoordinatorDashboard({ session, patients, specialists, appointments }: CoordinatorDashboardProps) {
  const [isPending, startTransition] = useTransition();

  // Estados para Registro de Paciente
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientGender, setPatientGender] = useState('Masculino');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientHeight, setPatientHeight] = useState(170);
  const [patientWeight, setPatientWeight] = useState(70);
  const [patientAttempts, setPatientAttempts] = useState('');
  const [patientScore, setPatientScore] = useState(80);
  const [pSuccessMsg, setPSuccessMsg] = useState<string | null>(null);
  const [pErrorMsg, setPErrorMsg] = useState<string | null>(null);

  // Estados para Citas
  const [selPatientId, setSelPatientId] = useState(patients[0]?.id || '');
  const [selSpecialistId, setSelSpecialistId] = useState(specialists[0]?.id || '');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [googleEventId, setGoogleEventId] = useState('');
  const [aSuccessMsg, setASuccessMsg] = useState<string | null>(null);
  const [aErrorMsg, setAErrorMsg] = useState<string | null>(null);

  // Calcular IMC en tiempo real para el formulario de paciente
  const computedImc = parseFloat((patientWeight / ((patientHeight / 100) ** 2)).toFixed(2));

  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setPErrorMsg(null);
    setPSuccessMsg(null);

    if (!patientName || !patientEmail || patientHeight <= 0 || patientWeight <= 0) {
      setPErrorMsg('Completa todos los campos obligatorios.');
      return;
    }

    startTransition(async () => {
      const res = await createPatientAction({
        fullName: patientName,
        email: patientEmail,
        dob: patientDob,
        gender: patientGender,
        phone: patientPhone,
        height: patientHeight,
        weight: patientWeight,
        attempts: patientAttempts,
        score: patientScore
      });

      if (res.error) {
        setPErrorMsg(res.error);
      } else {
        setPSuccessMsg(`¡Paciente ${patientName} dado de alta con éxito en el sistema!`);
        // Limpiar campos
        setPatientName('');
        setPatientEmail('');
        setPatientDob('');
        setPatientPhone('');
        setPatientAttempts('');
        setPatientHeight(170);
        setPatientWeight(70);
        setPatientScore(80);
      }
    });
  };

  const handleScheduleAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setAErrorMsg(null);
    setASuccessMsg(null);

    if (!selPatientId || !selSpecialistId || !appointmentDate) {
      setAErrorMsg('Por favor, selecciona un paciente, un especialista y la fecha.');
      return;
    }

    startTransition(async () => {
      const res = await scheduleAppointmentAction(
        selPatientId,
        selSpecialistId,
        appointmentDate,
        appointmentNotes,
        googleEventId
      );

      if (res.error) {
        setAErrorMsg(res.error);
      } else {
        setASuccessMsg('Cita programada con éxito en la base de datos de agenda.');
        setAppointmentNotes('');
        setGoogleEventId('');
        setAppointmentDate('');
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DashboardHeader session={session} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Banner */}
        <div className="flex items-center gap-3 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <CalendarRange className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-title">Panel de Admisión y Agendamiento</h1>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              Gestión operativa: alta manual de pacientes, cálculo de aptitud clínica, asignación de especialistas médicos y citas.
            </p>
          </div>
        </div>

        {/* Dos Módulos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Módulo Izquierdo: Alta Manual de Pacientes */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserPlus className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-base text-white font-title">Admisión: Alta de Nuevo Paciente</h2>
            </div>

            <form onSubmit={handleRegisterPatient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-amber-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    F. de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={patientDob}
                    onChange={(e) => setPatientDob(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 outline-none focus:border-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Género
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 outline-none focus:border-amber-500/40"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    placeholder="55-1234-5678"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-amber-500/40"
                  />
                </div>
              </div>

              {/* Parámetros de Diagnóstico Básico */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-900 pb-1">
                  Indicadores Físicos y Aptitud Clínica
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Estatura (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={patientHeight}
                      onChange={(e) => setPatientHeight(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Puntaje Candidato
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={patientScore}
                      onChange={(e) => setPatientScore(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    IMC Calculado Automáticamente:
                  </span>
                  <span className="font-bold text-white font-title text-sm">{computedImc.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Historial de Intentos Previos
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalla dietas previas, tratamientos con rebote o condiciones reportadas por el paciente..."
                  value={patientAttempts}
                  onChange={(e) => setPatientAttempts(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500/40 resize-none font-light leading-relaxed"
                />
              </div>

              {pSuccessMsg && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
                  {pSuccessMsg}
                </div>
              )}
              {pErrorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-300">
                  {pErrorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || patientHeight <= 0 || patientWeight <= 0}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl cursor-pointer transition text-xs shadow-md shadow-amber-500/10 disabled:opacity-50"
              >
                {isPending ? 'Procesando alta médica...' : 'Dar de Alta Paciente'}
              </button>
            </form>

          </div>

          {/* Módulo Derecho: Agendar Citas y Consultas de Agenda */}
          <div className="space-y-8">
            
            {/* Formulario de Agendamiento */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-base text-white font-title">Agendar Nueva Cita Médica</h2>
              </div>

              <form onSubmit={handleScheduleAppointment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Seleccionar Paciente *
                    </label>
                    <select
                      value={selPatientId}
                      onChange={(e) => setSelPatientId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 outline-none focus:border-amber-500/40"
                    >
                      <option value="">-- Elige Paciente --</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.fullName} (IMC: {parseFloat(p.imc).toFixed(1)})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Asignar Especialista *
                    </label>
                    <select
                      value={selSpecialistId}
                      onChange={(e) => setSelSpecialistId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 outline-none focus:border-amber-500/40"
                    >
                      <option value="">-- Elige Especialista --</option>
                      {specialists.map(s => (
                        <option key={s.id} value={s.id}>{s.fullName} ({s.specialty})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Fecha y Hora de Cita *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 outline-none focus:border-amber-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Google Calendar Event ID (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="evt_gcal_abc123"
                      value={googleEventId}
                      onChange={(e) => setGoogleEventId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-amber-500/40 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Instrucciones / Notas Clínicas
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Instrucciones para el paciente, ej. venir con ayuno de 8 horas, traer análisis clínicos anteriores..."
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500/40 resize-none font-light leading-relaxed"
                  />
                </div>

                {aSuccessMsg && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-350">
                    {aSuccessMsg}
                  </div>
                )}
                {aErrorMsg && (
                  <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-300">
                    {aErrorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending || !selPatientId || !selSpecialistId || !appointmentDate}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl cursor-pointer transition text-xs shadow-md shadow-amber-500/10 disabled:opacity-50"
                >
                  {isPending ? 'Guardando cita...' : 'Programar Cita'}
                </button>
              </form>
            </div>

            {/* Listado de Citas Programadas */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <ClipboardCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white font-title">Próximas Citas Agendadas ({appointments.length})</h3>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-850 rounded-xl">
                    No hay citas programadas actualmente.
                  </div>
                ) : (
                  appointments.map((app) => (
                    <div 
                      key={app.id}
                      className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-200">{app.patientName}</span>
                          <span className="text-slate-500">&rarr;</span>
                          <span className="font-semibold text-slate-350">{app.specialistName}</span>
                        </div>
                        {app.notes && (
                          <p className="text-[10px] text-slate-400 italic">"{app.notes}"</p>
                        )}
                        {app.googleEventId && (
                          <span className="block text-[8px] font-mono text-slate-600">Event ID: {app.googleEventId}</span>
                        )}
                      </div>
                      
                      <div className="shrink-0 flex sm:flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-slate-300 text-[10px]">
                          {new Date(app.appointmentDate).toLocaleDateString('es-MX')}
                        </span>
                        <span className="text-[9px] text-slate-500 font-light flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500/80" />
                          {new Date(app.appointmentDate).toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer del Portal */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-light mt-12 relative z-10">
        CIP Clínica Integral del Peso &copy; {new Date().getFullYear()} — Portal de Coordinación Médica.
      </footer>
    </div>
  );
}

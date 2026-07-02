// views/portal/PatientDashboard.tsx
"use client";

import { useState, useTransition } from 'react';
import { User, Scale, ArrowUp, Info, CalendarDays, ClipboardList, CheckCircle, Activity, TrendingUp } from 'lucide-react';
import { updatePatientMetricsAction } from '@/lib/actions';
import DashboardHeader from './DashboardHeader';

interface PatientDashboardProps {
  session: {
    fullName: string;
    email: string;
    role: string;
  };
  profile: {
    user_id: string;
    dob: string | null;
    gender: string | null;
    phone: string | null;
    height: string;
    weight: string;
    imc: string;
    historial_de_intentos: string | null;
    candidate_score: number;
  } | null;
  appointments: Array<{
    id: string;
    appointment_date: string;
    notes: string | null;
    googleEventId: string | null;
    specialistName: string;
    specialty: string;
  }>;
  cases: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
  }>;
}

export default function PatientDashboard({ session, profile, appointments, cases }: PatientDashboardProps) {
  const [weight, setWeight] = useState(profile ? parseFloat(profile.weight) : 70);
  const [height, setHeight] = useState(profile ? parseFloat(profile.height) : 170);
  const [currentImc, setCurrentImc] = useState(profile ? parseFloat(profile.imc) : 24.2);
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calcular IMC en tiempo real
  const calculatedImc = parseFloat((weight / ((height / 100) ** 2)).toFixed(2));

  const handleUpdateMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    startTransition(async () => {
      const res = await updatePatientMetricsAction(weight, height);
      if (res.error) {
        setErrorMsg(res.error);
      } else if (res.success && res.imc) {
        setCurrentImc(res.imc);
        setSuccessMsg('Métricas de salud actualizadas exitosamente en tu expediente.');
        setTimeout(() => setSuccessMsg(null), 5000);
      }
    });
  };

  // Clasificación del IMC
  const getImcClass = (val: number) => {
    if (val < 18.5) return { label: 'Bajo Peso', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
    if (val < 25) return { label: 'Peso Normal', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (val < 30) return { label: 'Sobrepeso', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Obesidad', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  const imcClass = getImcClass(currentImc);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DashboardHeader session={session} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Banner de Bienvenida */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-primary/10 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-title text-white">
              ¡Hola de nuevo, {session.fullName}!
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
              Bienvenido a tu panel digital de salud. Aquí puedes dar seguimiento a tus indicadores de peso, revisar las indicaciones de tus especialistas médicos y mantener al día tu tratamiento.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Indicadores Clínicos y Actualización */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tarjeta de IMC */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Métricas de Peso e IMC</h2>
              </div>

              {/* Display de IMC */}
              <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-6 text-center space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Índice de Masa Corporal (IMC)</span>
                <div className="text-5xl font-extrabold text-white tracking-tight font-title tabular-nums">
                  {currentImc.toFixed(2)}
                </div>
                <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${imcClass.color}`}>
                  {imcClass.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/30 border border-slate-850 p-4 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Estatura</span>
                  <div className="text-xl font-bold text-slate-200 tracking-tight font-title">
                    {profile ? `${parseFloat(profile.height)} cm` : '---'}
                  </div>
                </div>
                <div className="bg-slate-950/30 border border-slate-850 p-4 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Peso Registrado</span>
                  <div className="text-xl font-bold text-slate-200 tracking-tight font-title">
                    {profile ? `${parseFloat(profile.weight)} kg` : '---'}
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Actualización en Cliente */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-sky-400">
                  <Scale className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Registrar Peso del Día</h2>
              </div>

              <form onSubmit={handleUpdateMetrics} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="30"
                      max="300"
                      value={weight}
                      onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Estatura (cm)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="100"
                      max="250"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-accent/40"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-850 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    IMC Calculado:
                  </span>
                  <span className="font-bold text-white font-title">{calculatedImc.toFixed(2)}</span>
                </div>

                {successMsg && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-200">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending || weight <= 0 || height <= 0}
                  className="w-full bg-accent hover:bg-accent-hover text-slate-950 font-bold py-2.5 rounded-xl cursor-pointer transition text-xs shadow-md shadow-accent/5 disabled:opacity-50"
                >
                  {isPending ? 'Guardando en expediente...' : 'Actualizar e Informar Médicos'}
                </button>
              </form>
            </div>

          </div>

          {/* Columna Derecha: Citas, Tratamiento y Expediente */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Próximas Citas */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <CalendarDays className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Próximas Consultas Agendadas</h2>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl">
                  <p className="text-sm text-slate-500">No tienes consultas programadas.</p>
                  <p className="text-xs text-slate-600 mt-1">Tu coordinador médico se contactará pronto.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((app) => (
                    <div 
                      key={app.id} 
                      className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Consulta Presencial / Digital</span>
                        <h4 className="font-bold text-sm text-white">{app.specialistName}</h4>
                        <p className="text-xs text-slate-400 font-light">{app.specialty}</p>
                        {app.notes && (
                          <p className="text-xs text-slate-500 mt-2 bg-slate-950/80 rounded p-2 italic border-l border-primary/30">
                            Nota: {app.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                          <span className="text-xs font-bold text-slate-200 block">
                            {new Date(app.appointment_date).toLocaleDateString('es-MX', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(app.appointment_date).toLocaleTimeString('es-MX', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {app.googleEventId && (
                          <span className="text-[9px] font-mono text-slate-600">ID Google: {app.googleEventId}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Caso Clínico Activo */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-sky-400">
                  <ClipboardList className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Resumen de Expediente Médico Activo</h2>
              </div>

              {cases.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl">
                  <p className="text-sm text-slate-500">No se ha abierto un expediente clínico para este periodo.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cases.map((cs) => (
                    <div 
                      key={cs.id}
                      className="bg-slate-950/30 border border-slate-850 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <h3 className="font-bold text-sm text-slate-200">{cs.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          cs.status === 'abierto' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                          cs.status === 'en_revision' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                          'bg-slate-500/10 border border-slate-500/20 text-slate-400'
                        }`}>
                          {cs.status === 'abierto' ? 'Activo' : cs.status === 'en_revision' ? 'En Revisión' : 'Resuelto'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-light whitespace-pre-line">
                        {cs.description}
                      </p>
                      
                      <div className="text-[10px] text-slate-600 text-right">
                        Apertura de Expediente: {new Date(cs.createdAt).toLocaleDateString('es-MX')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Protocolo de 4 Pilares del Tratamiento */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Mi Protocolo de Optimización Metabólica</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="font-semibold text-xs text-white">1. Tratamiento Médico</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">Regulación y optimización hormonal y metabólica bajo supervisión clínica.</p>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="font-semibold text-xs text-white">2. Nutrición Funcional</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">Estrategia de alimentación antiinflamatoria personalizada libre de hambre.</p>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="font-semibold text-xs text-white">3. Activación Física</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">Rutina adaptada para preservar masa muscular y optimizar la quema de energía.</p>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="font-semibold text-xs text-white">4. Acompañamiento Digital</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">Seguimiento continuo 24/7 y contacto directo con coordinadores clínicos.</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer del Portal */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-light mt-12 relative z-10">
        CIP Clínica Integral del Peso &copy; {new Date().getFullYear()} — Área de Pacientes. Los datos de salud aquí presentados están protegidos.
      </footer>
    </div>
  );
}

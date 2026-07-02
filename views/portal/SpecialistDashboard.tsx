// views/portal/SpecialistDashboard.tsx
"use client";

import { useState, useTransition } from 'react';
import { Stethoscope, Search, MessageSquare, Clipboard, Calendar, Heart, ShieldAlert, Award, FileText } from 'lucide-react';
import { addCaseNoteAction, updateCaseStatusAction } from '@/lib/actions';
import DashboardHeader from './DashboardHeader';

interface SpecialistDashboardProps {
  session: {
    fullName: string;
    email: string;
    role: string;
  };
  profile: {
    specialty: string;
    license_number: string;
  } | null;
  cases: Array<{
    id: string;
    title: string;
    description: string;
    status: 'abierto' | 'en_revision' | 'resuelto';
    createdAt: string;
    updatedAt: string;
    patientName: string;
    patientEmail: string;
    height: string | null;
    weight: string | null;
    imc: string | null;
    attemptsHistory: string | null;
  }>;
  caseNotes: Array<{
    id: string;
    caseId: string;
    noteContent: string;
    createdAt: string;
    authorName: string;
    authorRole: string;
  }>;
}

export default function SpecialistDashboard({ session, profile, cases, caseNotes }: SpecialistDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(cases[0]?.id || null);
  const [newNote, setNewNote] = useState('');
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filtrar casos por término de búsqueda
  const filteredCases = cases.filter(c => 
    c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCase = cases.find(c => c.id === selectedCaseId);
  const activeCaseNotes = caseNotes.filter(n => n.caseId === selectedCaseId);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCaseId) return;

    setErrorMsg(null);
    startTransition(async () => {
      const res = await addCaseNoteAction(selectedCaseId, newNote);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setNewNote('');
      }
    });
  };

  const handleStatusChange = async (newStatus: 'abierto' | 'en_revision' | 'resuelto') => {
    if (!selectedCaseId) return;

    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateCaseStatusAction(selectedCaseId, newStatus);
      if (res.error) {
        setErrorMsg(res.error);
      }
    });
  };

  // Determinar color de badge de estado
  const getStatusColor = (status: string) => {
    if (status === 'abierto') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'en_revision') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };

  // Determinar color de badge de rol del autor de nota
  const getAuthorBadgeColor = (role: string) => {
    if (role === 'especialista') return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    if (role === 'coordinador') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    if (role === 'admin_ti') return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    return 'text-slate-400 bg-slate-550/10 border-slate-550/20';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DashboardHeader session={session} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col space-y-6">
        
        {/* Banner de Especialidad */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-title">Panel de Colaboración Médica</h1>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Especialidad: <span className="font-semibold text-slate-200">{profile?.specialty || 'General'}</span> | 
                Cédula Profesional: <span className="font-mono text-slate-200">{profile?.license_number || 'S/N'}</span>
              </p>
            </div>
          </div>
          
          <div className="text-xs text-slate-400 max-w-xs leading-relaxed font-light sm:text-right">
            Compartiendo expedientes y anotaciones clínicas bajo el estándar de ética médica del protocolo CIP.
          </div>
        </div>

        {/* Tablero Principal: Izquierda (Buscador y Casos) / Derecha (Ficha y Hilo de Comentarios) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-grow">
          
          {/* Columna Izquierda: Listado de Casos Compartidos */}
          <div className="lg:col-span-1 space-y-4 h-full flex flex-col">
            
            {/* Caja de Búsqueda */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar paciente o diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-white text-xs outline-none focus:border-sky-500/40 transition placeholder:text-slate-600"
              />
            </div>

            {/* Listado */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-xl flex-grow overflow-y-auto max-h-[600px] space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
                Expedientes Clínicos Compartidos ({filteredCases.length})
              </span>

              {filteredCases.length === 0 ? (
                <div className="text-center py-12 text-slate-600 text-xs">
                  No se encontraron casos clínicos coincidentes.
                </div>
              ) : (
                filteredCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setErrorMsg(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-2.5 cursor-pointer ${
                      selectedCaseId === c.id 
                        ? 'bg-sky-500/10 border-sky-500/30 text-white shadow-lg' 
                        : 'bg-slate-950/40 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold font-title truncate max-w-[150px]">{c.patientName}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-200 line-clamp-1">{c.title}</div>
                    
                    <div className="flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-900/50 pt-2">
                      <span className="font-mono">IMC: {c.imc ? parseFloat(c.imc).toFixed(1) : 'S/R'}</span>
                      <span>Act: {new Date(c.updatedAt).toLocaleDateString('es-MX')}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

          </div>

          {/* Columna Derecha: Detalle de Caso Activo, Foro de Discusión Médica */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeCase ? (
              <>
                {/* 1. Datos Clínicos del Paciente Activo */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-white font-title">{activeCase.patientName}</h2>
                      <p className="text-xs text-slate-400 font-light">{activeCase.patientEmail}</p>
                    </div>

                    {/* Selector de Estado de Caso */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Estado del Caso:</span>
                      <select
                        value={activeCase.status}
                        onChange={(e) => handleStatusChange(e.target.value as any)}
                        disabled={isPending}
                        className="bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold px-2.5 py-1 text-slate-300 outline-none focus:border-sky-500/50 cursor-pointer"
                      >
                        <option value="abierto">Abierto</option>
                        <option value="en_revision">En Revisión</option>
                        <option value="resuelto">Resuelto</option>
                      </select>
                    </div>
                  </div>

                  {/* Métricas Clínicas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Estatura</span>
                      <span className="text-sm font-bold text-slate-200 font-title">{activeCase.height ? `${parseFloat(activeCase.height)} cm` : 'Sin registro'}</span>
                    </div>
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Peso</span>
                      <span className="text-sm font-bold text-slate-200 font-title">{activeCase.weight ? `${parseFloat(activeCase.weight)} kg` : 'Sin registro'}</span>
                    </div>
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">IMC</span>
                      <span className="text-sm font-bold text-slate-200 font-title">{activeCase.imc ? parseFloat(activeCase.imc).toFixed(2) : 'Sin registro'}</span>
                    </div>
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Última Modif.</span>
                      <span className="text-sm font-bold text-slate-200 font-title">{new Date(activeCase.updatedAt).toLocaleDateString('es-MX')}</span>
                    </div>
                  </div>

                  {/* Diagnóstico/Expediente */}
                  <div className="bg-slate-950/50 border border-slate-850 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold uppercase tracking-wider">
                      <Clipboard className="w-4 h-4" />
                      <span>Diagnóstico Clínico Inicial: {activeCase.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-line">
                      {activeCase.description}
                    </p>
                  </div>

                  {activeCase.attemptsHistory && (
                    <div className="bg-slate-950/20 border border-slate-850 rounded-xl p-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold uppercase tracking-wider">
                        <Heart className="w-3.5 h-3.5" />
                        <span>Historial de Intentos Previos</span>
                      </div>
                      <p className="text-xs text-slate-400 font-light italic">
                        "{activeCase.attemptsHistory}"
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Hilo de Anotaciones del Caso (Colaborativo) */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <h3 className="font-bold text-base text-white font-title">Anotaciones y Caso Compartido</h3>
                  </div>

                  {/* Listado de comentarios */}
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {activeCaseNotes.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-850 rounded-xl">
                        Aún no hay anotaciones de especialistas para este caso.
                      </div>
                    ) : (
                      activeCaseNotes.map((note) => (
                        <div 
                          key={note.id}
                          className="p-3.5 rounded-xl border bg-slate-950/50 border-slate-850 space-y-2"
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-200">{note.authorName}</span>
                              <span className={`px-1.5 py-0.2 rounded border uppercase text-[8px] font-bold ${getAuthorBadgeColor(note.authorRole)}`}>
                                {note.authorRole}
                              </span>
                            </div>
                            <span className="text-slate-500 font-light">
                              {new Date(note.createdAt).toLocaleString('es-MX', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-300 leading-normal font-light whitespace-pre-line">
                            {note.noteContent}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Formulario para agregar nota */}
                  <form onSubmit={handleAddNote} className="space-y-3 pt-3 border-t border-slate-800">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Nueva Anotación Clínica
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Escribe aquí indicaciones, observaciones de laboratorios o ajustes del plan de tratamiento para que los otros especialistas del caso puedan consultarlo..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs outline-none focus:border-sky-500/40 placeholder:text-slate-650 resize-none font-light leading-relaxed"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-2 bg-red-950/45 border border-red-800/60 rounded-xl text-xs text-red-300">
                        {errorMsg}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isPending || !newNote.trim()}
                        className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold py-2 px-5 rounded-xl cursor-pointer transition text-xs shadow-md shadow-sky-500/10 disabled:opacity-50"
                      >
                        {isPending ? 'Guardando...' : 'Publicar en Hilo Médico'}
                      </button>
                    </div>
                  </form>

                </div>
              </>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 backdrop-blur-xl">
                Selecciona un expediente de la izquierda para comenzar a colaborar en el caso.
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer del Portal */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-light mt-12 relative z-10">
        CIP Clínica Integral del Peso &copy; {new Date().getFullYear()} — Portal de Especialistas Médicos.
      </footer>
    </div>
  );
}

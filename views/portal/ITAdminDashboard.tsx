// views/portal/ITAdminDashboard.tsx
"use client";

import { useState, useTransition } from 'react';
import { UserCog, ShieldCheck, Terminal, Database, Server, RefreshCw, Search, ShieldAlert, Cpu } from 'lucide-react';
import { changeUserRoleAction } from '@/lib/actions';
import DashboardHeader from './DashboardHeader';

interface ITAdminDashboardProps {
  session: {
    fullName: string;
    email: string;
    role: string;
  };
  users: Array<{
    id: string;
    email: string;
    role: 'paciente' | 'especialista' | 'admin_ti' | 'coordinador';
    fullName: string;
    createdAt: string;
  }>;
  auditLogs: Array<{
    id: string;
    action: string;
    details: string;
    createdAt: string;
    userName: string | null;
    userRole: string | null;
  }>;
  systemStats: {
    dbStatus: string;
    dbTime: string;
    nodeVersion: string;
    env: string | undefined;
  };
}

export default function ITAdminDashboard({ session, users, auditLogs, systemStats }: ITAdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filtrar usuarios en cliente
  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = async (userId: string, newRole: any) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    startTransition(async () => {
      const res = await changeUserRoleAction(userId, newRole);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg(`Rol de usuario actualizado a ${newRole} en base de datos.`);
        setTimeout(() => setSuccessMsg(null), 5000);
      }
    });
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === 'paciente') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (role === 'especialista') return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    if (role === 'admin_ti') return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DashboardHeader session={session} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Fila de Estadísticas y Salud del Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Nivel de Acceso</span>
              <span className="text-sm font-semibold text-white font-title">Administración TI</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Base de Datos</span>
              <span className="text-sm font-semibold text-emerald-400 font-title">{systemStats.dbStatus}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Motor DB</span>
              <span className="text-sm font-semibold text-slate-200 font-title">Neon Postgres</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Node.js Runtime</span>
              <span className="text-xs font-mono text-slate-200 font-semibold">{systemStats.nodeVersion}</span>
            </div>
          </div>

        </div>

        {/* Tablero Principal: Gestión de Usuarios (Izquierda) / Bitácora de Auditoría (Derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Gestión de Usuarios: 3 de 5 columnas */}
          <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <UserCog className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-lg text-white font-title">Gestión de Usuarios y Roles</h2>
              </div>

              {/* Input de Búsqueda */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar usuario por nombre/correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-purple-500/40 transition placeholder:text-slate-600"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/45 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/45 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                {successMsg}
              </div>
            )}

            {/* Tabla de Usuarios */}
            <div className="overflow-x-auto border border-slate-850 rounded-xl">
              <table className="w-full border-collapse text-left text-xs text-slate-400">
                <thead className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Correo</th>
                    <th className="p-3">Rol Base de Datos</th>
                    <th className="p-3 text-right">Asignar Rol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 bg-slate-900/40">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-950/30 transition">
                        <td className="p-3 text-white font-semibold">{u.fullName}</td>
                        <td className="p-3 font-light font-mono text-slate-400">{u.email}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getRoleBadgeColor(u.role)}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={u.role}
                            disabled={isPending}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-semibold px-2 py-1 text-slate-300 outline-none focus:border-purple-500/50 cursor-pointer"
                          >
                            <option value="paciente">Paciente</option>
                            <option value="especialista">Especialista</option>
                            <option value="coordinador">Coordinador</option>
                            <option value="admin_ti">Admin TI</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Bitácora de Auditoría: 2 de 5 columnas */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-4 h-full flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-base text-white font-title">Bitácora de Auditoría (Audit Logs)</h3>
              </div>
              
              <button 
                onClick={() => window.location.reload()}
                className="p-1.5 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                title="Recargar logs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[10px] text-slate-500 leading-normal font-light">
              Registro inalterable de transacciones clínicas, accesos y modificaciones en tiempo real en la tabla `audit_logs`.
            </div>

            {/* Listado de Logs */}
            <div className="space-y-3 flex-grow overflow-y-auto max-h-[500px] pr-1 mt-2">
              {auditLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-655 text-xs">
                  No hay logs registrados en el sistema.
                </div>
              ) : (
                auditLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl space-y-1.5 hover:border-slate-800 transition"
                  >
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-purple-400 uppercase tracking-widest">{log.action}</span>
                      <span className="text-slate-550">
                        {new Date(log.createdAt).toLocaleString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                      {log.details}
                    </p>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-900/50 pt-1.5 mt-1">
                      <span>Ref: {log.userName || 'Sistema'}</span>
                      <span className="font-mono text-[8px]">{new Date(log.createdAt).toLocaleDateString('es-MX')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer del Portal */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-light mt-12 relative z-10">
        CIP Clínica Integral del Peso &copy; {new Date().getFullYear()} — Portal de Administración TI. Cumplimiento de Auditoría de Sistemas de Salud.
      </footer>
    </div>
  );
}

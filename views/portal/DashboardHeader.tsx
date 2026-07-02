// views/portal/DashboardHeader.tsx
"use client";

import { useTransition } from 'react';
import { Activity, LogOut, User, Stethoscope, UserCog, CalendarDays } from 'lucide-react';
import { logoutAction } from '@/lib/actions';

interface DashboardHeaderProps {
  session: {
    fullName: string;
    email: string;
    role: string;
  };
}

export default function DashboardHeader({ session }: DashboardHeaderProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const roleLabels: Record<string, { label: string; bg: string; text: string; icon: any }> = {
    paciente: { 
      label: 'Paciente', 
      bg: 'bg-emerald-500/10 border-emerald-500/20', 
      text: 'text-emerald-400', 
      icon: User 
    },
    especialista: { 
      label: 'Especialista Médico', 
      bg: 'bg-sky-500/10 border-sky-500/20', 
      text: 'text-sky-400', 
      icon: Stethoscope 
    },
    admin_ti: { 
      label: 'Administrador TI', 
      bg: 'bg-purple-500/10 border-purple-500/20', 
      text: 'text-purple-400', 
      icon: UserCog 
    },
    coordinador: { 
      label: 'Coordinador de Salud', 
      bg: 'bg-amber-500/10 border-amber-500/20', 
      text: 'text-amber-400', 
      icon: CalendarDays 
    },
  };

  const roleInfo = roleLabels[session.role] || { 
    label: session.role, 
    bg: 'bg-slate-500/10 border-slate-500/20', 
    text: 'text-slate-400', 
    icon: User 
  };
  
  const IconComponent = roleInfo.icon;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg font-title tracking-tight block leading-none">CIP</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none font-sans font-light">Digital Portal</span>
          </div>
        </div>

        {/* User Stats & Logout */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-semibold text-sm leading-none">{session.fullName}</span>
            <span className="text-xs text-slate-400 font-light mt-1">{session.email}</span>
          </div>

          {/* Role badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${roleInfo.bg} ${roleInfo.text} text-xs font-semibold font-title uppercase tracking-wider`}>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{roleInfo.label}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="p-2 sm:px-3 sm:py-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 rounded-xl cursor-pointer transition duration-200 flex items-center gap-1.5 text-xs font-medium"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{isPending ? 'Cerrando...' : 'Salir'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

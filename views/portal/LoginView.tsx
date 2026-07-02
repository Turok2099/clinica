// views/portal/LoginView.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ShieldAlert, Activity, UserCog, Stethoscope, CalendarRange } from 'lucide-react';
import { loginAction, loginAsDemoAction } from '@/lib/actions';

export default function LoginView() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null); // 'normal' | 'paciente' | 'especialista' | 'admin_ti' | 'coordinador'
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('normal');
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(null, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(null);
    } else if (result?.success) {
      router.push('/portal/dashboard');
      router.refresh();
    }
  };

  const handleQuickLogin = async (role: 'paciente' | 'especialista' | 'admin_ti' | 'coordinador') => {
    setLoading(role);
    setError(null);

    const result = await loginAsDemoAction(role);

    if (result?.error) {
      setError(result.error);
      setLoading(null);
    } else if (result?.success) {
      router.push('/portal/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background soft blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col lg:flex-row items-center gap-12 justify-center">
        
        {/* Left content: Branding & Mission */}
        <div className="lg:w-1/2 text-white space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/30 border border-primary/40 backdrop-blur-sm">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-title">
              Portal Clínico Integrado
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-title leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            CIP <span className="text-accent font-light">Digital</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
            Plataforma integral de control metabólico y acompañamiento digital. Conectando pacientes, especialistas médicos y coordinadores de salud en tiempo real.
          </p>

          <div className="border-t border-slate-800/80 pt-6 hidden lg:block max-w-md">
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block mb-2">
              Seguridad y Cumplimiento
            </span>
            <p className="text-xs text-slate-500 leading-normal">
              Cumple con los estándares de privacidad clínica y encriptación de datos de salud en reposo y en tránsito.
            </p>
          </div>
        </div>

        {/* Right content: Form & Demo selector */}
        <div className="lg:w-[480px] w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/5 to-primary/5 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white font-title">Iniciar Sesión</h2>
              <p className="text-sm text-slate-400 mt-1">Ingresa tus credenciales clínicas</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-950/45 border border-red-800/60 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-200">{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ejemplo@cip.com"
                    className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/80 transition text-sm font-light placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/80 transition text-sm font-light placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-primary to-slate-800 hover:from-primary-hover hover:to-slate-700 text-white font-semibold py-3.5 rounded-xl cursor-pointer shadow-lg shadow-primary/10 transition duration-300 disabled:opacity-50 text-sm"
              >
                {loading === 'normal' ? 'Accediendo...' : 'Ingresar'}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative bg-slate-900/0 px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest backdrop-blur-md">
                O ACCEDE CON UN CLICK
              </span>
            </div>

            {/* Quick Demo logins selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin('paciente')}
                disabled={loading !== null}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 hover:border-accent/40 text-left transition duration-200 group text-xs text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Paciente</div>
                  <div className="text-[10px] text-slate-500">
                    {loading === 'paciente' ? 'Cargando...' : 'carlos@cip.com'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('especialista')}
                disabled={loading !== null}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 hover:border-primary/50 text-left transition duration-200 group text-xs text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-hover group-hover:scale-105 transition">
                  <Stethoscope className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <div className="font-semibold">Especialista</div>
                  <div className="text-[10px] text-slate-500">
                    {loading === 'especialista' ? 'Cargando...' : 'elena@cip.com'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('coordinador')}
                disabled={loading !== null}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/30 text-left transition duration-200 group text-xs text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
                  <CalendarRange className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Coordinador</div>
                  <div className="text-[10px] text-slate-500">
                    {loading === 'coordinador' ? 'Cargando...' : 'monica@cip.com'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('admin_ti')}
                disabled={loading !== null}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/30 text-left transition duration-200 group text-xs text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition">
                  <UserCog className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Admin TI</div>
                  <div className="text-[10px] text-slate-500">
                    {loading === 'admin_ti' ? 'Cargando...' : 'jorge@cip.com'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

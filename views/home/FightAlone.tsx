import React from "react";
import { ClipboardList, Stethoscope, HeartPulse, HeartHandshake } from "lucide-react";

export default function FightAlone() {
  return (
    <section className="w-full py-20 bg-primary relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-extrabold !text-white leading-tight tracking-tight mb-6">
            Deja de luchar contra tu peso en{" "}
            <span className="text-accent">SOLITARIO</span>
          </h2>
          <p className="text-lg !text-slate-200 leading-relaxed font-medium">
            No es falta de voluntad, perder peso no debería sentirse como una
            batalla constante. Nuestro protocolo aborda el sobrepeso y la
            obesidad, combinando terapias avanzadas de última generación con
            seguimiento clínico integral.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 animate-fade-in-up">
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <ClipboardList className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold !text-white tracking-wide">
              Evaluación integral y diagnóstico
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Stethoscope className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold !text-white tracking-wide">
              Abordaje Médico integral
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <HeartPulse className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold !text-white tracking-wide">
              Esquema de Tratamiento
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <HeartHandshake className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold !text-white tracking-wide">
              Acompañamiento Continuo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

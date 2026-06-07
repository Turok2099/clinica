import React from "react";
import {
  HeartPulse,
  ArrowRight,
  Calendar,
  Award,
  HeartHandshake,
  Sparkles,
  ClipboardList,
  Target,
} from "lucide-react";
import BMICalculator from "./BMICalculator";
import ProtocolCTA from "./ProtocolCTA";

export default function Methodology() {
  return (
    <section className="w-full py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        {/* Badges/Icons directly below the Hero gallery (the image above) */}

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Deja de luchar contra tu peso en{" "}
            <span className="text-accent">SOLITARIO</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            No es falta de voluntad, perder peso no debería sentirse como una
            batalla constante. Nuestro protocolo aborda el sobrepeso y la
            obesidad, combinando terapias avanzadas de última generación con
            seguimiento clínico integral.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-20 -mt-12 animate-fade-in-up">
          <div className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100/80">
            <Award className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold text-slate-700 tracking-wide">
              Médicos Especialistas
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100/80">
            <HeartHandshake className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold text-slate-700 tracking-wide">
              Atencion integral y personalizada
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100/80">
            <Sparkles className="w-5 h-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-extrabold text-slate-700 tracking-wide">
              Una nueva forma de perder peso
            </span>
          </div>
        </div>

        {/* Highlighted Phrase / Call to Action */}
        <div className="max-w-5xl mx-auto mb-24 animate-fade-in-up">
          <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden shadow-xl shadow-slate-200/40">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-accent/10 rounded-full opacity-60 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 bg-primary/10 rounded-full opacity-60 blur-3xl pointer-events-none"></div>

            <span className="relative z-10 inline-block text-xs font-bold tracking-[0.25em] text-accent uppercase mb-4">
              COMIENZA HOY
            </span>

            <p className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-title font-black text-slate-900 leading-tight tracking-tight uppercase mb-6">
              TU ESFUERZO MERECE{" "}
              <span className="text-accent block md:inline-block mt-2 md:mt-0">
                RESULTADOS VISIBLES
              </span>
            </p>

            <p className="relative z-10 text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              No es falta de ganas, solo necesitas un enfoque diferente.
            </p>

            <div className="relative z-10">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary hover:bg-accent text-white font-extrabold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1 group text-base md:text-lg cursor-pointer animate-pulse-subtle"
              >
                Agenda tu cita
                <Calendar
                  className="w-5 h-5 text-accent transition-transform group-hover:scale-110"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Pillar 1 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-md shadow-slate-200/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <ClipboardList className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              1. Conocemos tu historia
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Analizamos tus antecedentes médicos y familiares, factores genéticos, hábitos de vida, signos, síntomas y objetivos de salud para comprender tu situación de manera integral.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-md shadow-slate-200/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <HeartPulse className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
              2. Evaluamos tu salud cardiometabólica
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium relative z-10">
              Realizamos mediciones clave como composición corporal, circunferencia de cintura, presión arterial y otros indicadores relevantes. Además, tendrás acceso a beneficios exclusivos en estudios de laboratorio para complementar tu evaluación.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-md shadow-slate-200/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              3. Diseñamos tu plan personalizado
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Con base en tus resultados, nuestros especialistas desarrollan una estrategia adaptada a tus necesidades y objetivos, enfocada en mejorar tu salud y bienestar a largo plazo.
            </p>
          </div>
        </div>

        {/* Subtle compliance note below the grid */}
        <div className="mt-8 text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            * Utilizamos exclusivamente terapias médicas reguladas internacionalmente (como agonistas de receptores GLP-1 y GIP) bajo estricto criterio y prescripción médica.
          </p>
        </div>

        {/* BMI Calculator */}
        <BMICalculator />

        {/* Protocol PDF CTA */}
        <ProtocolCTA />
      </div>
    </section>
  );
}

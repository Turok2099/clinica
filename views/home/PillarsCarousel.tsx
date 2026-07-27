"use client";

import React, { useRef, useState } from "react";
import { ClipboardList, HeartPulse, Target, ShieldCheck } from "lucide-react";

export default function PillarsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveSlide(Math.min(Math.max(newIndex, 0), 2));
  };

  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: idx * width,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-4">
      {/* Scrollable Container (Flex on mobile, Grid on desktop) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 md:gap-8 lg:gap-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Pillar 1 */}
        <div className="w-full md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 text-left">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <ClipboardList className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold !text-white mb-4">
            1. Conocemos tu historia
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            Analizamos tus antecedentes médicos y familiares, factores genéticos, hábitos de vida, signos, síntomas y objetivos de salud para comprender tu situación de manera integral.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="w-full md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 relative overflow-hidden text-left">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <HeartPulse className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold !text-white mb-4 relative z-10">
            2. Evaluamos tu salud cardiometabólica
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed font-medium relative z-10">
            Realizamos mediciones clave como composición corporal, circunferencia de cintura, presión arterial y otros indicadores relevantes. Además, tendrás acceso a beneficios exclusivos en estudios de laboratorio para complementar tu evaluación.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="w-full md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 text-left">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold !text-white mb-4">
            3. Diseñamos tu plan personalizado
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            Con base en tus resultados, nuestros especialistas desarrollan una estrategia adaptada a tus necesidades y objetivos, enfocada en mejorar tu salud y bienestar a largo plazo.
          </p>
        </div>
      </div>

      {/* Pagination Dots for Mobile Carousel */}
      <div className="flex justify-center items-center gap-2.5 mt-8 md:hidden">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx ? "bg-primary w-6" : "bg-slate-300/80 w-2.5"
              }`}
            aria-label={`Ir a tarjeta ${idx + 1}`}
          />
        ))}
      </div>

      {/* High-impact safety & compliance banner */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-slate-900 to-primary text-white rounded-[2rem] p-8 md:p-12 overflow-hidden border border-slate-800 shadow-2xl shadow-primary/20 group">
          {/* Background glowing effects */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Icon Block */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-accent/15 rounded-3xl border border-accent/30 flex items-center justify-center text-accent shadow-xl shadow-accent/5">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Text Block */}
            <div className="flex-grow text-center md:text-left">
              <span className="inline-block text-xs md:text-sm font-bold tracking-[0.25em] text-accent uppercase mb-3">
                Garantía de Seguridad Médica
              </span>
              <p className="text-lg md:text-xl font-sans font-medium leading-relaxed text-slate-100">
                Utilizamos <strong className="text-white font-extrabold underline decoration-accent decoration-2 underline-offset-4">exclusivamente terapias médicas reguladas internacionalmente</strong> (como agonistas de receptores <span className="text-accent font-bold">GLP-1 y GIP</span>) bajo estricto criterio y prescripción médica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { ClipboardList, HeartPulse, Target } from "lucide-react";

export default function PillarsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth - 24; // accounting for gap
    const newIndex = Math.round(scrollLeft / width);
    setActiveSlide(Math.min(Math.max(newIndex, 0), 2));
  };

  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return;
    // On scroll snap, scrolling is relative to viewport offsetWidth
    const width = containerRef.current.offsetWidth - 24;
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
        <div className="w-[85vw] md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 text-left">
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
        <div className="w-[85vw] md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 relative overflow-hidden text-left">
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
        <div className="w-[85vw] md:w-auto flex-shrink-0 snap-center flex flex-col bg-primary rounded-3xl p-8 border border-slate-800 shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 md:hover:-translate-y-1 text-left">
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
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === idx ? "bg-primary w-6" : "bg-slate-300/80 w-2.5"
            }`}
            aria-label={`Ir a tarjeta ${idx + 1}`}
          />
        ))}
      </div>

      {/* Subtle compliance note below the grid */}
      <div className="mt-8 text-center max-w-2xl mx-auto mb-12 px-4">
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          * Utilizamos exclusivamente terapias médicas reguladas internacionalmente (como agonistas de receptores GLP-1 y GIP) bajo estricto criterio y prescripción médica.
        </p>
      </div>
    </div>
  );
}

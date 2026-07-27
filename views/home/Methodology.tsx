import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import BMICalculator from "./BMICalculator";
import ProtocolCTA from "./ProtocolCTA";
import PillarsCarousel from "./PillarsCarousel";

export default function Methodology() {
  return (
    <section className="w-full py-24 bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">

        {/* Highlighted Phrase / Call to Action Banner */}
        <div className="max-w-6xl mx-auto mb-24 animate-fade-in-up">
          <div className="relative bg-[#00A887] border border-teal-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-accent/20 flex flex-col md:flex-row items-stretch min-h-[460px]">
            {/* Image Container (Left side on desktop, top on mobile) */}
            <div className="relative w-full md:w-5/12 lg:w-1/2 h-72 sm:h-96 md:h-auto flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1785115821/tu_esfuerzo_merece_resultados_xhioss.png"
                alt="Tu esfuerzo merece resultados visibles"
                fill
                priority
                unoptimized
                crossOrigin="anonymous"
                className="object-cover object-top md:object-left-top"
              />
              {/* Edge blend gradients for smooth transition */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#00A887] pointer-events-none" />
              <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#00A887] pointer-events-none" />
            </div>

            {/* Text & Content Container (Green Space on right) */}
            <div className="relative z-10 w-full md:w-7/12 lg:w-1/2 p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center items-start text-left bg-[#00A887]">
              {/* Decorative accent background element (iOS WebKit GPU optimized) */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-white/25 via-white/10 to-transparent rounded-full blur-2xl -translate-y-1/4 translate-x-1/4 pointer-events-none transform-gpu" />

              <span className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary text-xs font-black tracking-[0.25em] uppercase mb-5 shadow-sm">
                COMIENZA HOY
              </span>

              <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-title font-black leading-tight tracking-tight uppercase mb-5">
                <span className="text-white block">TU ESFUERZO MERECE</span>
                <span className="text-primary block mt-1 drop-shadow-sm">
                  RESULTADOS VISIBLES
                </span>
              </h2>

              <p className="relative z-10 text-base md:text-lg text-slate-950 font-medium leading-relaxed max-w-xl mb-8">
                No es falta de ganas, solo necesitas un enfoque diferente.
              </p>

              <div className="relative z-10">
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-2xl shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-1 group text-base md:text-lg cursor-pointer"
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
        </div>

        {/* Pillars Carousel (Swipe on Mobile, Grid on Desktop) */}
        <PillarsCarousel />

        {/* BMI Calculator */}
        <BMICalculator />

        {/* Protocol PDF CTA */}
        <ProtocolCTA />
      </div>
    </section>
  );
}

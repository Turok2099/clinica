import React from "react";
import { Calendar } from "lucide-react";
import BMICalculator from "./BMICalculator";
import ProtocolCTA from "./ProtocolCTA";
import PillarsCarousel from "./PillarsCarousel";

export default function Methodology() {
  return (
    <section className="w-full py-24 bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">

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
                href="/contacto"
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

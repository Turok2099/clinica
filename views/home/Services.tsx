import React from 'react';
import { Play, HeartPulse, Stethoscope, TrendingUp } from 'lucide-react';

export default function Services() {
  return (
    <section id="servicios" className="w-full py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">

        {/* Section Title & Subtitle */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-title font-black text-[#1E295D] leading-[1.1] tracking-tight mb-5">
            Más que bajar de peso,<br className="hidden sm:inline" /> transformamos tu vida.
          </h2>
          <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Combinamos ciencia, experiencia y acompañamiento para lograr resultados reales y duraderos.
          </p>
        </div>

        {/* 3 Icons Grid Block (Side by side 3 columns on mobile and desktop) */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-24">
          <div className="grid grid-cols-3 divide-x divide-slate-300/70">

            {/* Item 1: Abordaje Integral */}
            <div className="flex flex-col items-center text-center px-1 sm:px-4 md:px-8 py-2 md:py-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-[#C7F0E6] flex items-center justify-center mb-2.5 sm:mb-4 md:mb-6 shadow-sm">
                <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 text-[#00A896]" strokeWidth={2} />
              </div>
              <h3 className="text-[11px] sm:text-base md:text-[1.65rem] font-title font-black text-[#1E295D] leading-tight">
                Abordaje<br />Integral
              </h3>
            </div>

            {/* Item 2: Médicos Certificados */}
            <div className="flex flex-col items-center text-center px-1 sm:px-4 md:px-8 py-2 md:py-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-[#C7F0E6] flex items-center justify-center mb-2.5 sm:mb-4 md:mb-6 shadow-sm">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 text-[#00A896]" strokeWidth={2} />
              </div>
              <h3 className="text-[11px] sm:text-base md:text-[1.65rem] font-title font-black text-[#1E295D] leading-tight">
                Médicos<br />Certificados
              </h3>
            </div>

            {/* Item 3: Resultados sostenibles */}
            <div className="flex flex-col items-center text-center px-1 sm:px-4 md:px-8 py-2 md:py-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-[#C7F0E6] flex items-center justify-center mb-2.5 sm:mb-4 md:mb-6 shadow-sm">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 text-[#00A896]" strokeWidth={2} />
              </div>
              <h3 className="text-[11px] sm:text-base md:text-[1.65rem] font-title font-black text-[#1E295D] leading-tight">
                Resultados<br />sostenibles
              </h3>
            </div>

          </div>
        </div>

        {/* Video Title (Outside & Above Video Box) */}
        <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-title font-black text-slate-900 leading-tight tracking-tight uppercase">
            Testimonio
          </h3>
        </div>

        {/* YouTube Video Mock */}
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/50 group bg-slate-950">
            {/* Background Thumbnail (Mock) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png')" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

            {/* Play Button Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <button
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-2xl shadow-accent/50 hover:shadow-accent-hover/60 transition-all duration-300 hover:scale-110 cursor-pointer group/play"
                aria-label="Reproducir video"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current translate-x-0.5 transition-transform group-hover/play:scale-110" />
              </button>

              <p className="mt-6 text-white font-title font-bold text-lg md:text-2xl tracking-wide max-w-lg drop-shadow-md">
                Conoce la historia de Elda
              </p>
              <p className="text-white/60 text-xs md:text-sm mt-2">
                Haz clic para reproducir video
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

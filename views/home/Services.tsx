import React from 'react';
import { Play } from 'lucide-react';

export default function Services() {
  return (
    <section id="servicios" className="w-full py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">

        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
            Abordaje Integral
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-title font-black text-slate-800 leading-tight tracking-tight mb-4">
            Más que bajar de peso, transformamos tu vida.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Combinamos ciencia, experiencia y acompañamiento para lograr resultados reales y duraderos.
          </p>
        </div>

        {/* YouTube Video Mock */}
        <div className="max-w-4xl mx-auto">
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

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://res.cloudinary.com/dxbtafe9u/image/upload/f_auto,q_auto/v1779227794/back-hero_hk9cfp.png"
          alt="Clínica Hero Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep clinical dark-green overlay gradient to ensure high readability of white text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03170c]/95 via-[#03170c]/70 to-[#03170c]/20 lg:from-[#03170c]/90 lg:via-[#03170c]/50 lg:to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10 py-32 flex items-center">
        {/* Text Content - positioned beautifully over the left-side green background space */}
        <div className="w-full lg:w-3/5 flex flex-col items-start text-left space-y-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-none tracking-tight">
              La forma más rapida de bajar de peso
            </h1>
            <div className="flex flex-col gap-4 mt-2">
              {[
                "Más rápido",
                "Sin rebote",
                "Sin hambre"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-accent" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg lg:text-xl text-slate-200 max-w-xl leading-relaxed font-medium">
            Disminuye hasta el 20% de tu grasa corporal en 6 semanas.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-slate-900 font-extrabold rounded-2xl shadow-lg shadow-accent/25 transition-all hover:-translate-y-1 hover:shadow-accent/40 flex justify-center items-center gap-2 cursor-pointer">
              Agenda tu cita
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold rounded-2xl shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 flex justify-center items-center cursor-pointer">
              Ver médicos
            </button>
          </div>

          <div className="pt-8 border-t border-white/15 w-full max-w-md flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-slate-300 font-medium">Especialidades</p>
            </div>
            <div className="w-px h-10 bg-white/15"></div>
            <div>
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-sm text-slate-300 font-medium">Pacientes</p>
            </div>
            <div className="w-px h-10 bg-white/15"></div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-slate-300 font-medium">Emergencias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



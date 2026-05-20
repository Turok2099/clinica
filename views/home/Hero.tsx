import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-transparent pt-28 pb-16 lg:pt-32">
      
      {/* Mobile Background Image (Visible only on mobile/tablet) */}
      <div className="absolute inset-0 z-0 lg:hidden pointer-events-none select-none">
        <Image
          src="https://res.cloudinary.com/dxbtafe9u/image/upload/f_auto,q_auto:eco/v1779234534/hero2_osu881.png"
          alt="Clínica Hero Mobile Background"
          fill
          priority
          unoptimized
          crossOrigin="anonymous"
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        {/* Dark overlay for mobile to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03170c]/95 via-[#03170c]/70 to-[#03170c]/40" />
      </div>

      {/* Decorative background blob (Desktop only) */}
      <div className="hidden lg:block absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6 lg:space-y-8 pt-[55vh] lg:pt-0">
            <div className="flex flex-col gap-6 w-full">
              {/* Title: White on mobile, Dark on desktop */}
              <h1 className="text-4xl lg:text-7xl font-extrabold text-white lg:text-slate-900 leading-[1.15] tracking-tight drop-shadow-lg lg:drop-shadow-none">
                La forma más rápida para bajar de peso
              </h1>
              {/* Bullets: Top Right on mobile, normal flow on desktop */}
              <div className="absolute top-16 right-6 lg:static flex flex-col items-end lg:items-start gap-2 lg:gap-4 lg:mt-4 z-20">
                {[
                  "Más rápido",
                  "Sin rebote",
                  "Sin hambre"
                ].map((item, i) => (
                  <div key={i} className="flex flex-row-reverse lg:flex-row items-center gap-2 lg:gap-4">
                    <div className="flex-shrink-0 w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-accent/40 lg:bg-accent/10 border border-accent/50 lg:border-accent/20 flex items-center justify-center shadow-sm">
                      <svg className="w-3 h-3 lg:w-6 lg:h-6 text-white lg:text-accent" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* Feature text: White on mobile, Dark on desktop */}
                    <span className="text-base lg:text-4xl font-extrabold text-white lg:text-slate-800 leading-tight drop-shadow-md lg:drop-shadow-none text-right lg:text-left">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paragraph: Light gray on mobile, Dark gray on desktop */}
            <p className="text-lg lg:text-xl text-slate-200 lg:text-slate-600 max-w-xl leading-relaxed font-medium">
              Disminuye hasta el 20% de tu grasa corporal en 6 semanas con nuestro programa especializado.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-slate-900 font-extrabold rounded-2xl shadow-lg shadow-accent/25 transition-all hover:-translate-y-1 hover:shadow-accent/40 flex justify-center items-center gap-2 cursor-pointer">
                Test Online Gratis
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>


          </div>

          {/* Right Column - Image Block (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative justify-end">
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-[8px] border-white ring-1 ring-slate-100 transform transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="https://res.cloudinary.com/dxbtafe9u/image/upload/f_auto,q_auto:eco/v1779234534/hero2_osu881.png"
                alt="Clínica Hero Background"
                fill
                priority
                unoptimized
                crossOrigin="anonymous"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-right"
              />
              
              {/* Optional inner gradient for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Small floating trust badge */}
            <div className="absolute bottom-8 -left-4 lg:left-0 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Resultados Garantizados</p>
                <p className="text-xs text-slate-500 font-medium">Con supervisión médica</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

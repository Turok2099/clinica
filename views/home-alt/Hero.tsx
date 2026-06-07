import React from 'react';
import Image from 'next/image';
import { Leaf, HeartPulse, UserCheck, RefreshCw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-24 md:pt-28 pb-16 px-6 bg-[#FDF8F2] min-h-screen">
      <div className="container max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Centered Logo */}
        <div className="mb-4 lg:mb-6 relative w-80 h-28 sm:w-96 sm:h-32 md:w-[30rem] md:h-[9rem] lg:w-[39rem] lg:h-[12rem]">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780796434/logotransparente_izk2q7.png"
            alt="CIP - Clínica Integral del Peso"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Text Area */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold text-[#5C4D3C] tracking-[0.15em] md:tracking-[0.2em] uppercase mb-4 lg:mb-6 text-balance">
          Clinica Integral del Peso
        </h1>
        
        <div className="flex items-center gap-3 md:gap-6 w-full max-w-xs md:max-w-2xl mx-auto mb-10 lg:mb-14">
          <div className="flex-1 h-px bg-stone-400/60"></div>
          <h2 className="text-base md:text-2xl font-title font-medium text-[#7A6A58] tracking-[0.15em] md:tracking-[0.25em] uppercase whitespace-nowrap">
            Tu Peso, Tu Salud
          </h2>
          <div className="flex-1 h-px bg-stone-400/60"></div>
        </div>

        {/* Image Area */}
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative aspect-[4/5] md:aspect-[21/9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-300/50 border-[6px] md:border-[8px] border-white ring-1 ring-slate-100 group">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png"
            alt="Cada cuerpo cuenta una historia distinta"
            fill
            priority
            unoptimized
            crossOrigin="anonymous"
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover object-top md:object-[50%_30%] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Text */}
          <div className="absolute top-8 md:top-12 left-0 w-full px-6 z-20 text-center">
            <p className="text-xl md:text-3xl lg:text-4xl font-serif font-normal uppercase text-white tracking-[0.2em] md:tracking-[0.3em] drop-shadow-md">
              Cada cuerpo cuenta una historia distinta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

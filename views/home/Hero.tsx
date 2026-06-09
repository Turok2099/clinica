import React from 'react';
import Image from 'next/image';
import { Leaf, HeartPulse, UserCheck, RefreshCw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-24 md:pt-28 pb-16 px-6 bg-secondary min-h-screen">
      <div className="container max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Text Area */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold text-slate-700 tracking-[0.15em] md:tracking-[0.2em] uppercase mb-4 lg:mb-6 text-balance">
          CIP: Clinica Integral del Peso
        </h1>
        
        <div className="flex items-center gap-3 md:gap-6 w-full max-w-xs md:max-w-2xl mx-auto mb-8 lg:mb-10">
          <div className="flex-1 h-px bg-slate-400/60"></div>
          <h2 className="text-base md:text-2xl font-title font-medium text-slate-600 tracking-[0.15em] md:tracking-[0.25em] uppercase whitespace-nowrap">
            Tu Peso, Tu Salud
          </h2>
          <div className="flex-1 h-px bg-slate-400/60"></div>
        </div>

        {/* Image Area */}
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-[6px] md:border-[8px] border-white ring-1 ring-slate-100 group mb-10 lg:mb-12">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png"
            alt="Cada cuerpo cuenta una historia distinta"
            fill
            priority
            unoptimized
            crossOrigin="anonymous"
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Text */}
          <div className="absolute top-8 md:top-12 left-0 w-full px-6 z-20 text-center">
            <p className="text-xl md:text-3xl lg:text-4xl font-serif font-normal uppercase text-white tracking-[0.2em] md:tracking-[0.3em] drop-shadow-md">
              Cada cuerpo cuenta una historia distinta
            </p>
          </div>
        </div>

        {/* WhatsApp Call to Action Button */}
        <div className="animate-fade-in-up">
          <a
            href="https://wa.me/525512345678?text=Hola,%20quiero%20bajar%20de%20peso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-extrabold text-base md:text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary-hover/30 transition-all duration-300 hover:-translate-y-0.5 gap-3 group/btn"
          >
            <svg 
              className="w-6 h-6 fill-current transition-transform duration-300 group-hover/btn:scale-110" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Quiero Bajar de Peso</span>
          </a>
        </div>
      </div>
    </section>
  );
}

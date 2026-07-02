import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Stethoscope, TrendingUp, HeartPulse } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col justify-start bg-white overflow-hidden">
      {/* Upper Hero Image Block */}
      <div className="relative w-full h-[75vh] md:h-[82vh] min-h-[620px] md:min-h-[760px] bg-slate-950 flex items-stretch px-6 md:px-12 xl:px-24 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png"
          alt="Clínica Integral del Peso"
          fill
          priority
          unoptimized
          crossOrigin="anonymous"
          className="absolute inset-0 object-cover object-center md:object-center z-0"
        />

        {/* Even Dark Overlay for Text legibility */}
        <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="container mx-auto relative z-20 text-left flex flex-col justify-between items-start pt-24 pb-16 md:pt-36 md:pb-28 h-full w-full">
          <div className="max-w-3xl h-full flex flex-col justify-between items-start animate-fade-in-up w-full">
            <div>
              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-title font-black text-white leading-none md:leading-[1.1] tracking-tight mb-2">
                <span className="text-accent">CIP:</span><br />
                Clínica<br />
                Integral<br />
                Del Peso
              </h1>

              {/* Subtitle with border from example */}
              <p className="text-sm md:text-2xl text-white/90 font-sans font-light tracking-wide max-w-xl border-l-2 border-accent pl-4">
                Tu peso, tu salud.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
              {/* Primary button */}
              <a
                href="https://wa.me/525662980178?text=Hola,%20quiero%20bajar%20de%20peso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent-hover text-white font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent-hover/30 transition-all duration-300 hover:-translate-y-0.5 gap-2 group/btn cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Agenda tu valoración</span>
              </a>

              {/* Secondary button */}
              <Link
                href="/tratamientos"
                className="inline-flex items-center justify-center px-6 py-4 border-2 border-white/50 text-white hover:bg-white/10 font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 gap-2 group/btn cursor-pointer w-full sm:w-auto"
              >
                <span>Conoce más sobre tu tratamiento</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlapping Metrics Card */}
      <div className="w-full px-4 relative z-20 -mt-10 md:-mt-14">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-4 md:p-8 border border-slate-100/80">
          <div className="grid grid-cols-3 divide-x divide-slate-100">

            {/* Profesionales en Salud */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-accent mb-3">
                <HeartPulse className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-slate-700 font-title leading-tight">
                Abordaje Integral
              </span>
            </div>

            {/* Enfoque Integral */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-accent mb-3">
                <Stethoscope className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-slate-700 font-title leading-tight">
                Médicos Certificados
              </span>
            </div>

            {/* Resultados sostenibles */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-accent mb-3">
                <TrendingUp className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-slate-700 font-title leading-tight">
                Resultados sostenibles
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

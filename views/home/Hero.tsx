import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Stethoscope, TrendingUp, HeartPulse } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col justify-start bg-transparent overflow-hidden pt-[72px] md:pt-[84px]">
      {/* Upper Hero Image Block */}
      <div className="relative w-full h-[90vh] md:h-[82vh] min-h-[744px] md:min-h-[760px] bg-transparent flex items-stretch px-6 md:px-12 xl:px-24 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1785112428/fondo3_svbly7.svg"
          alt="Clínica Integral del Peso"
          fill
          priority
          unoptimized
          crossOrigin="anonymous"
          className="absolute inset-0 object-cover object-[45%_top] md:object-top z-0"
        />


        {/* Hero Content Container */}
        <div className="container mx-auto relative z-20 text-left flex flex-col justify-between items-start pt-4 pb-16 md:pt-36 md:pb-28 h-full w-full">
          <div className="max-w-3xl h-full flex flex-col justify-between items-start animate-fade-in-up w-full">
            <div className="flex flex-col gap-6">
              {/* Eyebrow / Logo */}
              <div className="inline-flex items-center mb-2">
                <div className="relative w-14 h-14 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/60 shadow-md">
                  <Image
                    src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1785114701/logo_fondo_blanco_leu1xz.svg"
                    alt="Logo CIP"
                    fill
                    unoptimized
                    crossOrigin="anonymous"
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Main Title */}
              <h1 className="text-[40px] md:text-7xl lg:text-[5.5rem] font-title font-black text-slate-900 leading-[1.05] tracking-tight">
                Clínica<br />
                Integral<br />
                <span className="text-primary">Del Peso.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-2xl text-slate-600 font-sans font-medium tracking-wide max-w-lg leading-relaxed border-l-4 border-accent/40 pl-5">
                Tu peso, tu salud.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-10">
              {/* Primary button */}
              <a
                href="https://wa.me/525662980178?text=Hola,%20quiero%20bajar%20de%20peso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent-hover/30 transition-all duration-300 hover:-translate-y-1 gap-3 group/btn cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Agenda tu valoración</span>
              </a>

              {/* Secondary button */}
              <Link
                href="/tratamientos"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-primary font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-300 hover:-translate-y-1 gap-3 group/btn cursor-pointer w-full sm:w-auto bg-white/60 backdrop-blur-sm"
              >
                <span>Conoce tu tratamiento</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlapping Metrics Card */}
      <div className="w-full px-4 relative z-20 -mt-10 md:-mt-14">
        <div className="w-full max-w-5xl mx-auto bg-primary rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-primary/30 p-4 md:p-8 border border-white/10">
          <div className="grid grid-cols-3 divide-x divide-white/15">

            {/* Profesionales en Salud */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-white/10 rounded-2xl text-accent mb-3">
                <HeartPulse className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white font-title leading-tight">
                Abordaje Integral
              </span>
            </div>

            {/* Enfoque Integral */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-white/10 rounded-2xl text-accent mb-3">
                <Stethoscope className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white font-title leading-tight">
                Médicos Certificados
              </span>
            </div>

            {/* Resultados sostenibles */}
            <div className="flex flex-col items-center text-center px-2 py-3 md:p-4">
              <div className="p-3 bg-white/10 rounded-2xl text-accent mb-3">
                <TrendingUp className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white font-title leading-tight">
                Resultados sostenibles
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

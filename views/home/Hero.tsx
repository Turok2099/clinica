import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, Users, Heart, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col justify-start bg-white overflow-hidden">
      
      {/* Upper Hero Image Block */}
      <div className="relative w-full h-[58vh] md:h-[72vh] bg-slate-950 flex items-center px-6 md:px-12 xl:px-24 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png"
          alt="Clínica Integral del Peso"
          fill
          priority
          unoptimized
          crossOrigin="anonymous"
          className="absolute inset-0 object-cover object-center md:object-[center_25%] z-0"
        />

        {/* Even Dark Overlay for Text legibility */}
        <div className="absolute inset-0 bg-slate-950/55 z-10 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="container mx-auto relative z-20 text-left flex flex-col justify-center items-start pt-16 md:pt-20">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Brand Prefix */}
            <span className="block text-2xl md:text-5xl lg:text-6xl font-black tracking-wide text-accent font-title mb-1">
              CIP:
            </span>
            {/* Main Title */}
            <h1 className="text-3xl md:text-6xl lg:text-7.5xl font-title font-black text-white leading-[1.1] tracking-tight">
              Clínica<br />
              Integral<br />
              Del Peso
            </h1>
            
            {/* Divider line */}
            <div className="w-16 h-0.5 md:w-24 md:h-1 bg-accent mt-3 mb-4"></div>

            {/* Subtitle */}
            <p className="text-sm md:text-2xl text-slate-100 font-sans font-light tracking-wide mb-6 md:mb-10 max-w-xl">
              Tu peso, tu salud.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Primary button */}
              <a
                href="https://wa.me/525662980178?text=Hola,%20quiero%20bajar%20de%20peso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-accent hover:bg-accent-hover text-white font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent-hover/30 transition-all duration-300 hover:-translate-y-0.5 gap-2 group/btn cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Agenda tu valoración</span>
              </a>

              {/* Secondary button */}
              <a
                href="#servicios"
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 border border-white/60 text-white hover:bg-white/10 font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 gap-2 group/btn cursor-pointer w-full sm:w-auto"
              >
                <span>Conoce nuestros tratamientos</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlapping Metrics Card */}
      <div className="w-full px-4 relative z-20 -mt-10 md:-mt-14">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-4 md:p-8 border border-slate-100/80">
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            
            {/* Patients Attended */}
            <div className="flex flex-col items-center text-center px-1 py-2 md:p-3">
              <div className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl text-accent mb-2 md:mb-3">
                <Users className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              </div>
              <span className="text-[13px] sm:text-2xl md:text-3xl font-black text-accent font-title leading-none">+5,000</span>
              <span className="text-[9px] sm:text-xs md:text-sm text-slate-500 font-medium mt-1 leading-tight">
                pacientes<br className="sm:hidden" /> atendidos
              </span>
            </div>

            {/* Comprehensive Focus */}
            <div className="flex flex-col items-center text-center px-1 py-2 md:p-3">
              <div className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl text-accent mb-2 md:mb-3">
                <Heart className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              </div>
              <span className="text-[13px] sm:text-2xl md:text-3xl font-black text-accent font-title leading-none">100%</span>
              <span className="text-[9px] sm:text-xs md:text-sm text-slate-500 font-medium mt-1 leading-tight">
                enfoque<br className="sm:hidden" /> integral
              </span>
            </div>

            {/* Specialized Professionals */}
            <div className="flex flex-col items-center justify-center text-center px-1 py-2 md:p-3">
              <div className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl text-accent mb-2 md:mb-3">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              </div>
              <span className="text-[9px] sm:text-xs md:text-sm lg:text-base text-slate-600 font-bold max-w-[80px] sm:max-w-[150px] leading-tight">
                Profesionales especializados
              </span>
            </div>

            {/* Sustainable Results */}
            <div className="flex flex-col items-center justify-center text-center px-1 py-2 md:p-3">
              <div className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl text-accent mb-2 md:mb-3">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              </div>
              <span className="text-[9px] sm:text-xs md:text-sm lg:text-base text-slate-600 font-bold max-w-[80px] sm:max-w-[150px] leading-tight">
                Resultados sostenibles
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

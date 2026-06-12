import React from 'react';
import { Apple, Stethoscope, ClipboardList } from 'lucide-react';

const UserHeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 14c1.49-1.46 3-1.03 3 .75 0 2.25-3 4.25-3 4.25s-3-2-3-4.25c0-1.78 1.5-2.21 3-.75Z" />
  </svg>
);

export default function Services() {
  const servicesList = [
    {
      title: 'Nutrición',
      description: 'Planes personalizados adaptados a ti.',
      icon: Apple,
    },
    {
      title: 'Medicina',
      description: 'Evaluación médica y seguimiento profesional.',
      icon: Stethoscope,
    },
    {
      title: 'Evaluación integral',
      description: 'Análisis de composición corporal y metabolismo.',
      icon: ClipboardList,
    },
    {
      title: 'Acompañamiento',
      description: 'Apoyo constante en cada paso de tu proceso.',
      icon: UserHeartIcon,
    },
  ];

  return (
    <section id="servicios" className="w-full py-20 md:py-28 bg-slate-50/50">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
            Atención Integral
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-title font-black text-slate-800 leading-tight tracking-tight mb-4">
            Más que bajar de peso, transformamos tu vida.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Combinamos ciencia, experiencia y acompañamiento para lograr resultados reales y duraderos.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto">
          {servicesList.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <div 
                key={idx}
                className="flex items-start gap-2.5 sm:gap-5 bg-white p-3.5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0 p-1.5 sm:p-3.5 md:p-4 bg-slate-50 rounded-xl text-accent group-hover:bg-accent/10 transition-colors duration-300">
                  <IconComp className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[1.8]" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-[11px] sm:text-base md:text-xl font-bold text-slate-800 mb-0.5 sm:mb-1 group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs md:text-sm text-slate-500 leading-snug sm:leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

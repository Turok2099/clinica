'use client';

import React, { useState } from 'react';
import { MapPin, Building2 } from 'lucide-react';

export default function Location() {
  const [activeBranch, setActiveBranch] = useState<'insurgentes' | 'coyoacan'>('insurgentes');

  const branches = {
    insurgentes: {
      name: 'Sucursal Insurgentes',
      area: 'San José Insurgentes',
      address: 'José María Velasco 104, Int 401, San José Insurgentes, Benito Juárez, 03900 Ciudad de México, CDMX',
      mapUrl: 'https://maps.google.com/maps?q=Jose%20Maria%20Velasco%20104,%20San%20Jose%20Insurgentes,%20Benito%20Juarez,%2003900,%20CDMX&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
    coyoacan: {
      name: 'Sucursal Coyoacán',
      area: 'Campestre Churubusco',
      address: 'Calzada de Miramontes 1714, Campestre Churubusco, C.P. 04200, Alcaldía Coyoacán, Ciudad de México, CDMX',
      mapUrl: 'https://maps.google.com/maps?q=Calzada%20de%20Miramontes%201714,%20Campestre%20Churubusco,%20Coyoacan,%2004200,%20CDMX&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
  };

  const currentBranch = branches[activeBranch];

  return (
    <section className="bg-slate-50 py-24 px-6 md:px-12 xl:px-24">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-slate-900 text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Nuestras Clínicas CIP
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Visítanos en cualquiera de nuestras sucursales con instalaciones de primer nivel, diseñadas para brindarte la mejor atención médica en un ambiente seguro y profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-xl shadow-slate-200/50">
          
          {/* Info Column (spans 2) */}
          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-start space-y-6 relative z-10 bg-white border-r border-slate-50">
            
            <div className="flex items-center gap-3 text-slate-900 font-bold text-xl mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              Selecciona una Clínica
            </div>

            <div className="space-y-4">
              {/* Branch Tab 1: Insurgentes */}
              <button
                onClick={() => setActiveBranch('insurgentes')}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeBranch === 'insurgentes'
                    ? 'bg-accent/5 border-accent shadow-md shadow-accent/5'
                    : 'bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-black text-sm uppercase tracking-wider ${
                    activeBranch === 'insurgentes' ? 'text-accent' : 'text-slate-400'
                  }`}>
                    Benito Juárez
                  </span>
                  <MapPin className={`w-4 h-4 ${activeBranch === 'insurgentes' ? 'text-accent' : 'text-slate-300'}`} />
                </div>
                <h4 className="text-slate-900 font-bold text-base mb-1">
                  CIP Insurgentes
                </h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  José María Velasco 104, San José Insurgentes
                </p>
              </button>

              {/* Branch Tab 2: Coyoacan */}
              <button
                onClick={() => setActiveBranch('coyoacan')}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeBranch === 'coyoacan'
                    ? 'bg-accent/5 border-accent shadow-md shadow-accent/5'
                    : 'bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-black text-sm uppercase tracking-wider ${
                    activeBranch === 'coyoacan' ? 'text-accent' : 'text-slate-400'
                  }`}>
                    Coyoacán
                  </span>
                  <MapPin className={`w-4 h-4 ${activeBranch === 'coyoacan' ? 'text-accent' : 'text-slate-300'}`} />
                </div>
                <h4 className="text-slate-900 font-bold text-base mb-1">
                  CIP Coyoacán
                </h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  Calzada de Miramontes 1714, Campestre Churubusco
                </p>
              </button>
            </div>

            {/* Display selected address detail */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Dirección Completa
              </span>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {currentBranch.address}
              </p>
            </div>

          </div>

          {/* Map Column (spans 3) */}
          <div className="lg:col-span-3 min-h-[450px] relative w-full h-full">
            <div className="absolute inset-0 border-l border-slate-100 pointer-events-none z-10 hidden lg:block" />
            <iframe 
              src={currentBranch.mapUrl} 
              className="absolute inset-0 w-full h-full border-0 grayscale-[15%] contrast-[1.05]" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function Location() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 xl:px-24">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-slate-900 text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Nuestra Clínica
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Visítanos en instalaciones de primer nivel, diseñadas para brindarte la mejor atención médica en un ambiente seguro y profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50">
          
          {/* Info Column (spans 2) */}
          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center space-y-10 relative z-10 bg-slate-50">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-xl mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                Dirección
              </div>
              <p className="text-slate-600 leading-relaxed font-medium pl-13">
                José María Velasco 104, Int 401<br />
                San José Insurgentes, Benito Juárez<br />
                03900 Ciudad de México, CDMX
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-xl mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                Horario de Atención
              </div>
              <p className="text-slate-600 leading-relaxed font-medium pl-13">
                Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                Sábado: 9:00 AM - 2:00 PM<br />
                Domingo: Cerrado
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-xl mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                Contacto
              </div>
              <p className="text-slate-600 leading-relaxed font-medium pl-13">
                Agendamos citas directamente vía WhatsApp para tu mayor comodidad.
              </p>
            </div>

          </div>

          {/* Map Column (spans 3) */}
          <div className="lg:col-span-3 min-h-[450px] relative w-full h-full">
            {/* Overlay sutil para oscurecer ligeramente el mapa en los bordes y combinar con el diseño */}
            <div className="absolute inset-0 border-l border-slate-100 pointer-events-none z-10 hidden lg:block" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.1359042285335!2d-99.183469!3d19.3632672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff8c62505769%3A0x27b714728617bba5!2sJos%C3%A9%20Mar%C3%ADa%20Velasco%20104-int%20401%2C%20San%20Jos%C3%A9%20Insurgentes%2C%20Benito%20Ju%C3%A1rez%2C%2003900%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1779242056004!5m2!1ses!2smx" 
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

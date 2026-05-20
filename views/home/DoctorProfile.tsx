import React from 'react';
import Image from 'next/image';
import { Lightbulb, Stethoscope, Globe, ArrowRight } from 'lucide-react';

export default function DoctorProfile() {
  return (
    <section className="bg-slate-50 py-24 px-6 md:px-12 xl:px-24 border-b border-slate-200">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda: Imagen del Especialista */}
        <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 bg-slate-200 ring-1 ring-slate-100">
          <div className="absolute inset-0 bg-slate-900/5 z-10 pointer-events-none" />
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/f_auto,q_auto:eco/v1779237301/dr_jose_miguel_h4ghdh.jpg" 
            alt="Dr. Jose Miguel Torres Vista - Especialista en Control Metabólico"
            fill
            priority
            unoptimized
            crossOrigin="anonymous"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />
          {/* Badge con el nombre del doctor sobre la foto (opcional pero elegante) */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg z-20">
            <p className="text-lg font-bold text-slate-900">Dr. Jose Miguel Torres Vista</p>
            <p className="text-sm font-medium text-slate-500">Médico Especialista & Cirujano</p>
          </div>
        </div>

        {/* Columna Derecha: Información de Autoridad (E-E-A-T) */}
        <div className="flex flex-col justify-center text-left">
          {/* Subtítulo con el Verde Acento */}
          <span className="text-accent font-extrabold text-sm uppercase tracking-widest mb-3">
            Respaldado por la Ciencia y la Experiencia
          </span>
          
          <h2 className="text-slate-900 text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Conoce al Especialista Detrás de tu Protocolo
          </h2>

          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
            La pérdida de peso médica no se trata de seguir una tendencia, sino de entender la biología profunda de tu cuerpo. Nuestro especialista combina décadas de excelencia clínica con una trayectoria directa en la investigación y desarrollo de terapias metabólicas de última generación.
          </p>

          {/* Bloques de Datos Clave */}
          <div className="space-y-8 mb-10">
            
            {/* Hito 1: Eli Lilly y GLP-1/GIP */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-sm">
                <Lightbulb className="w-6 h-6 text-accent" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">
                  Pionero en Ciencia Metabólica (GLP-1 y GIP)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  16 años de trayectoria en el área médica de Diabetes y alteraciones metabólicas dentro de <span className="font-bold text-slate-900">Eli Lilly</span>, liderando el entendimiento de las terapias hormonales avanzadas.
                </p>
              </div>
            </div>

            {/* Hito 2: Cirugía General */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-sm">
                <Stethoscope className="w-6 h-6 text-accent" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">
                  Excelencia Clínica y Quirúrgica
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Médico con especialidad en <span className="font-bold text-slate-900">Cirugía General</span> con una sólida trayectoria de 45 años de práctica médica e intervenciones de alta fidelidad.
                </p>
              </div>
            </div>

            {/* Hito 3: Afiliaciones */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-sm">
                <Globe className="w-6 h-6 text-accent" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">
                  Afiliaciones Científicas Activas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Miembro destacado de los colegios médicos más importantes del país: <span className="font-bold text-slate-900">AMNE</span>, <span className="font-bold text-slate-900">AMCG</span> y la <span className="font-bold text-slate-900">SMCE</span>.
                </p>
              </div>
            </div>

          </div>

          {/* CTA de Conversión */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-[11px] italic mb-6 font-medium">
              * Cédula Profesional: 444748. Ejercicio médico regulado y certificado.
            </p>
            <button className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-slate-900 font-extrabold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-accent/25 hover:-translate-y-1 hover:shadow-accent/40 w-full sm:w-auto text-center gap-2 cursor-pointer">
              Agendar Consulta de Evaluación
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

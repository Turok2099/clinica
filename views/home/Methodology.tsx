import React from 'react';
import { Microscope, Activity, HeartPulse, ArrowRight } from 'lucide-react';

export default function Methodology() {
  return (
    <section className="w-full py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-6">
            Por qué las dietas fallan y la <span className="text-accent">ciencia médica</span> funciona.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            No es falta de voluntad. Nuestro protocolo aborda el sobrepeso desde su origen hormonal y metabólico, combinando terapias avanzadas de última generación con supervisión clínica continua.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Pillar 1 */}
          <div className="flex flex-col bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Microscope className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">
              Diagnóstico Biológico y de Receptores
            </h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong className="text-slate-800">De qué trata:</strong> Antes de cualquier tratamiento, el especialista analiza tu perfil endocrino, niveles de insulina y hormonas del hambre.
              </p>
              <p>
                <strong className="text-slate-800">Por qué importa:</strong> No todos los metabolismos responden igual. Identificamos exactamente qué moduladores necesita tu cuerpo.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Activity className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4 relative z-10">
              Regulación Hormonal Avanzada
            </h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed relative z-10">
              <p>
                <strong className="text-slate-800">De qué trata:</strong> Aquí es donde entra la ciencia de vanguardia. Ajustamos y titulamos la dosificación de terapias médicas para silenciar el "hambre cerebral" y estabilizar la glucosa.
              </p>
              <p>
                <strong className="text-slate-800">Por qué importa:</strong> La medicina es solo el vehículo; la pericia del médico para dosificarla sin efectos secundarios es la clave del éxito.
              </p>
            </div>
            
            {/* Subtle compliance note */}
            <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
              <p className="text-[11px] text-slate-400 font-medium leading-tight">
                * Utilizamos exclusivamente terapias reguladas internacionalmente (como agonistas de receptores GLP-1 y GIP) bajo estricto criterio y prescripción médica.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <HeartPulse className="w-7 h-7 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">
              Reprogramación de Estilo de Vida
            </h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong className="text-slate-800">De qué trata:</strong> Monitoreo médico y acompañamiento para asegurar que la pérdida de peso provenga de tejido graso, protegiendo tu masa muscular.
              </p>
              <p>
                <strong className="text-slate-800">Por qué importa:</strong> Diseñamos la estrategia de salida para que los resultados sean permanentes y no dependas de un tratamiento de por vida.
              </p>
            </div>
          </div>

        </div>

        {/* Micro-CTA Footer */}
        <div className="mt-24 flex flex-col items-center text-center">
          <p className="text-xl font-bold text-[#0F172A] mb-8">
            El protocolo idóneo para ti depende de tu biología. Descúbrelo en 60 segundos.
          </p>
          <button className="px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-1 flex justify-center items-center gap-3 cursor-pointer group">
            Evaluar mi Perfil Metabólico
            <ArrowRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
}

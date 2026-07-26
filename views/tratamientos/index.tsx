import React from 'react';
import Header from '../home/Header';
import Footer from '../home/Footer';
import WhatsAppWidget from '../../components/WhatsAppWidget';
import { Activity, ShieldCheck, Stethoscope, Smartphone, HeartPulse, Shield, UserCheck, Flame } from 'lucide-react';
import Image from 'next/image';

export default function TratamientosView() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-[85px] bg-slate-50 min-h-screen">
        {/* Page Hero */}
        <section className="relative w-full bg-slate-900 py-20 px-6 md:px-12 xl:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image
                src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780806741/Sin_t%C3%ADtulo_800_x_1000_mm_lbknv9.png"
                alt="Nuestros Tratamientos"
                fill
                priority
                unoptimized
                crossOrigin="anonymous"
                className="object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          </div>
          <div className="relative z-10 container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-black text-white mb-6">
              Nuestros <span className="text-accent">Tratamientos</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 font-sans font-light max-w-2xl mx-auto">
              Descubre un enfoque médico, nutricional y tecnológico diseñado para brindarte resultados reales, cuidando cada aspecto de tu salud.
            </p>
          </div>
        </section>

        {/* Treatments Grid */}
        <section className="py-16 md:py-24 px-6 md:px-12 xl:px-24 bg-transparent relative">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Bullet 1 */}
              <div className="group flex flex-col items-start bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Stethoscope className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-title font-bold text-primary mb-4">
                  Optimización Metabólica Avanzada
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementamos tratamientos farmacológicos de última generación basados en <strong>análogos de GLP-1</strong>, diseñados para regular el apetito, mejorar la sensibilidad a la insulina y optimizar el metabolismo de forma segura. Nuestro equipo médico calibra cada tratamiento de manera personalizada, asegurando que tu cuerpo reciba el <em>estímulo biológico adecuado</em> para lograr una pérdida de peso sostenible sin descuidar tu salud integral.
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="group flex flex-col items-start bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                  <ShieldCheck className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-title font-bold text-primary mb-4">
                  Nutrición Estratégica y Bienestar Gastrointestinal
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  El éxito de las terapias incretínicas radica en saber nutrir el cuerpo adecuadamente. Diseñamos planes de alimentación enfocados en un <strong>alto aporte de proteína de calidad</strong> que funciona como un <span className="text-accent font-semibold">escudo protector</span> para tu masa muscular mientras pierdes grasa.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Además, estructuramos tu dieta con pautas específicas para minimizar o prevenir por completo los efectos secundarios comunes (como náuseas o digestión lenta), garantizando una transición cómoda y un cambio de hábitos sin sufrir.
                </p>
              </div>

              {/* Bullet 3 */}
              <div className="group flex flex-col items-start bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                  <Flame className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-title font-bold text-primary mb-4">
                  Preservación Muscular y Recomposición Corporal
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Perder peso no es solo ver bajar el número en la báscula, es mejorar tu composición corporal. Nos enfocamos en programas de ejercicio adaptados a personas con sobrepeso, priorizando el entrenamiento de fuerza y la ganancia muscular como un <strong>escudo de tu salud y estética</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Al proteger tu músculo, aceleramos tu metabolismo basal, aumentamos tu energía diaria y evitamos el "efecto rebote", asegurando que te sientas más fuerte y ágil en cada etapa. No es una obligación aburrida, es tu armadura.
                </p>
              </div>

              {/* Bullet 4 */}
              <div className="group flex flex-col items-start bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Smartphone className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-title font-bold text-primary mb-4">
                  Monitoreo Continuo y Red de Especialistas
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Nunca estarás solo en este proceso. A través de nuestra plataforma web, tendrás acceso a un sistema inteligente de <strong className="text-primary">recordatorios automatizados</strong> para la aplicación de tu tratamiento, resolviendo el problema de las dosis olvidadas y asegurando la adherencia médica.
                </p>
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 mt-2">
                  <UserCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm text-slate-700 font-medium">
                    Contamos con un sistema de canalización directa a un clic: si tu cuerpo o tu mente necesitan un ajuste, te conectamos de inmediato con los especialistas médicos, nutricionales o de salud mental adecuados para ti.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="bg-primary py-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-title font-bold text-white mb-6">
              Inicia tu transformación integral hoy mismo
            </h2>
            <p className="text-slate-200 text-lg mb-10 max-w-2xl mx-auto">
              Nuestro equipo de especialistas está listo para guiarte en cada paso. Agenda tu primera consulta y descubre cómo el acompañamiento adecuado hace toda la diferencia.
            </p>
            <a
              href="https://wa.me/525662980178?text=Hola,%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20tratamientos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent-hover/30 transition-all duration-300 hover:-translate-y-1 gap-2"
            >
              Contactar Especialista
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

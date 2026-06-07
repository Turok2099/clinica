import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300 pt-20 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-6 text-left">
            <a
              href="#"
              className="inline-flex items-center bg-white px-5 py-2.5 rounded-2xl shadow-md border border-slate-100/50 hover:scale-[1.02] transition-transform duration-200 w-fit"
            >
              <Image
                src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780796434/logotransparente_izk2q7.png"
                alt="CIP - Clínica Integral del Peso"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </a>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              CIP es una clínica médica especializada en el control metabólico y
              la pérdida de peso mediante protocolos clínicos avanzados y
              acompañamiento personalizado bajo la supervisión directa del Dr.
              Jose Miguel Torres Vista.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  Nuestro Método
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  Contacto / Agendar
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Contacto Directo
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  José María Velasco 104, Int 401, San José Insurgentes, Benito
                  Juárez, 03900 CDMX
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+525512345678"
                  className="hover:text-accent transition-colors"
                >
                  +52 (55) 1234 5678
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:contacto@cipmetabolico.com"
                  className="hover:text-accent transition-colors"
                >
                  contacto@cipmetabolico.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Medical Compliance */}
        <div className="py-12 text-left space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 font-medium leading-relaxed">
            <p className="font-bold text-slate-300 uppercase mb-2">
              Aviso de Responsabilidad Médica:
            </p>
            <p className="mb-3">
              La información provista en este sitio web tiene fines
              estrictamente ilustrativos y educativos. No constituye
              asesoramiento médico, diagnóstico o recomendación de tratamiento.
              El uso de terapias reguladas de control de peso (como agonistas de
              receptores GLP-1/GIP) requiere de una valoración individual,
              prescripción y titulación personalizada por parte de un médico
              especialista certificado. Los resultados del tratamiento pueden
              variar según las características metabólicas particulares de cada
              paciente.
            </p>
          </div>
        </div>

        {/* Copyright & Subfooter */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium pt-4 border-t border-slate-900 gap-4">
          <p>
            © {new Date().getFullYear()} CIP - Clínica Integral del Peso. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Aviso de Privacidad
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import { FileDown, Loader2, Check, BookOpen } from "lucide-react";

export default function ProtocolCTA() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading || isDownloaded) return;

    setIsDownloading(true);

    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);

      // Create a mocked file download
      const element = document.createElement("a");
      const file = new Blob(
        [
          "CIP - Clinica Integral del Peso\n\nEste es un archivo mockup que representa la guia completa del Protocolo Medico de Tratamiento CIP.\nPronto podras descargar el PDF final aqui.",
        ],
        { type: "text/plain" },
      );
      element.href = URL.createObjectURL(file);
      element.download = "Protocolo_Tratamiento_CIP.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Reset success state after 4 seconds
      setTimeout(() => {
        setIsDownloaded(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto animate-fade-in-up">
      <div className="relative bg-gradient-to-br from-slate-900 via-primary to-slate-950 rounded-[2.5rem] p-10 md:p-16 text-left overflow-hidden shadow-2xl shadow-primary/20 border border-slate-800">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-accent rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-accent rounded-full opacity-10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Invitation and CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.25em] text-accent uppercase">
              DESCARGA GRATUITA
            </span>

            <p className="text-3xl md:text-4xl font-title font-extrabold text-white tracking-tight leading-tight">
              Conoce nuestro Protocolo de Tratamiento
            </p>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Te invitamos a descubrir a detalle el método clínico con el que
              ayudamos a nuestros pacientes a recuperar su salud metabólica.
              Descarga nuestra guía completa donde explicamos las fases de
              diagnóstico, el plan de seguimiento y las terapias médicas
              avanzadas que utilizamos.
            </p>

            <div className="pt-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`inline-flex items-center justify-center gap-3 px-8 py-4 ${
                  isDownloaded
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-accent hover:bg-accent/90 text-primary"
                } text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-75 disabled:pointer-events-none group text-sm md:text-base`}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Preparando descarga...</span>
                  </>
                ) : isDownloaded ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span className="text-white">¡Guía Descargada!</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-slate-900">
                      Descargar Protocolo (PDF)
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Visual PDF Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl bg-gradient-to-b from-white to-slate-100 shadow-2xl p-6 border border-slate-200/80 flex flex-col justify-between select-none transform hover:rotate-2 transition-transform duration-500">
              {/* PDF Spine decorative highlight */}
              <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-accent/40 via-accent/15 to-transparent rounded-l-2xl"></div>

              {/* PDF Book Design */}
              <div className="space-y-4 pl-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black text-accent tracking-widest uppercase">
                    METABOLISMO & SALUD
                  </span>
                  <BookOpen className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-2 pt-4">
                  <div className="h-1.5 w-16 bg-slate-300 rounded-full"></div>
                  <p className="text-lg font-title font-black text-slate-800 tracking-tight leading-snug">
                    Protocolo Clínico CIP
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">
                    La guía definitiva para entender tu biología y lograr
                    resultados visibles y permanentes.
                  </p>
                </div>
              </div>

              {/* PDF Footer design */}
              <div className="pl-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-slate-400 tracking-wider">
                  CLÍNICA INTEGRAL DEL PESO
                </span>
                <span className="text-[9px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                  PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

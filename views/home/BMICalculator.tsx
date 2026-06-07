"use client";

import React, { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState(70); // in kg
  const [height, setHeight] = useState(170); // in cm

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBmi = parseFloat(bmi.toFixed(1));

  // Determine BMI category and color
  let category = "";
  let colorClass = "";
  let borderClass = "";
  let bgClass = "";
  let description = "";

  if (bmi < 18.5) {
    category = "Bajo Peso";
    colorClass = "text-blue-500";
    borderClass = "border-blue-200";
    bgClass = "bg-blue-50/50";
    description = "Su peso está por debajo de lo recomendado para su estatura.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Peso Saludable";
    colorClass = "text-emerald-600";
    borderClass = "border-emerald-200";
    bgClass = "bg-emerald-50/50";
    description = "¡Excelente! Se encuentra en un rango de peso saludable.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Sobrepeso";
    colorClass = "text-amber-600";
    borderClass = "border-amber-200";
    bgClass = "bg-amber-50/50";
    description =
      "Rango de sobrepeso. Un plan personalizado puede prevenir riesgos de salud.";
  } else {
    category = "Obesidad";
    colorClass = "text-rose-600";
    borderClass = "border-rose-200";
    bgClass = "bg-rose-50/50";
    description =
      "Rango de obesidad. Le sugerimos agendar una valoración médica integral.";
  }

  // Calculate marker position percentage for the visual bar (range 15 to 35)
  const minBmi = 15;
  const maxBmi = 35;
  const percentage = Math.min(
    Math.max(((bmi - minBmi) / (maxBmi - minBmi)) * 100, 0),
    100,
  );

  return (
    <div className="max-w-5xl mx-auto mb-24 animate-fade-in-up mt-12">
      <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-accent/5 rounded-full opacity-60 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 bg-primary/5 rounded-full opacity-60 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Info and Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
                CALCULADORA DE SALUD
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Calcula tu Índice de Masa Corporal (IMC)
            </h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Tu IMC es solo una parte de la historia, pero un valor mayor a{" "}
              <strong className="text-slate-900">27 kg/m²</strong> puede sugerir
              sobrepeso. Conoce tu resultado y recibe orientación de nuestros
              especialistas.
            </p>

            <div className="space-y-6 pt-4">
              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Peso
                  </label>
                  <span className="text-lg font-black text-primary">
                    {weight}{" "}
                    <span className="text-xs font-medium text-slate-400">
                      kg
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>40 kg</span>
                  <span>100 kg</span>
                  <span>160 kg</span>
                </div>
              </div>

              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Estatura
                  </label>
                  <span className="text-lg font-black text-primary">
                    {height}{" "}
                    <span className="text-xs font-medium text-slate-400">
                      cm
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Result Card */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-3xl p-6 md:p-8 border ${borderClass} ${bgClass} transition-all duration-300 flex flex-col items-center text-center shadow-inner`}
            >
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                Tu IMC calculado
              </span>

              <div className="relative flex items-center justify-center mb-4">
                {/* Big Display Number */}
                <span
                  className={`text-6xl md:text-7xl font-black tracking-tight ${colorClass} transition-colors duration-300`}
                >
                  {roundedBmi}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase ml-2 self-end mb-2">
                  kg/m²
                </span>
              </div>

              <div
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white border ${borderClass} ${colorClass} shadow-sm mb-4 transition-all duration-300`}
              >
                {category}
              </div>

              <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mb-6 max-w-xs h-10 flex items-center justify-center">
                {description}
              </p>

              {/* Visual Progress Bar */}
              <div className="w-full space-y-2 mb-8">
                <div className="h-2.5 w-full bg-slate-200/70 rounded-full relative overflow-hidden">
                  {/* Colored Gradient Track */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-400 opacity-80"></div>
                  {/* Current Position Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-2.5 bg-white border border-slate-700/30 rounded-full -ml-1 transition-all duration-300"
                    style={{ left: `${percentage}%` }}
                  ></div>
                </div>
                {/* Scale Indicators */}
                <div className="flex justify-between text-[9px] text-slate-400 font-bold px-1">
                  <span>Bajo</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>Obeso</span>
                </div>
              </div>

              {/* CTA Link */}
              <a
                href="#contacto"
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-primary hover:bg-accent text-white font-extrabold rounded-2xl shadow-md shadow-primary/10 hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 text-sm cursor-pointer group"
              >
                Recibir Orientación Médica
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

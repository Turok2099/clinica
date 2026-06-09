'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 md:py-6 bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-sm md:absolute md:bg-transparent md:backdrop-blur-none md:border-transparent md:shadow-none transition-all duration-300">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        
        {/* Logo (Top Left) */}
        <a href="/" className="relative w-52 h-12 md:w-56 md:h-12 block">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780796434/logotransparente_izk2q7.png"
            alt="CIP - Clínica Integral del Peso"
            fill
            className="object-contain object-left"
            priority
            unoptimized
          />
        </a>

        {/* Right Nav / Menu Button */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-accent transition-colors">Nuestro Método</a>
            <a href="#" className="hover:text-accent transition-colors">Testimonios</a>
            <a href="#" className="hover:text-accent transition-colors">Clínicas</a>
            <a href="/contacto" className="hover:text-accent transition-colors">Contacto</a>
          </nav>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 md:p-3 bg-white rounded-2xl shadow-md border border-slate-100/50 hover:scale-[1.02] transition-all duration-200 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile/Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[70px] md:top-[85px] right-6 md:right-12 xl:right-24 bg-white shadow-xl rounded-2xl border border-slate-100/50 py-3 flex flex-col w-56 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Nuestro Método
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Testimonios
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Clínicas
          </a>
          <a href="/contacto" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors">
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}

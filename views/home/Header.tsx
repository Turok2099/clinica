'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Initialize status
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 bg-[rgb(234,234,238)]/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300 md:py-3.5">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        
        {/* Logo (Top Left) */}
        <a href="/" className="relative w-64 h-12 md:w-80 md:h-14 block">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780796434/logotransparente_izk2q7.png"
            alt="CIP - Clínica Integral del Peso"
            fill
            className="object-contain object-left scale-110 md:scale-120 origin-left"
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
            <a 
              href="/portal" 
              className="px-4 py-1.5 bg-primary text-white rounded-full hover:bg-primary-hover transition text-xs font-semibold shadow-sm shadow-primary/20"
            >
              Portal Clínico
            </a>
          </nav>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 bg-[rgb(234,234,238)] rounded-full shadow-md border border-slate-200/60 hover:scale-[1.02] transition-all duration-200 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[70px] right-6 bg-[rgb(234,234,238)] shadow-xl rounded-2xl border border-slate-200/60 py-3 flex flex-col w-56 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Nuestro Método
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Testimonios
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Clínicas
          </a>
          <a href="/contacto" className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors border-b border-slate-50/50">
            Contacto
          </a>
          <a href="/portal" className="px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-accent transition-colors font-title">
            Portal Clínico
          </a>
        </div>
      )}
    </header>
  );
}

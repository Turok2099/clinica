'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 border-b border-transparent">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-end">
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#7A6A58] mr-8">
          <a href="#" className="hover:text-[#C8A97E] transition-colors">Nuestro Método</a>
          <a href="#" className="hover:text-[#C8A97E] transition-colors">Testimonios</a>
          <a href="#" className="hover:text-[#C8A97E] transition-colors">Clínicas</a>
        </nav>

        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white rounded-2xl shadow-md border border-[#EBE3D5]/50 hover:scale-[1.02] transition-all duration-200 text-[#5C4D3C] flex items-center justify-center cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Menu className="w-6 h-6 md:w-7 md:h-7" />}
        </button>

      </div>

      {/* Mobile/Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[80px] right-6 md:right-12 xl:right-24 bg-white shadow-xl rounded-2xl border border-[#EBE3D5]/50 py-3 flex flex-col w-56 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#" className="px-6 py-3 text-sm font-bold text-[#7A6A58] hover:bg-[#FDF8F2] hover:text-[#C8A97E] transition-colors border-b border-stone-50/50">
            Nuestro Método
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-[#7A6A58] hover:bg-[#FDF8F2] hover:text-[#C8A97E] transition-colors border-b border-stone-50/50">
            Testimonios
          </a>
          <a href="#" className="px-6 py-3 text-sm font-bold text-[#7A6A58] hover:bg-[#FDF8F2] hover:text-[#C8A97E] transition-colors">
            Clínicas
          </a>
        </div>
      )}
    </header>
  );
}

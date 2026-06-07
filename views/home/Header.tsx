import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 border-b border-transparent">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        <a href="#" className="flex items-center bg-white px-5 py-2.5 rounded-2xl shadow-md border border-slate-100/50 hover:scale-[1.02] transition-transform duration-200">
          <Image
            src="https://res.cloudinary.com/dxbtafe9u/image/upload/v1780796434/logotransparente_izk2q7.png"
            alt="CIP - Clínica Integral del Peso"
            width={180}
            height={60}
            className="h-12 md:h-14 w-auto object-contain"
            priority
            unoptimized
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <a href="#" className="hover:text-accent transition-colors">Nuestro Método</a>
          <a href="#" className="hover:text-accent transition-colors">Testimonios</a>
          <a href="#" className="hover:text-accent transition-colors">Clínicas</a>
        </nav>

      </div>
    </header>
  );
}



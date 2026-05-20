import React from 'react';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 border-b border-transparent">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        <div className="font-anton text-4xl tracking-widest uppercase text-slate-900">
          Body Reset
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <a href="#" className="hover:text-accent transition-colors">Nuestro Método</a>
          <a href="#" className="hover:text-accent transition-colors">Testimonios</a>
          <a href="#" className="hover:text-accent transition-colors">Clínicas</a>
        </nav>

      </div>
    </header>
  );
}



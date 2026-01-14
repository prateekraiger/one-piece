import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black py-24 border-t border-white/5 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-4xl mb-6">🏴‍☠️</div>
        <h2 className="font-serif text-3xl font-bold text-white mb-8 tracking-wider">
          THE ONE PIECE IS REAL
        </h2>
        
        <div className="flex gap-8 text-sm font-bold tracking-widest text-slate-500 uppercase">
          <a href="#" className="hover:text-amber-500 transition-colors">Lore</a>
          <a href="#" className="hover:text-amber-500 transition-colors">World</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Credits</a>
        </div>

        <p className="mt-12 text-slate-700 text-xs max-w-md leading-relaxed">
          This is a tribute project. One Piece and all associated characters, names and indicia are trademarks of &copy; Eiichiro Oda / Shueisha, Toei Animation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
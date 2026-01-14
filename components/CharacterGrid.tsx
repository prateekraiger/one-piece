import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CHARACTERS } from '../constants';

const CharacterGrid: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#080808] py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#080808] to-[#080808]" />

      <div className="container mx-auto relative z-10 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase">Wanted</h2>
            <p className="text-amber-500 font-serif italic text-lg">Dead or Alive</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
             <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">←</button>
             <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">→</button>
          </div>
        </div>

        {/* Native Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CHARACTERS.map((char) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="snap-start group relative h-[600px] w-[350px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-900 border border-white/5 grayscale transition-all duration-500 hover:grayscale-0 hover:border-amber-500/50"
            >
              <img
                src={char.image}
                alt={char.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Poster Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 mix-blend-overlay pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {char.role}
                </p>
                <h3 className="font-serif text-3xl font-black text-white leading-none mb-2 uppercase tracking-tighter">
                  {char.name}
                </h3>
                <p className="text-slate-400 text-xs italic mb-4 font-serif">{char.epithet}</p>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/50 tracking-widest uppercase">Bounty</span>
                  <div className="font-mono text-amber-500 text-lg font-bold tracking-widest">
                    {char.bounty}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="w-12 shrink-0 snap-start" /> {/* Padding spacer */}
        </div>
      </div>
    </section>
  );
};

export default CharacterGrid;

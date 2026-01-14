import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CHARACTERS } from '../constants';

const CharacterGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#080808] via-slate-950 to-[#080808] overflow-hidden"
      style={{ height: '400vh' }} // Extended height for scroll-driven animation
    >
      {/* Sticky container for horizontal scroll effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto relative z-10 px-6 pt-32">
          <div className="mb-16 border-b-2 border-white/10 pb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter uppercase"
            >
              Wanted
            </motion.h2>
            <p className="text-amber-400 font-serif italic text-2xl tracking-wide">Dead or Alive</p>
          </div>

          {/* Horizontal Scroll Container - Driven by vertical scroll */}
          <div className="relative overflow-hidden h-full flex items-center">
            <motion.div
              style={{ x }}
              className="flex gap-10 will-change-transform"
            >
              {CHARACTERS.map((char, idx) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -15 }}
                  className="group relative h-[650px] w-[380px] flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-black border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-700 hover:border-amber-500/70 shadow-2xl hover:shadow-amber-500/30"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-115"
                  />

                  {/* Poster Texture Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                  
                  {/* Wanted Poster Header */}
                  <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/90 to-transparent">
                    <div className="text-center">
                      <span className="text-amber-400 text-xs font-black tracking-[0.3em] uppercase block mb-2 drop-shadow-lg">Wanted</span>
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 w-full p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-amber-400 text-xs font-black tracking-[0.3em] uppercase mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100 drop-shadow-lg">
                      {char.role}
                    </p>
                    <h3 className="font-serif text-4xl font-black text-white leading-none mb-3 uppercase tracking-tighter drop-shadow-2xl">
                      {char.name}
                    </h3>
                    <p className="text-slate-300 text-sm italic mb-6 font-serif opacity-90">"{char.epithet}"</p>

                    <div className="flex flex-col gap-3 p-4 bg-black/60 rounded-lg border border-amber-500/30 backdrop-blur-sm">
                      <span className="text-xs text-amber-400/70 tracking-[0.2em] uppercase font-black">Bounty</span>
                      <div className="font-mono text-amber-400 text-2xl font-black tracking-wide drop-shadow-lg">
                        {char.bounty}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="w-screen shrink-0" /> {/* Spacer for end scroll */}
            </motion.div>
          </div>

          <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-slate-500 text-sm font-light tracking-wide">
            Scroll to explore • Hover for details
          </p>
        </div>
      </div>
    </section>
  );
};

export default CharacterGrid;

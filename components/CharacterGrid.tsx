import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { CHARACTERS } from '../constants';
import { Character } from '../types';

const CharacterDetail: React.FC<{ character: Character; onClose: () => void }> = ({ character, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      <motion.div
         layoutId={`char-card-${character.id}`}
         className="relative w-full h-full flex flex-col md:flex-row overflow-hidden bg-slate-900"
         onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Character Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-black">
          <motion.img
            layoutId={`char-image-${character.id}`}
            src={character.image}
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
        </div>

        {/* Content Panel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 overflow-y-auto">
           <button
             onClick={onClose}
             className="absolute top-8 right-8 text-white/50 hover:text-amber-500 transition-colors z-50 p-2"
           >
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.6 }}
           >
             <div className="flex items-center gap-4 mb-4">
                <span className={`h-px w-12 bg-gradient-to-r ${character.color}`} />
                <span className="text-amber-500 font-mono uppercase tracking-widest text-sm">{character.role}</span>
             </div>

             <h2 className="text-5xl md:text-8xl font-black font-serif text-white mb-2 uppercase tracking-tighter leading-[0.8]">
               {character.name.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
             </h2>
             <p className="text-white/40 text-xl font-serif italic mb-8 tracking-wider">{character.epithet}</p>

             <div className="border-l-4 border-amber-500 pl-6 py-2 mb-10 bg-gradient-to-r from-amber-500/10 to-transparent">
                <p className="text-2xl md:text-3xl text-slate-200 font-serif italic leading-tight">
                  "{character.quote}"
                </p>
             </div>

             <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
               {character.description}
             </p>

             <div className="inline-flex items-center gap-4 bg-white/5 px-6 py-4 rounded-lg border border-white/10">
               <span className="text-white/40 uppercase tracking-widest text-xs">Current Bounty</span>
               <span className="text-amber-400 font-mono text-2xl md:text-3xl font-bold">{character.bounty}</span>
             </div>

           </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CharacterGrid: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedChar, setSelectedChar] = React.useState<Character | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll into horizontal movement
  // Tuned to end perfectly at the last card.
  // -75% is approx optimal for 10 cards * 30vw vs 100vw viewport.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <LayoutGroup>
      <section ref={targetRef} className="relative h-[350vh] bg-[#080808]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#080808] to-[#080808]" />

          {/* Header - Parallax Effect */}
          <motion.div
            style={{ opacity: headerOpacity, scale: headerScale }}
            className="absolute top-12 left-6 z-20 md:top-24 md:left-24 origin-top-left"
          >
             <h2 className="font-serif text-4xl md:text-8xl font-black text-white mb-2 tracking-tight uppercase shadow-black drop-shadow-2xl">Wanted</h2>
             <p className="text-amber-500 font-serif italic text-lg md:text-2xl tracking-widest drop-shadow-lg">Dead or Alive</p>
             <p className="mt-2 text-white/50 text-xs tracking-[0.3em] uppercase">Straw Hat Pirates</p>
          </motion.div>

          {/* Horizontal Moving Container */}
          <motion.div style={{ x }} className="flex gap-12 pl-[40vw] pr-20 items-center relative z-10">
            {CHARACTERS.map((char) => (
              <motion.div
                layoutId={`char-card-${char.id}`}
                key={char.id}
                onClick={() => setSelectedChar(char)}
                className="group relative h-[60vh] w-[80vw] md:w-[30vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-white/5 grayscale transition-all duration-500 hover:grayscale-0 hover:border-amber-500/50 perspective-1000 shadow-2xl shadow-black/50"
                whileHover={{ scale: 1.05, rotateY: 5, zIndex: 10 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  layoutId={`char-image-${char.id}`}
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
                  <h3 className="font-serif text-4xl font-black text-white leading-none mb-2 uppercase tracking-tighter drop-shadow-md">
                    {char.name}
                  </h3>
                  <p className="text-slate-400 text-sm italic mb-4 font-serif">{char.epithet}</p>

                  <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-4">
                    <span className="text-xs text-white/50 tracking-widest uppercase">Bounty</span>
                    <div className="font-mono text-amber-500 text-xl font-bold tracking-widest">
                      {char.bounty}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/10 rounded-full overflow-hidden z-20">
             <motion.div
               style={{ scaleX: scrollYProgress }}
               className="h-full bg-amber-500 origin-left"
             />
          </div>
        </div>

        <AnimatePresence>
          {selectedChar && (
            <CharacterDetail character={selectedChar} onClose={() => setSelectedChar(null)} />
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
};

export default CharacterGrid;

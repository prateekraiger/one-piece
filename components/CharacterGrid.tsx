import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { CHARACTERS } from '../constants';
import { Character } from '../types';
import { useGear5 } from './Gear5Context';

const CharacterDetail: React.FC<{ character: Character; onClose: () => void }> = ({ character, onClose }) => {
  const { isGear5 } = useGear5();
  return (
    <motion.div
      className={`fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-xl ${isGear5 ? 'bg-white/95' : 'bg-black/95'} p-4 md:p-0`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
         <motion.div
           layoutId={`char-card-${character.id}`}
           className={`relative w-full h-full max-w-7xl max-h-[95vh] md:max-h-full flex flex-col md:flex-row overflow-hidden rounded-xl md:rounded-none ${isGear5 ? 'bg-white' : 'bg-black'}`}
           onClick={(e) => e.stopPropagation()}
        >
          {/* Cinematic Character Image */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-black">
             <motion.img
              layoutId={`char-image-${character.id}`}
              src={character.image}
             className="absolute inset-0 w-full h-full object-contain md:object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${isGear5 ? 'from-white via-white/50 to-transparent' : 'to-transparent'} ${isGear5 ? '' : (character.imageOverlay || 'from-slate-900 via-transparent')}`} />
          </div>

        {/* Content Panel */}
        <div className={`relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-20 overflow-y-auto ${isGear5 ? 'bg-white' : `bg-gradient-to-br ${character.bgGradient || 'from-slate-900 to-slate-950'}`}`}>
           <button
             onClick={onClose}
             className={`absolute top-4 right-4 md:top-8 md:right-8 transition-colors z-50 p-2 ${isGear5 ? 'text-slate-400 hover:text-sky-500' : 'text-white/50 hover:text-amber-500'}`}
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-8 md:h-8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.6 }}
           >
             <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className={`h-px w-8 md:w-12 bg-gradient-to-r ${character.color}`} />
                <span className="text-amber-500 font-mono uppercase tracking-widest text-xs md:text-sm">{character.role}</span>
             </div>

             <h2 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black font-serif mb-2 uppercase tracking-tighter leading-[0.8] ${isGear5 ? 'text-sky-900' : 'text-white'}`}>
               {character.name.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
             </h2>
             <p className={`${isGear5 ? 'text-sky-600' : 'text-white/40'} text-base md:text-xl font-serif italic mb-6 md:mb-8 tracking-wider`}>{character.epithet}</p>

             <div className={`border-l-4 pl-4 md:pl-6 py-2 mb-6 md:mb-10 ${isGear5 ? 'border-sky-400 bg-gradient-to-r from-sky-50 to-transparent' : 'border-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent'}`}>
                <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic leading-tight ${isGear5 ? 'text-slate-700' : 'text-slate-200'}`}>
                  "{character.quote}"
                </p>
             </div>

             <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-lg ${isGear5 ? 'text-slate-600' : 'text-slate-400'}`}>
               {character.description}
             </p>

             <div className={`inline-flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-lg border ${isGear5 ? 'bg-white border-sky-100 shadow-lg' : 'bg-white/5 border-white/10'}`}>
               <span className={`uppercase tracking-widest text-[10px] md:text-xs ${isGear5 ? 'text-slate-500' : 'text-white/40'}`}>Current Bounty</span>
               <span className={`font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${isGear5 ? 'text-sky-600' : 'text-amber-400'}`}>{character.bounty}</span>
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
  const { isGear5 } = useGear5();
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
      <section id="wanted" ref={targetRef} className={`relative h-[350vh] transition-colors duration-1000 ${isGear5 ? 'bg-white' : 'bg-[#080808]'}`}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">

          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${isGear5 ? 'from-sky-50 via-white to-white' : 'from-slate-900 via-[#080808] to-[#080808]'}`} />

          {/* Header - Parallax Effect */}
          <motion.div
            style={{ opacity: headerOpacity, scale: headerScale }}
            className="absolute top-8 left-4 z-20 md:top-24 md:left-24 origin-top-left px-4"
          >
             <h2 className={`font-serif text-5xl sm:text-6xl md:text-8xl font-black mb-2 tracking-tight uppercase shadow-black drop-shadow-2xl ${isGear5 ? 'text-sky-900' : 'text-white'}`}>Wanted</h2>
             <p className={`font-serif italic text-base sm:text-lg md:text-2xl tracking-widest drop-shadow-lg ${isGear5 ? 'text-sky-500' : 'text-amber-500'}`}>Dead or Alive</p>
             <p className={`mt-1 md:mt-2 text-[10px] sm:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase ${isGear5 ? 'text-slate-400' : 'text-white/50'}`}>Straw Hat Pirates</p>
          </motion.div>

          {/* Horizontal Moving Container */}
          <motion.div style={{ x }} className="flex gap-6 md:gap-12 pl-[60vw] md:pl-[40vw] pr-10 md:pr-20 items-center relative z-10">
            {CHARACTERS.map((char) => (
              <motion.div
                layoutId={`char-card-${char.id}`}
                key={char.id}
                onClick={() => setSelectedChar(char)}
                className={`group relative h-[55vh] sm:h-[60vh] w-[85vw] sm:w-[70vw] md:w-[30vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border grayscale transition-all duration-500 hover:grayscale-0 perspective-1000 shadow-2xl ${isGear5 ? 'bg-white border-sky-100 hover:border-sky-400 shadow-sky-900/10' : 'bg-slate-900 border-white/5 hover:border-amber-500/50 shadow-black/50'}`}
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
                <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay pointer-events-none ${isGear5 ? 'opacity-10' : 'opacity-20'}`} />

                <div className={`absolute inset-0 transition-opacity ${isGear5 ? 'bg-gradient-to-t from-white via-transparent to-transparent opacity-90 group-hover:opacity-60' : 'bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60'}`} />

                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 ${isGear5 ? 'text-sky-600' : 'text-amber-500'}`}>
                    {char.role}
                  </p>
                  <h3 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-black leading-none mb-2 uppercase tracking-tighter drop-shadow-md ${isGear5 ? 'text-sky-900' : 'text-white'}`}>
                    {char.name}
                  </h3>
                  <p className={`text-xs sm:text-sm italic mb-3 md:mb-4 font-serif ${isGear5 ? 'text-slate-500' : 'text-slate-400'}`}>{char.epithet}</p>

                  <div className={`flex items-center gap-2 md:gap-3 border-t pt-3 md:pt-4 mt-3 md:mt-4 ${isGear5 ? 'border-sky-900/10' : 'border-white/10'}`}>
                    <span className={`text-[10px] sm:text-xs tracking-widest uppercase ${isGear5 ? 'text-slate-400' : 'text-white/50'}`}>Bounty</span>
                    <div className={`font-mono text-base sm:text-lg md:text-xl font-bold tracking-widest ${isGear5 ? 'text-sky-600' : 'text-amber-500'}`}>
                      {char.bounty}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className={`absolute bottom-6 md:bottom-10 left-4 right-4 md:left-10 md:right-10 h-1 rounded-full overflow-hidden z-20 ${isGear5 ? 'bg-sky-100' : 'bg-white/10'}`}>
             <motion.div
               style={{ scaleX: scrollYProgress }}
               className={`h-full origin-left ${isGear5 ? 'bg-sky-500' : 'bg-amber-500'}`}
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

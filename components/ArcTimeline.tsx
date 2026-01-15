import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'framer-motion';
import { ARCS } from '../constants';
import { Arc } from '../types';
import GrandLineMap from './GrandLineMap';
import { useGear5 } from './Gear5Context';

const ArcCard: React.FC<{ arc: Arc; index: number; onSelect: (arc: Arc) => void }> = ({ arc, index, onSelect }) => {
  const { isGear5 } = useGear5();
  return (
    <motion.div
      layoutId={`card-${arc.id}`}
      onClick={() => onSelect(arc)}
      className={`group relative h-[55vh] md:h-[60vh] w-[85vw] md:w-[38vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl perspective-1000 shadow-2xl transition-all duration-500 ${isGear5 ? 'hover:shadow-sky-500/30' : 'hover:shadow-amber-500/20'}`}
      whileHover={{ scale: 1.03, y: -10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isGear5 ? 'from-sky-100 to-white' : arc.color} ${isGear5 ? 'opacity-90' : 'opacity-30'} group-hover:opacity-50 transition-opacity duration-700 ${isGear5 ? '' : 'mix-blend-overlay'}`} />

      <div className={`relative h-full w-full overflow-hidden border-2 bg-black/60 backdrop-blur-sm transition-all duration-500 ${isGear5 ? 'border-sky-200 bg-white/10 group-hover:border-sky-500/50' : 'border-white/10 group-hover:border-amber-500/70'}`}>
        <motion.img
          layoutId={`image-${arc.id}`}
          src={arc.image}
          alt={arc.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isGear5 ? 'bg-gradient-to-t from-white/90 via-white/40 to-transparent' : 'bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70'}`} />

        <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <motion.div layoutId={`content-${arc.id}`}>
             <div className="flex items-center gap-4 mb-3 overflow-hidden">
                <span className={`${isGear5 ? 'text-sky-600' : 'text-amber-400'} text-xs font-black tracking-[0.3em] uppercase shrink-0 drop-shadow-lg`}>Chapter {String(index + 1).padStart(2, '0')}</span>
                <div className={`h-[2px] w-full bg-gradient-to-r transition-colors ${isGear5 ? 'from-sky-500 to-transparent' : 'from-amber-500 to-transparent group-hover:from-amber-400'}`} />
             </div>

             <h2 className={`font-serif text-4xl md:text-6xl font-black mb-3 leading-none tracking-tighter drop-shadow-2xl ${isGear5 ? 'text-sky-900' : 'text-white'}`}>{arc.title}</h2>
             <p className={`text-sm md:text-lg line-clamp-2 md:line-clamp-3 max-w-lg transition-colors delay-75 font-light leading-relaxed ${isGear5 ? 'text-slate-600 group-hover:text-slate-800' : 'text-slate-300 group-hover:text-white'}`}>
               {arc.description}
             </p>

             <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                <span className={`text-xs font-black uppercase tracking-[0.2em] drop-shadow-lg ${isGear5 ? 'text-sky-600' : 'text-amber-400'}`}>Explore Arc</span>
                <span className={`text-2xl group-hover:translate-x-3 transition-transform duration-300 drop-shadow-lg ${isGear5 ? 'text-sky-600' : 'text-amber-400'}`}>→</span>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ArcDetail: React.FC<{ arc: Arc; onClose: () => void }> = ({ arc, onClose }) => {
  const { isGear5 } = useGear5();
  return (
    <motion.div
      className={`fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-2xl ${isGear5 ? 'bg-white/90' : 'bg-black/98'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${arc.id}`}
        className="relative w-full h-full overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Header Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <motion.img
            layoutId={`image-${arc.id}`}
            src={arc.image}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${isGear5 ? 'from-white via-white/40 to-transparent' : 'from-black via-black/40 to-transparent'}`} />
        </div>

        {/* Content Section */}
        <div className={`relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 overflow-y-auto ${isGear5 ? 'bg-white' : 'bg-black'}`}>
           <button
             onClick={onClose}
             className={`absolute top-8 right-8 transition-colors z-50 p-3 rounded-full ${isGear5 ? 'text-slate-400 hover:text-sky-500 hover:bg-sky-50' : 'text-white/50 hover:text-amber-400 hover:bg-white/10'}`}
           >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>

           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
           >
             <div className="flex items-center gap-4 mb-6">
               <span className={`h-[2px] w-16 ${isGear5 ? 'bg-sky-500' : 'bg-amber-500'}`} />
               <h3 className={`font-serif text-xl md:text-2xl italic font-semibold ${isGear5 ? 'text-sky-600' : 'text-amber-400'}`}>{arc.jpTitle}</h3>
             </div>

             <h1 className={`font-serif text-5xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter ${isGear5 ? 'text-sky-900' : 'text-white'}`}>
               {arc.title.split(' ').map((word, i) => (
                 <span key={i} className="block">{word}</span>
               ))}
             </h1>

             <blockquote className={`text-xl md:text-3xl font-serif italic border-l-4 pl-8 py-3 mb-12 leading-relaxed ${isGear5 ? 'text-slate-600 border-sky-400' : 'text-slate-200 border-amber-500'}`}>
               "{arc.quote}"
             </blockquote>

             <p className={`text-lg leading-relaxed mb-12 max-w-xl font-light ${isGear5 ? 'text-slate-600' : 'text-slate-300'}`}>
               {arc.description} The impact of this arc on the Grand Line was monumental, shaping the era that followed.
             </p>

           </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArcTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
  const { isGear5 } = useGear5();

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll into horizontal movement
  // Tuned to end perfectly at the last card.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85%']);

  // Parallax Header Transforms
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <LayoutGroup>
      {/* GRAND LINE MAP TRACKER */}
      <GrandLineMap progress={scrollYProgress} />

      <section
        ref={sectionRef}
        className={`relative h-[350vh] transition-colors duration-1000 ${isGear5 ? 'bg-white' : 'bg-[#080808]'}`} // Matched height and seamless background
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">

          {/* Background Elements - Subtle Atmosphere */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className={`voyage-bg-layer absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${isGear5 ? 'from-sky-50 via-white to-white' : 'from-slate-900/40 via-[#080808] to-[#080808]'}`} />
             <div className={`absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse ${isGear5 ? 'bg-sky-200/20' : 'bg-blue-600/5'}`} />
             <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse ${isGear5 ? 'bg-purple-200/20' : 'bg-purple-600/5'}`} style={{ animationDelay: '1s' }} />
          </div>

          {/* Parallax Header - Fades out to let cards take focus */}
          <motion.div
            style={{ opacity: headerOpacity, scale: headerScale, y: headerY }}
            className="absolute top-24 left-6 md:left-20 z-20 origin-top-left pointer-events-none"
          >
             <div className={`mb-2 border-b-2 pb-4 inline-block pr-12 ${isGear5 ? 'border-sky-400/30' : 'border-amber-500/30'}`}>
               <h2 className={`text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase mb-2 drop-shadow-2xl ${isGear5 ? 'text-sky-900' : 'text-white'}`}>
                 The Voyage Log
               </h2>
               <p className={`font-serif italic text-2xl tracking-wide ${isGear5 ? 'text-sky-500' : 'text-amber-500'}`}>
                 Chronicles of the Grand Line
               </p>
             </div>
             <p className={`text-sm font-mono tracking-widest uppercase mt-4 ${isGear5 ? 'text-sky-900/50' : 'text-slate-500'}`}>
               Scroll to explore the journey
             </p>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <motion.div
            style={{ x }}
            className="flex gap-10 pl-[50vw] md:pl-[40vw] pr-20 items-center relative z-10 will-change-transform"
          >
            {ARCS.map((arc, index) => (
              <ArcCard
                key={arc.id}
                arc={arc}
                index={index}
                onSelect={setSelectedArc}
              />
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className={`absolute bottom-10 left-10 right-10 h-1 rounded-full overflow-hidden z-20 ${isGear5 ? 'bg-sky-100' : 'bg-white/5'}`}>
             <motion.div
               style={{ scaleX: scrollYProgress }}
               className={`h-full origin-left ${isGear5 ? 'bg-sky-500' : 'bg-amber-500/50'}`}
             />
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selectedArc && (
          <ArcDetail arc={selectedArc} onClose={() => setSelectedArc(null)} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default ArcTimeline;

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'framer-motion';
import { ARCS } from '../constants';
import { Arc } from '../types';

const ArcCard: React.FC<{ arc: Arc; index: number; onSelect: (arc: Arc) => void }> = ({ arc, index, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-${arc.id}`}
      onClick={() => onSelect(arc)}
      className="group relative h-[65vh] md:h-[75vh] w-[85vw] md:w-[45vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl perspective-1000 shadow-2xl hover:shadow-amber-500/20"
      whileHover={{ scale: 1.03, y: -10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${arc.color} opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-overlay`} />

      <div className="relative h-full w-full overflow-hidden border-2 border-white/10 bg-black/60 backdrop-blur-sm group-hover:border-amber-500/70 transition-all duration-500">
        <motion.img
          layoutId={`image-${arc.id}`}
          src={arc.image}
          alt={arc.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <motion.div layoutId={`content-${arc.id}`}>
             <div className="flex items-center gap-4 mb-3 overflow-hidden">
                <span className="text-amber-400 text-xs font-black tracking-[0.3em] uppercase shrink-0 drop-shadow-lg">Chapter {String(index + 1).padStart(2, '0')}</span>
                <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 to-transparent group-hover:from-amber-400 transition-colors" />
             </div>

             <h2 className="font-serif text-4xl md:text-6xl font-black text-white mb-3 leading-none tracking-tighter drop-shadow-2xl">{arc.title}</h2>
             <p className="text-slate-300 text-sm md:text-lg line-clamp-2 md:line-clamp-3 max-w-lg group-hover:text-white transition-colors delay-75 font-light leading-relaxed">
               {arc.description}
             </p>

             <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 drop-shadow-lg">Explore Arc</span>
                <span className="text-2xl text-amber-400 group-hover:translate-x-3 transition-transform duration-300 drop-shadow-lg">→</span>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ArcDetail: React.FC<{ arc: Arc; onClose: () => void }> = ({ arc, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/98 backdrop-blur-2xl"
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
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 bg-black overflow-y-auto">
           <button
             onClick={onClose}
             className="absolute top-8 right-8 text-white/50 hover:text-amber-400 transition-colors z-50 p-3 rounded-full hover:bg-white/10"
           >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>

           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
           >
             <div className="flex items-center gap-4 mb-6">
               <span className="h-[2px] w-16 bg-amber-500" />
               <h3 className="font-serif text-amber-400 text-xl md:text-2xl italic font-semibold">{arc.jpTitle}</h3>
             </div>

             <h1 className="font-serif text-5xl md:text-8xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
               {arc.title.split(' ').map((word, i) => (
                 <span key={i} className="block">{word}</span>
               ))}
             </h1>

             <blockquote className="text-xl md:text-3xl text-slate-200 font-serif italic border-l-4 border-amber-500 pl-8 py-3 mb-12 leading-relaxed">
               "{arc.quote}"
             </blockquote>

             <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-xl font-light">
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

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  // Transform scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]); // Adjusted end point
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]); // Fade out instruction faster

  return (
    <LayoutGroup>
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-b from-ocean-black via-slate-950 to-ocean-black overflow-hidden"
        style={{ height: '300vh' }} // Extended height for scroll-driven animation
      >

        {/* Sticky container for horizontal scroll effect */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 pt-32 relative z-10">
            <div className="mb-16 border-b-2 border-white/10 pb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter mb-4 uppercase"
              >
                The Voyage Log
              </motion.h2>
              <p className="text-amber-400 font-serif italic text-2xl tracking-wide">Chronicles of the Grand Line</p>
            </div>
          </div>

          {/* Horizontal Scroll Container - Driven by vertical scroll */}
          <div className="relative overflow-hidden h-full flex items-center">
            <motion.div
              ref={scrollContainerRef}
              style={{ x }}
              className="flex gap-10 px-6 md:px-16 will-change-transform"
            >
              {ARCS.map((arc, index) => (
                <ArcCard
                  key={arc.id}
                  arc={arc}
                  index={index}
                  onSelect={setSelectedArc}
                />
              ))}
              <div className="w-screen shrink-0" /> {/* Spacer for end scroll */}
            </motion.div>
          </div>

          <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-slate-500 text-sm font-light tracking-wide">
            Scroll to explore • Click to view details
          </p>
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

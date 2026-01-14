import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup, useSpring } from 'framer-motion';
import { ARCS } from '../constants';
import { Arc } from '../types';

const ArcCard: React.FC<{ arc: Arc; index: number; onSelect: (arc: Arc) => void }> = ({ arc, index, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-${arc.id}`}
      onClick={() => onSelect(arc)}
      className="group relative h-[60vh] md:h-[70vh] w-[80vw] md:w-[40vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl mx-4 md:mx-8 first:ml-0 last:mr-0 perspective-1000"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${arc.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

      <div className="relative h-full w-full overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-md group-hover:border-amber-500/50 transition-colors duration-500">
        <motion.img
          layoutId={`image-${arc.id}`}
          src={arc.image}
          alt={arc.title}
          className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <motion.div layoutId={`content-${arc.id}`}>
             <div className="flex items-center gap-4 mb-2 overflow-hidden">
                <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase shrink-0">Log {String(index + 1).padStart(2, '0')}</span>
                <div className="h-[1px] w-full bg-white/20 group-hover:bg-amber-500 transition-colors" />
             </div>

             <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2 leading-none tracking-tight">{arc.title}</h2>
             <p className="text-slate-400 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-md group-hover:text-slate-200 transition-colors delay-75">
               {arc.description}
             </p>

             <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Read Log</span>
                <span className="text-xl text-amber-500 group-hover:translate-x-2 transition-transform">→</span>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ArcDetail: React.FC<{ arc: Arc; onClose: () => void }> = ({ arc, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        layoutId={`card-${arc.id}`}
        className="relative w-full h-full overflow-hidden flex flex-col md:flex-row"
      >
        {/* Cinematic Header Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <motion.img
            layoutId={`image-${arc.id}`}
            src={arc.image}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Section */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 bg-black">
           <button
             onClick={onClose}
             className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>

           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
           >
             <div className="flex items-center gap-4 mb-6">
               <span className="h-[1px] w-12 bg-amber-500" />
               <h3 className="font-serif text-amber-500 text-lg md:text-xl italic">{arc.jpTitle}</h3>
             </div>

             <h1 className="font-serif text-4xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
               {arc.title.split(' ').map((word, i) => (
                 <span key={i} className="block">{word}</span>
               ))}
             </h1>

             <blockquote className="text-lg md:text-2xl text-slate-300 font-serif italic border-l-2 border-amber-500 pl-6 py-2 mb-10 leading-relaxed">
               "{arc.quote}"
             </blockquote>

             <p className="text-slate-400 leading-relaxed mb-12 max-w-xl">
               {arc.description} The impact of this arc on the Grand Line was monumental, shaping the era that followed.
             </p>

           </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArcTimeline: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  // Smooth out the spring animation for the title
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <LayoutGroup>
      <section ref={targetRef} className="relative h-[400vh] bg-ocean-black">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">

          {/* Background Elements */}
          <div className="absolute inset-0 bg-ocean-black pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
          </div>

          <motion.div
            style={{ y: titleY, opacity }}
            className="absolute top-20 z-10 text-center"
          >
            <h2 className="text-5xl md:text-8xl font-serif font-black text-white tracking-tight mb-4">THE VOYAGE LOG</h2>
            <p className="text-amber-500 font-serif italic text-xl tracking-widest">Scroll to Traverse History</p>
          </motion.div>

          <motion.div style={{ x }} className="flex gap-4 px-20 relative z-20 items-center h-full">
            {ARCS.map((arc, index) => (
              <ArcCard
                key={arc.id}
                arc={arc}
                index={index}
                onSelect={setSelectedArc}
              />
            ))}
          </motion.div>

          {/* Scroll Progress Bar */}
          <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div
               style={{ scaleX: scrollYProgress }}
               className="h-full bg-amber-500 origin-left"
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

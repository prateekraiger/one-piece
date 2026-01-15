import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGear5 } from './Gear5Context';
import { ARCS } from '../constants';

const MemoriesGallery: React.FC = () => {
  const { isGear5 } = useGear5();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, scale }}
      className={`relative min-h-screen py-20 md:py-32 px-4 md:px-8 transition-all duration-700 ${
        isGear5 
          ? 'bg-gradient-to-b from-sky-50 via-white to-sky-50' 
          : 'bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]'
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-5 transition-opacity duration-700 ${
        isGear5 ? 'opacity-10' : 'opacity-5'
      }`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5OTk5OTkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNNiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`inline-block mb-4 px-6 py-2 rounded-full transition-all duration-700 ${
              isGear5 
                ? 'bg-sky-100 border-2 border-sky-300' 
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <span className={`text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-700 ${
              isGear5 ? 'text-sky-700' : 'text-amber-400'
            }`}>
              Treasured Moments
            </span>
          </motion.div>
          
          <h2 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-colors duration-700 ${
            isGear5 
              ? 'text-sky-900 drop-shadow-[0_2px_10px_rgba(3,105,161,0.3)]' 
              : 'text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]'
          }`}>
            Memories of the Journey
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-light transition-colors duration-700 ${
            isGear5 ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Every arc, every battle, every laugh shared – these are the treasures we carry forward
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ARCS.map((arc, index) => (
            <motion.div
              key={arc.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${
                isGear5 
                  ? 'bg-white border-2 border-sky-200 shadow-xl hover:shadow-2xl hover:border-sky-400' 
                  : 'bg-slate-900/50 border border-white/10 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50'
              }`}>
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={arc.image} 
                    alt={arc.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 transition-all duration-700 ${
                    isGear5
                      ? 'bg-gradient-to-t from-white via-transparent to-transparent opacity-60 group-hover:opacity-40'
                      : 'bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60'
                  }`} />

                  {/* Japanese Title */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-sm font-serif transition-colors duration-700 ${
                      isGear5 ? 'text-sky-700' : 'text-amber-400'
                    }`}>
                      {arc.jpTitle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`font-serif text-2xl font-bold mb-3 transition-colors duration-700 ${
                    isGear5 ? 'text-sky-900' : 'text-white'
                  }`}>
                    {arc.title}
                  </h3>
                  
                  <p className={`text-sm md:text-base leading-relaxed mb-4 transition-colors duration-700 ${
                    isGear5 ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {arc.description}
                  </p>

                  {/* Quote */}
                  <div className={`pt-4 border-t transition-colors duration-700 ${
                    isGear5 ? 'border-sky-200' : 'border-white/10'
                  }`}>
                    <p className={`text-sm italic font-serif transition-colors duration-700 ${
                      isGear5 ? 'text-sky-700' : 'text-amber-400'
                    }`}>
                      "{arc.quote}"
                    </p>
                  </div>
                </div>

                {/* Hover Accent */}
                <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isGear5
                    ? 'bg-gradient-to-br from-sky-400/10 via-transparent to-amber-400/10'
                    : 'bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/10'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1">
        <motion.div 
          className={`w-full h-full rounded-full transition-all duration-700 ${
            isGear5 
              ? 'bg-gradient-to-r from-transparent via-sky-400 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-amber-500 to-transparent'
          }`}
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.section>
  );
};

export default MemoriesGallery;

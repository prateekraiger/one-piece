import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tornado, Flame, Zap } from 'lucide-react';
import { useGear5 } from './Gear5Context';

const FRUIT_TYPES = [
  {
    id: 'paramecia',
    name: 'Gomu Gomu no Mi',
    kanji: 'ゴムゴムの実',
    desc: 'The power of infinite elasticity. A body that can stretch, expand, and bounce back from anything. The most ridiculous power in the world.',
    icon: Tornado,
    image: '/images/paramecia-fruit.png',
    color: 'from-purple-600 to-indigo-900',
    accent: '#a855f7' // Purple 500
  },
  {
    id: 'zoan',
    name: 'Hito Hito no Mi, Model: Nika',
    kanji: 'ヒトヒトの実',
    desc: 'The Warrior of Liberation. It grants the user a rubber body and brings a smile to the hearts of the people. The power appears only when the drums beat.',
    icon: Zap,
    image: '/images/zoan-fruit.png',
    color: 'from-slate-200 to-slate-500',
    accent: '#ffffff' // White
  },
  {
    id: 'logia',
    name: 'Mera Mera no Mi',
    kanji: 'メラメラの実',
    desc: 'The power of fire. Intangible destruction. To become the element itself is to transcend the physical realm.',
    icon: Flame,
    image: '/images/logia-fruit.png',
    color: 'from-orange-500 to-red-800',
    accent: '#f97316' // Orange 500
  }
];

const DevilFruitSection: React.FC = () => {
  const { isGear5 } = useGear5();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFruit, setSelectedFruit] = React.useState<string | null>(null);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={containerRef}
      id="devil-fruits"
      className={`relative py-32 overflow-hidden transition-colors duration-1000 ${isGear5 ? 'bg-white' : 'bg-[#050505]'}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20 ${isGear5 ? 'bg-sky-300' : 'bg-purple-900'}`} />
        <div className={`absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 ${isGear5 ? 'bg-amber-200' : 'bg-blue-900'}`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl md:text-7xl font-serif font-black mb-6 tracking-tight ${isGear5 ? 'text-sky-900 cloudy-text' : 'text-white'}`}
          >
            DEVIL FRUITS
          </motion.h2>
          <p className={`text-lg max-w-2xl mx-auto font-light leading-relaxed ${isGear5 ? 'text-slate-600' : 'text-slate-400'}`}>
            Treasure of the Sea. One bite grants god-like power in exchange for the ability to swim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FRUIT_TYPES.map((fruit, i) => {
            const y = i === 0 ? y1 : i === 1 ? y2 : y3;
            const isSelected = selectedFruit === fruit.id;

            return (
              <motion.div
                key={fruit.id}
                style={{ y }}
                layout
                onClick={() => setSelectedFruit(isSelected ? null : fruit.id)}
                className={`group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500`}
              >
                {/* Card Container */}
                <motion.div
                  layout
                  className={`absolute inset-0 transition-all duration-500 rounded-3xl overflow-hidden border flex flex-col ${isGear5 ? 'bg-white border-sky-100 group-hover:border-sky-300 group-hover:shadow-2xl group-hover:shadow-sky-200/50' : 'bg-zinc-900 border-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-purple-900/20'}`}
                >

                  {/* Image Container - Takes huge space when not selected, shrinks when selected */}
                  <motion.div
                    layout
                    className={`relative w-full overflow-hidden transition-all duration-500 ${isSelected ? 'h-[40%]' : 'h-[75%]'}`}
                  >
                    <motion.img
                      layoutId={`image-${fruit.id}`}
                      src={fruit.image}
                      alt={fruit.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${isGear5 ? 'from-white via-transparent to-transparent' : 'from-zinc-900 via-transparent to-transparent'}`} />

                    {/* Floating Icon Overlay on Image when NOT selected */}
                    {!isSelected && (
                      <div className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                         <fruit.icon size={24} color={isGear5 ? '#0ea5e9' : fruit.accent} />
                      </div>
                    )}
                  </motion.div>

                  {/* Content Container */}
                  <motion.div
                    layout
                    className={`relative p-8 flex flex-col ${isSelected ? 'h-[60%] justify-start' : 'h-[25%] justify-center'}`}
                  >
                    <motion.div layout>
                      <motion.div layout className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase ${isGear5 ? 'text-sky-500' : 'text-slate-500'}`}>
                          {fruit.id} Type
                        </span>
                        {isSelected && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <fruit.icon
                              size={24}
                              color={isGear5 && fruit.id === 'zoan' ? '#0ea5e9' : fruit.accent}
                              className="opacity-80"
                            />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.h3 layout className={`text-3xl font-serif font-bold mb-1 ${isGear5 ? 'text-slate-800' : 'text-white'}`}>
                        {fruit.name}
                      </motion.h3>
                      <motion.p layout className={`text-sm font-serif mb-4 opacity-60 ${isGear5 ? 'text-slate-500' : 'text-slate-400'}`}>
                        {fruit.kanji}
                      </motion.p>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className={`h-px w-12 mb-4 ${isGear5 ? 'bg-sky-200' : 'bg-white/10'}`} />
                          <p className={`text-sm leading-relaxed ${isGear5 ? 'text-slate-600' : 'text-slate-300'}`}>
                            {fruit.desc}
                          </p>
                          <p className="mt-4 text-xs italic opacity-50">
                            Click to collapse
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Hover indicator bar (only when not selected) */}
                  {!isSelected && (
                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${isGear5 ? 'bg-sky-400' : 'bg-white/20'}`} />
                  )}

                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevilFruitSection;

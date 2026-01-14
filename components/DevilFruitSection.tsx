import React from 'react';
import { motion } from 'framer-motion';

const FRUIT_TYPES = [
  {
    id: 'paramecia',
    name: 'Paramecia',
    kanji: '超人系',
    desc: 'The power to alter one’s body or environment. Infinite possibility. Chaos made manifest.',
    color: 'from-green-900/40 to-slate-900',
    border: 'group-hover:border-green-500/50',
    icon: '🌪️',
  },
  {
    id: 'zoan',
    name: 'Zoan',
    kanji: '動物系',
    desc: 'The power of the beast. Evolution accelerated. The will of the animal resides within.',
    color: 'from-red-900/40 to-slate-900',
    border: 'group-hover:border-red-500/50',
    icon: '🦁',
  },
  {
    id: 'logia',
    name: 'Logia',
    kanji: '自然系',
    desc: 'The power of nature itself. Fluidity and destruction. To become the element is to forsake mortality.',
    color: 'from-amber-900/40 to-slate-900',
    border: 'group-hover:border-amber-500/50',
    icon: '🔥',
  }
];

const DevilFruitSection: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-6 bg-black overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black opacity-50" />
      
      {/* SVG Filters for Distortion Effect (Paramecia) */}
      <svg className="hidden">
        <defs>
          <filter id="fruit-turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.02;0.04;0.02" dur="4s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto relative z-10">
        <div className="mb-20 text-center">
           <motion.h2 
             initial={{ opacity: 0, letterSpacing: '0.1em' }}
             whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
             transition={{ duration: 1 }}
             className="text-amber-700/80 font-serif text-sm uppercase tracking-widest mb-4"
           >
             Forbidden Archives
           </motion.h2>
           <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Devil Fruits</h3>
           <p className="max-w-2xl mx-auto text-slate-500 font-light italic">
             "They are the sea devil's incarnations. Those who eat them gain a power... but the sea hates them."
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FRUIT_TYPES.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className={`group relative h-[500px] border border-white/5 bg-gradient-to-b ${type.color} p-8 overflow-hidden rounded-sm transition-colors duration-500 ${type.border}`}
            >
              {/* --- TYPE SPECIFIC VISUALS --- */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                
                {/* Paramecia: Spatial Distortion */}
                {type.id === 'paramecia' && (
                   <div 
                     className="absolute inset-0 bg-green-900/10 mix-blend-overlay"
                     style={{ filter: 'url(#fruit-turbulence)' }}
                   />
                )}

                {/* Zoan: Breathing Silhouette */}
                {type.id === 'zoan' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-64 h-64 rounded-full bg-red-900/10 blur-3xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                )}

                {/* Logia: Elemental Particles */}
                {type.id === 'logia' && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, j) => (
                       <motion.div
                         key={j}
                         className="absolute w-1 h-1 bg-amber-500 rounded-full blur-[1px]"
                         style={{ 
                           left: `${Math.random() * 100}%`,
                           bottom: '-10px'
                         }}
                         animate={{ 
                           y: [0, -500],
                           opacity: [0, 1, 0],
                           scale: [0.5, 2, 0]
                         }}
                         transition={{
                           duration: 3 + Math.random() * 4,
                           repeat: Infinity,
                           delay: Math.random() * 2,
                           ease: "easeOut"
                         }}
                       />
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 text-6xl opacity-10 font-serif font-black select-none group-hover:opacity-20 transition-opacity">
                {type.kanji}
              </div>

              <div className="h-full flex flex-col justify-end relative z-10">
                <div className={`text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-all duration-500 ${
                  type.id === 'paramecia' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''
                } ${
                   type.id === 'zoan' ? 'group-hover:scale-110' : ''
                }`}>
                   {type.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 font-serif">{type.name}</h4>
                <div className="h-[1px] w-12 bg-white/20 mb-4 group-hover:w-full transition-all duration-700" />
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-200 transition-colors">
                  {type.desc}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* --- MANDATORY CONCLUSION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 1.5 }}
          className="mt-32 max-w-2xl mx-auto text-center px-6"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-900/50 to-transparent mb-8" />
          <p className="font-serif text-slate-400 text-lg md:text-xl leading-relaxed tracking-wide italic">
            "To consume the fruit is to make a covenant with demons. 
            You will gain power enough to tear down the heavens, but know this: 
            <br/><br/>
            <span className="text-slate-200 not-italic font-bold">Freedom is the price.</span> 
            <br/>
            The sea—mother of all life—will reject you forever. 
            You will sink like a hammer into the abyss, powerful, yet helpless."
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-900/50 to-transparent mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default DevilFruitSection;
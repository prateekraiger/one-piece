import React from 'react';
import { motion } from 'framer-motion';

const FRUIT_TYPES = [
  {
    id: 'paramecia',
    name: 'Paramecia',
    kanji: '超人系',
    desc: 'The power to alter one\'s body or environment. Infinite possibility. Chaos made manifest.',
    color: 'from-green-900/40 to-slate-900',
    border: 'group-hover:border-green-500/70',
    icon: '🌪️',
    image: 'https://i.pinimg.com/originals/05/c8/95/05c8952bb0b11ce78b73b45b18f5d4df.gif',
    glowColor: 'green',
    auraColor: 'rgba(34, 197, 94, 0.3)',
  },
  {
    id: 'zoan',
    name: 'Zoan',
    kanji: '動物系',
    desc: 'The power of the beast. Evolution accelerated. The will of the animal resides within.',
    color: 'from-red-900/40 to-slate-900',
    border: 'group-hover:border-red-500/70',
    icon: '🦁',
    image: 'https://i.pinimg.com/originals/e0/75/ba/e075ba13d38fe15bea4bf73aed06d0df.gif',
    glowColor: 'red',
    auraColor: 'rgba(239, 68, 68, 0.3)',
  },
  {
    id: 'logia',
    name: 'Logia',
    kanji: '自然系',
    desc: 'The power of nature itself. Fluidity and destruction. To become the element is to forsake mortality.',
    color: 'from-amber-900/40 to-slate-900',
    border: 'group-hover:border-amber-500/70',
    icon: '🔥',
    image: 'https://i.pinimg.com/originals/f1/14/85/f11485eb5caba65ed67a88ddad0a51c1.gif',
    glowColor: 'amber',
    auraColor: 'rgba(251, 191, 36, 0.3)',
  }
];

const DevilFruitSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-6 bg-black overflow-hidden">
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

          {/* Glow filters for each type */}
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
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
              className={`group relative h-[550px] border-2 border-white/5 bg-gradient-to-b ${type.color} p-8 overflow-hidden rounded-xl transition-all duration-700 ${type.border} hover:shadow-2xl`}
              style={{
                boxShadow: `0 0 0 0 ${type.auraColor}`
              }}
              whileHover={{
                boxShadow: `0 0 60px 10px ${type.auraColor}, 0 0 120px 20px ${type.auraColor}`,
                scale: 1.02,
                y: -5
              }}
            >
              {/* Animated Aura Rings */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {[...Array(3)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`absolute inset-0 rounded-xl border-2`}
                    style={{
                      borderColor: type.auraColor,
                      filter: 'blur(4px)'
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: idx * 0.8,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Devil Fruit Image */}
              <div className="absolute top-8 right-8 w-32 h-32 overflow-hidden rounded-full opacity-40 group-hover:opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12"
                style={{ filter: `url(#glow-${type.glowColor})` }}
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-radial from-transparent to-${type.glowColor}-900/50`} />
              </div>

              {/* --- TYPE SPECIFIC VISUALS --- */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">

                {/* Paramecia: Spatial Distortion */}
                {type.id === 'paramecia' && (
                   <div
                     className="absolute inset-0 bg-green-500/10 mix-blend-overlay"
                     style={{ filter: 'url(#fruit-turbulence)' }}
                   />
                )}

                {/* Zoan: Breathing Silhouette */}
                {type.id === 'zoan' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-64 h-64 rounded-full bg-red-500/20 blur-3xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                )}

                {/* Logia: Elemental Particles */}
                {type.id === 'logia' && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, j) => (
                       <motion.div
                         key={j}
                         className="absolute w-2 h-2 bg-amber-400 rounded-full"
                         style={{
                           left: `${Math.random() * 100}%`,
                           bottom: '-10px',
                           filter: 'blur(2px)',
                           boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                         }}
                         animate={{
                           y: [0, -550],
                           opacity: [0, 1, 1, 0],
                           scale: [0.5, 1.5, 2, 0]
                         }}
                         transition={{
                           duration: 3 + Math.random() * 3,
                           repeat: Infinity,
                           delay: Math.random() * 2,
                           ease: "easeOut"
                         }}
                       />
                    ))}
                  </div>
                )}
              </div>

              {/* Floating Energy Orbs */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, idx) => (
                  <motion.div
                    key={`orb-${idx}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: type.auraColor,
                      boxShadow: `0 0 10px 2px ${type.auraColor}`,
                      left: `${20 + idx * 15}%`,
                      top: `${30 + (idx % 3) * 20}%`
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      x: [-10, 10, -10],
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3 + idx * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.3
                    }}
                  />
                ))}
              </div>

              <div className="absolute top-4 left-4 text-8xl opacity-5 font-serif font-black select-none group-hover:opacity-10 transition-opacity">
                {type.kanji}
              </div>

              <div className="h-full flex flex-col justify-end relative z-10">
                <div className={`text-5xl mb-6 opacity-50 group-hover:opacity-100 transition-all duration-500 ${
                  type.id === 'paramecia' ? 'group-hover:translate-x-2 group-hover:-translate-y-2' : ''
                } ${
                   type.id === 'zoan' ? 'group-hover:scale-125' : ''
                } ${
                   type.id === 'logia' ? 'group-hover:animate-pulse' : ''
                }`}
                style={{
                  filter: type.id === 'logia' ? `drop-shadow(0 0 20px ${type.auraColor})` : 'none'
                }}
                >
                   {type.icon}
                </div>
                <h4 className="text-3xl font-bold text-white mb-4 font-serif group-hover:text-shadow-lg transition-all"
                  style={{
                    textShadow: `0 0 20px ${type.auraColor}`
                  }}
                >
                  {type.name}
                </h4>
                <div className="h-[2px] w-12 bg-white/20 mb-4 group-hover:w-full transition-all duration-700"
                  style={{
                    boxShadow: `0 0 10px ${type.auraColor}`
                  }}
                />
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-100 transition-colors">
                  {type.desc}
                </p>
              </div>

              {/* Hover Glow Overlay */}
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

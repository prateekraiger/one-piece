import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGear5 } from './Gear5Context';

gsap.registerPlugin(ScrollTrigger);

const HAKI_TYPES = [
  {
    id: 'armament',
    name: 'Busoshoku',
    trans: 'Color of Arms',
    desc: 'An invisible armor that can be evolved into a weapon. It allows the user to bypass Devil Fruit defenses.',
    visualColor: 'bg-slate-900',
    icon: Shield,
    image: 'https://i.pinimg.com/originals/b5/2f/9e/b52f9e8a8f7b6c5d4e3f2a1b0c9d8e7f.gif',
    gear5Image: '/images/haki-armament.png',
    glowColor: 'rgba(15, 23, 42, 0.8)',
    auraColor: 'rgba(71, 85, 105, 0.6)'
  },
  {
    id: 'observation',
    name: 'Kenbunshoku',
    trans: 'Color of Observation',
    desc: 'The power to hear the "voice" of living things. Grants extrasensory perception and future sight.',
    visualColor: 'bg-red-900/20',
    icon: Eye,
    image: 'https://i.pinimg.com/originals/f2/e3/d4/f2e3d4c5b6a7988776655443322110ab.gif',
    gear5Image: '/images/haki-observation.png',
    glowColor: 'rgba(220, 38, 38, 0.8)',
    auraColor: 'rgba(239, 68, 68, 0.6)'
  },
  {
    id: 'conqueror',
    name: 'Haoshoku',
    trans: 'Color of the Supreme King',
    desc: 'The power to overwhelm the will of others. It cannot be trained, only strengthened by personal growth.',
    visualColor: 'bg-amber-900/20',
    icon: Zap,
    image: 'https://i.pinimg.com/originals/d6/c7/b8/d6c7b8a9f0e1d2c3b4a5968778695a4b.gif',
    gear5Image: '/images/haki-conqueror.png',
    glowColor: 'rgba(217, 119, 6, 0.9)',
    auraColor: 'rgba(251, 191, 36, 0.7)'
  }
];

const HakiSection: React.FC = () => {
  const [activeHaki, setActiveHaki] = useState<string | null>(null);
  const [hoveredHaki, setHoveredHaki] = useState<string | null>(null);
  const { isGear5 } = useGear5();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="haki" className={`relative w-full py-32 overflow-hidden text-center transition-colors duration-1000 ${isGear5 ? 'bg-white' : 'bg-[#0a0a0a]'}`}>
      {/* SVG Filters for insane effects */}
      <svg className="hidden">
        <defs>
          {/* Lightning effect for Conqueror's */}
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Metallic hardening effect for Armament */}
          <filter id="metallic-shine">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff" result="specOut">
              <fePointLight x="100" y="100" z="200"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
          </filter>

          {/* Future sight shimmer */}
          <filter id="future-sight">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="turbulence">
              <animate attributeName="baseFrequency" values="0.01;0.03;0.01" dur="3s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-5xl md:text-7xl font-serif font-black mb-8 select-none absolute top-10 left-1/2 -translate-x-1/2 w-full ${isGear5 ? 'text-slate-200/50' : 'text-white/10'}`}>
          WILLPOWER
        </h2>

        <div className="relative pt-20 pb-12">
           <h3 ref={titleRef} className={`text-3xl font-bold mb-2 transition-all duration-700 ${
             isGear5
               ? 'text-white cloudy-text'
               : 'text-white'
           }`}>HAKI</h3>
           <p className="text-slate-500 text-sm tracking-widest uppercase">The Ambition</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:h-[600px]">
          {HAKI_TYPES.map((haki) => {
            const isActive = activeHaki === haki.id;
            const isHovered = hoveredHaki === haki.id;

            return (
              <motion.div
                key={haki.id}
                layout
                onClick={() => setActiveHaki(isActive ? null : haki.id)}
                onHoverStart={() => setHoveredHaki(haki.id)}
                onHoverEnd={() => setHoveredHaki(null)}
                whileHover={{ scale: 1.02 }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-500 ease-out ${
                  isActive ? `flex-[3] ${isGear5 ? 'border-sky-400 shadow-[0_0_60px_rgba(56,189,248,0.6)] scale-[1.01]' : 'border-white/30'}` : `flex-[1] ${isGear5 ? 'border-sky-100 hover:border-sky-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]' : 'hover:border-white/20 border-white/5'}`
                } ${isGear5 ? 'bg-slate-900' : haki.visualColor}`}
                style={{
                  boxShadow: isHovered || isActive ? `0 0 80px ${haki.glowColor}, inset 0 0 40px ${haki.auraColor}` : 'none'
                }}
                // Conqueror's Pressure Effect (Shake)
                animate={isActive && haki.id === 'conqueror' ? {
                    x: [0, -4, 4, -2, 2, 0],
                    y: [0, -2, 2, 0],
                  } : {}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Background Image */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isGear5 ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`}>
                  <img
                    src={isGear5 && (haki as any).gear5Image ? (haki as any).gear5Image : haki.image}
                    alt={haki.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${isGear5 ? 'brightness-[0.95] contrast-110 saturate-110 drop-shadow-lg' : ''}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${isGear5 ? 'from-black/0 via-transparent to-transparent' : 'from-black/80 via-black/50 to-black'}`} />
                </div>

                {/* MEGA AURA EFFECTS */}

                {/* Pulsing Aura Rings */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, idx) => (
                      <motion.div
                        key={`ring-${idx}`}
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{
                          borderColor: haki.auraColor,
                        }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{
                          scale: [1, 1.2, 1.4],
                          opacity: [0.8, 0.4, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.5,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Energy Particles */}
                {(isHovered || isActive) && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(12)].map((_, idx) => (
                      <motion.div
                        key={`particle-${idx}`}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: haki.glowColor,
                          boxShadow: `0 0 10px 2px ${haki.glowColor}`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* --- INTERACTIVE VISUAL FEEDBACK LAYERS --- */}

                {/* Armament: Hardening (Dark Metallic Overlay) */}
                {(isActive || isHovered) && haki.id === 'armament' && (
                   <>
                     <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: isActive ? 1 : 0.5 }}
                       className="absolute inset-0 bg-slate-950/90 z-0 pointer-events-none"
                       style={{
                         filter: 'url(#metallic-shine)',
                         mixBlendMode: 'hard-light'
                       }}
                     />
                     {/* Hardening cracks effect */}
                     <div className="absolute inset-0 pointer-events-none opacity-20">
                       <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.3)_49%,rgba(255,255,255,0.3)_51%,transparent_52%)] bg-[length:20px_20px]" />
                     </div>
                   </>
                )}

                {/* Observation: Radar Pulse + Future Sight Distortion */}
                {(isActive || isHovered) && haki.id === 'observation' && (
                    <>
                      {/* Radar pulses */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
                        {[...Array(4)].map((_, i) => (
                           <motion.div
                             key={i}
                             className="absolute border-2 border-red-500/40 rounded-full"
                             initial={{ width: '20px', height: '20px', opacity: 1 }}
                             animate={{ width: '800px', height: '800px', opacity: 0 }}
                             transition={{
                               duration: 3,
                               repeat: Infinity,
                               delay: i * 0.75,
                               ease: "easeOut"
                             }}
                           />
                        ))}
                      </div>
                      {/* Future sight shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-red-500/5"
                        style={{ filter: 'url(#future-sight)' }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </>
                )}

                 {/* Conqueror: Lightning Bolts + Screen Pressure */}
                {(isActive || isHovered) && haki.id === 'conqueror' && (
                   <>
                     {/* Screen darkening pressure */}
                     <motion.div
                       className="absolute inset-0 z-0 bg-black/70"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: isActive ? 0.7 : 0.4 }}
                     />

                     {/* Lightning bolts */}
                     <div className="absolute inset-0 pointer-events-none overflow-hidden">
                       {[...Array(6)].map((_, idx) => (
                         <motion.div
                           key={`lightning-${idx}`}
                           className="absolute w-0.5 h-full origin-top"
                           style={{
                             left: `${20 + idx * 15}%`,
                             background: `linear-gradient(180deg, transparent, ${haki.glowColor}, transparent)`,
                             filter: 'url(#lightning-glow)',
                             transformOrigin: 'top'
                           }}
                           animate={{
                             scaleY: [0, 1, 0],
                             opacity: [0, 1, 0],
                           }}
                           transition={{
                             duration: 0.3,
                             repeat: Infinity,
                             delay: idx * 0.4 + Math.random() * 2,
                             repeatDelay: 2 + Math.random() * 3
                           }}
                         />
                       ))}
                     </div>

                     {/* Lightning arcs */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none">
                       {[...Array(3)].map((_, idx) => (
                         <motion.path
                           key={`arc-${idx}`}
                           d={`M ${50 + idx * 100} 0 Q ${100 + idx * 100} 150 ${50 + idx * 100} 300 T ${50 + idx * 100} 600`}
                           stroke={haki.glowColor}
                           strokeWidth="2"
                           fill="none"
                           filter="url(#lightning-glow)"
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{
                             pathLength: [0, 1, 0],
                             opacity: [0, 1, 0]
                           }}
                           transition={{
                             duration: 0.5,
                             repeat: Infinity,
                             delay: idx * 0.3,
                             repeatDelay: 3 + Math.random() * 2
                           }}
                         />
                       ))}
                     </svg>
                   </>
                )}

                <div className={`absolute inset-0 bg-gradient-to-b z-0 ${isGear5 ? 'hidden' : 'from-transparent to-black/90'}`} />

                <div className="relative h-full flex flex-col justify-end p-8 text-left z-10">
                  <motion.div layout="position" className="mb-4">
                    <motion.div
                      className="block"
                      style={{
                        filter: (isHovered || isActive) ? `drop-shadow(0 0 20px ${haki.glowColor})` : 'none'
                      }}
                      animate={isActive && haki.id === 'observation' ? {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <haki.icon size={48} className={isGear5 ? `text-${haki.glowColor}` : 'text-white'} strokeWidth={1.5} style={{ color: isGear5 && haki.id === 'armament' ? '#334155' : undefined }} />
                    </motion.div>
                  </motion.div>

                  <motion.h4
                    layout="position"
                    className={`font-serif text-2xl font-bold mb-1 transition-all duration-300 ${isActive ? 'text-4xl' : ''} ${isGear5 ? 'text-sky-300' : 'text-white'}`}
                    style={
                      (isActive || isHovered) ? {
                        textShadow: `0 0 30px ${haki.glowColor}, 0 0 60px ${haki.glowColor}`,
                        ...(isActive && haki.id === 'armament' ? { color: isGear5 ? '#7dd3fc' : '#e2e8f0' } : {})
                      } : {}
                    }
                  >
                    {haki.name}
                  </motion.h4>

                  <motion.p
                    layout="position"
                    className="text-xs text-amber-500 uppercase tracking-widest mb-4"
                    style={{
                      textShadow: (isHovered || isActive) ? `0 0 10px ${haki.auraColor}` : 'none'
                    }}
                  >
                    {haki.trans}
                  </motion.p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className={`leading-relaxed max-w-lg relative mb-6 font-medium ${isGear5 ? 'text-sky-200' : 'text-slate-300'}`}>
                          {haki.desc}
                        </p>

                        {/* Visual Interaction Area */}
                        <div className={`mt-8 h-32 w-full rounded-lg border-2 flex items-center justify-center relative overflow-hidden group/demo ${isGear5 ? 'border-sky-200 bg-white/50' : 'border-white/10 bg-black/50'}`}
                          style={{
                            boxShadow: `inset 0 0 30px ${haki.auraColor}`
                          }}
                        >
                           <span className={`text-xs uppercase z-10 relative font-bold tracking-wider ${isGear5 ? 'text-sky-600' : 'text-slate-600'}`}>
                             {haki.id === 'armament' ? 'Hardening Active' : haki.id === 'observation' ? 'Future Sight Active' : 'Conqueror\'s Haki Released'}
                           </span>

                           {haki.id === 'armament' && (
                             <motion.div
                               className={`absolute inset-0 opacity-0 group-hover/demo:opacity-90 transition-opacity duration-500 rounded-lg ${isGear5 ? 'bg-slate-700' : 'bg-slate-900'}`}
                               style={{ filter: 'url(#metallic-shine)' }}
                             />
                           )}

                           {haki.id === 'conqueror' && (
                             <>
                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover/demo:opacity-100 transition-opacity">
                                 <motion.div
                                   className="w-full h-full"
                                   animate={{ x: ['-100%', '200%'] }}
                                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                 />
                               </div>
                             </>
                           )}

                           {haki.id === 'observation' && (
                              <>
                                <motion.div
                                  className="absolute w-3 h-3 bg-red-500 rounded-full"
                                  style={{ boxShadow: `0 0 20px ${haki.glowColor}` }}
                                  animate={{ x: [-40, 40, -40], y: [-20, 20, -20] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                  className="absolute inset-0 bg-red-500/5"
                                  style={{ filter: 'url(#future-sight)' }}
                                />
                              </>
                           )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HakiSection;

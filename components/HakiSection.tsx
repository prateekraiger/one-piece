import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HAKI_TYPES = [
  {
    id: 'armament',
    name: 'Busoshoku',
    trans: 'Color of Arms',
    desc: 'An invisible armor that can be evolved into a weapon. It allows the user to bypass Devil Fruit defenses.',
    visualColor: 'bg-slate-900',
    particle: '⚫'
  },
  {
    id: 'observation',
    name: 'Kenbunshoku',
    trans: 'Color of Observation',
    desc: 'The power to hear the "voice" of living things. Grants extrasensory perception and future sight.',
    visualColor: 'bg-red-900/20',
    particle: '🔴'
  },
  {
    id: 'conqueror',
    name: 'Haoshoku',
    trans: 'Color of the Supreme King',
    desc: 'The power to overwhelm the will of others. It cannot be trained, only strengthened by personal growth.',
    visualColor: 'bg-amber-900/20',
    particle: '⚡'
  }
];

const HakiSection: React.FC = () => {
  const [activeHaki, setActiveHaki] = useState<string | null>(null);

  return (
    <section className="relative w-full py-32 bg-[#0a0a0a] overflow-hidden text-center">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-7xl font-serif font-black text-white/10 mb-8 select-none absolute top-10 left-1/2 -translate-x-1/2 w-full">
          WILLPOWER
        </h2>
        
        <div className="relative pt-20 pb-12">
           <h3 className="text-3xl font-bold text-white mb-2">HAKI</h3>
           <p className="text-slate-500 text-sm tracking-widest uppercase">The Ambition</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:h-[600px]">
          {HAKI_TYPES.map((haki) => {
            const isActive = activeHaki === haki.id;
            
            return (
              <motion.div
                key={haki.id}
                layout
                onClick={() => setActiveHaki(isActive ? null : haki.id)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-700 ${
                  isActive ? 'flex-[3] border-white/20' : 'flex-[1] hover:border-white/10 border-white/5'
                } ${haki.visualColor}`}
                // Conqueror's Pressure Effect (Shake)
                animate={isActive && haki.id === 'conqueror' ? { 
                    x: [0, -3, 3, -1, 1, 0],
                    y: [0, -1, 1, 0],
                  } : {}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* --- INTERACTIVE VISUAL FEEDBACK LAYERS --- */}
                
                {/* Armament: Hardening (Dark Metallic Overlay) */}
                {isActive && haki.id === 'armament' && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 bg-slate-950/90 mix-blend-hard-light z-0 pointer-events-none"
                     style={{ backdropFilter: 'contrast(1.2) brightness(0.8)' }}
                   />
                )}

                {/* Observation: Radar Pulse (Future Sight) */}
                {isActive && haki.id === 'observation' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
                      {[...Array(3)].map((_, i) => (
                         <motion.div 
                           key={i}
                           className="absolute border border-red-500/30 rounded-full"
                           initial={{ width: '10px', height: '10px', opacity: 1 }}
                           animate={{ width: '800px', height: '800px', opacity: 0 }}
                           transition={{ 
                             duration: 3, 
                             repeat: Infinity, 
                             delay: i * 1, 
                             ease: "easeOut" 
                           }}
                         />
                      ))}
                    </div>
                )}

                 {/* Conqueror: Screen Pressure & Dimming */}
                {isActive && haki.id === 'conqueror' && (
                   <motion.div 
                     className="absolute inset-0 z-0 bg-black/60 mix-blend-multiply"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                   />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-0" />

                <div className="relative h-full flex flex-col justify-end p-8 text-left z-10">
                  <motion.div layout="position" className="mb-4">
                    <span className={`text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] ${isActive && haki.id === 'observation' ? 'blur-[1px]' : ''}`}>
                      {haki.particle}
                    </span>
                  </motion.div>
                  
                  <motion.h4 
                    layout="position"
                    className={`font-serif text-2xl font-bold text-white mb-1 ${isActive ? 'text-4xl' : ''}`}
                    style={isActive && haki.id === 'armament' ? { color: '#1a1a1a', textShadow: '0px 1px 0px rgba(255,255,255,0.2)' } : {}}
                  >
                    {haki.name}
                  </motion.h4>
                  
                  <motion.p layout="position" className="text-xs text-amber-500 uppercase tracking-widest mb-4">
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
                        <p className="text-slate-300 leading-relaxed max-w-lg relative">
                          {haki.desc}
                        </p>
                        
                        {/* Visual Interaction Area */}
                        <div className="mt-8 h-32 w-full rounded border border-white/10 bg-black/50 flex items-center justify-center relative overflow-hidden group">
                           <span className="text-xs text-slate-600 uppercase z-10 relative">
                             {haki.id === 'armament' ? 'Hardening Active' : haki.id === 'observation' ? 'Future Sight Active' : 'Willpower Active'}
                           </span>
                           
                           {haki.id === 'armament' && (
                             <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full mix-blend-multiply opacity-90" />
                           )}
                           
                           {haki.id === 'conqueror' && (
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                           )}
                           
                           {haki.id === 'observation' && (
                              <motion.div 
                                className="absolute w-2 h-2 bg-red-500 rounded-full blur-[2px]"
                                animate={{ x: [0, 50, -50, 0], y: [0, 20, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              />
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
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEARS } from '../constants';

const LuffyShowcase: React.FC = () => {
  const [activeGear, setActiveGear] = useState(GEARS[0]);

  return (
    <section className="relative min-h-screen w-full bg-ocean-black py-24 text-slate-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          >
            The Captain's Evolution
          </motion.h2>
          <p className="mx-auto max-w-xl text-slate-400">
            From a rubber boy in the East Blue to the Warrior of Liberation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Controls / Timeline */}
          <div className="space-y-4">
            {GEARS.map((gear, index) => (
              <button
                key={gear.id}
                onClick={() => setActiveGear(gear)}
                className={`group flex w-full items-center justify-between rounded-xl border p-6 text-left transition-all duration-500 ${
                  activeGear.id === gear.id 
                    ? 'border-amber-500/50 bg-slate-900/50 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]' 
                    : 'border-white/5 bg-transparent hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className={`text-sm font-bold tracking-wider uppercase mb-1 transition-colors ${
                    activeGear.id === gear.id ? 'text-amber-500' : 'text-slate-500'
                  }`}>
                    Form {index + 1}
                  </div>
                  <h3 className={`font-serif text-2xl font-bold transition-colors ${
                    activeGear.id === gear.id ? 'text-white' : 'text-slate-400'
                  }`}>
                    {gear.name}
                  </h3>
                </div>
                <div className={`text-2xl transition-transform duration-500 ${
                  activeGear.id === gear.id ? 'scale-110 opacity-100' : 'opacity-30 group-hover:opacity-60'
                }`}>
                  {activeGear.id === gear.id ? '🔥' : '⚓️'}
                </div>
              </button>
            ))}
          </div>

          {/* Visualization */}
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeGear.id}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img 
                  src={activeGear.image} 
                  alt={activeGear.name}
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                   <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                   >
                     <p className="font-serif text-amber-500 italic text-xl mb-2">{activeGear.triggerText}</p>
                     <h3 className="text-3xl font-bold text-white mb-4">{activeGear.name}</h3>
                     <p className="text-slate-300 leading-relaxed max-w-md">{activeGear.description}</p>
                   </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuffyShowcase;
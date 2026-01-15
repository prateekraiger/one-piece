import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEARS } from '../constants';
import { useGear5 } from './Gear5Context';

const LuffyShowcase: React.FC = () => {
  const [activeGear, setActiveGear] = useState(GEARS[0]);
  const { isGear5 } = useGear5();

  return (
    <section className={`relative min-h-screen w-full py-24 text-slate-200 overflow-hidden transition-all duration-700 ${
      isGear5
        ? 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
        : 'bg-ocean-black'
    }`}>
      {/* Background Elements */}
      <div className={`absolute top-0 right-0 h-96 w-96 rounded-full blur-[120px] transition-all duration-700 ${
        isGear5 ? 'bg-purple-400/20' : 'bg-red-600/10'
      }`} />
      <div className={`absolute bottom-0 left-0 h-96 w-96 rounded-full blur-[120px] transition-all duration-700 ${
        isGear5 ? 'bg-pink-400/20' : 'bg-blue-600/10'
      }`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-serif text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
              isGear5
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600'
                : 'text-white'
            }`}
          >
            The Captain's Evolution
          </motion.h2>
          <p className={`mx-auto max-w-xl transition-colors duration-700 ${
            isGear5 ? 'text-purple-900' : 'text-slate-400'
          }`}>
            From a rubber boy in the East Blue to the Warrior of Liberation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Controls / Timeline */}
          <div className="space-y-4">
            {GEARS.map((gear, index) => (
              <motion.button
                key={gear.id}
                onClick={() => setActiveGear(gear)}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex w-full items-center justify-between rounded-xl border p-6 text-left transition-all duration-700 ${
                  activeGear.id === gear.id
                    ? (isGear5
                        ? 'border-purple-400/60 bg-gradient-to-r from-purple-50 to-pink-50 shadow-[0_0_40px_rgba(168,85,247,0.4)]'
                        : 'border-amber-500/50 bg-slate-900/50 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]')
                    : (isGear5
                        ? 'border-purple-200/30 bg-white/50 hover:border-purple-300/50 hover:bg-purple-50/50'
                        : 'border-white/5 bg-transparent hover:border-white/20 hover:bg-white/5')
                }`}
              >
                <div>
                  <div className={`text-sm font-bold tracking-wider uppercase mb-1 transition-colors duration-700 ${
                    activeGear.id === gear.id
                      ? (isGear5 ? 'text-purple-600' : 'text-amber-500')
                      : (isGear5 ? 'text-purple-400' : 'text-slate-500')
                  }`}>
                    Form {index + 1}
                  </div>
                  <h3 className={`font-serif text-2xl font-bold transition-colors duration-700 ${
                    activeGear.id === gear.id
                      ? (isGear5 ? 'text-purple-900' : 'text-white')
                      : (isGear5 ? 'text-purple-600' : 'text-slate-400')
                  }`}>
                    {gear.name}
                  </h3>
                </div>
                <div className={`text-2xl transition-all duration-700 ${
                  activeGear.id === gear.id
                    ? 'scale-110 opacity-100'
                    : 'opacity-30 group-hover:opacity-60'
                }`}>
                  {activeGear.id === gear.id ? (isGear5 ? '☀️' : '🔥') : '⚓️'}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Visualization */}
          <div className={`relative h-[600px] w-full rounded-2xl overflow-hidden border-2 backdrop-blur-sm transition-all duration-700 ${
            isGear5
              ? 'border-purple-300/50 bg-white/60 shadow-[0_0_50px_rgba(168,85,247,0.3)]'
              : 'border-white/10 bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.8)]'
          }`}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeGear.id}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <div className={`absolute inset-0 z-10 transition-all duration-700 ${
                  isGear5
                    ? 'bg-gradient-to-t from-purple-100/80 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-black via-transparent to-transparent'
                }`} />
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
                     <p className={`font-serif italic text-xl mb-2 transition-colors duration-700 ${
                       isGear5
                         ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
                         : 'text-amber-500'
                     }`}>
                       {activeGear.triggerText}
                     </p>
                     <h3 className={`text-3xl font-bold mb-4 transition-colors duration-700 ${
                       isGear5 ? 'text-purple-900' : 'text-white'
                     }`}>
                       {activeGear.name}
                     </h3>
                     <p className={`leading-relaxed max-w-md transition-colors duration-700 ${
                       isGear5 ? 'text-purple-800' : 'text-slate-300'
                     }`}>
                       {activeGear.description}
                     </p>
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

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGear5 } from './Gear5Context';

const NikaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sun Rays */}
    <g className="origin-center">
      <path d="M50 5 L50 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 85 L50 95" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M5 50 L15 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M85 50 L95 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M18 18 L25 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M75 75 L82 82" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 82 L25 75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M75 25 L82 18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </g>
    {/* Sun Face */}
    <circle cx="50" cy="50" r="28" fill="currentColor" opacity="0.2" />
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="4" fill="none" />
    {/* Joyful Eyes */}
    <path d="M35 42 Q40 38 45 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M55 42 Q60 38 65 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Big Smile */}
    <path d="M30 55 Q50 70 70 55" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>
);

const Gear5Trigger: React.FC = () => {
  const { isGear5, toggleGear5 } = useGear5();

  return (
    <>
      <motion.button
        onClick={toggleGear5}
        className={`fixed bottom-8 left-8 z-[100] p-4 rounded-full border-4 transition-all duration-700 overflow-visible backdrop-blur-sm ${
          isGear5
            ? 'bg-gradient-to-br from-white via-sky-50 to-white border-sky-400 text-sky-600 shadow-[0_0_60px_rgba(56,189,248,0.8),0_0_120px_rgba(56,189,248,0.4),inset_0_0_20px_rgba(56,189,248,0.2)]'
            : 'bg-gradient-to-br from-slate-900 via-black to-slate-900 border-amber-600/40 text-amber-500 hover:border-amber-500 hover:text-amber-400 shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(245,158,11,0.1)]'
        }`}
        whileHover={{ scale: 1.15, rotate: isGear5 ? 0 : 15 }}
        whileTap={{ scale: 0.85 }}
        animate={isGear5 ? {
          rotate: [0, 360],
        } : {}}
        transition={isGear5 ? {
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        } : {
          duration: 0.3,
          ease: "easeOut"
        }}
        title={isGear5 ? "Deactivate Gear 5 - Return to Normal" : "Activate Gear 5 - Awaken Sun God Nika"}
      >
        <motion.div
          animate={isGear5 ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={isGear5 ? {
            scale: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
          } : {}}
        >
          <NikaIcon />
        </motion.div>

        {/* Multiple Ripple Effects for Awakening - Sky Blue Theme */}
        <AnimatePresence>
          {isGear5 && (
            <>
              <motion.div
                key="ripple-1"
                className="absolute inset-0 rounded-full border-[6px] border-sky-400"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                key="ripple-2"
                className="absolute inset-0 rounded-full border-[6px] border-sky-300"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
              <motion.div
                key="ripple-3"
                className="absolute inset-0 rounded-full border-[4px] border-sky-500"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 3], opacity: [0.4, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Glow Effect - Sky Blue Theme */}
        <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
          isGear5
            ? 'bg-sky-400 opacity-50 animate-pulse'
            : 'bg-amber-600 opacity-0 group-hover:opacity-30'
        }`} style={{ zIndex: -1 }} />
      </motion.button>

      {/* Label */}
      <AnimatePresence>
        {!isGear5 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-10 left-32 z-[99] pointer-events-none"
          >
            <div className="bg-black/90 backdrop-blur-sm text-amber-400 px-4 py-2 rounded-lg border border-amber-600/30 text-sm font-bold tracking-wider shadow-lg">
              GEAR 5
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gear5Trigger;

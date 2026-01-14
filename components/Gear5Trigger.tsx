import React from 'react';
import { motion } from 'framer-motion';
import { useGear5 } from './Gear5Context';

const NikaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" />
    <path d="M30 65 Q50 85 70 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <circle cx="35" cy="40" r="6" fill="currentColor" />
    <circle cx="65" cy="40" r="6" fill="currentColor" />
    <path d="M50 20 L50 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <path d="M20 50 L25 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <path d="M80 50 L75 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const Gear5Trigger: React.FC = () => {
  const { isGear5, toggleGear5 } = useGear5();

  return (
    <motion.button
      onClick={toggleGear5}
      className={`fixed bottom-8 left-8 z-[100] p-4 rounded-full border-2 transition-all duration-500 overflow-hidden ${
        isGear5
          ? 'bg-white border-purple-500 text-purple-600 shadow-[0_0_50px_rgba(168,85,247,0.8)]'
          : 'bg-black/80 border-white/20 text-white hover:border-amber-500 hover:text-amber-500'
      }`}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      animate={isGear5 ? {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      } : {}}
      transition={isGear5 ? {
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
      } : {}}
      title={isGear5 ? "Disable Gear 5" : "Awaken Nika"}
    >
      <NikaIcon />

      {/* Ripple Effect for Awakening */}
      {isGear5 && (
        <motion.div
           className="absolute inset-0 rounded-full border-4 border-purple-500"
           animate={{ scale: [1, 3], opacity: [1, 0] }}
           transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default Gear5Trigger;

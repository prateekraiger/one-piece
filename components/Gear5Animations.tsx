import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGear5 } from './Gear5Context';

const Gear5Animations: React.FC = () => {
  const { isGear5 } = useGear5();

  return (
    <AnimatePresence>
      {isGear5 && (
        <>
          {/* Bottom Left: Dancing Luffy */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100, rotate: -20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.5,
                duration: 0.8
              }
            }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            className="fixed bottom-0 left-0 z-50 pointer-events-none w-48 md:w-64 lg:w-80 mix-blend-multiply"
          >
             <motion.img
              src="/gifs/luffy-dance.gif"
              alt="Luffy Dancing"
              className="w-full h-auto drop-shadow-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
             />
          </motion.div>

          {/* Bottom Right: Gear 5 Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100, rotate: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
                delay: 0.2
              }
            }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            className="fixed bottom-0 right-0 z-50 pointer-events-none w-48 md:w-64 lg:w-80 mix-blend-multiply"
          >
             <motion.img
              src="/gifs/gear-5.gif"
              alt="Gear 5 Action"
              className="w-full h-auto drop-shadow-2xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
             />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Gear5Animations;

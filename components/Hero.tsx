import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={targetRef} className="relative h-screen w-full overflow-hidden bg-ocean-black text-white">
      {/* Background Parallax */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-black via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://picsum.photos/seed/onepiecehero/1920/1080" 
          alt="One Piece Horizon" 
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span className="mb-4 block text-lg font-bold tracking-[0.5em] text-amber-500 font-sans uppercase">
            The Great Pirate Era
          </span>
          <h1 className="font-serif text-6xl md:text-9xl font-black tracking-tight text-white drop-shadow-2xl">
            ONE PIECE
          </h1>
          <p className="mt-6 max-w-2xl text-xl md:text-2xl font-light text-slate-300 font-serif italic opacity-90">
            "I'm gonna be King of the Pirates."
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-400">Begin the Voyage</span>
            <div className="h-16 w-[1px] bg-gradient-to-b from-amber-500 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
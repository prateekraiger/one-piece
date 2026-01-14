import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 20, stiffness: 100 };
  const moveTextX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveTextY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveBgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
  const moveBgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  return (
    <section
      ref={targetRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black text-white perspective-1000"
    >
      {/* Background Parallax with Enhanced Effects */}
      <motion.div
        style={{ scale, opacity, x: moveBgX, y: moveBgY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Animated Overlay Effects */}
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <img
          src="https://sspark.genspark.ai/cfimages?u1=JYcMvJZO4kWE9m270JQRBbnhqhvWuWzR6M%2FO25CaJkl44m%2FFOZAy7OD1HF%2FneGi11cHhSixZcR1SjDbiBkWY&u2=o7amUvQ9EUhXZGHr&width=2560"
          alt="One Piece Horizon"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, x: moveTextX, rotateX: useTransform(moveTextY, (y) => y * -0.1), rotateY: useTransform(moveTextX, (x) => x * 0.1) }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="mb-6 block text-xl font-black tracking-[0.6em] text-amber-400 font-sans uppercase drop-shadow-2xl"
            initial={{ letterSpacing: '0.2em' }}
            animate={{ letterSpacing: '0.6em' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            The Great Pirate Era
          </motion.span>

          <motion.h1
            className="font-serif text-7xl md:text-[12rem] font-black tracking-tighter text-white drop-shadow-2xl leading-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ONE PIECE
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-3xl text-2xl md:text-3xl font-light text-slate-200 font-serif italic opacity-90 drop-shadow-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            "I'm gonna be King of the Pirates."
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="mt-10 mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-amber-400 font-bold drop-shadow-lg">Begin the Voyage</span>
            <div className="relative">
              <div className="h-20 w-[2px] bg-gradient-to-b from-amber-500 to-transparent" />
              <motion.div
                className="absolute top-0 left-0 h-8 w-[2px] bg-amber-400"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.015] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] " />
      </div>
    </section>
  );
};

export default Hero;

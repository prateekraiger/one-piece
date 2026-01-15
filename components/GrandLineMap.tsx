import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, MotionValue } from 'framer-motion';
import { ARCS } from '../constants';
import { useGear5 } from './Gear5Context';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GrandLineMapProps {
  progress?: MotionValue<number>;
}

// ... Icons ...
const MerryIcon = () => (
  <svg width="50" height="50" viewBox="0 0 100 100" className="drop-shadow-md">
    <g transform="translate(10, 10) scale(0.8)">
       {/* Head */}
       <path d="M50 25 C35 25 25 40 25 60 C25 80 40 90 50 90 C60 90 75 80 75 60 C75 40 65 25 50 25" fill="#F8FAFC" stroke="#334155" strokeWidth="3"/>
       {/* Eyes */}
       <circle cx="42" cy="55" r="4" fill="#334155" />
       <circle cx="58" cy="55" r="4" fill="#334155" />
       {/* Smile */}
       <path d="M45 70 Q50 75 55 70" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
       {/* Horns (Curved Ram) */}
       <path d="M15 45 C5 35 15 15 35 25" stroke="#E2E8F0" strokeWidth="8" fill="none" strokeLinecap="round" />
       <path d="M85 45 C95 35 85 15 65 25" stroke="#E2E8F0" strokeWidth="8" fill="none" strokeLinecap="round" />
       <path d="M15 45 C5 35 15 15 35 25" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
       <path d="M85 45 C95 35 85 15 65 25" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const SunnyIcon = () => (
    <svg width="50" height="50" viewBox="0 0 100 100" className="drop-shadow-md">
      <g transform="translate(10, 10) scale(0.8)">
         {/* Sun Mane (Petals) */}
         <circle cx="50" cy="50" r="38" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
         {/* Face */}
         <circle cx="50" cy="50" r="26" fill="#FFFBEB" stroke="#B45309" strokeWidth="2" />
         {/* Eyes */}
         <circle cx="42" cy="48" r="4" fill="#334155" />
         <circle cx="58" cy="48" r="4" fill="#334155" />
         {/* Nose */}
         <circle cx="50" cy="58" r="3" fill="#334155" />
         {/* Crossbones */}
         <line x1="20" y1="20" x2="35" y2="35" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
         <line x1="80" y1="20" x2="65" y2="35" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
         <line x1="20" y1="80" x2="35" y2="65" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
         <line x1="80" y1="80" x2="65" y2="65" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
);

const GrandLineMap: React.FC<GrandLineMapProps> = ({ progress }) => {
  const { isGear5 } = useGear5();
  const mapRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isMerry, setIsMerry] = useState(true);

  useEffect(() => {
    if (!mapRef.current || !shipRef.current || !lineRef.current) return;

    // Use external progress if provided
    if (progress) {
       const unsubscribe = progress.on("change", (latest: number) => {
         setCurrentProgress(latest);

         if (lineRef.current) lineRef.current.style.height = `${latest * 95}%`;
         if (shipRef.current) shipRef.current.style.top = `${latest * 95}%`;

         if (latest > 0.45 && isMerry) {
           setIsMerry(false);
         } else if (latest <= 0.45 && !isMerry) {
           setIsMerry(true);
         }
       });

       // Initial pulse animation still needs GSAP or simple CSS
       const ctx = gsap.context(() => {
          gsap.to(mapRef.current, {
            scale: 1.02,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
          });
       }, mapRef);

       return () => {
         unsubscribe();
         ctx.revert();
       };
    }

    // Fallback to internal scroll trigger
    const ctx = gsap.context(() => {
      // Animate the progress line based on scroll
      gsap.to(lineRef.current, {
        height: '95%',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setCurrentProgress(p);

            // Switch ship at midpoint
            if (p > 0.45 && isMerry) {
              setIsMerry(false);
            } else if (p <= 0.45 && !isMerry) {
              setIsMerry(true);
            }
          },
        },
      });

      // Animate the ship position
      gsap.to(shipRef.current, {
        top: '95%',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Pulse animation for the map container
      gsap.to(mapRef.current, {
        scale: 1.02,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }, mapRef);

    return () => ctx.revert();
  }, [progress, isMerry]);

  return (
    <motion.div
      ref={mapRef}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`fixed right-8 top-[15%] z-[50] hidden md:flex flex-col items-center h-[75vh] w-24 py-10 rounded-full shadow-2xl overflow-hidden transition-all duration-700 border-4 backdrop-blur-md ${
        isGear5
          ? 'bg-gradient-to-b from-white via-purple-100 to-pink-100 border-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.7)]'
          : 'bg-gradient-to-b from-[#1a1815] via-[#2a2420] to-[#1a1815] border-[#8b7355] shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(245,158,11,0.15)]'
      }`}
    >
      {/* Paper Texture Overlay */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] transition-opacity duration-700 ${
        isGear5 ? 'opacity-30' : 'opacity-20'
      }`} />

      {/* Decorative Inner Border */}
      <div className={`absolute inset-2 rounded-full border transition-colors duration-700 ${
        isGear5 ? 'border-purple-200/40' : 'border-amber-600/20'
      }`} />

      <div className={`text-[10px] font-serif uppercase tracking-[0.2em] writing-vertical-rl mb-6 transition-all duration-700 font-bold ${
        isGear5 ? 'text-purple-700 drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]' : 'text-[#c9a967] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
      }`}>
        Grand Line
      </div>

      <div className="relative flex-1 w-full flex justify-center">
        {/* The Track Line Container */}
        <div className={`absolute top-0 bottom-0 w-[4px] rounded-full transition-colors duration-700 ${
          isGear5 ? 'bg-purple-300/50' : 'bg-black/20'
        }`} />

        {/* The Fill Line (GSAP Animated) */}
        <div
          ref={lineRef}
          className={`absolute top-0 w-[4px] shadow-[0_0_20px_currentColor] rounded-full transition-all duration-700 ${
            isGear5
              ? 'bg-gradient-to-b from-purple-600 via-pink-600 to-purple-600 text-purple-600'
              : 'bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-amber-600'
          }`}
          style={{ height: '5%' }}
        />

        {/* Nodes */}
        {ARCS.map((arc, i) => {
          const nodeProgress = (i / (ARCS.length - 1));
          const isActive = currentProgress >= nodeProgress;

          return (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full border-2 transition-all duration-700 ${
                isGear5
                  ? (isActive
                      ? 'bg-purple-600 border-white shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                      : 'bg-white border-purple-400 shadow-[0_0_5px_rgba(168,85,247,0.3)]')
                  : (isActive
                      ? 'bg-amber-500 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                      : 'bg-[#2a2620] border-[#8b7355] shadow-[0_0_5px_rgba(0,0,0,0.5)]')
              }`}
              style={{
                top: `${nodeProgress * 100}%`,
                zIndex: 10
              }}
              animate={isActive ? {
                scale: [1, 1.3, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              title={arc.title}
            />
          );
        })}

        {/* The Ship (GSAP Animated) */}
        <div
          ref={shipRef}
          className="absolute -translate-x-1/2 -ml-0.5 z-20"
          style={{ top: '5%' }}
        >
           <motion.div
             className="relative -left-[23px] -top-[25px]"
             animate={{
               y: [-4, 4, -4],
               rotate: [-2, 2, -2]
             }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           >
             <div className={`relative hover:scale-125 transition-all duration-300 cursor-help ${
               isGear5 ? 'drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]'
             }`}>
               <div className={`transition-all duration-700 ${isGear5 ? 'brightness-110 saturate-150' : ''}`}>
                 {isMerry ? <MerryIcon /> : <SunnyIcon />}
               </div>
             </div>
           </motion.div>
        </div>
      </div>

      {/* Bottom Label */}
      <div className={`text-[10px] font-serif uppercase tracking-[0.2em] writing-vertical-rl mt-6 transition-all duration-700 font-bold ${
        isGear5 ? 'text-purple-700 drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]' : 'text-[#c9a967] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
      }`}>
        New World
      </div>

      {/* Glowing Effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          isGear5 ? 'bg-purple-400/20' : 'bg-amber-600/10'
        }`}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
};

export default GrandLineMap;

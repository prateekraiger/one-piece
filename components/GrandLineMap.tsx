import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ARCS } from '../constants';
import { useGear5 } from './Gear5Context';

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

interface GrandLineMapProps {
  progress: MotionValue<number>;
}

const GrandLineMap: React.FC<GrandLineMapProps> = ({ progress }) => {
  const { isGear5 } = useGear5();

  // Map Vertical Progress [0, 1] to the height of the container
  const topPosition = useTransform(progress, [0, 1], ['5%', '95%']);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-[50] hidden md:flex flex-col items-center h-[70vh] w-20 py-8 rounded-full shadow-2xl overflow-hidden transition-colors duration-500 border-2 ${
        isGear5
          ? 'bg-white border-purple-200 shadow-purple-500/20'
          : 'bg-[#1a1815] border-[#4a4036] shadow-black/80'
      }`}
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />

      {/* Top Label */}
      <div className={`text-[10px] font-serif uppercase tracking-[0.2em] writing-vertical-rl rotate-180 mb-6 transition-colors ${
        isGear5 ? 'text-purple-600' : 'text-[#8b7355]'
      }`}>
        Grand Line
      </div>

      <div className="relative flex-1 w-full flex justify-center">
        {/* The Track Line Container */}
        <div className="absolute top-0 bottom-0 w-[4px] bg-black/10 rounded-full" />

        {/* The Fill Line */}
        <motion.div
            style={{ height: topPosition }}
            className={`absolute top-0 w-[4px] shadow-[0_0_15px_currentColor] rounded-full transition-colors duration-500 ${
              isGear5 ? 'bg-purple-500 text-purple-500' : 'bg-amber-600 text-amber-600'
            }`}
        />

        {/* Nodes */}
        {ARCS.map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full border-2 transition-colors duration-500 ${
              isGear5 ? 'bg-white border-purple-400' : 'bg-[#2a2620] border-[#8b7355]'
            }`}
             style={{
               top: `${(i / (ARCS.length - 1)) * 100}%`,
               zIndex: 10
             }}
          />
        ))}

        {/* The Ship */}
        <motion.div
           className="absolute -translate-x-1/2 -ml-0.5 z-20"
           style={{ top: topPosition }}
        >
           <motion.div
             className="relative -left-[23px] -top-[25px]"
             animate={{
               y: [-4, 4, -4],
               rotate: [-2, 2, -2]
             }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           >
             <div className="relative hover:scale-125 transition-transform duration-300 cursor-help">
               <ShowShip progress={progress} />
             </div>
           </motion.div>
        </motion.div>
      </div>

      {/* Bottom Label */}
      <div className={`text-[10px] font-serif uppercase tracking-[0.2em] writing-vertical-rl rotate-180 mt-6 transition-colors ${
        isGear5 ? 'text-purple-600' : 'text-[#8b7355]'
      }`}>
        New World
      </div>
    </motion.div>
  );
};

// Component to handle ship switching conditionally
const ShowShip: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
    const [isMerry, setIsMerry] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = progress.on("change", (latest) => {
            if (latest > 0.45 && isMerry) setIsMerry(false);
            if (latest <= 0.45 && !isMerry) setIsMerry(true);
        });
        return () => unsubscribe();
    }, [progress, isMerry]);

    return isMerry ? <MerryIcon /> : <SunnyIcon />;
}

export default GrandLineMap;

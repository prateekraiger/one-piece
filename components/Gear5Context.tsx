import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Gear5ContextType {
  isGear5: boolean;
  toggleGear5: () => void;
}

const Gear5Context = createContext<Gear5ContextType | undefined>(undefined);

export const Gear5Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGear5, setIsGear5] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio Setup
    audioRef.current = new Audio('/audio/gear5.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleGear5 = () => {
    const nextState = !isGear5;

    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    setIsGear5(nextState);
  };

  useEffect(() => {
    if (isGear5) {
      document.body.classList.add('gear5-active');
    } else {
      document.body.classList.remove('gear5-active');
    }
  }, [isGear5]);

  return (
    <Gear5Context.Provider value={{ isGear5, toggleGear5 }}>
      {/* Global Style Injection for Gear 5 */}
      {isGear5 && (
        <style>{`
          /* ===================================== */
          /* 🌟 GEAR 5: SUN GOD NIKA MODE 🌟 */
          /* ===================================== */

          :root {
            --gear5-white: #ffffff;
            --gear5-purple: #a855f7;
            --gear5-purple-light: #c084fc;
            --gear5-purple-dark: #7e22ce;
            --gear5-pink: #ec4899;
            --gear5-yellow: #fbbf24;
            --gear5-gradient: linear-gradient(135deg, #fbbf24 0%, #ec4899 50%, #a855f7 100%);
          }

          /* ========== CLOUDY TEXT ANIMATION ========== */
          @keyframes cloudyWave {
            0%, 100% {
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
            25% {
              transform: translateY(-3px) scale(1.02);
              filter: blur(0.5px);
            }
            50% {
              transform: translateY(0) scale(1.04);
              filter: blur(0px);
            }
            75% {
              transform: translateY(3px) scale(1.02);
              filter: blur(0.5px);
            }
          }

          .cloudy-text {
            animation: cloudyWave 3s ease-in-out infinite;
            text-shadow:
              2px 2px 0px #9333ea,
              -1px -1px 0px #9333ea,
              1px -1px 0px #9333ea,
              -1px 1px 0px #9333ea,
              1px 1px 0px #9333ea,
              0 0 30px rgba(251, 191, 36, 0.9),
              0 0 60px rgba(168, 85, 247, 0.6) !important;
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
          }

          /* ========== BODY & BACKGROUND ========== */
          body.gear5-active {
            background: linear-gradient(to bottom, 
              #fef3f7 0%, 
              #fdf4ff 25%,
              #fff7ed 50%, 
              #fef3f7 75%,
              #fdf4ff 100%) !important;
            color: #1e1b4b !important;
            overflow-x: hidden;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Main Container */
          body.gear5-active main {
            animation: drumPulse 1.2s ease-in-out infinite;
            background: radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08), transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.08), transparent 50%);
          }

          @keyframes drumPulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.002) rotate(0.05deg); }
            50% { transform: scale(1.004) rotate(-0.05deg); }
            75% { transform: scale(1.002) rotate(0.05deg); }
          }

          /* ========== SECTION BACKGROUNDS ========== */
          body.gear5-active .bg-ocean-black,
          body.gear5-active .bg-slate-900,
          body.gear5-active .bg-black,
          body.gear5-active .bg-\\[\\#0a0a0a\\] {
            background: linear-gradient(135deg, 
              rgba(254, 243, 247, 0.95) 0%,
              rgba(253, 244, 255, 0.95) 50%,
              rgba(255, 247, 237, 0.95) 100%) !important;
            color: #1e1b4b !important;
          }

          /* ========== TEXT COLORS ========== */
          body.gear5-active .text-white:not(.cloudy-text),
          body.gear5-active .text-slate-200,
          body.gear5-active .text-slate-300 {
            color: #7e22ce !important;
          }

          body.gear5-active .text-slate-400,
          body.gear5-active .text-slate-500,
          body.gear5-active .text-slate-600 {
            color: #a855f7 !important;
          }

          body.gear5-active .text-amber-500,
          body.gear5-active .text-amber-400 {
            background: linear-gradient(135deg, #f59e0b, #ec4899, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* ========== NAVIGATION ========== */
          body.gear5-active nav {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 2px solid rgba(168, 85, 247, 0.3) !important;
            box-shadow: 0 4px 20px rgba(168, 85, 247, 0.2);
          }

          body.gear5-active nav a,
          body.gear5-active nav span {
            color: #7e22ce !important;
            font-weight: 700;
          }

          body.gear5-active nav a:hover {
            color: #ec4899 !important;
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
          }

          /* ========== CARDS & CONTAINERS ========== */
          body.gear5-active .border-white\\/5,
          body.gear5-active .border-white\\/10,
          body.gear5-active .border-white\\/20,
          body.gear5-active .border-white\\/30 {
            border-color: rgba(168, 85, 247, 0.3) !important;
          }

          body.gear5-active .bg-black\\/40,
          body.gear5-active .bg-black\\/50,
          body.gear5-active .bg-black\\/80 {
            background: rgba(255, 255, 255, 0.9) !important;
            border: 2px solid rgba(168, 85, 247, 0.2);
            box-shadow: 0 10px 40px rgba(168, 85, 247, 0.2);
          }

          /* ========== RUBBER PHYSICS ========== */
          body.gear5-active img:not([class*=\"fixed\"]):hover,
          body.gear5-active button:not([class*=\"fixed\"]):hover,
          body.gear5-active .card:hover {
            animation: rubberBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          @keyframes rubberBounce {
            0% { transform: scale3d(1, 1, 1) rotate(0deg); }
            20% { transform: scale3d(1.15, 0.85, 1) rotate(1deg); }
            40% { transform: scale3d(0.85, 1.15, 1) rotate(-1deg); }
            60% { transform: scale3d(1.1, 0.9, 1) rotate(0.5deg); }
            80% { transform: scale3d(0.95, 1.05, 1) rotate(-0.5deg); }
            100% { transform: scale3d(1, 1, 1) rotate(0deg); }
          }

          /* ========== LUFFY SHOWCASE / CAPTAIN EVOLUTION THEME ========== */
          body.gear5-active section:has(.font-serif) {
            background: linear-gradient(135deg,
              rgba(254, 243, 247, 0.95) 0%,
              rgba(253, 244, 255, 0.9) 50%,
              rgba(255, 247, 237, 0.95) 100%
            ) !important;
          }

          /* Gear selection buttons in Luffy Showcase */
          body.gear5-active .border-amber-500\\/50 {
            border-color: rgba(168, 85, 247, 0.6) !important;
            background: rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.4) !important;
          }

          /* ========== VOYAGE SECTION ========== */
          body.gear5-active #voyage section {
            background: linear-gradient(to bottom,
              rgba(254, 243, 247, 0.95) 0%,
              rgba(253, 244, 255, 0.85) 50%,
              rgba(255, 247, 237, 0.95) 100%
            ) !important;
          }

          body.gear5-active #voyage p,
          body.gear5-active #voyage .text-slate-400 {
            color: #7e22ce !important;
          }

          body.gear5-active #voyage .group {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 2px solid rgba(168, 85, 247, 0.3) !important;
            box-shadow:
              0 10px 40px -10px rgba(168, 85, 247, 0.4),
              0 0 0 1px rgba(236, 72, 153, 0.1) inset !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          body.gear5-active #voyage .group:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow:
              0 20px 60px -10px rgba(168, 85, 247, 0.6),
              0 0 0 2px rgba(236, 72, 153, 0.3) inset !important;
          }

          body.gear5-active #voyage .absolute.inset-0.bg-gradient-to-t {
            opacity: 0.15 !important;
            background: linear-gradient(to top, rgba(126, 34, 206, 0.3), transparent) !important;
          }

          /* ========== DEVIL FRUITS & HAKI SECTIONS ========== */
          body.gear5-active #devil-fruits .from-green-900\\/40,
          body.gear5-active #devil-fruits .from-red-900\\/40,
          body.gear5-active #devil-fruits .from-amber-900\\/40,
          body.gear5-active #haki .bg-slate-900,
          body.gear5-active #haki .bg-red-900\\/20,
          body.gear5-active #haki .bg-amber-900\\/20 {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(168, 85, 247, 0.3) !important;
          }

          /* ========== SHADOWS & GLOWS ========== */
          body.gear5-active [class*=\"shadow-\"] {
            filter: drop-shadow(0 4px 20px rgba(168, 85, 247, 0.3));
          }

          /* ========== SPECIAL EFFECTS ========== */
          body.gear5-active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 15% 15%, rgba(251, 191, 36, 0.15), transparent 30%),
              radial-gradient(circle at 85% 85%, rgba(236, 72, 153, 0.15), transparent 30%),
              radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08), transparent 50%);
            pointer-events: none;
            z-index: 0;
            animation: floatingGlow 8s ease-in-out infinite;
          }

          @keyframes floatingGlow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }

          /* Ensure content stays above the effect */
          body.gear5-active main {
            position: relative;
            z-index: 1;
          }

          /* ========== SCROLLBAR ========== */
          body.gear5-active::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #fdf4ff, #fff7ed);
          }

          body.gear5-active::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #a855f7, #ec4899);
            border-radius: 10px;
          }

          body.gear5-active::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #7e22ce, #db2777);
          }

          /* ========== FOOTER ========== */
          body.gear5-active footer {
            background: linear-gradient(to top, #fdf4ff, rgba(255, 255, 255, 0.8)) !important;
            border-top: 2px solid rgba(168, 85, 247, 0.2) !important;
          }
        `}</style>
      )}
      {children}
    </Gear5Context.Provider>
  );
};

export const useGear5 = () => {
  const context = useContext(Gear5Context);
  if (!context) throw new Error('useGear5 must be used within a Gear5Provider');
  return context;
};

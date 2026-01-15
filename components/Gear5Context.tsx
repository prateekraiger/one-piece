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
          /* 🌟 GEAR 5: SUN GOD NIKA MODE (BLUE/WHITE/GOLD) 🌟 */
          /* ===================================== */

          :root {
            --gear5-white: #ffffff;
            --gear5-blue-light: #e0f2fe; /* Sky 100 */
            --gear5-blue: #38bdf8;       /* Sky 400 */
            --gear5-blue-dark: #0369a1;  /* Sky 700 */
            --gear5-blue-accent: #0ea5e9; /* Sky 500 */
            --gear5-gold: #fbbf24;       /* Amber 400 */
            --gear5-amber: #f59e0b;      /* Amber 500 */
            --gear5-sun: #fcd34d;        /* Yellow 300 */
            --gear5-gradient: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #fef3c7 100%);
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
              2px 2px 0px rgba(14, 165, 233, 0.2),
              0 0 30px rgba(56, 189, 248, 0.4),
              0 0 60px rgba(255, 255, 255, 0.9) !important;
            color: #ffffff !important;
            -webkit-text-stroke: 1px #0ea5e9;
          }

          /* ========== BODY & BACKGROUND ========== */
          body.gear5-active {
            background: linear-gradient(to bottom,
              #ffffff 0%,
              #f0f9ff 15%,
              #fef3c7 30%,
              #f0f9ff 60%,
              #ffffff 100%) !important;
            color: #0f172a !important; /* Slate 900 */
            overflow-x: hidden;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Main Container */
          body.gear5-active main {
            animation: drumPulse 1.2s ease-in-out infinite;
            background: radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15), transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.15), transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 80%) !important;
          }

          @keyframes drumPulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.002) rotate(0.05deg); }
            50% { transform: scale(1.004) rotate(-0.05deg); }
            75% { transform: scale(1.002) rotate(0.05deg); }
          }

          /* ========== GLOBAL WHITE BACKGROUND ENFORCEMENT ========== */

          /* 1. Force Body Gradient to shine through by making containers transparent */
          body.gear5-active #voyage,
          body.gear5-active #powers,
          body.gear5-active #devil-fruits,
          body.gear5-active #haki,
          body.gear5-active #crew,
          body.gear5-active main > section,
          body.gear5-active .min-h-screen {
            background-color: transparent !important;
            background-image: none !important;
          }

          /* 2. Target Specific Hardcoded Dark Backgrounds */
          body.gear5-active .bg-ocean-black,
          body.gear5-active .bg-slate-900,
          body.gear5-active .bg-black,
          body.gear5-active .bg-\[\#0a0a0a\],
          body.gear5-active .bg-\[\#080808\], /* ArcTimeline specific */
          body.gear5-active .bg-gray-900,
          body.gear5-active .bg-zinc-900,
          body.gear5-active .bg-neutral-900 {
             background-color: rgba(255, 255, 255, 0.4) !important;
             background-image: none !important;
             border-color: #bae6fd !important;
          }

          /* 3. Kill Dark Gradients in ArcTimeline & Others */
          body.gear5-active .voyage-bg-layer,
          body.gear5-active .bg-\[radial-gradient\(ellipse_at_top\,_var\(--tw-gradient-stops\)\)\],
          body.gear5-active .from-slate-900\/40,
          body.gear5-active .via-\[\#080808\],
          body.gear5-active .to-\[\#080808\],
          body.gear5-active .bg-gradient-to-t,
          body.gear5-active .bg-gradient-to-b,
          body.gear5-active .bg-gradient-to-r,
          body.gear5-active .bg-gradient-to-br {
             background: none !important;
             --tw-gradient-from: transparent !important;
             --tw-gradient-to: transparent !important;
             --tw-gradient-stops: transparent !important;
          }

          /* 4. Special Handling for Haki/Devil Fruit Cards */
          /* We want these to be white cards with blue borders, not transparent */
          body.gear5-active #devil-fruits .group,
          body.gear5-active #haki .group, /* Assuming group class on cards */
          body.gear5-active .card-container {
             background-color: rgba(255, 255, 255, 0.8) !important;
             backdrop-filter: blur(10px);
             border: 1px solid #bae6fd !important;
          }

          /* 5. Specific Component Fixes */

          /* Haki Section Colors - Override the props passed to components if classes are used */
          body.gear5-active .bg-slate-900,
          body.gear5-active .bg-red-900\/20,
          body.gear5-active .bg-amber-900\/20 {
             background-color: #f0f9ff !important; /* Very light blue */
             border: 1px solid #7dd3fc !important;
          }

          /* Voyage Timeline Lines */
          body.gear5-active .bg-white\/5 {
             background-color: rgba(14, 165, 233, 0.1) !important;
          }

          /* Overlays */
          body.gear5-active .absolute.inset-0.bg-black\/50,
          body.gear5-active .absolute.inset-0.bg-black\/60,
          body.gear5-active .absolute.inset-0.bg-black\/80,
          body.gear5-active .absolute.inset-0.bg-black\/95 {
             background-color: rgba(255, 255, 255, 0.2) !important;
             background-image: none !important;
          }

          /* Remove Dark Overlays from Images in Timeline */
          body.gear5-active .mix-blend-overlay {
             mix-blend-mode: normal !important;
             opacity: 0.1 !important;
          }

          /* ========== TEXT COLORS ========== */
          body.gear5-active .text-white:not(.cloudy-text),
          body.gear5-active .text-slate-200,
          body.gear5-active .text-slate-300,
          body.gear5-active .text-gray-300,
          body.gear5-active h1,
          body.gear5-active h2,
          body.gear5-active h3,
          body.gear5-active h4 {
            color: #0c4a6e !important; /* Sky 900 */
          }

          body.gear5-active .text-slate-400,
          body.gear5-active .text-slate-500,
          body.gear5-active .text-slate-600,
          body.gear5-active p {
            color: #334155 !important; /* Slate 700 */
          }

          /* Gold Accents - Keep these */
          body.gear5-active .text-amber-500,
          body.gear5-active .text-amber-400 {
            background: linear-gradient(135deg, #f59e0b, #fbbf24);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: #f59e0b !important;
          }

          /* Blue Accents */
          body.gear5-active .text-cyan-400,
          body.gear5-active .text-cyan-500 {
             color: #0ea5e9 !important;
          }

          /* ========== NAVIGATION ========== */
          body.gear5-active nav {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(100%);
            border-bottom: 2px solid #e0f2fe !important;
            box-shadow: 0 4px 20px rgba(14, 165, 233, 0.1);
          }

          body.gear5-active nav a,
          body.gear5-active nav span {
            color: #0369a1 !important; /* Sky 700 */
            font-weight: 800;
          }

          body.gear5-active nav a:hover {
            color: #f59e0b !important;
            text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
          }

          /* ========== CARDS & CONTAINERS ========== */
          body.gear5-active .border-white\/5,
          body.gear5-active .border-white\/10,
          body.gear5-active .border-white\/20,
          body.gear5-active .border-white\/30,
          body.gear5-active .border-slate-800 {
            border-color: #bae6fd !important; /* Sky 200 */
          }

          body.gear5-active .bg-black\/40,
          body.gear5-active .bg-black\/50,
          body.gear5-active .bg-black\/80,
          body.gear5-active .bg-slate-900,
          body.gear5-active .bg-slate-800 {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 2px solid #e0f2fe;
            box-shadow: 0 10px 40px rgba(14, 165, 233, 0.1);
          }

          /* Fix Character Grid Cards in Style */
          body.gear5-active .group.relative.overflow-hidden {
             background: #ffffff !important;
             box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }

          /* ========== RUBBER PHYSICS ========== */
          body.gear5-active img:not([class*="fixed"]):hover,
          body.gear5-active button:not([class*="fixed"]):hover,
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
              #ffffff 0%,
              #f0f9ff 100%
            ) !important;
          }

          /* Gear selection buttons in Luffy Showcase */
          body.gear5-active .border-amber-500\/50 {
            border-color: #38bdf8 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.2) !important;
          }

          /* ========== HAKI & DEVIL FRUITS FIXES ========== */
          /* Ensure text is clearly visible on white */
          body.gear5-active #haki .text-xl,
          body.gear5-active #devil-fruits .text-xl {
             color: #0c4a6e !important;
             font-weight: 700;
          }

          body.gear5-active #haki .absolute.inset-0 {
             /* Remove dark image overlays in Haki */
             background: linear-gradient(to top, rgba(255,255,255,0.9), transparent) !important;
          }

          /* Cards inner text */
          body.gear5-active #devil-fruits p,
          body.gear5-active #haki p {
              color: #475569 !important; /* Slate 600 */
          }

          /* ========== SCROLLBAR ========== */
          body.gear5-active::-webkit-scrollbar-track {
            background: #f0f9ff;
          }

          body.gear5-active::-webkit-scrollbar-thumb {
            background: #7dd3fc;
            border-radius: 10px;
          }

          body.gear5-active::-webkit-scrollbar-thumb:hover {
            background: #38bdf8;
          }

          /* ========== FOOTER ========== */
          body.gear5-active footer {
            background: #f0f9ff !important;
            border-top: 2px solid #e0f2fe !important;
          }

          /* ========== SPECIAL EFFECT (THE CLOUD VIBE) ========== */
          body.gear5-active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.05), transparent 40%),
              radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.05), transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), transparent 60%);
            pointer-events: none;
            z-index: 0;
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

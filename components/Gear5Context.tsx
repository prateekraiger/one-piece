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
          /* 🌟 GEAR 5: SUN GOD NIKA MODE - JOYBOY EDITION 🌟 */
          /* ===================================== */

          /* Import Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Mogra&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap');

          :root {
            --gear5-white: #FFFFFF;
            --gear5-blue: #38BDF8;
            --gear5-blue-light: #7DD3FC;
            --gear5-blue-dark: #0284C7;
            --gear5-sky: #0EA5E9;
            --gear5-ice: #E0F2FE;
            --gear5-shadow: #2E333F;
            --gear5-cream: #F0F9FF;
            --gear5-font-heading: 'Mogra', cursive;
            --gear5-font-body: 'Zain', sans-serif;
          }

          /* ========== FONT APPLICATION ========== */
          body.gear5-active {
            font-family: var(--gear5-font-body) !important;
          }

          body.gear5-active * {
            font-family: inherit;
          }

          body.gear5-active h1,
          body.gear5-active h2,
          body.gear5-active h3,
          body.gear5-active h4,
          body.gear5-active h5,
          body.gear5-active h6 {
            font-family: var(--gear5-font-heading) !important;
          }

          /* ========== JOYBOY ANIMATIONS ========== */
          @keyframes joyPulse {
            0%, 100% {
              box-shadow:
                0 0 60px rgba(56, 189, 248, 0.4),
                0 0 120px rgba(56, 189, 248, 0.2);
            }
            50% {
              box-shadow:
                0 0 80px rgba(56, 189, 248, 0.6),
                0 0 160px rgba(56, 189, 248, 0.3);
            }
          }

          @keyframes drumBeat {
            0%, 100% { transform: scale(1); }
            12.5% { transform: scale(1.003); }
            25% { transform: scale(1); }
            37.5% { transform: scale(1.002); }
            50% { transform: scale(1); }
            62.5% { transform: scale(1.003); }
            75% { transform: scale(1); }
            87.5% { transform: scale(1.002); }
          }

          @keyframes rayRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes floatUp {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes blueShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          /* ========== CLOUDY JOYBOY TEXT ========== */
          .cloudy-text {
            background: linear-gradient(135deg, var(--gear5-blue-dark) 0%, var(--gear5-blue) 50%, var(--gear5-white) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: floatUp 3s ease-in-out infinite;
            filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.5)) drop-shadow(0 4px 8px rgba(46, 51, 63, 0.3));
          }

          /* ========== BODY & BACKGROUND ========== */
          body.gear5-active {
            background:
              radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(125, 211, 252, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, #FFFFFF 0%, var(--gear5-cream) 50%, #FFFFFF 100%) !important;
            color: var(--gear5-shadow) !important;
            overflow-x: hidden;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Sun Rays Background Effect - Blue Tint */
          body.gear5-active::before {
            content: '';
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              rgba(56, 189, 248, 0.02) 10deg,
              transparent 20deg,
              rgba(2, 132, 199, 0.02) 30deg,
              transparent 40deg,
              rgba(56, 189, 248, 0.02) 50deg,
              transparent 60deg,
              rgba(125, 211, 252, 0.02) 70deg,
              transparent 80deg,
              rgba(56, 189, 248, 0.02) 90deg,
              transparent 100deg,
              rgba(2, 132, 199, 0.02) 110deg,
              transparent 120deg,
              rgba(56, 189, 248, 0.02) 130deg,
              transparent 140deg,
              rgba(125, 211, 252, 0.02) 150deg,
              transparent 160deg,
              rgba(56, 189, 248, 0.02) 170deg,
              transparent 180deg,
              rgba(2, 132, 199, 0.02) 190deg,
              transparent 200deg,
              rgba(56, 189, 248, 0.02) 210deg,
              transparent 220deg,
              rgba(125, 211, 252, 0.02) 230deg,
              transparent 240deg,
              rgba(56, 189, 248, 0.02) 250deg,
              transparent 260deg,
              rgba(2, 132, 199, 0.02) 270deg,
              transparent 280deg,
              rgba(56, 189, 248, 0.02) 290deg,
              transparent 300deg,
              rgba(125, 211, 252, 0.02) 310deg,
              transparent 320deg,
              rgba(56, 189, 248, 0.02) 330deg,
              transparent 340deg,
              rgba(2, 132, 199, 0.02) 350deg,
              transparent 360deg
            );
            animation: rayRotate 120s linear infinite;
            pointer-events: none;
            z-index: 0;
          }

          /* Main Container with Drum Beat */
          body.gear5-active main {
            animation: drumBeat 1.2s ease-in-out infinite;
            position: relative;
            z-index: 1;
          }

          /* ========== SECTION BACKGROUNDS ========== */
          body.gear5-active #voyage,
          body.gear5-active #powers,
          body.gear5-active #devil-fruits,
          body.gear5-active #haki,
          body.gear5-active #crew,
          body.gear5-active main > section,
          body.gear5-active .min-h-screen {
            background: transparent !important;
          }

          /* Dark Background Overrides → Premium White */
          body.gear5-active .bg-ocean-black,
          body.gear5-active .bg-slate-900,
          body.gear5-active .bg-black,
          body.gear5-active .bg-\\[\\#0a0a0a\\],
          body.gear5-active .bg-\\[\\#080808\\],
          body.gear5-active .bg-\\[\\#050505\\],
          body.gear5-active .bg-gray-900,
          body.gear5-active .bg-zinc-900,
          body.gear5-active .bg-neutral-900 {
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(20px);
          }

          /* Kill Dark Gradients */
          body.gear5-active .voyage-bg-layer,
          body.gear5-active .from-slate-900\\/40,
          body.gear5-active .via-\\[\\#080808\\],
          body.gear5-active .to-\\[\\#080808\\] {
            background: none !important;
            --tw-gradient-from: transparent !important;
            --tw-gradient-to: transparent !important;
          }

          /* ========== PREMIUM GLASSMORPHISM CARDS ========== */
          body.gear5-active #devil-fruits .group,
          body.gear5-active #haki .group,
          body.gear5-active .card-container,
          body.gear5-active .group.relative.overflow-hidden {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(180%);
            border: 2px solid rgba(56, 189, 248, 0.2) !important;
            box-shadow:
              0 8px 32px rgba(46, 51, 63, 0.06),
              0 0 0 1px rgba(255, 255, 255, 0.8) inset,
              0 0 40px rgba(56, 189, 248, 0.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          body.gear5-active #devil-fruits .group:hover,
          body.gear5-active #haki .group:hover,
          body.gear5-active .group.relative.overflow-hidden:hover {
            border-color: var(--gear5-blue) !important;
            box-shadow:
              0 16px 48px rgba(46, 51, 63, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.9) inset,
              0 0 60px rgba(56, 189, 248, 0.12);
            transform: translateY(-4px);
          }

          /* ========== PREMIUM TYPOGRAPHY ========== */
          body.gear5-active h1,
          body.gear5-active h2,
          body.gear5-active h3 {
            background: linear-gradient(135deg, var(--gear5-blue-dark) 0%, var(--gear5-blue) 50%, var(--gear5-sky) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 2px 4px rgba(56, 189, 248, 0.25));
          }

          body.gear5-active h4,
          body.gear5-active .text-white:not(.cloudy-text) {
            color: var(--gear5-shadow) !important;
            text-shadow: none;
            -webkit-text-stroke: 0;
          }

          body.gear5-active .text-slate-200,
          body.gear5-active .text-slate-300,
          body.gear5-active .text-gray-300 {
            color: #4B5563 !important;
          }

          body.gear5-active .text-slate-400,
          body.gear5-active .text-slate-500,
          body.gear5-active .text-slate-600,
          body.gear5-active p {
            color: var(--gear5-shadow) !important;
          }

          /* Blue Accent Text */
          body.gear5-active .text-amber-500,
          body.gear5-active .text-amber-400 {
            background: linear-gradient(90deg, var(--gear5-blue-dark), var(--gear5-blue));
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: blueShimmer 3s linear infinite;
          }

          body.gear5-active .text-cyan-400,
          body.gear5-active .text-cyan-500 {
            color: var(--gear5-sky) !important;
          }

          /* ========== PREMIUM NAVIGATION ========== */
          body.gear5-active nav {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 2px solid rgba(56, 189, 248, 0.15) !important;
            box-shadow:
              0 4px 30px rgba(46, 51, 63, 0.05),
              0 0 40px rgba(56, 189, 248, 0.05);
          }

          body.gear5-active nav a,
          body.gear5-active nav span {
            color: var(--gear5-shadow) !important;
            font-weight: 700;
            transition: all 0.3s ease;
          }

          body.gear5-active nav a:hover {
            color: var(--gear5-blue-dark) !important;
            text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
          }

          /* ========== PREMIUM BORDERS ========== */
          body.gear5-active .border-white\\/5,
          body.gear5-active .border-white\\/10,
          body.gear5-active .border-white\\/20,
          body.gear5-active .border-white\\/30,
          body.gear5-active .border-slate-800 {
            border-color: rgba(56, 189, 248, 0.15) !important;
          }

          /* ========== BACKGROUND OPACITY OVERRIDES ========== */
          body.gear5-active .bg-black\\/40,
          body.gear5-active .bg-black\\/50,
          body.gear5-active .bg-black\\/80,
          body.gear5-active .bg-slate-800 {
            background: rgba(255, 255, 255, 0.95) !important;
            border: 1px solid rgba(56, 189, 248, 0.1);
          }

          /* Dark Overlays → Light Sky Tint */
          body.gear5-active .absolute.inset-0.bg-black\\/50,
          body.gear5-active .absolute.inset-0.bg-black\\/60,
          body.gear5-active .absolute.inset-0.bg-black\\/80,
          body.gear5-active .absolute.inset-0.bg-black\\/95 {
            background: linear-gradient(180deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(240, 249, 255, 0.2) 100%) !important;
          }

          body.gear5-active .mix-blend-overlay {
            mix-blend-mode: soft-light !important;
            opacity: 0.3 !important;
          }

          /* ========== ENHANCED RUBBER PHYSICS ========== */
          @keyframes rubberBounce {
            0% { transform: scale3d(1, 1, 1) rotate(0deg); }
            15% { transform: scale3d(1.2, 0.8, 1) rotate(2deg); }
            30% { transform: scale3d(0.8, 1.2, 1) rotate(-2deg); }
            45% { transform: scale3d(1.15, 0.85, 1) rotate(1deg); }
            60% { transform: scale3d(0.9, 1.1, 1) rotate(-1deg); }
            75% { transform: scale3d(1.05, 0.95, 1) rotate(0.5deg); }
            100% { transform: scale3d(1, 1, 1) rotate(0deg); }
          }

          body.gear5-active img:not([class*="fixed"]):hover,
          body.gear5-active button:not([class*="fixed"]):hover,
          body.gear5-active .card:hover {
            animation: rubberBounce 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          /* ========== HAKI & DEVIL FRUITS PREMIUM STYLING ========== */
          body.gear5-active #haki,
          body.gear5-active #devil-fruits {
            position: relative;
          }

          body.gear5-active #haki::before,
          body.gear5-active #devil-fruits::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--gear5-blue), transparent);
          }

          body.gear5-active #haki .text-xl,
          body.gear5-active #devil-fruits .text-xl,
          body.gear5-active #haki .text-2xl,
          body.gear5-active #devil-fruits .text-2xl,
          body.gear5-active #haki .text-3xl,
          body.gear5-active #devil-fruits .text-3xl {
            color: var(--gear5-shadow) !important;
            font-weight: 700;
          }

          body.gear5-active #devil-fruits p,
          body.gear5-active #haki p {
            color: #4B5563 !important;
          }

          /* ========== JOYBOY SKY BUTTONS/CTAS ========== */
          body.gear5-active button.bg-red-500,
          body.gear5-active button.bg-red-600,
          body.gear5-active .cta-button {
            background: linear-gradient(135deg, var(--gear5-blue-dark) 0%, var(--gear5-sky) 100%) !important;
            border: none !important;
            box-shadow: 0 4px 20px rgba(56, 189, 248, 0.25);
          }

          body.gear5-active button.bg-red-500:hover,
          body.gear5-active button.bg-red-600:hover {
            box-shadow: 0 6px 30px rgba(56, 189, 248, 0.4);
            transform: translateY(-2px);
          }

          /* ========== PREMIUM SCROLLBAR ========== */
          body.gear5-active::-webkit-scrollbar {
            width: 10px;
          }

          body.gear5-active::-webkit-scrollbar-track {
            background: rgba(240, 249, 255, 0.5);
          }

          body.gear5-active::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--gear5-blue) 0%, var(--gear5-blue-light) 100%);
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.5);
          }

          body.gear5-active::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, var(--gear5-blue-dark) 0%, var(--gear5-blue) 100%);
          }

          /* ========== PREMIUM FOOTER ========== */
          body.gear5-active footer {
            background: linear-gradient(180deg, transparent 0%, rgba(240, 249, 255, 0.3) 100%) !important;
            border-top: 1px solid rgba(56, 189, 248, 0.12) !important;
          }

          body.gear5-active footer a {
            color: var(--gear5-shadow) !important;
          }

          body.gear5-active footer a:hover {
            color: var(--gear5-blue-dark) !important;
          }

          /* ========== SELECTION COLOR ========== */
          body.gear5-active ::selection {
            background: var(--gear5-blue);
            color: white;
          }

          /* ========== IMAGE ENHANCEMENTS ========== */
          body.gear5-active img {
            filter: brightness(1.02) contrast(1.02);
          }

          /* ========== GEAR 5 SPECIFIC COMPONENTS ========== */
          body.gear5-active .border-amber-500\\/50 {
            border-color: var(--gear5-blue) !important;
            background: rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.12) !important;
          }

          /* Premium Loading/Transition Effect */
          body.gear5-active main > * {
            animation: fadeInGear5 0.6s ease-out forwards;
          }

          @keyframes fadeInGear5 {
            from {
              opacity: 0.8;
              filter: brightness(1.3);
            }
            to {
              opacity: 1;
              filter: brightness(1);
            }
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

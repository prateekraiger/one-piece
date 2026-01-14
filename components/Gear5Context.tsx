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
    audioRef.current = new Audio('https://ia804705.us.archive.org/26/items/one-piece-drums-of-liberation/One%20Piece%20-%20Drums%20Of%20Liberation.mp3'); // Public Archive.org link
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleGear5 = () => {
    setIsGear5((prev) => !prev);
  };

  useEffect(() => {
    if (isGear5) {
      document.body.classList.add('gear5-active');
      audioRef.current?.play().catch(e => console.log('Audio play failed (user interaction needed):', e));
    } else {
      document.body.classList.remove('gear5-active');
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [isGear5]);

  return (
    <Gear5Context.Provider value={{ isGear5, toggleGear5 }}>
      {/* Global Style Injection for Gear 5 */}
      {isGear5 && (
        <style>{`
          /* NIKA MODE STYLES */
          :root {
            --gear5-white: #ffffff;
            --gear5-purple: #a855f7;
          }

          body.gear5-active {
            background-color: white !important;
            color: black !important;
            overflow-x: hidden;
            transition: background-color 0.5s ease;
          }

          /* Invert dark sections to light */
          .bg-ocean-black, .bg-slate-900, .bg-black {
             background-color: white !important;
             color: black !important;
          }

          /* Text transformations */
          .text-white, .text-slate-200, .text-slate-300, .text-slate-400, .text-slate-500 {
            color: black !important;
          }

          /* Rubber Physics on Hover */
          img, button, .card {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          img:hover, button:hover {
            animation: rubberBand 1s infinite;
          }

          /* Funky Animations */
          @keyframes rubberBand {
            0% { transform: scale3d(1, 1, 1); }
            30% { transform: scale3d(1.25, 0.75, 1); }
            40% { transform: scale3d(0.75, 1.25, 1); }
            50% { transform: scale3d(1.15, 0.85, 1); }
            65% { transform: scale3d(0.95, 1.05, 1); }
            75% { transform: scale3d(1.05, 0.95, 1); }
            100% { transform: scale3d(1, 1, 1); }
          }

          /* Drums Beat Pulse */
          body.gear5-active main {
            animation: drumPulse 0.5s infinite;
          }
          @keyframes drumPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.002); } /* Subtle worldview heartbeat */
          }

          /* --- VOYAGE LOG OVERROUNDS --- */
          /* Ensure the Voyage Log background is properly white/celestial */
          body.gear5-active #voyage section {
            background-color: #ffffff !important;
            background-image:
              radial-gradient(circle at top right, rgba(168, 85, 247, 0.1), transparent 40%),
              radial-gradient(circle at bottom left, rgba(234, 179, 8, 0.1), transparent 40%) !important;
          }

          /* Fix text contrast in Voyage cards */
          body.gear5-active #voyage h2 {
            color: #000000 !important;
            text-shadow: none !important;
          }
          body.gear5-active #voyage p {
            color: #334155 !important;
          }

          /* Card Borders and Backgrounds in Gear 5 */
          body.gear5-active #voyage .group {
            background-color: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(168, 85, 247, 0.2) !important;
            box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.3) !important;
          }

          /* Remove dark gradients on images so they pop in white mode */
          body.gear5-active #voyage .absolute.inset-0.bg-gradient-to-t {
             opacity: 0.2 !important; /* Reduce darkness overlay */
          }

          /* Timeline Progress Bar */
          body.gear5-active #voyage .bg-white\/5 {
             background-color: rgba(0,0,0,0.1) !important;
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

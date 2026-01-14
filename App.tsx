import React from 'react';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Hero from './components/Hero';
import LuffyShowcase from './components/LuffyShowcase';
import ArcTimeline from './components/ArcTimeline';
import CharacterGrid from './components/CharacterGrid';
import Footer from './components/Footer';
import DevilFruitSection from './components/DevilFruitSection';
import HakiSection from './components/HakiSection';
import SoundController from './components/ui/SoundController';
import SmoothScroll from './components/SmoothScroll';

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full bg-ocean-black text-slate-200 selection:bg-amber-500 selection:text-black">
        <NoiseOverlay />
        <SoundController />

        {/* Sticky Navigation Hint */}
        <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
           <span className="font-serif font-bold text-lg pointer-events-auto cursor-pointer">OP ARCHIVE</span>
           <div className="flex gap-4 pointer-events-auto">
             <button className="text-sm font-bold uppercase tracking-widest hover:text-amber-500 transition-colors">Menu</button>
           </div>
        </nav>

        <Hero />
        <LuffyShowcase />
        <ArcTimeline />

        {/* Power Systems */}
        <div className="relative z-10 border-t border-white/5">
          <DevilFruitSection />
          <HakiSection />
        </div>

        <CharacterGrid />
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default App;

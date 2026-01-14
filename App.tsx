import React from 'react';
import { motion } from 'framer-motion';
import NoiseOverlay from './components/ui/NoiseOverlay';
import SeaDust from './components/ui/SeaDust';
import Hero from './components/Hero';
import LuffyShowcase from './components/LuffyShowcase';
import ArcTimeline from './components/ArcTimeline';
import CharacterGrid from './components/CharacterGrid';
import Footer from './components/Footer';
import DevilFruitSection from './components/DevilFruitSection';
import HakiSection from './components/HakiSection';
import SoundController from './components/ui/SoundController';
import SmoothScroll from './components/SmoothScroll';

const SectionWrapper: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className }) => (
  <motion.div
    id={id}
    className={className}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full bg-ocean-black text-slate-200 selection:bg-amber-500 selection:text-black">
        <NoiseOverlay />
        <SeaDust />
        <SoundController />

        {/* Sticky Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5 transition-all duration-300 hover:bg-black/40">
           <span className="font-serif font-black text-xl text-white tracking-widest cursor-pointer hover:text-amber-500 transition-colors">
             OP ARCHIVE
           </span>
           <div className="hidden md:flex gap-8 text-white text-xs font-bold uppercase tracking-[0.2em]">
             <a href="#voyage" className="hover:text-amber-500 transition-colors cursor-pointer">Voyage</a>
             <a href="#powers" className="hover:text-amber-500 transition-colors cursor-pointer">Powers</a>
             <a href="#crew" className="hover:text-amber-500 transition-colors cursor-pointer">Crew</a>
           </div>
        </nav>

        <Hero />

        <SectionWrapper>
          <LuffyShowcase />
        </SectionWrapper>

        <div id="voyage">
          <ArcTimeline />
        </div>

        {/* Power Systems */}
        <div id="powers" className="relative z-10 border-t border-white/5">
          <SectionWrapper>
            <DevilFruitSection />
          </SectionWrapper>
          <SectionWrapper>
            <HakiSection />
          </SectionWrapper>
        </div>

        <div id="crew">
          <CharacterGrid />
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default App;

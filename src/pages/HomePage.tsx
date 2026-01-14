import React from 'react';
import Hero from '../../components/Hero';
import LuffyShowcase from '../../components/LuffyShowcase';
import ArcTimeline from '../../components/ArcTimeline';
import GrandLineMap from '../../components/GrandLineMap';
import DevilFruitSection from '../../components/DevilFruitSection';
import HakiSection from '../../components/HakiSection';
import CharacterGrid from '../../components/CharacterGrid';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <LuffyShowcase />

      <section id="voyage" className="relative min-h-screen">
        <ArcTimeline />
        <GrandLineMap />
      </section>

      <div id="powers" className="relative z-10">
        <DevilFruitSection />
        <HakiSection />
      </div>

      <div id="crew">
        <CharacterGrid />
      </div>
    </>
  );
};

export default HomePage;

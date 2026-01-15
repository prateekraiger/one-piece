import React from 'react';
import Hero from '../../components/Hero';
import LuffyShowcase from '../../components/LuffyShowcase';
import ArcTimeline from '../../components/ArcTimeline';
import DevilFruitSection from '../../components/DevilFruitSection';
import HakiSection from '../../components/HakiSection';
import CharacterGrid from '../../components/CharacterGrid';
import MemoriesGallery from '../../components/MemoriesGallery';
import LegacyQuotes from '../../components/LegacyQuotes';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <LuffyShowcase />

      <section id="voyage" className="relative min-h-screen">
        <ArcTimeline />
      </section>

      <div id="powers" className="relative z-10">
        <DevilFruitSection />
        <HakiSection />
      </div>

      <div id="memories">
        <MemoriesGallery />
      </div>

      <div id="legacy">
        <LegacyQuotes />
      </div>

      <div id="crew">
        <CharacterGrid />
      </div>
    </>
  );
};

export default HomePage;

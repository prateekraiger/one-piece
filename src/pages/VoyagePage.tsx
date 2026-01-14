import React from 'react';
import ArcTimeline from '../../components/ArcTimeline';
import GrandLineMap from '../../components/GrandLineMap';

const VoyagePage: React.FC = () => {
    // GrandLineMap was previously in ArcTimeline or handled along with it.
    // If it was global, we should check. Assuming it goes with Voyage.
  return (
    <div className="pt-24 min-h-screen bg-ocean-black">
      <div className="container mx-auto px-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-white text-center mb-4">The Great Voyage</h1>
          <p className="text-center text-slate-400 max-w-2xl mx-auto italic">"I'm going to become the King of the Pirates!"</p>
      </div>
      <div className="relative">
          <ArcTimeline />
          <GrandLineMap />
      </div>
    </div>
  );
};

export default VoyagePage;

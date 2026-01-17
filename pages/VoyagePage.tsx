import React from 'react';
import ArcTimeline from '../components/ArcTimeline';
import GrandLineMap from '../components/GrandLineMap';

const VoyagePage: React.FC = () => {
    // GrandLineMap was previously in ArcTimeline or handled along with it.
    // If it was global, we should check. Assuming it goes with Voyage.
  return (
    <div id="voyage" className="pt-24 min-h-screen bg-ocean-black">
      <div className="relative">
          <ArcTimeline />
          <GrandLineMap />
      </div>
    </div>
  );
};

export default VoyagePage;

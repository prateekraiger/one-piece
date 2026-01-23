import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoiseOverlay from './components/ui/NoiseOverlay';
import SeaDust from './components/ui/SeaDust';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import { Gear5Provider } from './components/Gear5Context';
import Gear5Trigger from './components/Gear5Trigger';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import VoyagePage from './pages/VoyagePage';
import DevilFruitsPage from './pages/DevilFruitsPage';
import HakiPage from './pages/HakiPage';
import WantedPage from './pages/WantedPage';

import Gear5Animations from './components/Gear5Animations';

const App: React.FC = () => {
  return (
    <Router>
      <Gear5Provider>
        <SmoothScroll>
          <main className="relative min-h-screen w-full bg-[linear-gradient(to_bottom,#050505_0%,#0a192f_50%,#050505_100%)] text-slate-200 selection:bg-cyan-500 selection:text-white">
            <NoiseOverlay />
            <SeaDust />
            <Gear5Trigger />
            <Gear5Animations />
            <Navbar />

            <div className="pt-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/voyage" element={<VoyagePage />} />
                <Route path="/devil-fruits" element={<DevilFruitsPage />} />
                <Route path="/haki" element={<HakiPage />} />
                <Route path="/wanted" element={<WantedPage />} />
              </Routes>
            </div>

            <Footer />
          </main>
        </SmoothScroll>
      </Gear5Provider>
    </Router>
  );
};

export default App;

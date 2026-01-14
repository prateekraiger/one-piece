import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NoiseOverlay from './components/ui/NoiseOverlay';
import SeaDust from './components/ui/SeaDust';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import { Gear5Provider } from './components/Gear5Context';
import Gear5Trigger from './components/Gear5Trigger';
import { Menu, X } from 'lucide-react';

// Pages
import HomePage from './src/pages/HomePage';
import VoyagePage from './src/pages/VoyagePage';
import DevilFruitsPage from './src/pages/DevilFruitsPage';
import HakiPage from './src/pages/HakiPage';
import WantedPage from './src/pages/WantedPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-cyan-500' : 'text-white';

  const navLinks = [
    { name: 'Voyage', path: '/voyage' },
    { name: 'Powers', path: '/devil-fruits' }, // Linking to main powers page? Or split? Let's use Devil Fruits as "Powers" link or list both.
    { name: 'Haki', path: '/haki' },
    { name: 'Crew', path: '/wanted' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5 transition-all duration-300">
       <Link to="/" className="font-serif font-black text-xl text-white tracking-widest cursor-pointer hover:text-cyan-400 transition-colors z-50">
         OP ARCHIVE
       </Link>

       {/* Desktop Nav */}
       <div className="hidden md:flex gap-8 text-white text-xs font-bold uppercase tracking-[0.2em]">
         {navLinks.map((link) => (
           <Link
             key={link.name}
             to={link.path}
             className={`hover:text-cyan-400 transition-colors ${isActive(link.path)}`}
           >
             {link.name}
           </Link>
         ))}
       </div>

       {/* Mobile Menu Toggle */}
       <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-50 hover:text-cyan-400 transition-colors">
         {isOpen ? <X size={24} /> : <Menu size={24} />}
       </button>

       {/* Mobile Nav Overlay */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="absolute top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center gap-8 text-xl font-serif font-bold uppercase tracking-widest md:hidden z-40"
           >
             <Link to="/" onClick={() => setIsOpen(false)} className="text-white hover:text-cyan-400">Home</Link>
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 to={link.path}
                 onClick={() => setIsOpen(false)}
                 className="text-white hover:text-cyan-400"
               >
                 {link.name}
               </Link>
             ))}
           </motion.div>
         )}
       </AnimatePresence>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Gear5Provider>
        <SmoothScroll>
          <main className="relative min-h-screen w-full bg-ocean-black text-slate-200 selection:bg-cyan-500 selection:text-white">
            <NoiseOverlay />
            <SeaDust />
            <Gear5Trigger />
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

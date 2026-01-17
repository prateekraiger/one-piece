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
import HomePage from './pages/HomePage';
import VoyagePage from './pages/VoyagePage';
import DevilFruitsPage from './pages/DevilFruitsPage';
import HakiPage from './pages/HakiPage';
import WantedPage from './pages/WantedPage';

import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-cyan-500' : 'text-white';

  const navLinks = [
    { name: 'Voyage', path: '/voyage' },
    { name: 'Powers', path: '/devil-fruits' },
    { name: 'Haki', path: '/haki' },
    { name: 'Crew', path: '/wanted' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5 transition-all duration-300">
       <Link to="/" className="font-serif font-black text-lg md:text-xl text-white tracking-widest cursor-pointer hover:text-cyan-400 transition-colors z-50">
         OP ARCHIVE
       </Link>

       {/* Desktop Nav */}
       <div className="hidden md:flex gap-6 lg:gap-8 text-white text-xs font-bold uppercase tracking-[0.2em] absolute left-1/2 -translate-x-1/2">
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

       {/* Right Side Actions */}
       <div className="flex items-center gap-4 z-50">
         <AnimatedThemeToggler />

         {/* Mobile Menu Toggle */}
         <button
           onClick={() => setIsOpen(!isOpen)}
           className="md:hidden text-white hover:text-cyan-400 transition-colors p-2"
           aria-label="Toggle menu"
         >
           {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
       </div>

       {/* Mobile Nav Overlay */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="absolute top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-xl font-serif font-bold uppercase tracking-widest md:hidden z-40"
           >
             <Link
               to="/"
               onClick={() => setIsOpen(false)}
               className={`text-white hover:text-cyan-400 transition-colors ${location.pathname === '/' ? 'text-cyan-400' : ''}`}
             >
               Home
             </Link>
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 to={link.path}
                 onClick={() => setIsOpen(false)}
                 className={`text-white hover:text-cyan-400 transition-colors ${location.pathname === link.path ? 'text-cyan-400' : ''}`}
               >
                 {link.name}
               </Link>
             ))}

             {/* Mobile Menu Decoration */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="w-2 h-2 rounded-full bg-cyan-400"
                   animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                   transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                 />
               ))}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </nav>
  );
};

import Gear5Animations from './components/Gear5Animations';

const App: React.FC = () => {
  return (
    <Router>
      <Gear5Provider>
        <SmoothScroll>
          <main className="relative min-h-screen w-full bg-ocean-black text-slate-200 selection:bg-cyan-500 selection:text-white">
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

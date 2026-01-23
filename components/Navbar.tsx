import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  const navLinks = [
    { name: 'Voyage', path: '/voyage' },
    { name: 'Powers', path: '/devil-fruits' },
    { name: 'Haki', path: '/haki' },
    { name: 'Crew', path: '/wanted' },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > 100 && latest > previous) {
      setIsScrolledDown(true);
    } else {
      setIsScrolledDown(false);
    }
  });

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${isScrolledDown ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Background Blur Layer */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/5" />

      <div className="relative w-full px-6 py-4 md:py-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="font-serif font-black text-lg md:text-xl text-white tracking-widest cursor-pointer hover:text-cyan-400 transition-colors z-50">
          OP ARCHIVE
        </Link>

        {/* Right Side Actions - Only Menu Button Now */}
        <div className="flex items-center gap-4 z-50">

          {/* Menu Button - Always visible */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-cyan-400 transition-colors p-2"
            aria-label="Toggle menu"
          >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-2xl font-serif font-bold uppercase tracking-widest z-40"
          >
             {/* Close Button specific for this overlay */}
             <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

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
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 opacity-50">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

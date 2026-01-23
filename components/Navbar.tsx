import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Stagger animation for menu items
  const menuVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.5, ease: "circIn", staggerDirection: -1 }
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: { duration: 0.5, ease: "circOut", staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 50 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${isScrolledDown ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Background Blur Layer - Standard State */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/5" />

        <div className="relative w-full px-6 py-4 md:py-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="font-serif font-black text-lg md:text-xl text-white tracking-widest cursor-pointer hover:text-cyan-400 transition-colors z-50">
            OP ARCHIVE
          </Link>

          {/* Menu Button */}
          <div className="flex items-center gap-4 z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 transition-colors p-2 relative group"
              aria-label="Toggle menu"
            >
              <div className="relative z-10">
                  {isOpen ? <X size={32} /> : <Menu size={32} />}
              </div>
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 blur-md" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
             {/* Logo in Menu Overlay */}
             <div className="absolute top-6 left-6 z-50 font-serif font-black text-lg md:text-xl text-white tracking-widest opacity-50">
                OP ARCHIVE
             </div>

             {/* Close Button */}
             <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-white hover:text-cyan-400 transition-colors p-2"
            >
              <X size={32} />
            </button>

             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black" />

             {/* Navigation Links */}
             <div
              className="flex flex-col items-center gap-8 md:gap-12 relative z-10 w-full max-h-screen overflow-y-auto py-20"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {navLinks.map((link, index) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-4xl md:text-7xl font-display font-black uppercase tracking-tighter transition-all duration-300
                      ${location.pathname === link.path
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
                        : 'text-white/50 hover:text-white hover:scale-105'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Decorative Footer */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5, transition: { delay: 0.6 } }}
               className="absolute bottom-10 left-0 w-full text-center text-white/30 text-xs tracking-[0.5em] font-serif uppercase pointer-events-none"
             >
               The Great Pirate Era
             </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

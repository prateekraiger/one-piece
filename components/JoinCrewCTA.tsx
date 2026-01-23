import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JoinCrewCTA: React.FC = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden flex flex-col items-center justify-center text-center px-6">

      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-80" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase italic"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            Set Sail
          </span>
          For The Unknown
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl font-serif leading-relaxed"
        >
          The world has entered a Great Era of Pirates.
          Will you seek the ultimate treasure, or will you be left behind in the waves of history?
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/voyage" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300 rounded-sm overflow-hidden">
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default JoinCrewCTA;

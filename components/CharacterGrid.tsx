import React from 'react';
import { motion } from 'framer-motion';
import { CHARACTERS } from '../constants';

const CharacterGrid: React.FC = () => {
  return (
    <section className="relative w-full bg-[#080808] py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#080808] to-[#080808]" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">Most Wanted</h2>
            <p className="text-slate-400">Figures that shaped the era.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="text-amber-500 text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
              View All Bounties +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CHARACTERS.map((char) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative h-[450px] overflow-hidden rounded-xl bg-slate-900 border border-white/5 grayscale transition-all duration-500 hover:grayscale-0 hover:border-amber-500/30"
            >
              <img
                src={char.image}
                alt={char.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-amber-500 text-xs font-bold tracking-wider uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {char.role}
                </p>
                <h3 className="font-serif text-xl font-bold text-white leading-none mb-2">
                  {char.name}
                </h3>
                <p className="text-slate-400 text-xs italic mb-3">{char.epithet}</p>
                <div className="inline-block border border-white/20 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-white font-mono">
                  {char.bounty}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterGrid;
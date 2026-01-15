import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGear5 } from './Gear5Context';
import { Quote } from 'lucide-react';

interface LegacyQuote {
  id: string;
  character: string;
  quote: string;
  context: string;
  theme: string;
}

const LEGACY_QUOTES: LegacyQuote[] = [
  {
    id: '1',
    character: 'Gol D. Roger',
    quote: 'Inherited Will, The Destiny of the Age, and The Dreams of the People. As long as people continue to pursue freedom, these things will never cease to be!',
    context: 'The words that started it all',
    theme: 'from-amber-500 to-orange-600'
  },
  {
    id: '2',
    character: 'Monkey D. Luffy',
    quote: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!",
    context: 'The true meaning of freedom',
    theme: 'from-red-500 to-red-700'
  },
  {
    id: '3',
    character: 'Nico Robin',
    quote: 'I want to live! Take me out to sea with you!',
    context: 'Enies Lobby - The cry of hope',
    theme: 'from-purple-500 to-purple-700'
  },
  {
    id: '4',
    character: 'Dr. Hiriluk',
    quote: 'When do you think people die? When they are shot through the heart? No. When they eat a soup made of poisonous mushrooms? No! People die... when they are forgotten!',
    context: 'The immortality of will',
    theme: 'from-pink-500 to-rose-600'
  },
  {
    id: '5',
    character: 'Whitebeard',
    quote: 'One Piece... does exist!',
    context: 'Final words that shook the world',
    theme: 'from-slate-400 to-slate-600'
  },
  {
    id: '6',
    character: 'Portgas D. Ace',
    quote: 'Thank you for loving me!',
    context: 'A brother\'s final gratitude',
    theme: 'from-orange-500 to-red-600'
  }
];

const LegacyQuotes: React.FC = () => {
  const { isGear5 } = useGear5();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className={`relative min-h-screen py-20 md:py-32 px-4 md:px-8 overflow-hidden transition-all duration-700 ${
        isGear5 
          ? 'bg-gradient-to-br from-white via-sky-50 to-amber-50' 
          : 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a]'
      }`}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
            isGear5 ? 'bg-sky-300' : 'bg-amber-500'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
            isGear5 ? 'bg-amber-300' : 'bg-cyan-500'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`inline-block mb-4 px-6 py-2 rounded-full transition-all duration-700 ${
              isGear5 
                ? 'bg-gradient-to-r from-sky-100 to-amber-100 border-2 border-sky-300' 
                : 'bg-white/5 border border-amber-500/30'
            }`}
          >
            <span className={`text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-700 ${
              isGear5 ? 'text-sky-700' : 'text-amber-400'
            }`}>
              Inherited Will
            </span>
          </motion.div>
          
          <h2 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-colors duration-700 ${
            isGear5 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-900 to-amber-600' 
              : 'text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]'
          }`}>
            Words That Echo Forever
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto font-light transition-colors duration-700 ${
            isGear5 ? 'text-slate-600' : 'text-slate-400'
          }`}>
            The voices of those who changed the world, carrying dreams across generations
          </p>
        </motion.div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {LEGACY_QUOTES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className={`relative p-8 md:p-10 rounded-2xl transition-all duration-700 ${
                isGear5 
                  ? 'bg-white/80 backdrop-blur-sm border-2 border-sky-200 shadow-xl hover:shadow-2xl hover:border-sky-400' 
                  : 'bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50'
              }`}>
                {/* Quote Icon */}
                <div className={`absolute top-6 right-6 opacity-20 transition-all duration-700 ${
                  isGear5 ? 'text-sky-400' : 'text-amber-500'
                }`}>
                  <Quote size={48} strokeWidth={1.5} />
                </div>

                {/* Character Name */}
                <div className="mb-4">
                  <h3 className={`font-serif text-xl md:text-2xl font-bold bg-gradient-to-r ${item.theme} bg-clip-text text-transparent`}>
                    {item.character}
                  </h3>
                  <div className={`mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${item.theme}`} />
                </div>

                {/* Quote */}
                <blockquote className={`text-base md:text-lg leading-relaxed mb-6 font-serif italic transition-colors duration-700 ${
                  isGear5 ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  "{item.quote}"
                </blockquote>

                {/* Context */}
                <p className={`text-sm uppercase tracking-wider font-bold transition-colors duration-700 ${
                  isGear5 ? 'text-sky-600' : 'text-amber-400/80'
                }`}>
                  {item.context}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${item.theme} mix-blend-overlay`} style={{ opacity: 0.05 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className={`text-lg md:text-xl font-serif italic transition-colors duration-700 ${
            isGear5 
              ? 'text-sky-800' 
              : 'text-slate-300'
          }`}>
            "These things shall never be stopped!"
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LegacyQuotes;

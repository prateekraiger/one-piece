import React from 'react';
import ScrollReveal from './ScrollReveal';

const HilulukQuote: React.FC = () => {
  return (
    <section className="relative w-full py-24 md:py-40 flex flex-col items-center justify-center bg-transparent z-20">

      {/* Decorative gradient - optional, depending on where it sits */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          textClassName="text-2xl md:text-4xl font-serif text-slate-300 leading-relaxed"
        >
          "When does a man die?
          When he is hit by a bullet?
          No!
          When he suffers a disease?
          No!
          When he ate a soup made out of a poisonous mushroom?
          No!"
        </ScrollReveal>

        <div className="h-16" /> {/* Spacer */}

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={-2}
          blurStrength={10}
          textClassName="text-3xl md:text-5xl font-serif font-bold text-rose-500 leading-tight"
        >
          "A man dies when he is forgotten!"
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HilulukQuote;

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Ultra-smooth Awwwards-style scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard expo out for snappy feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add scroll event listener for other components to use
    lenis.on('scroll', (e: any) => {
      // Dispatch custom event with scroll data
      window.dispatchEvent(
        new CustomEvent('lenisScroll', {
          detail: { scroll: e.scroll, velocity: e.velocity },
        })
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from './components/hero/HeroSection';
import { WhySection } from './components/why/WhySection';
import { DataSection } from './components/ecosystem/DataSection';
import { RainBackground } from './components/hero/RainBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans">
      {/* Global Background Layer */}
      <div className="fixed inset-0 bg-black pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Drought Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/assets/images/drought-bg.jpg)' }}
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Lightning Canvas */}
        <div className="absolute inset-0 mix-blend-screen">
          <RainBackground />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <WhySection />
        <DataSection />
      </div>
    </div>
  );
}

export default App;

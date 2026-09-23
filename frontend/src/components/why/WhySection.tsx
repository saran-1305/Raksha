import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhyLayout } from './WhyLayout';

gsap.registerPlugin(ScrollTrigger);

export const WhySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0); // 0, 1, 2, 3

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create a ScrollTrigger that scrubs through the 4 stages
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          let stage = Math.floor(self.progress * 4);
          if (stage > 3) stage = 3;
          if (stage < 0) stage = 0;
          
          setActiveStage(stage);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] font-sans z-20"
      id="why-raksha"
    >
      <WhyLayout activeStage={activeStage} />
    </section>
  );
};

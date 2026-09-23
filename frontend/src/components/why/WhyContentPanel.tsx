import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { StageContent } from './StageContent';

interface WhyContentPanelProps {
  activeStage: number;
}

export const WhyContentPanel: React.FC<WhyContentPanelProps> = ({ activeStage }) => {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Handle stage transitions
  useEffect(() => {
    if (!contentContainerRef.current) return;
    
    // We get the specific stage content div using a data attribute or class
    const currentContent = contentContainerRef.current.querySelector(`[data-stage="${activeStage}"]`);
    const otherContents = contentContainerRef.current.querySelectorAll(`[data-stage]:not([data-stage="${activeStage}"])`);

    gsap.to(otherContents, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
      pointerEvents: 'none',
    });

    gsap.fromTo(currentContent, 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', pointerEvents: 'auto' }
    );
  }, [activeStage]);

  return (
    <div className="flex w-full items-center h-full">
      {/* Main Glassmorphism Card */}
      <div 
        className="flex-grow rounded-[16px] p-5 border relative z-10"
        style={{
          backgroundColor: 'rgba(5, 12, 20, 0.72)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(66, 217, 232, 0.12)',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
        }}
      >
        <div ref={contentContainerRef} className="grid w-full">
          <StageContent stage={0} activeStage={activeStage} />
          <StageContent stage={1} activeStage={activeStage} />
          <StageContent stage={2} activeStage={activeStage} />
          <StageContent stage={3} activeStage={activeStage} />
        </div>
      </div>
    </div>
  );
};

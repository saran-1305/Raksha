import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { DataSourcesPanel } from './DataSourcesPanel';

// We will build these overlay components later. For now, placeholders.
import { Stage1Overlay } from './terrain/Stage1Overlay';
import { Stage2Overlay } from './terrain/Stage2Overlay';
import { Stage3Overlay } from './terrain/Stage3Overlay';
import { Stage4Overlay } from './terrain/Stage4Overlay';

interface WhyVisualContainerProps {
  activeStage: number;
}

export const WhyVisualContainer: React.FC<WhyVisualContainerProps> = ({ activeStage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const currentVisual = containerRef.current.querySelector(`[data-visual="${activeStage}"]`);
    const otherVisuals = containerRef.current.querySelectorAll(`[data-visual]:not([data-visual="${activeStage}"])`);

    // Old images exit to the left
    gsap.to(otherVisuals, {
      opacity: 0,
      x: -80,
      duration: 1.0,
      ease: 'power3.out',
      pointerEvents: 'none',
      position: 'absolute',
    });

    // New image enters from the right
    gsap.fromTo(currentVisual,
      { opacity: 0, x: 120, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'expo.out', pointerEvents: 'auto', position: 'absolute' }
    );
  }, [activeStage]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 
        The mask container.
        Soft fade on left, right, top, bottom using linear gradients.
      */}
      <div 
        className="relative w-full max-w-4xl aspect-[3/4] md:aspect-square lg:aspect-[4/3] rounded-[40px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        >
          <div ref={containerRef} className="relative w-full h-full">
            {/* We render the master terrain 4 times, each with its unique overlay, to achieve the slide transition */}
            
            <TerrainSlide stage={0} activeStage={activeStage}>
              <Stage1Overlay />
            </TerrainSlide>

            <TerrainSlide stage={1} activeStage={activeStage}>
              <Stage2Overlay />
            </TerrainSlide>

            <TerrainSlide stage={2} activeStage={activeStage}>
              <Stage3Overlay />
            </TerrainSlide>

            <TerrainSlide stage={3} activeStage={activeStage}>
              <Stage4Overlay />
            </TerrainSlide>
          </div>
        </div>
      </div>

      <DataSourcesPanel />
    </div>
  );
};

const TerrainSlide: React.FC<{ stage: number; activeStage: number; children: React.ReactNode }> = ({ stage, activeStage, children }) => {
  return (
    <div 
      data-visual={stage}
      className={`absolute inset-0 w-full h-full ${stage === activeStage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <img 
        src="/assets/images/terrain_master.jpg" 
        alt="Geospatial Terrain"
        className="absolute inset-0 w-full h-full object-cover opacity-80" 
      />
      
      {/* Dark vignette strictly on the image to blend */}
      <div className="absolute inset-0 bg-raksha-900/20 mix-blend-multiply pointer-events-none" />
      
      {/* The interactive/animated intelligence overlays */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  );
};

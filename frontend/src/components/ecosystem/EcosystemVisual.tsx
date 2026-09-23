import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { dataSources } from './dataSources';
import { DataNode } from './DataNode';
import { ConnectionLines } from './ConnectionLines';

interface EcosystemVisualProps {
  progress: number;
  currentStage: number;
  activeSourceId: string | null;
  onSourceHover: (id: string | null) => void;
}

export const EcosystemVisual: React.FC<EcosystemVisualProps> = ({ 
  progress, 
  currentStage, 
  activeSourceId, 
  onSourceHover 
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const terrainRef = useRef<HTMLDivElement>(null);
  const coreContainerRef = useRef<HTMLDivElement>(null);
  const nodesContainerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Determine which sources are visible based on stage
  const getVisibleSources = () => {
    if (currentStage === 1) return []; // Intro
    if (currentStage === 2) return ['dem', 'weather', 'sentinel1', 'sentinel2']; // Env
    if (currentStage === 3) return ['dem', 'weather', 'sentinel1', 'sentinel2', 'osm', 'aoi']; // Context
    return dataSources.map(s => s.id); // Stages 4 and 5 (All visible)
  };

  const visibleSources = getVisibleSources();

  // Terrain reveal animation
  useEffect(() => {
    if (!terrainRef.current) return;
    
    // Terrain starts completely dark, reveals at progress > 0.05 up to a MAX opacity of 0.35
    const maxTerrainOpacity = 0.35;
    const terrainOpacity = progress < 0.05 ? 0 : Math.min(maxTerrainOpacity, (progress - 0.05) * 2);
    
    gsap.to(terrainRef.current, {
      opacity: terrainOpacity,
      duration: 0.5,
      ease: 'none'
    });

    // Subtly animate the entire 3D scene based on scroll progress
    if (sceneRef.current) {
      // rotateX: 0 -> 4deg, scale: 1 -> 1.06, translateZ: 0 -> 80px, translateY: 0 -> -20px
      gsap.to(sceneRef.current, {
        rotateX: progress * 4,
        scale: 1 + (progress * 0.06),
        z: progress * 80,
        y: progress * -20,
        duration: 0.5,
        ease: 'none'
      });
    }

    // Parallax layers based on progress
    if (coreContainerRef.current) gsap.to(coreContainerRef.current, { z: 40 + (progress * 20), duration: 0.5, ease: 'none' });
    if (nodesContainerRef.current) gsap.to(nodesContainerRef.current, { z: 20 + (progress * 30), duration: 0.5, ease: 'none' });
    if (svgContainerRef.current) gsap.to(svgContainerRef.current, { z: 10 + (progress * 15), duration: 0.5, ease: 'none' });

  }, [progress]);

  // Core breathing animation
  const innerCoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!innerCoreRef.current) return;
    
    const coreAppear = progress > 0.1 ? 1 : 0;
    
    gsap.to(innerCoreRef.current, {
      opacity: coreAppear,
      scale: coreAppear ? 1 : 0.8,
      duration: 1,
      ease: 'power3.out'
    });

    if (coreAppear) {
      gsap.to(innerCoreRef.current, {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    } else {
      gsap.killTweensOf(innerCoreRef.current, 'scale');
    }
  }, [progress]);

  // Terrain overlays based on active source
  const getTerrainOverlayStyle = () => {
    if (!activeSourceId) return { filter: 'saturate(100%) contrast(100%)' };
    
    // Check if the active source is on the right side
    const activeSource = dataSources.find(s => s.id === activeSourceId);
    if (activeSource && activeSource.x >= 50) {
      // Right side nodes -> RED AOI HAZARD COLOR
      return { filter: 'sepia(100%) hue-rotate(-50deg) saturate(300%) brightness(85%) opacity(85%)' };
    }
    
    // Left side nodes -> NO COLOR CHANGE
    return { filter: 'saturate(100%) contrast(100%)' };
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#02060B]" style={{ perspective: '1200px' }}>
      
      {/* 1. Base Atmospheric Background (Flat 2D layer behind scene) */}
      <div className="absolute inset-0 bg-[#02060B]" />

      <div 
        ref={sceneRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
      >
        {/* 2. Terrain Image Layer (reduced intensity) */}
        <div 
          ref={terrainRef}
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out mix-blend-screen"
          style={{ 
            backgroundImage: 'url(/assets/images/ecosystem-terrain.jpg)',
            transform: 'translateZ(0px)',
            ...getTerrainOverlayStyle()
          }}
        >
          {/* Fog and atmospheric gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(2,6,11,0.95)_70%)]" />
        </div>

        {/* 3. Connection Lines (SVG Layer translated in Z) */}
        <div ref={svgContainerRef} className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
          <ConnectionLines 
            sources={dataSources} 
            visibleSources={visibleSources}
            activeSourceId={activeSourceId}
          />
        </div>

        {/* 4. Data Nodes Layer */}
        <div ref={nodesContainerRef} className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          {dataSources.map(source => (
            <DataNode 
              key={source.id}
              source={source}
              isActive={activeSourceId === source.id}
              isVisible={visibleSources.includes(source.id)}
              hasActiveSource={activeSourceId !== null}
              onMouseEnter={() => onSourceHover(source.id)}
              onMouseLeave={() => onSourceHover(null)}
            />
          ))}
        </div>

        {/* 5. Central RAKSHA Core Layer */}
        <div 
          ref={coreContainerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center pointer-events-none"
          style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
        >
          <div ref={innerCoreRef} className="relative flex items-center justify-center w-[160px] h-[160px] opacity-0 scale-80">
          
          {/* Subtle radial data pulses behind core */}
          <div className="absolute inset-[-100px] bg-[radial-gradient(circle_at_center,_rgba(66,217,232,0.15)_0%,_transparent_70%)]" />

          {/* Outer glowing rings (Concentric, subtle) */}
          <div className="absolute inset-[-20px] rounded-full border border-raksha-accent/10 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-10px] rounded-full border-t border-b border-raksha-accent/20 animate-[spin_14s_linear_infinite_reverse]" />
          <div className="absolute inset-0 rounded-full border border-raksha-accent/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-l border-r border-raksha-accent/40 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner core */}
          <div className="w-[130px] h-[130px] rounded-full bg-[#050C14]/90 border border-raksha-accent/60 shadow-[0_0_50px_rgba(66,217,232,0.2)] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-b from-raksha-accent/10 to-transparent" />
            
            <div className="font-space-grotesk text-xl font-bold text-white z-10 tracking-[0.1em] mt-1">
              RAKSHA
            </div>
            <div className="font-mono text-[8px] text-raksha-accent uppercase tracking-[0.2em] mt-1 z-10 text-center px-4">
              INTELLIGENCE<br/>CORE
            </div>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

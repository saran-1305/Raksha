import React from 'react';
import type { HeroRefs } from './animations/heroTimeline';

interface HeroVideoProps {
  refs: HeroRefs;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ refs }) => {
  return (
    <div 
      className="relative w-full h-full group" 
      ref={refs.video as any}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
    >
      {/* Inner mask for the bottom fade */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to top, transparent, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent, black 20%)' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-auto"
          src="/assets/videos/raksha-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        
        {/* Edge vignette to darken the right/top edges slightly */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#050A14_100%)] pointer-events-none opacity-40"></div>
        
        {/* Subtle scanlines effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.1) 2px, rgba(0,229,255,0.1) 4px)' }}
        ></div>
      </div>
      
      {/* Panel label */}
      <div className="absolute bottom-12 right-12 flex justify-between items-end pointer-events-none w-[300px] max-w-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-raksha-hazard animate-pulse"></div>
          <span className="text-[10px] text-white/80 font-mono tracking-widest">LIVE SATELLITE FEED</span>
        </div>
        <span className="text-[10px] text-raksha-accent font-mono tracking-widest">[ REC ]</span>
      </div>
    </div>
  );
};

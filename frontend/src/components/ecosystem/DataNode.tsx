import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { DataSource } from './dataSources';

interface DataNodeProps {
  source: DataSource;
  isActive: boolean;
  isVisible: boolean;
  hasActiveSource: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const DataNode: React.FC<DataNodeProps> = ({ source, isActive, isVisible, hasActiveSource, onMouseEnter, onMouseLeave }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    
    if (isVisible) {
      gsap.to(nodeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        overwrite: 'auto'
      });
    } else {
      gsap.to(nodeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        overwrite: 'auto'
      });
    }
  }, [isVisible]);

  const getIcon = () => {
    switch (source.id) {
      case 'dem': return '⛰️';
      case 'weather': return '🌧️';
      case 'sentinel1': return '📡';
      case 'sentinel2': return '🛰️';
      case 'osm': return '🏗️';
      case 'aoi': return '🎯';
      case 'cartosat': return '🏙️';
      case 'bhuvan': return '🌍';
      default: return '📊';
    }
  };

  return (
    <div 
      ref={nodeRef}
      className={`absolute opacity-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 pointer-events-auto ${isActive ? 'z-50' : 'z-40'}`}
      style={{ 
        left: `${source.x}%`, 
        top: `${source.y}%`,
        transform: `translate(-50%, -50%) ${isActive ? 'translateZ(20px)' : hasActiveSource ? 'translateZ(-10px)' : 'translateZ(0px)'}`,
        opacity: isVisible ? (isActive ? 1 : hasActiveSource ? 0.4 : 0.8) : 0
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="flex items-center gap-4 rounded-xl transition-all duration-500 relative"
        style={{
          backgroundColor: isActive ? 'rgba(8, 20, 32, 0.9)' : 'rgba(4, 12, 20, 0.72)',
          border: `1px solid ${isActive ? 'rgba(66, 217, 232, 0.6)' : 'rgba(66, 217, 232, 0.12)'}`,
          padding: '14px 18px',
          backdropFilter: 'blur(8px)',
          boxShadow: isActive ? '0 0 30px rgba(66, 217, 232, 0.3)' : 'none',
          transform: isActive ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {/* Glow behind when active */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl bg-raksha-accent/10 blur-md -z-10" />
        )}

        <div className="text-2xl filter grayscale brightness-200 contrast-200 opacity-80 shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex flex-col">
          <span className={`font-mono text-[10px] uppercase tracking-widest ${isActive ? 'text-raksha-accent' : 'text-white/40'}`}>
            {source.category}
          </span>
          <span className={`font-space-grotesk text-sm font-bold uppercase tracking-wider mt-0.5 ${isActive ? 'text-white' : 'text-white/80'}`}>
            {source.title.split(' / ')[0]}
          </span>
        </div>

        {/* Connection Point */}
        <div className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-raksha-accent shadow-[0_0_8px_rgba(66,217,232,0.8)]' : 'bg-white/20'}`} 
             style={{
               // Position connection point depending on side of screen
               [source.x > 50 ? 'left' : 'right']: '-4px',
               top: '50%',
               transform: 'translateY(-50%)'
             }} 
        />
      </div>
    </div>
  );
};

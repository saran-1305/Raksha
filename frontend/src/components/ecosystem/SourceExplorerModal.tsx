import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { DataSource } from './dataSources';
import { 
  RadarVisualization, 
  MultispectralVisualization, 
  TopoVisualization, 
  WeatherVisualization, 
  InfraVisualization, 
  AoiVisualization, 
  CartosatVisualization, 
  BhuvanVisualization 
} from './SourceVisualizations';

interface SourceExplorerModalProps {
  source: DataSource | null;
  onClose: () => void;
}

export const SourceExplorerModal: React.FC<SourceExplorerModalProps> = ({ source, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [processingState, setProcessingState] = useState<'PROCESSING' | 'ANALYZED'>('PROCESSING');

  useEffect(() => {
    if (source) {
      setProcessingState('PROCESSING');
      
      // GSAP Open Animation
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Simulate processing time
      const timer = setTimeout(() => {
        setProcessingState('ANALYZED');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [source]);

  const handleClose = () => {
    // GSAP Close Animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power3.out' });
    gsap.to(modalRef.current, { 
      opacity: 0, 
      scale: 0.97, 
      y: 10, 
      duration: 0.5, 
      ease: 'power3.out',
      onComplete: onClose
    });
  };

  if (!source) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
      {/* Darkened Backdrop (blur is handled on the ecosystem container to avoid blurring the modal itself) */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-[#02060B]/80"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-[90vw] h-[85vh] max-w-7xl rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(66,217,232,0.1)] border border-raksha-accent/15"
        style={{ backgroundColor: 'rgba(4,12,20,0.88)', backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-20 flex justify-between items-start p-8 z-20 pointer-events-none">
           <div className="flex flex-col">
              <span className="font-mono text-[10px] text-raksha-textMuted tracking-widest uppercase mb-1">
                SOURCE INTELLIGENCE
              </span>
           </div>
           <button 
             onClick={handleClose}
             className="font-mono text-[10px] text-white/50 hover:text-raksha-accent tracking-widest uppercase pointer-events-auto transition-colors"
           >
             CLOSE &times;
           </button>
        </div>

        {/* LEFT PANE (~40%) */}
        <div className="w-full md:w-[40%] h-full flex flex-col p-8 pt-24 border-r border-white/5 relative z-10">
          
          {/* Header info */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1.5 h-1.5 rounded-full ${source.status.includes('LIVE') ? 'bg-raksha-accent' : 'bg-white/40'} animate-pulse`} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-raksha-accent">
                {source.status}
              </span>
              <span className="text-white/20 px-1">|</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                {source.category}
              </span>
            </div>
            <h2 className="font-space-grotesk text-3xl font-bold text-white tracking-wide uppercase">
              {source.title}
            </h2>
          </div>

          <p className="font-inter text-sm text-raksha-textMuted leading-relaxed mb-10 pr-4">
            {source.description}
          </p>

          {/* Technical Metadata */}
          <div className="space-y-6 mb-10 flex-1">
            {source.metadata.map((meta, i) => (
              <div key={i} className="flex flex-col border-l-2 border-raksha-accent/20 pl-4">
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-1">
                  {meta.label}
                </span>
                <span className="font-mono text-sm text-white/90">
                  {meta.value}
                </span>
              </div>
            ))}
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-3 block">
                KEY USE CASES
              </span>
              <ul className="space-y-2">
                {source.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-raksha-accent text-[10px] mt-1">▹</span>
                    <span className="font-inter text-sm text-white/70">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Processing Status */}
          <div className="mt-auto pt-6 font-mono text-[10px] tracking-widest uppercase border-t border-white/5 flex flex-col gap-1">
            <span className="text-white/30">RAKSHA INTELLIGENCE ENGINE</span>
            {processingState === 'PROCESSING' ? (
              <span className="text-raksha-accent animate-pulse">● PROCESSING SOURCE...</span>
            ) : (
              <span className="text-emerald-400">● SOURCE ANALYZED</span>
            )}
          </div>
        </div>

        {/* RIGHT PANE (~60%) - LIVE VISUALIZATION */}
        <div className="w-full md:w-[60%] h-full relative bg-[#02060B] overflow-hidden flex flex-col">
          <div className="absolute inset-0">
            {source.id === 'sentinel1' && <RadarVisualization />}
            {source.id === 'sentinel2' && <MultispectralVisualization />}
            {source.id === 'dem' && <TopoVisualization />}
            {source.id === 'weather' && <WeatherVisualization />}
            {source.id === 'osm' && <InfraVisualization />}
            {source.id === 'aoi' && <AoiVisualization />}
            {source.id === 'cartosat' && <CartosatVisualization />}
            {source.id === 'bhuvan' && <BhuvanVisualization />}
          </div>
          
          {/* Footer inside right pane */}
          <div className="mt-auto absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end pointer-events-none z-20">
            <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase flex flex-col gap-1">
              <span>SOURCE STATUS</span>
              <span className="text-white/50">{source.status}</span>
            </div>
            <div className="font-mono text-[9px] text-white/20 tracking-widest uppercase text-right bg-black/40 px-2 py-1">
              RAKSHA DATA INTELLIGENCE ECOSYSTEM<br/>
              SIMULATION PROTOTYPE
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

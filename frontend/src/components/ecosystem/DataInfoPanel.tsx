import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { DataSource } from './dataSources';

interface DataInfoPanelProps {
  activeSource: DataSource | null;
  align?: 'left' | 'right';
  onExplore?: () => void;
}

export const DataInfoPanel: React.FC<DataInfoPanelProps> = ({ activeSource, align = 'right', onExplore }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !activeSource) return;
    
    // Animate content when source changes
    const startX = align === 'left' ? -20 : 20;
    gsap.fromTo(contentRef.current, 
      { opacity: 0, x: startX, filter: 'blur(4px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );
  }, [activeSource]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE PROTOTYPE': return 'text-raksha-accent bg-raksha-accent/10 border-raksha-accent/30';
      case 'STAC PROTOTYPE': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'TARGET ARCHITECTURE': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      default: return 'text-white bg-white/10 border-white/30';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'LIVE PROTOTYPE': return 'bg-raksha-accent';
      case 'STAC PROTOTYPE': return 'bg-blue-400';
      case 'TARGET ARCHITECTURE': return 'bg-amber-400';
      default: return 'bg-white';
    }
  };

  return (
    <div 
      ref={panelRef}
      className={`w-[320px] rounded-2xl border border-raksha-accent/10 p-6 overflow-hidden transition-all duration-700 pointer-events-auto shadow-2xl ${activeSource ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        backgroundColor: 'rgba(4, 12, 20, 0.72)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-raksha-accent/30 to-transparent" />

      {activeSource && (
        <div ref={contentRef} className="flex flex-col h-full">
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(activeSource.status)} animate-pulse`} />
            <span className={`font-mono text-[9px] uppercase tracking-widest ${getStatusColor(activeSource.status).split(' ')[0]}`}>
              {activeSource.status}
            </span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">
              {activeSource.category}
            </p>
            <h3 className="font-space-grotesk text-2xl font-bold text-white tracking-wide">
              {activeSource.title}
            </h3>
          </div>

          {/* Description */}
          <p className="font-inter text-sm text-raksha-textMuted leading-relaxed mb-8">
            {activeSource.description}
          </p>

          {/* Metadata Grid */}
          <div className="space-y-4 mb-8">
            {activeSource.metadata.map((meta, i) => (
              <div key={i} className="flex flex-col border-l-2 border-white/5 pl-3">
                <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">
                  {meta.label}
                </span>
                <span className="font-mono text-xs text-white/80">
                  {meta.value}
                </span>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="mb-8">
            <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-3">
              KEY USE CASES
            </p>
            <div className="flex flex-col gap-2">
              {activeSource.useCases.map((useCase, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-raksha-accent text-[10px] mt-0.5">▹</span>
                  <span className="font-inter text-xs text-white/70">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={onExplore}
            className="w-full py-3 mt-auto rounded border border-white/10 bg-white/5 hover:bg-raksha-accent hover:border-raksha-accent hover:text-black transition-all duration-300 font-mono text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE SOURCE</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

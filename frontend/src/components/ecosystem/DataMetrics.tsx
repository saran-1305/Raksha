import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DataMetricsProps {
  progress: number;
}

export const DataMetrics: React.FC<DataMetricsProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = [
    { num: '08', title: 'DATA SOURCES', desc: 'Satellite, weather, terrain, infrastructure and more' },
    { num: '05', title: 'ANALYTICS LAYERS', desc: 'From raw data to actionable geospatial intelligence' },
    { num: '01', title: 'DECISION SYSTEM', desc: 'Integrated, explainable and ready for real-world impact' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Appear when progress is > 0.8 (Stage 5 Convergence)
    // But hide when progress > 0.95 to let Final Statement take over
    const shouldShow = progress > 0.8 && progress < 0.95;
    
    gsap.to(containerRef.current, {
      opacity: shouldShow ? 1 : 0,
      y: shouldShow ? 0 : 40,
      duration: 1,
      ease: 'power3.out'
    });
  }, [progress]);

  return (
    <div 
      ref={containerRef}
      className="w-full flex justify-center pb-8 opacity-0 translate-y-10 pointer-events-auto"
    >
      <div className="flex flex-col md:flex-row items-center justify-center rounded-2xl border border-white/10" style={{ backgroundColor: 'rgba(2, 6, 11, 0.8)', backdropFilter: 'blur(12px)' }}>
        {metrics.map((metric, i) => (
          <React.Fragment key={i}>
            <div className="flex items-start gap-4 px-8 py-5">
              <div className="font-space-grotesk text-4xl font-bold text-raksha-accent">
                {metric.num}
              </div>
              <div className="flex flex-col">
                <span className="font-space-grotesk text-sm font-bold text-white tracking-widest uppercase mb-1">
                  {metric.title}
                </span>
                <span className="font-inter text-xs text-white/50 max-w-[160px] leading-relaxed">
                  {metric.desc}
                </span>
              </div>
            </div>
            {/* Divider */}
            {i < metrics.length - 1 && (
              <div className="hidden md:block w-px h-16 bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

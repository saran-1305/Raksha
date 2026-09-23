import React, { useEffect, useRef } from 'react';
import type { DataSource } from './dataSources';
import gsap from 'gsap';

interface ConnectionLinesProps {
  sources: DataSource[];
  visibleSources: string[];
  activeSourceId: string | null;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ sources, visibleSources, activeSourceId }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG coordinate space is 0 to 100 for percentage based positioning
  const centerX = 50;
  const centerY = 50;

  // Create curved paths from source (x,y) to center (50,50)
  const generatePath = (x: number, y: number) => {
    // Determine control points for a smooth cubic bezier curve
    // If point is on the left, control point curves inward
    const dx = centerX - x;
    const dy = centerY - y;
    
    // Control points add some curve towards the y-axis
    const cp1x = x + dx * 0.5;
    const cp1y = y;
    
    const cp2x = centerX;
    const cp2y = centerY - dy * 0.5;

    return `M ${x} ${y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${centerX} ${centerY}`;
  };

  useEffect(() => {
    // Animate stroke dasharray/dashoffset for newly visible lines
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll('.connection-path');
    paths.forEach((path) => {
      const sourceId = path.getAttribute('data-id');
      if (sourceId && visibleSources.includes(sourceId)) {
        // Find if we already animated it
        const currentOpacity = gsap.getProperty(path, 'opacity');
        if (currentOpacity === 0) {
          gsap.to(path, { opacity: 0.15, duration: 1, ease: 'power2.inOut' });
          
          // Animate the signal dot
          const dot = document.querySelector(`.signal-dot-${sourceId}`);
          if (dot) {
            gsap.to(dot, { opacity: 0.6, duration: 0.5 });
          }
        }
      } else {
        gsap.to(path, { opacity: 0, duration: 0.5 });
        const dot = document.querySelector(`.signal-dot-${sourceId}`);
        if (dot) {
          gsap.to(dot, { opacity: 0, duration: 0.5 });
        }
      }
    });
  }, [visibleSources]);

  // Handle active state
  useEffect(() => {
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll('.connection-path');
    paths.forEach((path) => {
      const sourceId = path.getAttribute('data-id');
      const isActive = sourceId === activeSourceId;
      
      if (visibleSources.includes(sourceId!)) {
        gsap.to(path, {
          opacity: isActive ? 0.8 : 0.15,
          strokeWidth: isActive ? 2 : 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  }, [activeSourceId, visibleSources]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <svg 
        ref={svgRef}
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#42D9E8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#42D9E8" stopOpacity="1" />
          </linearGradient>
        </defs>

        {sources.map(source => (
          <g key={source.id}>
            {/* The main curved path */}
            <path
              data-id={source.id}
              className="connection-path"
              d={generatePath(source.x, source.y)}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            
            {/* Signal dot travelling along path (implemented with CSS animation on stroke-dasharray if GSAP MotionPath is missing, 
                or just a simple dashed line moving) */}
            {/* For simplicity without GSAP MotionPath plugin, we animate the dashoffset of a thicker stroke */}
            <path
              data-id={source.id}
              className={`signal-dot-${source.id}`}
              d={generatePath(source.x, source.y)}
              fill="none"
              stroke="#67E8F9"
              strokeWidth={activeSourceId === source.id ? "3" : "1.5"}
              strokeLinecap="round"
              opacity="0"
              style={{ 
                vectorEffect: 'non-scaling-stroke',
                strokeDasharray: '4 400', // Small dash, big gap
                animation: `flowData 3s linear infinite ${Math.random() * 2}s`
              }}
            />
          </g>
        ))}
      </svg>
      
      <style>{`
        @keyframes flowData {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

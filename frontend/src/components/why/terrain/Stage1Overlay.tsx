import React from 'react';

export const Stage1Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <filter id="hazard-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <pattern id="scanline" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(255, 60, 0, 0.2)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Hazard Zone mapped roughly to the central river valley */}
        <path 
          d="M 320 600 C 350 450, 480 400, 500 320 C 520 240, 420 180, 430 50 C 450 0, 550 0, 550 50 C 500 200, 600 280, 580 380 C 560 480, 420 550, 420 600 Z" 
          fill="url(#scanline)" 
          stroke="#FF3C00" 
          strokeWidth="2"
          filter="url(#hazard-glow)"
          opacity="0.6"
          className="animate-pulse"
        />

        {/* Label and Marker */}
        <g transform="translate(560, 260)">
          <line x1="0" y1="0" x2="40" y2="-40" stroke="#FF3C00" strokeWidth="1" />
          <circle cx="0" cy="0" r="4" fill="#FF3C00" />
          <circle cx="0" cy="0" r="12" stroke="#FF3C00" strokeWidth="1" fill="none" opacity="0.5" className="animate-ping" />
          
          <rect x="40" y="-60" width="120" height="36" fill="rgba(5, 10, 20, 0.8)" stroke="rgba(255, 60, 0, 0.4)" strokeWidth="1" />
          <text x="50" y="-45" fill="#FF3C00" fontSize="10" fontFamily="monospace" letterSpacing="1">HIGH RISK ZONE</text>
          <text x="50" y="-30" fill="white" fontSize="9" fontFamily="sans-serif">Landslide / Flood</text>
        </g>
      </svg>
    </div>
  );
};

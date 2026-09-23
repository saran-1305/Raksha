import React from 'react';

export const Stage3Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <filter id="glow-safe" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hazard Zone (Persisted, extremely subtle) */}
        <path 
          d="M 320 600 C 350 450, 480 400, 500 320 C 520 240, 420 180, 430 50 C 450 0, 550 0, 550 50 C 500 200, 600 280, 580 380 C 560 480, 420 550, 420 600 Z" 
          fill="none" 
          stroke="#FF3C00" 
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.3"
        />

        {/* Concentric Search Rings projecting from the population center (450, 350) */}
        <g stroke="#42D9E8" fill="none" opacity="0.3">
          <circle cx="450" cy="350" r="100" strokeWidth="1" strokeDasharray="4 4" className="animate-[ping_4s_ease-out_infinite]" />
          <circle cx="450" cy="350" r="150" strokeWidth="0.5" strokeDasharray="2 4" className="animate-[ping_4s_ease-out_infinite_1s]" />
          <circle cx="450" cy="350" r="220" strokeWidth="0.2" className="animate-[ping_4s_ease-out_infinite_2s]" />
        </g>

        {/* Candidate Site C (Unsafe/Reduced) */}
        <g transform="translate(480, 520)" opacity="0.4">
          <circle cx="0" cy="0" r="4" fill="#7E8A9A" />
          <text x="10" y="4" fill="#7E8A9A" fontSize="9" fontFamily="monospace">SITE C [68.4]</text>
        </g>

        {/* Candidate Site B (Moderate) */}
        <g transform="translate(250, 200)" opacity="0.6">
          <circle cx="0" cy="0" r="5" fill="#FFB000" />
          <text x="12" y="4" fill="#FFB000" fontSize="9" fontFamily="monospace">SITE B [81.7]</text>
        </g>

        {/* Candidate Site A (Selected Safe Location) */}
        <g transform="translate(180, 420)" filter="url(#glow-safe)">
          {/* Target Reticle */}
          <circle cx="0" cy="0" r="15" stroke="#42D9E8" strokeWidth="1" fill="none" className="animate-spin-slow" strokeDasharray="10 4" />
          <circle cx="0" cy="0" r="6" fill="#42D9E8" />
          <circle cx="0" cy="0" r="2" fill="#050A14" />
          
          <line x1="15" y1="0" x2="40" y2="-30" stroke="#42D9E8" strokeWidth="1.5" />
          
          <rect x="40" y="-45" width="110" height="30" fill="rgba(5, 10, 20, 0.9)" stroke="#42D9E8" strokeWidth="1" />
          <text x="48" y="-32" fill="#42D9E8" fontSize="9" fontFamily="monospace" fontWeight="bold">SITE A SELECTED</text>
          <text x="48" y="-20" fill="white" fontSize="8" fontFamily="sans-serif">Safety Score: 94.2%</text>
        </g>

      </svg>
    </div>
  );
};

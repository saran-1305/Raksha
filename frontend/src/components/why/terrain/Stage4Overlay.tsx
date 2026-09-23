import React from 'react';

export const Stage4Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <filter id="glow-route" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hazard Zone */}
        <path 
          d="M 320 600 C 350 450, 480 400, 500 320 C 520 240, 420 180, 430 50 C 450 0, 550 0, 550 50 C 500 200, 600 280, 580 380 C 560 480, 420 550, 420 600 Z" 
          fill="none" 
          stroke="#FF3C00" 
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.3"
        />

        {/* Affected Population Center (Start) */}
        <circle cx="450" cy="350" r="4" fill="#FF3C00" />
        <circle cx="450" cy="350" r="12" stroke="#FF3C00" strokeWidth="1" fill="none" strokeDasharray="2 2" className="animate-spin-slow" />
        <text x="465" y="354" fill="#FF3C00" fontSize="9" fontFamily="monospace">AFFECTED POPULATION</text>

        {/* Safe Site A (End) */}
        <circle cx="180" cy="420" r="6" fill="#42D9E8" />
        <text x="160" y="440" fill="#42D9E8" fontSize="9" fontFamily="monospace">SITE A</text>

        {/* Relocation Route (Animated Path following road) */}
        <path 
          d="M 450 350 Q 400 400 350 450 T 250 500 Q 200 480 180 420" 
          fill="none" 
          stroke="#42D9E8" 
          strokeWidth="3" 
          filter="url(#glow-route)"
          strokeDasharray="400"
          strokeDashoffset="400"
          className="animate-[dash_3s_ease-out_forwards]"
        />
        
        {/* Route Path (Underlay) */}
        <path 
          d="M 450 350 Q 400 400 350 450 T 250 500 Q 200 480 180 420" 
          fill="none" 
          stroke="#42D9E8" 
          strokeWidth="1" 
          opacity="0.3"
          strokeDasharray="4 4"
        />

        {/* Route Information HUD */}
        <g transform="translate(280, 480)">
          <line x1="0" y1="0" x2="30" y2="-40" stroke="#42D9E8" strokeWidth="1" />
          <rect x="30" y="-70" width="140" height="45" fill="rgba(5, 10, 20, 0.9)" stroke="#42D9E8" strokeWidth="1" />
          <text x="40" y="-55" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">RELOCATION ROUTE</text>
          <text x="40" y="-40" fill="#42D9E8" fontSize="8" fontFamily="sans-serif">Distance: 18.6 km</text>
          <text x="110" y="-40" fill="#42D9E8" fontSize="8" fontFamily="sans-serif">Time: 2.8 hrs</text>
        </g>

        {/* Optional CSS for the dash animation (We'll put this in index.css, but can define it inline if needed, or rely on tailwind arbitrary value) */}
        <style>
          {`
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </svg>
    </div>
  );
};

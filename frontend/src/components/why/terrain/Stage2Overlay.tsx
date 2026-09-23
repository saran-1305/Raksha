import React from 'react';

export const Stage2Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hazard Zone (Persisted from Stage 1) */}
        <path 
          d="M 320 600 C 350 450, 480 400, 500 320 C 520 240, 420 180, 430 50 C 450 0, 550 0, 550 50 C 500 200, 600 280, 580 380 C 560 480, 420 550, 420 600 Z" 
          fill="rgba(255, 60, 0, 0.05)" 
          stroke="#FF3C00" 
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />

        {/* Road Network (Highlighted) */}
        <path 
          d="M 100 600 Q 200 450 400 400 T 700 200" 
          fill="none" 
          stroke="#42D9E8" 
          strokeWidth="1.5" 
          opacity="0.6"
        />
        <path 
          d="M 300 0 Q 350 150 400 400 T 500 600" 
          fill="none" 
          stroke="#42D9E8" 
          strokeWidth="1.5" 
          opacity="0.6"
        />

        {/* Population Clusters */}
        {/* High Exposure (Red) */}
        <g filter="url(#glow-red)">
          <circle cx="450" cy="350" r="3" fill="#FF3C00" />
          <circle cx="465" cy="340" r="2.5" fill="#FF3C00" />
          <circle cx="440" cy="360" r="2" fill="#FF3C00" />
          <circle cx="480" cy="280" r="3.5" fill="#FF3C00" />
          <circle cx="470" cy="270" r="2" fill="#FF3C00" />
        </g>
        
        {/* Moderate Exposure (Amber) */}
        <g fill="#FFB000">
          <circle cx="390" cy="410" r="2.5" />
          <circle cx="380" cy="420" r="2" />
          <circle cx="410" cy="400" r="3" />
        </g>

        {/* Low Exposure (Cyan) */}
        <g filter="url(#glow-cyan)" fill="#42D9E8">
          <circle cx="200" cy="450" r="3" />
          <circle cx="215" cy="445" r="2" />
          <circle cx="185" cy="460" r="2.5" />
          <circle cx="650" cy="220" r="3.5" />
          <circle cx="665" cy="210" r="2.5" />
        </g>

        {/* Infrastructure Nodes (Squares) */}
        <g fill="none" stroke="#42D9E8" strokeWidth="1.5">
          <rect x="447" y="347" width="6" height="6" stroke="#FF3C00" />
          <rect x="197" y="447" width="6" height="6" />
          <rect x="647" y="217" width="6" height="6" />
        </g>

        {/* Labels */}
        <g transform="translate(490, 320)">
          <line x1="-10" y1="-10" x2="30" y2="-30" stroke="#FF3C00" strokeWidth="1" />
          <rect x="30" y="-45" width="130" height="30" fill="rgba(5, 10, 20, 0.8)" stroke="rgba(255, 60, 0, 0.4)" strokeWidth="1" />
          <text x="38" y="-27" fill="white" fontSize="9" fontFamily="monospace">POPULATION EXPOSURE</text>
        </g>
        
        <g transform="translate(210, 440)">
          <line x1="-5" y1="-5" x2="-20" y2="-20" stroke="#42D9E8" strokeWidth="1" />
          <text x="-100" y="-25" fill="#42D9E8" fontSize="9" fontFamily="monospace">SAFE CLUSTER</text>
        </g>
      </svg>
    </div>
  );
};

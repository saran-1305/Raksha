import React from 'react';

interface WhyThumbnailsProps {
  activeStage: number;
  onStageChange: (stage: number) => void;
}

export const WhyThumbnails: React.FC<WhyThumbnailsProps> = ({ activeStage, onStageChange }) => {
  const thumbs = [
    { num: '01', title: 'DETECT RISK' },
    { num: '02', title: 'UNDERSTAND IMPACT' },
    { num: '03', title: 'FIND SAFER GROUND' },
    { num: '04', title: 'PLAN & RELOCATE' },
  ];

  return (
    <div className="absolute bottom-12 left-12 lg:left-20 right-12 z-20 flex gap-4 pointer-events-auto">
      {thumbs.map((t, i) => {
        const isActive = activeStage === i;
        return (
          <div 
            key={i}
            className={`relative w-32 h-20 rounded-lg overflow-hidden cursor-pointer border transition-all duration-300 group ${isActive ? 'border-raksha-accent opacity-100 shadow-[0_0_15px_rgba(66,217,232,0.3)]' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'}`}
            onClick={() => onStageChange(i)}
            onMouseEnter={() => onStageChange(i)}
          >
            <img 
              src="/assets/images/terrain_master.jpg" 
              alt={t.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
            
            <div className="absolute inset-0 p-2 flex flex-col justify-end">
              <span className={`font-mono text-[10px] ${isActive ? 'text-raksha-accent' : 'text-white/70'}`}>{t.num}</span>
              <span className="font-space-grotesk text-[9px] text-white font-bold leading-tight uppercase">{t.title}</span>
            </div>

            {/* Active Progress Line */}
            {isActive && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-raksha-accent/30">
                <div className="h-full bg-raksha-accent animate-[slideRight_4s_linear_infinite]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

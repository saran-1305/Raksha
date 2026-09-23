import React from 'react';

interface StageNavProps {
  activeStage: number;
  onStageChange: (stage: number) => void;
}

export const StageNav: React.FC<StageNavProps> = ({ activeStage, onStageChange }) => {
  const stages = [
    { num: '01', title: 'DETECT RISK' },
    { num: '02', title: 'UNDERSTAND IMPACT' },
    { num: '03', title: 'FIND SAFER GROUND' },
    { num: '04', title: 'PLAN & RELOCATE' },
  ];

  return (
    <div className="flex flex-col relative w-12 items-center space-y-12 shrink-0">
      {/* Connecting thin vertical line */}
      <div className="absolute top-4 bottom-4 w-px bg-raksha-800 -z-10" />

      {stages.map((_, i) => {
        const isActive = activeStage === i;
        return (
          <div 
            key={i} 
            className="flex items-center cursor-pointer group w-full justify-center"
            onClick={() => onStageChange(i)}
            onMouseEnter={() => onStageChange(i)}
          >
            <div 
              className={`w-3 h-3 rounded-full border border-raksha-900 transition-colors duration-300 ${isActive ? 'bg-raksha-accent' : 'bg-raksha-700 group-hover:bg-raksha-600'}`} 
            />
          </div>
        );
      })}
    </div>
  );
};

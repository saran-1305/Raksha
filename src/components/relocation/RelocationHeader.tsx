import React from 'react';
import type { Settlement } from '../../types';


interface RelocationHeaderProps {
  settlement: Settlement;
}

export const RelocationHeader: React.FC<RelocationHeaderProps> = ({ settlement }) => {
  return (
    <div className="flex bg-black px-8 py-4 shrink-0 relative z-20 border-b border-white/5 items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-textMuted uppercase tracking-widest font-bold">
          RELOCATION PLANNING
        </span>
        <h2 className="text-white text-xl font-black uppercase tracking-widest leading-none flex items-center gap-2">
          {settlement.name} <span className="text-white/30">·</span> {settlement.district}
        </h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center border border-danger/30 bg-danger/10 px-3 py-1.5 rounded-sm">
          <span className="text-[9px] text-danger font-bold tracking-widest uppercase">
            [ {settlement.relocationPriority} PRIORITY ]
          </span>
        </div>
        
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xl font-black text-warning leading-none">
            {settlement.populationExposed.toLocaleString()}
          </span>
          <span className="text-[9px] text-textMuted uppercase tracking-widest font-bold">
            AFFECTED PEOPLE
          </span>
        </div>
      </div>
    </div>
  );
};

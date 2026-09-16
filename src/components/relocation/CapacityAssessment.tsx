import React from 'react';
import type { Settlement, RelocationSite } from '../../types';

interface CapacityAssessmentProps {
  settlement: Settlement;
  candidates: RelocationSite[];
}

export const CapacityAssessment: React.FC<CapacityAssessmentProps> = ({ settlement, candidates }) => {
  const eligibleSites = candidates.filter(s => s.safety?.status === 'eligible');
  
  const totalCapacity = eligibleSites.reduce((sum, site) => sum + (site.capacity?.estimatedSafeCapacity || 0), 0);
  const totalCoverage = Math.min(Math.round((totalCapacity / settlement.populationExposed) * 100), 100);

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          03 CAPACITY
        </span>
        <h3 className="text-2xl text-white font-black tracking-widest uppercase">
          CAPACITY ASSESSMENT
        </h3>
        <p className="text-[11px] text-textMuted uppercase tracking-widest mt-1">
          ESTIMATING SAFE RELOCATION CAPACITY FROM USABLE AREA AND SITE CONDITIONS
        </p>
      </div>

      <div className="flex flex-col border border-border/30 bg-black rounded-sm p-6 mt-4">
        <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">
          AFFECTED POPULATION REQUIRING RELOCATION
        </span>
        <span className="text-3xl text-warning font-black tracking-widest uppercase">
          {settlement.populationExposed.toLocaleString()} PEOPLE
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {eligibleSites.map(site => {
          const cap = site.capacity?.estimatedSafeCapacity || 0;
          const cov = site.capacity?.capacityCoverage || 0;
          const area = site.capacity?.usableArea || 0;
          
          return (
            <div key={site.id} className="flex flex-col border border-border/30 bg-white/5 rounded-sm overflow-hidden">
              <div className="p-4 flex justify-between items-center border-b border-border/30">
                <span className="text-white font-bold tracking-widest uppercase text-sm">{site.name}</span>
                <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">
                  USABLE AREA: <span className="text-white font-mono">{area.toLocaleString()} m²</span>
                </span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
                    ESTIMATED SAFE CAPACITY
                  </span>
                  <span className="text-lg text-cyan-400 font-bold tracking-widest">{cap.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-[9px] font-bold tracking-widest uppercase mt-2">
                  <span className="text-textMuted">{cap.toLocaleString()} / {settlement.populationExposed.toLocaleString()} PEOPLE</span>
                  <span className="text-safe">{cov}% COVERAGE</span>
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-border/30">
                  <div className="h-full bg-safe" style={{ width: `${Math.min(cov, 100)}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col border border-safe/30 bg-safe/5 rounded-sm p-6 mt-4 gap-4">
        
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[10px] text-warning font-bold tracking-widest uppercase">
            SINGLE-SITE CAPACITY IS INSUFFICIENT
          </span>
          <span className="text-[10px] text-safe font-bold tracking-widest uppercase">
            RAKSHA PROPOSES MULTI-SITE ALLOCATION
          </span>
        </div>

        <div className="w-full h-px bg-white/10 my-1" />
        
        <div className="flex items-center justify-between text-white font-black tracking-widest text-lg uppercase">
          {eligibleSites.map((site, i) => (
            <React.Fragment key={site.id}>
              <div className="flex flex-col">
                <span className="text-[9px] text-textMuted mb-1">{site.name}</span>
                <span>{site.capacity?.estimatedSafeCapacity?.toLocaleString() || 0}</span>
              </div>
              {i < eligibleSites.length - 1 && <span className="text-textMuted font-normal">+</span>}
            </React.Fragment>
          ))}
          <span className="text-textMuted font-normal">=</span>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-textMuted mb-1">TOTAL ESTIMATED CAPACITY</span>
            <span className="text-safe">{totalCapacity.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
            ESTIMATED COVERAGE
          </span>
          <div className="text-3xl text-safe font-black tracking-widest leading-none">
            {totalCoverage}%
          </div>
        </div>
      </div>

    </div>
  );
};

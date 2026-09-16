import React from 'react';
import type { RelocationSite } from '../../types';
import { cn } from '../../utils/cn';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SafetyAssessmentProps {
  candidates: RelocationSite[];
}

export const SafetyAssessment: React.FC<SafetyAssessmentProps> = ({ candidates }) => {

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          02 SAFETY
        </span>
        <h3 className="text-2xl text-white font-black tracking-widest uppercase">
          SAFETY ASSESSMENT
        </h3>
        <p className="text-[11px] text-textMuted uppercase tracking-widest mt-1">
          FILTERING CANDIDATE SITES AGAINST MULTI-HAZARD AND ACCESSIBILITY CONSTRAINTS
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {candidates.map(site => {
          const isEligible = site.safety?.status === 'eligible';
          
          return (
            <div key={site.id} className={cn("flex flex-col border rounded-sm overflow-hidden", isEligible ? 'border-border/30 bg-black' : 'border-danger/20 bg-danger/5')}>
              <div className={cn("p-4 border-b flex justify-between items-center", isEligible ? 'bg-white/5 border-border/30' : 'bg-danger/10 border-danger/20')}>
                <span className="text-white font-bold tracking-widest uppercase text-sm">
                  {site.name}
                </span>
                <span className={cn("text-[9px] font-bold uppercase tracking-widest flex items-center gap-1", isEligible ? 'text-safe' : 'text-danger')}>
                  {isEligible ? <><CheckCircle2 className="w-3.5 h-3.5" /> ELIGIBLE</> : <><XCircle className="w-3.5 h-3.5" /> REJECTED</>}
                </span>
              </div>
              
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">HAZARD EXPOSURE</span>
                  <span className={cn(
                    site.safety?.hazardExposure === 'LOW' ? 'text-safe' : 
                    site.safety?.hazardExposure === 'MODERATE' ? 'text-warning' : 'text-danger'
                  )}>{site.safety?.hazardExposure || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">LANDSLIDE RISK</span>
                  <span className={cn(
                    site.safety?.landslideExposure === 'LOW' ? 'text-safe' : 
                    site.safety?.landslideExposure === 'MODERATE' ? 'text-warning' : 'text-danger'
                  )}>{site.safety?.landslideExposure || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">TERRAIN</span>
                  <span className={cn(
                    site.safety?.terrainSuitability === 'GOOD' ? 'text-safe' : 
                    site.safety?.terrainSuitability === 'ACCEPTABLE' ? 'text-warning' : 'text-danger'
                  )}>{site.safety?.terrainSuitability || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">EMERGENCY ACCESS</span>
                  <span className={cn(
                    site.safety?.accessibility === 'GOOD' ? 'text-safe' : 
                    site.safety?.accessibility === 'ACCEPTABLE' ? 'text-warning' : 'text-danger'
                  )}>{site.safety?.accessibility || 'N/A'}</span>
                </div>
              </div>
              
              {!isEligible && site.safety?.rejectionReasons && site.safety.rejectionReasons.length > 0 && (
                <div className="p-4 bg-black/40 border-t border-danger/10">
                  <span className="text-[9px] text-danger font-bold uppercase tracking-widest block mb-2">WHY REJECTED?</span>
                  <ul className="flex flex-col gap-1.5">
                    {site.safety.rejectionReasons.map((reason: string, i: number) => (
                      <li key={i} className="text-[10px] text-white/80 flex items-center gap-1.5 uppercase tracking-widest leading-snug">
                        <span className="w-1 h-1 rounded-full bg-danger shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

import React from 'react';
import type { Settlement, RelocationSite } from '../../types';
import { cn } from '../../utils/cn';
import { Target, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface CandidateDiscoveryProps {
  settlement: Settlement;
  candidates: RelocationSite[];
  searchSteps: {radius: number, status: 'SUFFICIENT' | 'INSUFFICIENT', candidates: number}[];
  onHoverSite: (site: RelocationSite | null) => void;
}

export const CandidateDiscovery: React.FC<CandidateDiscoveryProps> = ({ settlement, candidates, searchSteps, onHoverSite }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          01 DISCOVER
        </span>
        <h3 className="text-2xl text-white font-black tracking-widest uppercase">
          CANDIDATE DISCOVERY
        </h3>
        <p className="text-[11px] text-textMuted uppercase tracking-widest mt-1">
          SEARCHING FOR POTENTIAL RELOCATION SITES OUTSIDE THE HIGH-RISK AOI
        </p>
      </div>

      <div className="flex flex-col border border-border/30 bg-white/5 rounded-sm p-4 mt-2">
        <div className="flex items-center justify-between text-center">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">SOURCE HABITATION</span>
            <span className="text-white font-bold tracking-widest uppercase text-xs">{settlement.name}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/30" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">HIGH-RISK AOI</span>
            <span className="text-white font-bold tracking-widest uppercase text-xs">2 × 2 KM</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/30" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">INITIAL SEARCH</span>
            <span className="text-white font-bold tracking-widest uppercase text-xs">AOI + 5 KM</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mb-1">CANDIDATES FOUND</span>
            <span className="text-white font-bold tracking-widest uppercase text-xs">{candidates.length}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 border border-cyan-500/30 bg-cyan-500/5 rounded-sm p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 bg-cyan-500/20 border-b border-l border-cyan-500/30 rounded-bl-sm flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase">ADAPTIVE SEARCH ENGINE</span>
        </div>
        
        <p className="text-[9px] text-textMuted uppercase tracking-widest mt-6">
          Search expands only when nearby locations fail safety or capacity requirements.
        </p>

        <div className="flex items-start gap-4 mt-2 overflow-x-auto custom-scrollbar pb-2">
          {searchSteps.map((step, idx) => (
            <React.Fragment key={step.radius}>
              <div className={cn("flex flex-col p-4 rounded-sm border shrink-0 min-w-[200px]", 
                step.status === 'SUFFICIENT' ? 'bg-safe/10 border-safe/30' : 'bg-black/50 border-border/30')}>
                
                <span className={cn("text-[10px] font-bold tracking-widest uppercase mb-2", 
                  step.status === 'SUFFICIENT' ? 'text-safe' : 'text-white')}>
                  {step.radius} KM SEARCH
                </span>
                
                {step.status === 'SUFFICIENT' ? (
                  <div className="flex items-center gap-1.5 text-[9px] text-safe font-bold tracking-widest uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SUFFICIENT CAPACITY FOUND
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[9px] text-textMuted font-bold tracking-widest uppercase">
                      <XCircle className="w-3.5 h-3.5" /> INSUFFICIENT CAPACITY
                    </div>
                  </div>
                )}
              </div>
              
              {idx < searchSteps.length - 1 && (
                <div className="flex flex-col items-center justify-center shrink-0 h-full self-center px-2">
                  <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">SEARCH EXPANDED</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {candidates.map(site => (
          <div 
            key={site.id} 
            className="flex items-center justify-between p-4 border border-border/30 bg-black rounded-sm hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group"
            onMouseEnter={() => onHoverSite(site)}
            onMouseLeave={() => onHoverSite(null)}
          >
            <div className="flex flex-col gap-1 w-1/3">
              <span className="text-white font-bold tracking-widest uppercase group-hover:text-cyan-400 transition-colors text-xs">
                {site.name}
              </span>
            </div>
            
            <div className="flex flex-col w-1/4">
              <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-0.5">DISTANCE</span>
              <span className="text-[11px] text-white font-mono font-bold">{site.distanceFromDevgram} KM</span>
            </div>

            <div className="flex flex-col w-1/4">
              <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-0.5">SITE TYPE</span>
              <span className="text-[10px] text-white uppercase tracking-widest">{site.type}</span>
            </div>
            
            <div className="flex items-center justify-end w-1/4">
              <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW ON MAP &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

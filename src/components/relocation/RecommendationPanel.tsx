import React from 'react';
import type { Settlement, RelocationSite } from '../../types';
import { CheckCircle2, ShieldAlert, Layers, ArrowRight } from 'lucide-react';

interface RecommendationPanelProps {
  settlement: Settlement;
  candidates: RelocationSite[];
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ settlement, candidates }) => {
  const eligibleSites = candidates.filter(s => s.safety?.status === 'eligible').sort((a, b) => (b.suitability?.score || 0) - (a.suitability?.score || 0));

  const totalCapacity = eligibleSites.reduce((sum, site) => sum + (site.capacity?.estimatedSafeCapacity || 0), 0);
  const totalCoverage = Math.min(Math.round((totalCapacity / settlement.populationExposed) * 100), 100);

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 pb-20">
      
      <div className="flex flex-col gap-1 items-center text-center py-6">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          06 RECOMMENDATION
        </span>
        <h3 className="text-3xl text-white font-black tracking-widest uppercase mt-2">
          FINAL RELOCATION PLAN
        </h3>
        <p className="text-[12px] text-textMuted uppercase tracking-widest mt-1">
          AI-ASSISTED MULTI-SITE RELOCATION STRATEGY
        </p>
      </div>

      <div className="flex flex-col items-center border border-warning/30 bg-black rounded-sm p-6 text-center shadow-[0_0_20px_rgba(255,171,0,0.05)]">
        <span className="text-[10px] text-warning font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" /> IMMEDIATE ACTION REQUIRED
        </span>
        <span className="text-3xl text-white font-black tracking-widest uppercase">
          {settlement.populationExposed.toLocaleString()} PEOPLE REQUIRE RELOCATION
        </span>
      </div>

      <div className="flex flex-col border border-safe/30 bg-safe/5 rounded-sm mt-4 overflow-hidden">
        <div className="bg-safe/10 px-6 py-4 border-b border-safe/20 text-center">
          <span className="text-safe font-bold tracking-widest uppercase text-[11px] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> RECOMMENDED ALLOCATION
          </span>
        </div>
        
        <div className="grid grid-cols-2 divide-x divide-safe/20 bg-black">
          {eligibleSites.slice(0, 2).map((site, idx) => (
            <div key={site.id} className="p-6 flex flex-col items-center text-center gap-2">
              <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase mb-1">
                {idx === 0 ? 'PRIMARY SITE' : 'SUPPLEMENTARY SITE'}
              </span>
              <span className="text-white font-black text-2xl tracking-widest uppercase">{site.name}</span>
              <span className="text-cyan-400 font-bold text-sm tracking-widest uppercase">
                {site.capacity?.estimatedSafeCapacity?.toLocaleString()} PEOPLE
              </span>
            </div>
          ))}
        </div>
        
        <div className="bg-safe/5 p-6 flex justify-between items-center border-t border-safe/20">
          <span className="text-[11px] text-white font-bold tracking-widest uppercase">TOTAL RELOCATION CAPACITY</span>
          <div className="flex items-center gap-4">
            <span className="text-textMuted font-mono text-sm">
              = {Math.min(totalCapacity, settlement.populationExposed).toLocaleString()} PEOPLE
            </span>
            <span className="font-black text-3xl text-safe">
              {totalCoverage}% <span className="text-[10px] font-bold tracking-widest uppercase align-middle">COVERAGE</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        
        <div className="flex flex-col bg-white/5 border border-white/10 rounded-sm p-6 gap-5">
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
            WHY THIS PLAN?
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Both sites are outside critical hazard zones
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Combined estimated capacity covers population
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Essential services are accessible
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> No single site is required to absorb the entire population
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col bg-cyan-400/5 border-l-2 border-cyan-400 p-5 gap-3 h-full justify-center">
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> RAKSHA RECOMMENDATION
            </span>
            <p className="text-[11px] text-white/90 uppercase tracking-widest leading-relaxed">
              Prioritize <span className="text-white font-bold">{eligibleSites[0]?.name || 'Site A'}</span> as the primary relocation site and <span className="text-white font-bold">{eligibleSites[1]?.name || 'Site C'}</span> as the supplementary site to achieve full estimated population coverage.
            </p>
          </div>
        </div>

      </div>

      <div className="flex flex-col mt-8">
        <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase text-center mb-4">
          DECISION TRACE
        </span>
        <div className="flex items-center justify-between bg-black border border-border/30 rounded-sm p-4 px-6 overflow-x-auto custom-scrollbar">
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-textMuted font-bold tracking-widest uppercase mb-1">RISK</span>
            <span className="text-warning font-black text-sm">{settlement.riskScore} / 100</span>
          </div>
          <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-textMuted font-bold tracking-widest uppercase mb-1">AFFECTED</span>
            <span className="text-white font-black text-sm">{settlement.populationExposed.toLocaleString()}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-textMuted font-bold tracking-widest uppercase mb-1">PRIORITY</span>
            <span className="text-danger font-black text-sm">{settlement.relocationPriority}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-textMuted font-bold tracking-widest uppercase mb-1">SAFE SITES</span>
            <span className="text-safe font-black text-sm">{eligibleSites.length} IDENTIFIED</span>
          </div>
          <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-textMuted font-bold tracking-widest uppercase mb-1">CAPACITY</span>
            <span className="text-cyan-400 font-black text-sm">{totalCapacity.toLocaleString()}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
          
          <div className="flex flex-col items-center shrink-0 min-w-[80px]">
            <span className="text-[8px] text-cyan-400 font-bold tracking-widest uppercase mb-1">COVERAGE</span>
            <span className="text-safe font-black text-lg leading-none">{totalCoverage}%</span>
          </div>

        </div>
      </div>
      
    </div>
  );
};

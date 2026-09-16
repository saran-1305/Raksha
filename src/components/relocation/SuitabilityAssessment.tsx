import React, { useState } from 'react';
import type { RelocationSite } from '../../types';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SuitabilityAssessmentProps {
  candidates: RelocationSite[];
}

export const SuitabilityAssessment: React.FC<SuitabilityAssessmentProps> = ({ candidates }) => {
  const eligibleSites = candidates.filter(s => s.safety?.status === 'eligible').sort((a, b) => (b.suitability?.score || 0) - (a.suitability?.score || 0));
  const rejectedSites = candidates.filter(s => s.safety?.status === 'rejected');
  const otherSites = [...eligibleSites.slice(1), ...rejectedSites];

  const primarySite = eligibleSites[0];

  const [expandedSite, setExpandedSite] = useState<string | null>(rejectedSites.length > 0 ? rejectedSites[0].id : null);

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          05 SUITABILITY
        </span>
        <h3 className="text-2xl text-white font-black tracking-widest uppercase">
          SITE SUITABILITY RANKING
        </h3>
        <p className="text-[11px] text-textMuted uppercase tracking-widest mt-1">
          RANKING ELIGIBLE SITES USING SAFETY, CAPACITY, ACCESSIBILITY AND INFRASTRUCTURE EVIDENCE
        </p>
      </div>

      <div className="flex flex-col border border-border/30 bg-black rounded-sm mt-4 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/30 bg-white/5">
              <th className="p-3 text-[10px] font-bold text-textMuted uppercase tracking-widest text-center w-16">RANK</th>
              <th className="p-3 text-[10px] font-bold text-textMuted uppercase tracking-widest border-l border-border/30">SITE</th>
              <th className="p-3 text-[10px] font-bold text-textMuted uppercase tracking-widest border-l border-border/30 text-center w-24">SCORE</th>
              <th className="p-3 text-[10px] font-bold text-textMuted uppercase tracking-widest border-l border-border/30 text-center w-32">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {eligibleSites.map((site, index) => (
              <tr key={site.id} className={index === 0 ? 'bg-safe/5' : ''}>
                <td className="p-3 text-xs font-black text-white uppercase tracking-widest text-center">
                  #{index + 1}
                </td>
                <td className="p-3 text-xs font-bold text-white uppercase tracking-widest border-l border-border/30">
                  {site.name}
                </td>
                <td className="p-3 text-sm font-black text-white uppercase tracking-widest border-l border-border/30 text-center">
                  {site.suitability?.score || 0} <span className="text-[10px] text-textMuted font-normal">/ 100</span>
                </td>
                <td className={cn("p-3 text-[10px] font-bold uppercase tracking-widest border-l border-border/30 text-center", index === 0 ? 'text-safe' : 'text-cyan-400')}>
                  {index === 0 ? 'RECOMMENDED' : 'ELIGIBLE'}
                </td>
              </tr>
            ))}
            {rejectedSites.map((site, index) => (
              <tr key={site.id} className="bg-danger/5">
                <td className="p-3 text-xs font-black text-danger/50 uppercase tracking-widest text-center">
                  #{eligibleSites.length + index + 1}
                </td>
                <td className="p-3 text-xs font-bold text-white/50 uppercase tracking-widest border-l border-border/30">
                  {site.name}
                </td>
                <td className="p-3 text-sm font-black text-danger/50 uppercase tracking-widest border-l border-border/30 text-center">
                  ---
                </td>
                <td className="p-3 text-[10px] font-bold text-danger uppercase tracking-widest border-l border-border/30 text-center">
                  REJECTED
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {primarySite && (
        <div className="flex flex-col border border-border/30 bg-white/5 rounded-sm overflow-hidden mt-2">
          <div className="p-5 border-b border-border/30 flex justify-between items-center bg-black/40">
            <span className="text-white font-black tracking-widest uppercase text-sm">
              {primarySite.name} SCORING FACTORS
            </span>
          </div>
          
          <div className="p-5 flex flex-col gap-4">
            <ScoringBar label="SAFETY" percentage={30} score={primarySite.suitability?.factors?.safety || 0} max={30} color="bg-safe" />
            <ScoringBar label="CAPACITY" percentage={25} score={primarySite.suitability?.factors?.capacity || 0} max={25} color="bg-primary" />
            <ScoringBar label="ACCESSIBILITY" percentage={15} score={primarySite.suitability?.factors?.accessibility || 0} max={15} color="bg-secondary" />
            <ScoringBar label="INFRASTRUCTURE" percentage={15} score={primarySite.suitability?.factors?.infrastructure || 0} max={15} color="bg-cyan-400" />
            <ScoringBar label="LAND SUITABILITY" percentage={10} score={primarySite.suitability?.factors?.land || 0} max={10} color="bg-white/50" />
            <ScoringBar label="ENVIRONMENT" percentage={5} score={primarySite.suitability?.factors?.environment || 0} max={5} color="bg-white/50" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col bg-safe/5 border border-safe/20 rounded-sm p-5 gap-4">
          <span className="text-[10px] text-safe font-bold tracking-widest uppercase">
            WHY {primarySite?.name}?
          </span>
          <ul className="flex flex-col gap-2">
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Low hazard exposure
            </li>
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Low landslide risk
            </li>
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Good terrain
            </li>
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Strong emergency access
            </li>
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Estimated safe capacity available
            </li>
            <li className="text-[10px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-safe shrink-0" /> Essential services accessible
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-3">
          <span className="text-[10px] text-warning font-bold tracking-widest uppercase">
            WHY NOT THE OTHER SITES?
          </span>
          {otherSites.map(site => {
            const isExpanded = expandedSite === site.id;
            const isRejected = site.safety?.status === 'rejected';
            return (
              <div key={site.id} className={cn("flex flex-col border rounded-sm overflow-hidden", isRejected ? 'border-danger/30 bg-danger/5' : 'border-border/30 bg-white/5')}>
                <button 
                  className="flex justify-between items-center p-3 w-full text-left"
                  onClick={() => setExpandedSite(isExpanded ? null : site.id)}
                >
                  <span className={cn("text-[10px] font-bold tracking-widest uppercase", isRejected ? 'text-danger' : 'text-textMuted')}>
                    WHY NOT {site.name}?
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-white/50" /> : <ChevronDown className="w-3.5 h-3.5 text-white/50" />}
                </button>
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-white/5 mt-1">
                    {isRejected ? (
                      <ul className="flex flex-col gap-1.5 mt-2">
                        {site.safety?.rejectionReasons?.map((reason: string, i: number) => (
                          <li key={i} className="text-[9px] text-white/80 font-bold tracking-widest uppercase flex items-center gap-1.5">
                            <span className="text-danger font-black shrink-0">✕</span> {reason}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[9px] text-white/70 font-bold tracking-widest uppercase mt-2 leading-relaxed">
                        Site is eligible but has a lower overall suitability score ({site.suitability?.score || 0}/100) compared to the primary candidate. Lower capacity or less ideal infrastructure access.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

const ScoringBar = ({ label, percentage, score, max, color }: { label: string, percentage: number, score: number, max: number, color: string }) => {
  const fillPercentage = (score / max) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 shrink-0 flex flex-col">
        <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">{label}</span>
        <span className="text-[8px] text-white/40 font-bold tracking-widest uppercase">{percentage}% WEIGHT</span>
      </div>
      <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden border border-border/30">
        <div className={cn("h-full", color)} style={{ width: `${fillPercentage}%` }} />
      </div>
      <div className="w-16 text-right shrink-0">
        <span className="text-[11px] text-white font-mono font-bold">{score} / {max}</span>
      </div>
    </div>
  );
};

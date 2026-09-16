import React from 'react';
import type { RelocationSite } from '../../types';
import { Truck, Hospital, BookOpen, Droplets, Zap, Siren, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface InfrastructureAssessmentProps {
  candidates: RelocationSite[];
}

export const InfrastructureAssessment: React.FC<InfrastructureAssessmentProps> = ({ candidates }) => {
  const eligibleSites = candidates.filter(s => s.safety?.status === 'eligible');

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          04 INFRASTRUCTURE
        </span>
        <h3 className="text-2xl text-white font-black tracking-widest uppercase">
          INFRASTRUCTURE CHECK
        </h3>
        <p className="text-[11px] text-textMuted uppercase tracking-widest mt-1">
          VERIFYING ACCESS TO ESSENTIAL SERVICES AND EMERGENCY SUPPORT
        </p>
      </div>

      <div className="flex flex-col border border-border/30 bg-black rounded-sm mt-4">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-border/30 bg-white/5">
              <th className="p-4 text-[10px] font-bold text-transparent uppercase tracking-widest w-1/3">SERVICE</th>
              {eligibleSites.map(site => (
                <th key={site.id} className="p-4 text-xs font-black text-white uppercase tracking-widest border-l border-border/30 text-center">
                  {site.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" /> ROAD ACCESS
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className={cn("p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center", site.infrastructure?.roadAccess === 'GOOD' ? 'text-safe' : 'text-warning')}>
                  {site.infrastructure?.roadAccess || '---'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <Hospital className="w-3.5 h-3.5" /> HOSPITAL
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className="p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center text-white">
                  {site.infrastructure?.nearestHospitalKm ? `${site.infrastructure.nearestHospitalKm} KM` : '---'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" /> SCHOOL
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className="p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center text-white">
                  {site.infrastructure?.nearestSchoolKm ? `${site.infrastructure.nearestSchoolKm} KM` : '---'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> POWER
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className={cn("p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center", site.infrastructure?.power === 'AVAILABLE' ? 'text-safe' : 'text-warning')}>
                  {site.infrastructure?.power || '---'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5" /> WATER
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className={cn("p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center", site.infrastructure?.water === 'AVAILABLE' ? 'text-safe' : 'text-warning')}>
                  {site.infrastructure?.water || '---'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                <Siren className="w-3.5 h-3.5" /> EMERGENCY ACCESS
              </td>
              {eligibleSites.map(site => (
                <td key={site.id} className={cn("p-4 text-[11px] font-bold uppercase tracking-widest border-l border-border/30 text-center", site.infrastructure?.emergencyAccess === 'GOOD' ? 'text-safe' : 'text-warning')}>
                  {site.infrastructure?.emergencyAccess || '---'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4 p-4 border border-safe/30 bg-safe/5 rounded-sm">
        <CheckCircle2 className="w-4 h-4 text-safe" />
        <span className="text-safe font-bold tracking-widest uppercase text-[10px]">
          MINIMUM INFRASTRUCTURE REQUIREMENTS MET
        </span>
      </div>

    </div>
  );
};

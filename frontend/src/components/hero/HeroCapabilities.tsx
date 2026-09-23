import React from 'react';
import type { HeroRefs } from './animations/heroTimeline';
import { Radar, Activity, Map, ShieldCheck } from 'lucide-react';

interface HeroCapabilitiesProps {
  refs: HeroRefs;
}

export const HeroCapabilities: React.FC<HeroCapabilitiesProps> = ({ refs }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-lg">
      <div 
        ref={refs.cardDetect}
        className="capability-card flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg min-w-[160px]"
      >
        <Radar className="w-5 h-5 text-raksha-textMuted" />
        <div className="flex flex-col">
          <span className="text-xs tracking-wider text-raksha-textMuted font-mono">DETECT</span>
          <span className="text-sm font-medium text-white">Hazards</span>
        </div>
      </div>

      <div 
        ref={refs.cardAssess}
        className="capability-card flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg min-w-[160px]"
      >
        <Activity className="w-5 h-5 text-raksha-textMuted" />
        <div className="flex flex-col">
          <span className="text-xs tracking-wider text-raksha-textMuted font-mono">ASSESS</span>
          <span className="text-sm font-medium text-white">Impact</span>
        </div>
      </div>

      <div 
        ref={refs.cardPlan}
        className="capability-card flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg min-w-[160px]"
      >
        <Map className="w-5 h-5 text-raksha-textMuted" />
        <div className="flex flex-col">
          <span className="text-xs tracking-wider text-raksha-textMuted font-mono">PLAN</span>
          <span className="text-sm font-medium text-white">Relocation</span>
        </div>
      </div>

      <div 
        ref={refs.cardResilient}
        className="capability-card flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg min-w-[160px]"
      >
        <ShieldCheck className="w-5 h-5 text-raksha-textMuted" />
        <div className="flex flex-col">
          <span className="text-xs tracking-wider text-raksha-textMuted font-mono">RESILIENT</span>
          <span className="text-sm font-medium text-white">Sanctuary</span>
        </div>
      </div>
    </div>
  );
};

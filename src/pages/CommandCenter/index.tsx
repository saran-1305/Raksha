import React, { useState } from 'react';
import { MapLayersPanel } from '../../components/panels/MapLayersPanel';
import { ZoneIntelligencePanel } from '../../components/panels/ZoneIntelligencePanel';
import { Layers, Target } from 'lucide-react';
import { cn } from '../../utils/cn';

export const CommandCenter: React.FC = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="relative z-10 flex w-full h-full justify-between pointer-events-none p-4 overflow-hidden">
      
      {/* Left Panel Wrapper */}
      <div className="pointer-events-auto h-full min-h-0 flex items-center">
        {/* Panel Content */}
        <div className={cn(
          "h-full min-h-0 rounded-xl overflow-hidden border border-border/30 bg-black shadow-2xl transition-all duration-300 ease-in-out",
          leftOpen ? "w-[240px] opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full border-none"
        )}>
          <div className="w-[240px] h-full min-h-0">
            <MapLayersPanel onClose={() => setLeftOpen(false)} />
          </div>
        </div>
        
        {/* Click Handle if closed */}
        {!leftOpen && (
          <button 
            onClick={() => setLeftOpen(true)}
            className="w-12 h-12 bg-black border border-border/30 rounded-r-xl flex items-center justify-center cursor-pointer shadow-lg hover:bg-black/80 transition-colors"
          >
            <Layers className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>

      {/* Right Panel Wrapper */}
      <div className="pointer-events-auto h-full min-h-0 flex items-center justify-end">
        {/* Click Handle if closed */}
        {!rightOpen && (
          <button 
            onClick={() => setRightOpen(true)}
            className="w-12 h-12 bg-black border border-border/30 rounded-l-xl flex items-center justify-center cursor-pointer shadow-lg z-20 hover:bg-black/80 transition-colors"
          >
            <Target className="w-5 h-5 text-primary" />
          </button>
        )}
        
        {/* Panel Content */}
        <div className={cn(
          "h-full min-h-0 rounded-xl overflow-hidden border border-border/30 bg-black shadow-2xl transition-all duration-300 ease-in-out",
          rightOpen ? "w-[300px] opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full border-none"
        )}>
          <div className="w-[300px] h-full min-h-0">
            <ZoneIntelligencePanel onClose={() => setRightOpen(false)} />
          </div>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ChevronRight, CheckSquare, Search, MapPin, Square } from 'lucide-react';
import { evidenceSourcesData } from '../../data/layers';
import { useMapState } from '../../context/MapContext';
import { cn } from '../../utils/cn';

interface ZoneIntelligencePanelProps {
  onClose?: () => void;
}

export const ZoneIntelligencePanel: React.FC<ZoneIntelligencePanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { selectedSettlement, relocationState, candidateSites } = useMapState();

  return (
    <div className="w-[300px] h-full flex flex-col z-10 overflow-y-auto relative bg-[#0a0d14]">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-panel/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase">
          <Target className="w-4 h-4" />
          <span>ZONE INTELLIGENCE</span>
        </div>
        <div className="flex gap-2 text-textMuted">
          <button className="hover:text-white transition-colors">
            <div className="w-4 h-4 border border-current rounded-sm flex items-center justify-center">
              <span className="text-[10px]">i</span>
            </div>
          </button>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col p-5 gap-6 flex-1">
        
        {/* Selected Location & Risk Ring */}
        <div 
          className="flex justify-between items-start p-4 -mx-5 -mt-5 mb-2 relative overflow-hidden rounded-t-xl border-b border-border/30"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="w-4 h-4" />
              <h2 className="text-lg font-bold uppercase tracking-wider">{selectedSettlement.name}</h2>
            </div>
            <span className="text-xs font-semibold text-white tracking-widest pl-6">{selectedSettlement.state}</span>
            <span className="text-xs text-textMuted pl-6">{selectedSettlement.district}</span>
            <span className="text-[10px] text-textMuted pl-6 mt-1 flex items-center gap-1 font-mono">
              <Target className="w-3 h-3" />
              {selectedSettlement.coordinates.lat}° N, {selectedSettlement.coordinates.lng}° E
            </span>
          </div>

          {/* Risk Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center z-10 bg-black/40 rounded-full backdrop-blur-sm p-1">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="rgba(255,51,51,0.2)" strokeWidth="6" fill="none" />
              <circle 
                cx="48" cy="48" r="44" 
                stroke="#ff3333" 
                strokeWidth="6" 
                fill="none" 
                strokeDasharray="276" 
                strokeDashoffset={276 - (276 * selectedSettlement.riskScore) / 100}
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]" 
              />
            </svg>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-danger leading-none">{selectedSettlement.riskScore}</span>
              <span className="text-[9px] font-bold uppercase text-danger mt-1 leading-tight">{selectedSettlement.riskLevel}<br/>RISK</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border/20"></div>

        {/* Metrics List */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted font-bold tracking-widest flex items-center gap-2">
              <span className="text-white">POPULATION EXPOSED</span>
            </span>
            <span className="text-xl font-bold text-white mt-1">{(selectedSettlement.populationExposed).toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted font-bold tracking-widest flex items-center gap-2">
              <span className="text-white">IMPACT SCORE</span>
            </span>
            <span className="text-xl font-bold text-white mt-1">{selectedSettlement.impactScore} / 100</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted font-bold tracking-widest flex items-center gap-2">
              <span className="text-white">ESTIMATED RECOVERY</span>
            </span>
            <span className="text-xl font-bold text-white mt-1">{selectedSettlement.estimatedRecoveryMin} &ndash; {selectedSettlement.estimatedRecoveryMax} MONTHS</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted font-bold tracking-widest flex items-center gap-2">
              <span className="text-white">RELOCATION PRIORITY</span>
            </span>
            <span className="text-xl font-bold text-danger mt-1">{selectedSettlement.relocationPriority}</span>
          </div>
        </div>

        <div className="h-px w-full bg-border/20"></div>

        {/* Evidence Sources */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-1">
            EVIDENCE SOURCES (5/6)
          </h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-2">
            {evidenceSourcesData.map(source => (
              <div key={source.id} className="flex items-center gap-2">
                {source.active ? (
                  <div className="text-safe">
                    <CheckSquare className="w-3 h-3" />
                  </div>
                ) : (
                  <div className="text-textMuted">
                    <Square className="w-3 h-3" />
                  </div>
                )}
                <span className={cn(
                  "text-[10px] tracking-wide",
                  source.active ? "text-safe" : "text-textMuted"
                )}>
                  {source.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 4 Relocation Status */}
        {relocationState !== 'idle' && relocationState !== 'searching' && (
          <>
            <div className="h-px w-full bg-border/20"></div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-1">
                RELOCATION ASSESSMENT
              </h3>
              <div className="flex gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-safe text-lg font-black leading-none">
                    {candidateSites.filter(s => s.safety?.status === 'eligible').length < 10 ? `0${candidateSites.filter(s => s.safety?.status === 'eligible').length}` : candidateSites.filter(s => s.safety?.status === 'eligible').length}
                  </span>
                  <span className="text-[9px] text-textMuted uppercase mt-1">ELIGIBLE</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-danger text-lg font-black leading-none">
                    {candidateSites.filter(s => s.safety?.status === 'rejected').length < 10 ? `0${candidateSites.filter(s => s.safety?.status === 'rejected').length}` : candidateSites.filter(s => s.safety?.status === 'rejected').length}
                  </span>
                  <span className="text-[9px] text-textMuted uppercase mt-1">REJECTED</span>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Action Buttons */}
      <div className="p-4 flex flex-col gap-3 mt-auto bg-black/40 backdrop-blur-md border-t border-border/30 sticky bottom-0 z-20">
        <button 
          onClick={() => navigate(`/hazard-intelligence/${selectedSettlement.id}`)}
          className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 font-bold text-[10px] py-3 rounded-sm tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] flex justify-center items-center gap-2"
        >
          <Search className="w-3.5 h-3.5" />
          ANALYZE ZONE &rarr;
        </button>
        <button 
          onClick={() => navigate(`/relocation-planning/${selectedSettlement.id}`)}
          className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary font-bold text-[10px] py-3 rounded-sm tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(255,153,0,0.15)] flex justify-center items-center gap-2"
        >
          <MapPin className="w-3.5 h-3.5" />
          FIND SAFE RELOCATION SITES &rarr;
        </button>
      </div>

    </div>
  );
};

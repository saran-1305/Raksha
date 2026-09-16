import React from 'react';
import { Layers, CheckSquare, Square, ChevronLeft } from 'lucide-react';
import { mapLayersData, eoLayersData } from '../../data/layers';
import { useMapState } from '../../context/MapContext';
import { cn } from '../../utils/cn';

interface MapLayersPanelProps {
  onClose?: () => void;
}

export const MapLayersPanel: React.FC<MapLayersPanelProps> = ({ onClose }) => {
  const { visibleLayers, toggleLayer, earthObservation, toggleEarthObservation } = useMapState();

  return (
    <div className="w-[240px] h-full flex flex-col z-10 overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase">
          <Layers className="w-4 h-4" />
          <span>MAP LAYERS</span>
        </div>
        <button onClick={onClose} className="text-textMuted hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col p-4 gap-6">
        
        {/* Primary Layers */}
        <div className="flex flex-col gap-3">
          {mapLayersData.map(layer => {
            const isActive = visibleLayers[layer.id];
            return (
              <div key={layer.id} onClick={() => toggleLayer(layer.id)} className="flex items-center gap-3 cursor-pointer group">
                {isActive ? (
                  <div className="bg-primary text-black rounded-[2px] shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="text-textMuted group-hover:text-white transition-colors">
                    <Square className="w-4 h-4" />
                  </div>
                )}
                <span className={cn(
                  "text-xs tracking-wide transition-colors",
                  isActive ? "text-white" : "text-textMuted group-hover:text-white"
                )}>
                  {layer.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-border/20"></div>

        {/* Earth Observation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-1">EARTH OBSERVATION</h3>
          {eoLayersData.map(layer => {
            const isActive = earthObservation[layer.id];
            return (
              <div key={layer.id} onClick={() => toggleEarthObservation(layer.id)} className="flex items-center gap-3 cursor-pointer group">
                {isActive ? (
                  <div className="bg-primary text-black rounded-[2px] shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="text-textMuted group-hover:text-white transition-colors">
                    <Square className="w-4 h-4" />
                  </div>
                )}
                <span className={cn(
                  "text-xs tracking-wide transition-colors",
                  isActive ? "text-white" : "text-textMuted group-hover:text-white"
                )}>
                  {layer.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-border/20"></div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-1 text-white">LEGEND <span className="text-textMuted normal-case tracking-normal">(Risk Level)</span></h3>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-danger shadow-[0_0_8px_rgba(255,51,51,0.6)]"></div>
            <span className="text-xs text-white">Critical</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-warning shadow-[0_0_8px_rgba(255,153,0,0.6)]"></div>
            <span className="text-xs text-white">High</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-caution shadow-[0_0_8px_rgba(255,204,0,0.6)]"></div>
            <span className="text-xs text-white">Moderate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-safe shadow-[0_0_8px_rgba(0,204,102,0.6)]"></div>
            <span className="text-xs text-white">Safer</span>
          </div>
        </div>

      </div>
    </div>
  );
};

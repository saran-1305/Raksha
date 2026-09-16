import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Building2, ShieldCheck, MapPin, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useMapState } from '../../context/MapContext';

export const PopulationAnalytics: React.FC = () => {
  const { selectedSettlement, setHoveredFeature } = useMapState();
  const navigate = useNavigate();

  // Deterministic data
  const totalExposed = selectedSettlement.populationExposed || 6840;
  const highRisk = 4980;
  const moderateRisk = 1860;
  const safeRisk = 0;
  const highRiskPercent = Math.round((highRisk / totalExposed) * 100);
  const moderateRiskPercent = Math.round((moderateRisk / totalExposed) * 100);
  const safeRiskPercent = Math.round((safeRisk / totalExposed) * 100);

  const buildingsExposed = 1420;
  const habitationsAffected = 4;
  const criticalInfrastructure = 17;

  // Set the hovered feature for the map overlay effect
  useEffect(() => {
    // We could set a specific population layer, but for now we'll just ensure 
    // nothing else is hovered that might distract from the Devgram focus.
    return () => setHoveredFeature(null);
  }, [setHoveredFeature]);

  return (
    <>
      {/* 04 - WHERE ARE THEY? (Map Overlay fixed to the left over the MapContainer) */}
      <div className="fixed top-24 left-6 z-20 pointer-events-none flex flex-col gap-4">
        <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-sm p-4 w-64 pointer-events-auto">
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-3 block">
            POPULATION EXPOSURE
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger border border-danger/50 shadow-[0_0_10px_rgba(255,59,48,0.5)]" />
              <span className="text-[10px] text-white font-bold tracking-widest uppercase">HIGH DENSITY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning border border-warning/50 shadow-[0_0_10px_rgba(255,171,0,0.5)]" />
              <span className="text-[10px] text-white font-bold tracking-widest uppercase">MODERATE DENSITY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-safe border border-safe/50 shadow-[0_0_10px_rgba(0,208,132,0.5)]" />
              <span className="text-[10px] text-white font-bold tracking-widest uppercase">LOW DENSITY</span>
            </div>
          </div>
        </div>

        <div className="bg-black/90 border border-danger/30 rounded-sm p-4 w-64 pointer-events-auto flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,59,48,0.15)] relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-danger" />
          <span className="text-white font-black tracking-widest uppercase text-lg mt-1">{selectedSettlement.name}</span>
          <span className="text-warning font-bold tracking-widest uppercase text-xs mt-1">{totalExposed.toLocaleString()} EXPOSED</span>
          <span className="text-danger font-bold tracking-widest uppercase text-[10px] mt-1">{highRiskPercent}% HIGH / CRITICAL</span>
        </div>
      </div>

      <div className="w-full h-full bg-black border-l border-border/30 flex flex-col pointer-events-auto relative z-10 overflow-hidden">
        
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
              POPULATION EXPOSURE
            </span>
            <h2 className="text-white text-xl font-black uppercase tracking-widest flex items-center gap-2">
              {selectedSettlement.name} <span className="text-white/30">·</span> {selectedSettlement.district}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 rounded-sm">
                [ MULTI-SOURCE POPULATION ASSESSMENT ]
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-3xl text-warning font-black tracking-widest uppercase leading-none">
              {totalExposed.toLocaleString()}
            </span>
            <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase mt-1">
              PEOPLE EXPOSED
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-32 flex flex-col gap-10">
          
          <p className="text-[11px] text-white/60 tracking-widest uppercase leading-relaxed max-w-2xl">
            Estimated population exposure is calculated by intersecting settlement and demographic information with the composite multi-hazard risk surface.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              {/* 01 - HOW MANY PEOPLE? (Exposure at a Glance) */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  01 — HOW MANY PEOPLE?
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase mb-1">
                    ESTIMATED POPULATION EXPOSED
                  </span>
                  <span className="text-5xl text-white font-black tracking-widest uppercase">
                    {totalExposed.toLocaleString()} <span className="text-xl text-textMuted">PEOPLE</span>
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex items-center justify-between border-l-2 border-danger pl-3">
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">HIGH / CRITICAL</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-danger font-black">{highRisk.toLocaleString()}</span>
                      <span className="text-[10px] text-textMuted font-bold tracking-widest w-8 text-right">{highRiskPercent}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-l-2 border-warning pl-3">
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">MODERATE</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-warning font-black">{moderateRisk.toLocaleString()}</span>
                      <span className="text-[10px] text-textMuted font-bold tracking-widest w-8 text-right">{moderateRiskPercent}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-l-2 border-safe pl-3 opacity-50">
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">LOW / SAFE</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-safe font-black">{safeRisk.toLocaleString()}</span>
                      <span className="text-[10px] text-textMuted font-bold tracking-widest w-8 text-right">{safeRiskPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03 — WHO NEEDS PRIORITY? */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  03 — WHO NEEDS PRIORITY?
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm text-white font-black tracking-widest uppercase">PRIORITY POPULATION</h3>
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
                    Population requiring the highest level of relocation assessment.
                  </span>
                </div>
                <div className="flex border border-danger/30 bg-danger/5 rounded-sm p-5 gap-6 items-center">
                  <div className="flex flex-col gap-1 border-r border-danger/20 pr-6 shrink-0">
                    <span className="text-3xl text-danger font-black tracking-widest">{highRisk.toLocaleString()}</span>
                    <span className="text-[9px] text-danger font-bold tracking-widest uppercase">HIGH / CRITICAL EXPOSURE</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-white font-black tracking-widest">{highRiskPercent}%</span>
                    <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">OF EXPOSED POPULATION</span>
                  </div>
                </div>
                <div className="flex flex-col bg-danger px-5 py-4 rounded-sm shadow-[0_0_20px_rgba(255,59,48,0.2)]">
                  <span className="text-[9px] text-black/70 font-black tracking-widest uppercase mb-1">PRIORITY STATUS</span>
                  <span className="text-xl text-black font-black tracking-widest uppercase flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" /> IMMEDIATE ASSESSMENT
                  </span>
                </div>
                <p className="text-[10px] text-white/60 font-bold tracking-widest uppercase leading-relaxed mt-2 border-l-2 border-white/20 pl-3">
                  Population located within high/critical composite-risk areas is prioritized for relocation assessment.
                </p>
              </div>

            </div>

            <div className="flex flex-col gap-8">
              {/* 02 — HOW SEVERE? (Risk Distribution) */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  02 — HOW SEVERE?
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm text-white font-black tracking-widest uppercase">POPULATION BY RISK CLASS</h3>
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
                    Distribution of exposed population across RAKSHA risk categories.
                  </span>
                </div>
                <div className="flex flex-col gap-5 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-danger font-bold tracking-widest uppercase">CRITICAL / HIGH</span>
                      <div className="flex gap-3 items-baseline">
                        <span className="text-sm text-white font-black">{highRisk.toLocaleString()}</span>
                        <span className="text-[10px] text-textMuted font-bold">{highRiskPercent}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-danger" style={{ width: `${highRiskPercent}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-warning font-bold tracking-widest uppercase">MODERATE</span>
                      <div className="flex gap-3 items-baseline">
                        <span className="text-sm text-white font-black">{moderateRisk.toLocaleString()}</span>
                        <span className="text-[10px] text-textMuted font-bold">{moderateRiskPercent}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-warning" style={{ width: `${moderateRiskPercent}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 opacity-40">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-safe font-bold tracking-widest uppercase">LOW / SAFE</span>
                      <div className="flex gap-3 items-baseline">
                        <span className="text-sm text-white font-black">{safeRisk.toLocaleString()}</span>
                        <span className="text-[10px] text-textMuted font-bold">{safeRiskPercent}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-safe w-0" />
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-sm mt-2 flex gap-3 items-start">
                  <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">EXPOSURE SIGNAL</span>
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase leading-snug">
                      {highRiskPercent}% of estimated exposed population falls within high/critical risk zones.
                    </span>
                  </div>
                </div>
              </div>

              {/* 05 — WHAT IS EXPOSED? */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  05 — WHAT IS EXPOSED?
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm text-white font-black tracking-widest uppercase">PHYSICAL EXPOSURE</h3>
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">
                    Built assets and critical services located within the affected assessment area.
                  </span>
                </div>
                <div className="flex flex-col border border-border/30 bg-black rounded-sm mt-2">
                  <div className="flex items-center p-4 border-b border-border/20 gap-4">
                    <Building2 className="w-5 h-5 text-white/50 shrink-0" />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">BUILDINGS EXPOSED</span>
                      <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">Structures within the assessed hazard footprint</span>
                    </div>
                    <span className="text-xl text-white font-black tracking-widest">{buildingsExposed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center p-4 border-b border-border/20 gap-4">
                    <MapPin className="w-5 h-5 text-white/50 shrink-0" />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">HABITATIONS AFFECTED</span>
                      <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">Settlements intersecting the affected area</span>
                    </div>
                    <span className="text-xl text-white font-black tracking-widest">{habitationsAffected}</span>
                  </div>
                  <div className="flex items-center p-4 gap-4">
                    <ShieldCheck className="w-5 h-5 text-white/50 shrink-0" />
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">CRITICAL INFRASTRUCTURE</span>
                      <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">Essential facilities requiring response consideration</span>
                    </div>
                    <span className="text-xl text-white font-black tracking-widest">{criticalInfrastructure}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4">
            
            <div className="flex flex-col gap-8">
              {/* 06 — WHAT DOES THIS MEAN? */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  06 — WHAT DOES THIS MEAN?
                </span>
                <h3 className="text-sm text-white font-black tracking-widest uppercase">POPULATION IMPACT ASSESSMENT</h3>
                <div className="bg-black border border-white/10 p-5 rounded-sm">
                  <p className="text-[11px] text-white/90 tracking-widest uppercase leading-loose">
                    RAKSHA estimates <span className="text-white font-bold">{totalExposed.toLocaleString()} people</span> within the assessed exposure area. 
                    <span className="text-danger font-bold"> {highRisk.toLocaleString()} people ({highRiskPercent}%)</span> fall within high/critical risk classes. 
                    This concentration increases the urgency for relocation assessment, while {moderateRisk.toLocaleString()} people remain in moderate exposure zones.
                  </p>
                </div>
              </div>

              {/* 08 — WHAT EVIDENCE SUPPORTS IT? */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  08 — WHAT EVIDENCE SUPPORTS IT?
                </span>
                <h3 className="text-sm text-white font-black tracking-widest uppercase mb-1">POPULATION EXPOSURE EVIDENCE</h3>
                <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase mb-2">Evidence sources used in this estimated assessment.</span>
                <div className="flex flex-wrap gap-3">
                  <div className="group relative border border-white/10 bg-white/5 px-3 py-1.5 rounded-sm cursor-help flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">Bhuvan / NRSC</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/20 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">Hazard and settlement geospatial evidence</span>
                    </div>
                  </div>
                  <div className="group relative border border-white/10 bg-white/5 px-3 py-1.5 rounded-sm cursor-help flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">WorldPop / Census</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/20 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">Population distribution reference</span>
                    </div>
                  </div>
                  <div className="group relative border border-white/10 bg-white/5 px-3 py-1.5 rounded-sm cursor-help flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">Settlement Data</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/20 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">Local habitation boundaries</span>
                    </div>
                  </div>
                  <div className="group relative border border-white/10 bg-white/5 px-3 py-1.5 rounded-sm cursor-help flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">DEM / Terrain</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/20 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">Terrain-related exposure context</span>
                    </div>
                  </div>
                  <div className="group relative border border-white/10 bg-white/5 px-3 py-1.5 rounded-sm cursor-help flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">Risk Surface</span>
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-black border border-white/20 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">Composite multi-hazard model output</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {/* 07 — WHAT ACTION FOLLOWS? */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
                  07 — WHAT ACTION FOLLOWS?
                </span>
                <h3 className="text-sm text-white font-black tracking-widest uppercase">FROM EXPOSURE TO ACTION</h3>
                <div className="flex flex-col items-center bg-cyan-400/5 border border-cyan-400/30 rounded-sm p-6 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl text-warning font-black tracking-widest uppercase">{totalExposed.toLocaleString()}</span>
                    <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">PEOPLE EXPOSED</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 rotate-90" />
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl text-danger font-black tracking-widest uppercase">{highRisk.toLocaleString()}</span>
                    <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">HIGH / CRITICAL</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 rotate-90" />
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xl text-danger font-black tracking-widest uppercase flex items-center gap-2">
                      IMMEDIATE
                    </span>
                    <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">RELOCATION ASSESSMENT</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/relocation-planning/${selectedSettlement.id}`)}
                    className="mt-2 w-full py-3 bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors text-cyan-400 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    PLAN RELOCATION &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-white/10 my-4" />

          {/* 09 — HOW DID RAKSHA REACH THIS DECISION? (Decision Trace) */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
              09 — HOW DID RAKSHA REACH THIS DECISION?
            </span>
            <h3 className="text-sm text-white font-black tracking-widest uppercase">POPULATION DECISION TRACE</h3>
            <div className="flex items-center justify-between bg-black border border-white/10 rounded-sm p-5 px-8">
              
              <div className="flex flex-col items-center text-center gap-1 shrink-0">
                <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">RISK</span>
                <span className="text-danger font-black text-lg">91 / 100</span>
                <span className="text-[9px] text-white font-bold tracking-widest uppercase">CRITICAL</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
              
              <div className="flex flex-col items-center text-center gap-1 shrink-0">
                <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">EXPOSED POPULATION</span>
                <span className="text-warning font-black text-lg">{totalExposed.toLocaleString()}</span>
                <span className="text-[9px] text-white font-bold tracking-widest uppercase">ESTIMATED</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
              
              <div className="flex flex-col items-center text-center gap-1 shrink-0">
                <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">HIGH / CRITICAL</span>
                <span className="text-danger font-black text-lg">{highRisk.toLocaleString()}</span>
                <span className="text-[9px] text-white font-bold tracking-widest uppercase">{highRiskPercent}%</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />

              <div className="flex flex-col items-center text-center gap-1 shrink-0">
                <span className="text-[9px] text-textMuted font-bold tracking-widest uppercase">IMPACT</span>
                <span className="text-danger font-black text-lg">84 / 100</span>
                <span className="text-[9px] text-white font-bold tracking-widest uppercase">SEVERE</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
              
              <div className="flex flex-col items-center text-center gap-1 shrink-0">
                <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase">RELOCATION PRIORITY</span>
                <span className="text-danger font-black text-xl">IMMEDIATE</span>
              </div>

            </div>
          </div>

          {/* 10 — WHAT CAN THE AUTHORITY DO NEXT? */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-400/30 pb-2">
              10 — WHAT CAN THE AUTHORITY DO NEXT?
            </span>
            <div className="flex items-center justify-between bg-safe/5 border border-safe/30 rounded-sm p-6">
              <div className="flex flex-col gap-1">
                <span className="text-safe font-black tracking-widest uppercase text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> POPULATION ASSESSMENT COMPLETE
                </span>
                <span className="text-[10px] text-white/70 font-bold tracking-widest uppercase mt-1">
                  Population exposure has been quantified and prioritized for relocation assessment.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(`/hazard-intelligence/${selectedSettlement.id}`)}
                  className="px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 transition-colors text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                >
                  VIEW HAZARD INTELLIGENCE &rarr;
                </button>
                <button 
                  onClick={() => navigate(`/relocation-planning/${selectedSettlement.id}`)}
                  className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors text-cyan-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                >
                  PLAN RELOCATION &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

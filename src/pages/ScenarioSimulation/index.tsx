import React, { useState } from 'react';
import { Activity, CloudRain, ArrowDown, ArrowUp, ShieldAlert, Target, Users, Map as MapIcon, MapPin, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useMapState } from '../../context/MapContext';
import { cn } from '../../utils/cn';

export const ScenarioSimulation: React.FC = () => {
  const { selectedSettlement } = useMapState();
  const [anomaly, setAnomaly] = useState(0);

  // Deterministic Baseline
  const baseRisk = 91;
  const basePop = 6840;
  const baseImpact = 84;
  const baseSites = 3;
  const baseCapacity = 9640;
  const baseCoverage = 100;
  const baseRadius = 5;
  
  // Scenario Math
  const scenarioRisk = Math.min(100, Math.round(baseRisk + anomaly / 20)); 
  const scenarioPop = basePop + anomaly * 14;
  const scenarioImpact = Math.min(100, Math.round(baseImpact + anomaly / 10));

  const isThresholdCrossed = anomaly >= 20;

  // Initial Scenario Impact on Plan
  const impactSites = isThresholdCrossed ? 2 : 3;
  const impactCapacity = isThresholdCrossed ? 6400 : 9640;
  const impactCoverage = isThresholdCrossed ? 82 : 100;

  // Adaptive Response
  const finalRadius = isThresholdCrossed ? 10 : 5;
  const finalSites = isThresholdCrossed ? 3 : 3;
  const finalCapacity = isThresholdCrossed ? 8100 : 9640;
  const finalCoverage = isThresholdCrossed ? 100 : 100;

  return (
    <>
      <div className="fixed top-24 left-6 z-20 pointer-events-none flex flex-col gap-4">
        {anomaly > 0 && (
          <div className="bg-black/90 backdrop-blur-md border border-warning/30 rounded-sm p-4 w-72 pointer-events-auto shadow-[0_0_20px_rgba(255,171,0,0.15)] flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-warning/30 pb-2">
              <CloudRain className="w-4 h-4 text-warning" />
              <span className="text-[10px] text-warning font-bold tracking-widest uppercase">
                SCENARIO HAZARD OVERLAY
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                <span className="text-textMuted">HAZARD FOOTPRINT</span>
                <span className="text-warning">+{Math.round(anomaly * 1.4)}% AREA</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                <span className="text-textMuted">NEWLY EXPOSED</span>
                <span className="text-danger">+{anomaly * 14} PEOPLE</span>
              </div>
            </div>
            {isThresholdCrossed && (
              <div className="mt-2 pt-2 border-t border-danger/30 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">SEARCH RADIUS</span>
                  <span className="text-safe">{finalRadius} KM</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted">ADAPTIVE STATUS</span>
                  <span className="text-safe">COVERAGE RESTORED</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-full h-full bg-[#03070d] flex flex-col pointer-events-auto relative z-10 overflow-hidden text-white">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-4">
          
          {/* HEADER */}
          <div className="flex justify-between items-center bg-[#070e17] border border-white/10 rounded-sm px-6 py-4 shrink-0">
            <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-cyan-400 opacity-80" />
              <div className="flex flex-col gap-0.5">
                <h1 className="text-base font-black tracking-widest uppercase leading-none">SCENARIO SIMULATION</h1>
                <span className="text-[10px] text-white/90 font-bold tracking-widest uppercase mt-0.5">{selectedSettlement.name} <span className="text-white/30 px-1">·</span> {selectedSettlement.district}</span>
                <span className="text-[8px] text-textMuted uppercase tracking-widest font-medium mt-0.5">
                  TEST HOW CHANGING HAZARD CONDITIONS AFFECT EXPOSURE AND RELOCATION DECISIONS
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end justify-center border border-orange-500/30 bg-orange-500/10 rounded-sm px-4 py-2 shrink-0">
              <span className="text-[8px] text-orange-500 font-bold tracking-widest uppercase">CURRENT SCENARIO</span>
              <span className="text-lg text-orange-500 font-black tracking-widest uppercase leading-none mt-1">+{anomaly}% <span className="text-[10px]">RAINFALL ANOMALY</span></span>
            </div>
          </div>

          {/* ROW 1: 3 - 6 - 3 */}
          <div className="grid grid-cols-12 gap-4 items-stretch">
            
            {/* 1 SELECT SCENARIO */}
            <div className="col-span-3 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader number="1" title="SELECT SCENARIO" subtitle="Adjust hazard conditions to simulate future impact" />
              
              <div className="flex items-center gap-2 mt-2">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-white/80">RAINFALL ANOMALY (%)</span>
              </div>
              
              <div className="flex flex-col gap-3 mt-1 mb-2">
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5" 
                  value={anomaly}
                  onChange={(e) => setAnomaly(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none relative z-10"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(anomaly/50)*100}%, rgba(255,255,255,0.1) ${(anomaly/50)*100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <div className="flex justify-between items-center text-[8px] font-bold tracking-widest uppercase">
                  <span className="text-textMuted text-left">0%<br/>(Current)</span>
                  <span className="text-cyan-400 text-sm">+{anomaly}%</span>
                  <span className="text-textMuted text-right">+50%<br/>(Extreme)</span>
                </div>
              </div>

              <div className="mt-auto text-[8px] text-textMuted uppercase tracking-widest leading-relaxed pt-3 border-t border-white/5">
                Increasing rainfall can trigger larger hazard zones, more exposed population, and reduce the suitability of existing relocation sites.
              </div>
            </div>
            
            {/* 2 IMPACT COMPARISON */}
            <div className="col-span-6 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader number="2" title="IMPACT COMPARISON" subtitle="Baseline vs. Scenario results" />
              
              <div className="flex flex-col w-full h-full mt-2 overflow-hidden">
                <div className="grid grid-cols-12 pb-2 border-b border-white/10 text-[8px] text-textMuted font-bold tracking-widest uppercase">
                  <div className="col-span-5">INDICATOR</div>
                  <div className="col-span-2 text-center">BASELINE</div>
                  <div className="col-span-3 text-center text-cyan-400">+{anomaly}% SCENARIO</div>
                  <div className="col-span-2 text-right">CHANGE</div>
                </div>

                <ComparisonRow label="Composite Risk Score" base={baseRisk} scenario={scenarioRisk} diff={scenarioRisk - baseRisk} />
                <ComparisonRow label="Exposed Population" base={basePop.toLocaleString()} scenario={scenarioPop.toLocaleString()} diff={scenarioPop - basePop} format="number" />
                <ComparisonRow label="Impact Score" base={baseImpact} scenario={scenarioImpact} diff={scenarioImpact - baseImpact} />
                <ComparisonRow label="Relocation Priority" base="IMMEDIATE" scenario="IMMEDIATE" diff={0} format="text" />
                <ComparisonRow label="Suitable Relocation Sites" base={baseSites} scenario={impactSites} diff={impactSites - baseSites} higherIsWorse={false} />
                <ComparisonRow label="Total Estimated Capacity" base={baseCapacity.toLocaleString()} scenario={impactCapacity.toLocaleString()} diff={impactCapacity - baseCapacity} format="number" higherIsWorse={false} />
                <ComparisonRow label="Population Coverage" base={`${baseCoverage}%`} scenario={`${impactCoverage}%`} diff={impactCoverage - baseCoverage} format="percent" higherIsWorse={false} isLast />
              </div>
            </div>
            
            {/* 8 KEY CHANGES */}
            <div className="col-span-3 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader icon={<Zap className="w-3 h-3 text-black" />} title="KEY CHANGES" subtitle="What changed under this scenario?" iconBg="bg-cyan-400" />
              
              <div className="flex flex-col gap-2.5 mt-2 flex-1 justify-center">
                <KeyChangeItem 
                  active={anomaly > 0} 
                  icon={<ShieldAlert className="w-3.5 h-3.5" />} 
                  text={`Risk increased by ${scenarioRisk - baseRisk} pt${scenarioRisk - baseRisk !== 1 ? 's' : ''}`} 
                />
                <KeyChangeItem 
                  active={anomaly > 0} 
                  icon={<MapIcon className="w-3.5 h-3.5" />} 
                  text={`Footprint expanded (+${Math.round(anomaly * 1.4)}% area)`} 
                />
                <KeyChangeItem 
                  active={anomaly > 0} 
                  icon={<Users className="w-3.5 h-3.5" />} 
                  text={`${anomaly * 14} additional people exposed`} 
                />
                <KeyChangeItem 
                  active={isThresholdCrossed} 
                  icon={<ShieldAlert className="w-3.5 h-3.5" />} 
                  text={`${baseSites - impactSites} site lost safety constraints`} 
                  isWarning
                />
                <KeyChangeItem 
                  active={isThresholdCrossed} 
                  icon={<Target className="w-3.5 h-3.5" />} 
                  text={`Coverage reduced to ${impactCoverage}%`} 
                  isWarning
                />
              </div>
            </div>
          </div>

          {/* ROW 2: 3 - 6 - 3 */}
          <div className="grid grid-cols-12 gap-4 items-stretch">
            
            {/* 3 HAZARD EXPANSION VISUALIZATION */}
            <div className="col-span-3 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader number="3" title="HAZARD EXPANSION" subtitle={`Baseline vs +${anomaly}% Rainfall`} />
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-black border border-white/10 rounded-sm flex flex-col items-center justify-center relative overflow-hidden aspect-square">
                   <div className="absolute top-1.5 left-1.5 z-10 text-[7px] font-bold tracking-widest uppercase bg-black/60 px-1.5 py-0.5 rounded-sm border border-white/10">BASELINE</div>
                   <div className="w-14 h-14 relative">
                     <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                        <polygon points="50,10 80,40 70,80 30,80 20,40" fill="rgba(239,68,68,0.4)" stroke="rgba(239,68,68,1)" strokeWidth="1"/>
                     </svg>
                   </div>
                </div>
                <div className="bg-black border border-white/10 rounded-sm flex flex-col items-center justify-center relative overflow-hidden aspect-square">
                   <div className="absolute top-1.5 left-1.5 z-10 text-[7px] font-bold tracking-widest uppercase bg-black/60 px-1.5 py-0.5 rounded-sm border border-warning/30 text-warning">+{anomaly}%</div>
                   <div className="w-14 h-14 relative">
                     <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                        <polygon points="50,10 80,40 70,80 30,80 20,40" fill="rgba(239,68,68,0.4)" stroke="rgba(239,68,68,1)" strokeWidth="1"/>
                        {anomaly > 0 && (
                          <polygon points="50,0 90,35 85,90 15,90 10,35" fill="rgba(249,115,22,0.3)" stroke="rgba(249,115,22,1)" strokeWidth="1"/>
                        )}
                     </svg>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 mt-auto text-[8px] font-bold tracking-widest uppercase">
                 <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-danger/40 border border-danger"></span>
                   <span className="text-white/80">Baseline Hazard</span>
                 </div>
                 {anomaly > 0 && (
                   <>
                     <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-orange-500/30 border border-orange-500"></span>
                       <span className="text-white/80">Scenario Hazard</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-yellow-500/20 border border-yellow-500"></span>
                       <span className="text-white/80">Additional Area</span>
                     </div>
                   </>
                 )}
              </div>
            </div>
            
            {/* 4 RELOCATION PLAN IMPACT */}
            <div className="col-span-6 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader number="4" title="RELOCATION PLAN IMPACT" subtitle="Effect on previously identified safe sites" />
              
              <div className="flex items-center gap-3 mt-2 flex-1">
                {/* Baseline Card */}
                <div className="flex-1 border border-safe/30 bg-safe/5 rounded-sm p-3 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[9px] text-safe font-bold tracking-widest uppercase mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> BASELINE PLAN
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-white leading-none">{baseSites}</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Sites</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-black text-white leading-none">{baseCapacity.toLocaleString()}</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Capacity</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-lg font-black text-safe leading-none">{baseCoverage}%</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Coverage</span>
                    </div>
                  </div>
                </div>
                
                <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
                
                {/* Scenario Impact Card */}
                <div className={cn("flex-1 border rounded-sm p-3 h-full flex flex-col justify-center transition-colors", isThresholdCrossed ? "border-danger/50 bg-danger/5" : "border-white/10 bg-black")}>
                  <div className={cn("flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase mb-2", isThresholdCrossed ? "text-danger" : "text-white/50")}>
                    <ShieldAlert className="w-3.5 h-3.5" /> SCENARIO IMPACT
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex flex-col">
                      <span className={cn("text-lg font-black leading-none", isThresholdCrossed ? "text-danger" : "text-white")}>{impactSites}</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Sites</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={cn("text-lg font-black leading-none", isThresholdCrossed ? "text-white" : "text-white")}>{impactCapacity.toLocaleString()}</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Capacity</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className={cn("text-lg font-black leading-none", isThresholdCrossed ? "text-danger" : "text-safe")}>{impactCoverage}%</span>
                      <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest mt-0.5">Coverage</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Warning Banner */}
              <div className={cn("mt-auto flex items-center justify-center gap-2 p-2 border rounded-sm transition-opacity", 
                isThresholdCrossed ? "border-danger/30 bg-danger/10 text-danger opacity-100" : "border-white/10 bg-white/5 text-white/20 opacity-30"
              )}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black tracking-widest uppercase">CURRENT PLAN NO LONGER PROVIDES FULL COVERAGE</span>
              </div>
            </div>
            
            {/* 5 RAKSHA ADAPTIVE RESPONSE */}
            <div className="col-span-3 bg-[#070e17] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <SectionHeader number="5" title="ADAPTIVE RESPONSE" subtitle="System automatically adjusts strategy" />
              
              <div className="flex flex-col gap-2.5 mt-2 flex-1 justify-center">
                <ChecklistItem number="1" text={`Initial search (+${baseRadius} KM)`} active={true} />
                <ChecklistItem number="2" text={`${impactSites} sites found`} active={true} />
                <ChecklistItem number="3" text="Capacity insufficient" active={isThresholdCrossed} />
                <ChecklistItem number="4" text={`Search \u2192 +${finalRadius} KM`} active={isThresholdCrossed} />
                <ChecklistItem number="5" text="New site identified" active={isThresholdCrossed} />
                <ChecklistItem number="6" text="Recalculating..." active={isThresholdCrossed} />
                <ChecklistItem number="7" text="Coverage restored" active={isThresholdCrossed} />
              </div>
            </div>
          </div>

          {/* ROW 3: Full Width */}
          <div className="grid grid-cols-1 shrink-0 pb-12">
            <div className="bg-[#070e17] border border-white/10 rounded-sm p-5 flex flex-col gap-3">
              <SectionHeader number="6" title="SCENARIO RECOMMENDATION" subtitle={`Updated relocation strategy under +${anomaly}% rainfall conditions`} />
              
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
                <div className="flex flex-col gap-1 max-w-sm">
                   <span className="text-[9px] text-safe font-bold tracking-widest uppercase">RAKSHA RECOMMENDATION</span>
                   <p className="text-[10px] text-white/80 uppercase tracking-widest leading-relaxed">
                     {isThresholdCrossed ? `Under +${anomaly}% rainfall conditions, expand the search radius to ${finalRadius} KM and include an additional safe site to restore full population coverage.` : `The current baseline plan remains robust and provides sufficient safe capacity.`}
                   </p>
                </div>
                
                <div className="flex items-center gap-6 px-6 border-l border-white/10">
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest">SEARCH RADIUS</span>
                     <span className="text-xl text-cyan-400 font-black uppercase tracking-widest leading-none">{finalRadius} KM</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest">SAFE SITES</span>
                     <span className="text-xl text-white font-black uppercase tracking-widest leading-none">{finalSites}</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest">CAPACITY</span>
                     <span className="text-xl text-white font-black uppercase tracking-widest leading-none">{finalCapacity.toLocaleString()}</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-[7px] text-textMuted font-bold uppercase tracking-widest">COVERAGE</span>
                     <span className="text-xl text-safe font-black uppercase tracking-widest leading-none">{finalCoverage}%</span>
                   </div>
                </div>

                <div className="pl-4 shrink-0">
                  <button className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                    <MapPin className="w-3.5 h-3.5" /> VIEW ON MAP
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const SectionHeader = ({ number, icon, title, subtitle, iconBg = "bg-cyan-500" }: { number?: string, icon?: React.ReactNode, title: string, subtitle: string, iconBg?: string }) => (
  <div className="flex items-start gap-2.5">
    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5", iconBg)}>
      {icon ? icon : <span className="text-[#070e17] text-[10px] font-black">{number}</span>}
    </div>
    <div className="flex flex-col">
      <h2 className="text-[11px] text-white font-black tracking-widest uppercase leading-tight">{title}</h2>
      <span className="text-[8px] text-textMuted font-medium uppercase tracking-widest leading-tight mt-0.5">{subtitle}</span>
    </div>
  </div>
);

const ComparisonRow = ({ label, base, scenario, diff, higherIsWorse = true, format = 'number', isLast = false }: any) => {
  const isChanged = diff !== 0;
  const isBad = isChanged && (higherIsWorse ? diff > 0 : diff < 0);
  
  let diffStr = '';
  if (isChanged) {
    if (format === 'percent') diffStr = diff > 0 ? `+${diff}%` : `${diff}%`;
    else if (format === 'number') diffStr = diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString();
    else diffStr = diff > 0 ? `+${diff}` : `${diff}`;
  } else {
    diffStr = '—';
  }

  return (
    <div className={cn("grid grid-cols-12 py-2.5 text-[8px] font-bold tracking-widest uppercase border-white/5 items-center", !isLast && "border-b")}>
      <div className="col-span-5 text-white/80 pr-2">{label}</div>
      <div className="col-span-2 text-center text-white">{base}</div>
      <div className={cn("col-span-3 text-center", isChanged ? (isBad ? "text-danger" : "text-cyan-400") : "text-white")}>{scenario}</div>
      <div className={cn("col-span-2 text-right flex items-center justify-end gap-1", isChanged ? (isBad ? "text-danger" : "text-cyan-400") : "text-white/30")}>
        {isChanged && (higherIsWorse ? (diff > 0 ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />) : (diff > 0 ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />))}
        {diffStr}
      </div>
    </div>
  );
};

const KeyChangeItem = ({ active, icon, text, isWarning = false }: { active: boolean, icon: React.ReactNode, text: string, isWarning?: boolean }) => (
  <div className={cn("flex items-center gap-2 p-2 rounded-sm border transition-colors", 
    active ? (isWarning ? "bg-danger/10 border-danger/30 text-danger" : "bg-white/5 border-white/10 text-white/90") : "bg-black/20 border-white/5 text-white/20"
  )}>
    <div className={cn("shrink-0", active ? (isWarning ? "text-danger" : "text-cyan-400") : "text-white/20")}>
      {icon}
    </div>
    <span className="text-[8px] font-bold uppercase tracking-widest leading-tight truncate" title={text}>
      {text}
    </span>
  </div>
);

const ChecklistItem = ({ number, text, active }: { number: string, text: string, active: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[7px] font-bold border transition-colors",
      active ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-white/20"
    )}>
      {number}
    </div>
    <span className={cn("text-[8px] uppercase tracking-widest font-bold transition-colors truncate", 
      active ? "text-white/90" : "text-white/30"
    )} title={text}>
      {text}
    </span>
    {active && <CheckCircle2 className="w-3 h-3 text-cyan-400 ml-auto shrink-0" />}
  </div>
);

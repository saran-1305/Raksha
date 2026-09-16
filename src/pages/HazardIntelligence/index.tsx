import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, Database, Users, Building2, Truck, Activity, ArrowRight, Info } from 'lucide-react';
import { useMapState } from '../../context/MapContext';
import { mockApi } from '../../services/mockApi';
import type { Settlement } from '../../types';
import { cn } from '../../utils/cn';

export const HazardIntelligence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedSettlement, setSelectedSettlement } = useMapState();
  const [data, setData] = useState<Settlement | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync route param with map state and load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const settlementId = id || selectedSettlement.id;
        const settlementData = await mockApi.getSettlementRisk(settlementId);
        setData(settlementData);
        if (settlementData.id !== selectedSettlement.id) {
          setSelectedSettlement(settlementData);
        }
      } catch (err) {
        console.error("Failed to load hazard intelligence", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, selectedSettlement.id, setSelectedSettlement]);

  if (loading || !data) {
    return (
      <div className="w-full h-full bg-black border-l border-border/30 p-8 flex flex-col items-center justify-center pointer-events-auto">
        <ShieldAlert className="w-8 h-8 text-cyan-500 animate-pulse mb-4" />
        <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest animate-pulse">Analyzing Multi-Source Evidence...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black border-l border-border/30 flex flex-col pointer-events-auto relative z-10">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/30 bg-gradient-to-r from-danger/5 to-transparent shrink-0">
        <ShieldAlert className="w-5 h-5 text-danger" />
        <div className="flex flex-col">
          <span className="text-[10px] text-danger font-bold tracking-widest uppercase">
            MULTI-SOURCE RISK ASSESSMENT
          </span>
          <h2 className="text-white text-lg font-black uppercase tracking-wider">
            HAZARD INTELLIGENCE: {data.name}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-8">
        
        {/* Risk & Priority Hero Section */}
        <div className="flex gap-4">
          <div className="flex-1 bg-danger/10 border border-danger/30 rounded-sm p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-danger/20 blur-[50px] -mr-10 -mt-10 rounded-full pointer-events-none" />
            <span className="text-[10px] text-danger font-bold tracking-widest uppercase mb-1">COMPOSITE RISK</span>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-white leading-none">{data.riskScore}</span>
              <span className="text-sm text-danger font-bold uppercase pb-1 mb-1">/ 100 {data.riskLevel}</span>
            </div>
          </div>
          
          <div className="flex-1 bg-warning/10 border border-warning/30 rounded-sm p-5 flex flex-col">
            <span className="text-[10px] text-warning font-bold tracking-widest uppercase mb-1">RELOCATION PRIORITY</span>
            <div className="flex items-end gap-2 mt-auto">
              <span className="text-2xl font-black text-warning uppercase tracking-widest">{data.relocationPriority}</span>
            </div>
          </div>
        </div>

        {/* Logic Trace (Risk + Impact + Recovery = Priority) */}
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-sm p-4">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted uppercase tracking-widest">RISK</span>
            <span className="text-danger font-bold">{data.riskScore}</span>
          </div>
          <span className="text-white/30">+</span>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted uppercase tracking-widest">IMPACT</span>
            <span className="text-warning font-bold">{data.impactScore}</span>
          </div>
          <span className="text-white/30">+</span>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-textMuted uppercase tracking-widest">RECOVERY</span>
            <span className="text-primary font-bold">{data.estimatedRecoveryMin}-{data.estimatedRecoveryMax} MO</span>
          </div>
          <ArrowRight className="w-4 h-4 text-white/50" />
          <div className="flex flex-col items-center bg-warning/20 px-3 py-1 rounded-sm border border-warning/50">
            <span className="text-[9px] text-warning uppercase tracking-widest font-bold">PRIORITY</span>
            <span className="text-warning font-black">{data.relocationPriority}</span>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2 border-b border-white/10 pb-2">
            <Activity className="w-4 h-4 text-cyan-400" /> RISK FACTOR BREAKDOWN
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Flood Susceptibility', value: data.riskFactors.flood, color: 'bg-cyan-500', weight: '25%' },
              { label: 'Landslide Susceptibility', value: data.riskFactors.landslide, color: 'bg-danger', weight: '25%' },
              { label: 'Rainfall Anomaly', value: data.riskFactors.rainfall, color: 'bg-warning', weight: '15%' },
              { label: 'Terrain / Slope', value: data.riskFactors.terrain, color: 'bg-orange-500', weight: '10%' },
              { label: 'Historical Recurrence', value: data.riskFactors.historical, color: 'bg-purple-500', weight: '10%' },
              { label: 'Population Exposure', value: data.riskFactors.population, color: 'bg-primary', weight: '10%' },
              { label: 'Infrastructure Exposure', value: data.riskFactors.infrastructure, color: 'bg-pink-500', weight: '5%' }
            ].map(factor => (
              <div key={factor.label} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-textMuted uppercase tracking-widest flex items-center gap-2">
                    <span className="text-white/30 text-[8px] w-6">{factor.weight}</span>
                    <span className="text-white/80">{factor.label}</span>
                  </span>
                  <span className="font-mono text-white font-bold">{factor.value}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={cn("h-full", factor.color)} style={{ width: `${factor.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2 border-b border-white/10 pb-2">
            <Users className="w-4 h-4 text-warning" /> IMPACT ASSESSMENT
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 p-3 flex flex-col gap-1 rounded-sm">
              <span className="text-[9px] text-textMuted uppercase tracking-widest flex items-center gap-1.5"><Users className="w-3 h-3" /> POPULATION EXPOSED</span>
              <span className="text-lg font-black text-white">{data.populationExposed.toLocaleString()}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 flex flex-col gap-1 rounded-sm">
              <span className="text-[9px] text-textMuted uppercase tracking-widest flex items-center gap-1.5"><Building2 className="w-3 h-3" /> BUILDINGS EXPOSED</span>
              <span className="text-lg font-black text-white">{data.buildingsExposed.toLocaleString()}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 flex flex-col gap-1 rounded-sm">
              <span className="text-[9px] text-textMuted uppercase tracking-widest flex items-center gap-1.5"><ShieldAlert className="w-3 h-3" /> CRITICAL INFRASTRUCTURE</span>
              <span className="text-lg font-black text-white">{data.criticalInfrastructureExposed} Facilities</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 flex flex-col gap-1 rounded-sm">
              <span className="text-[9px] text-textMuted uppercase tracking-widest flex items-center gap-1.5"><Truck className="w-3 h-3" /> ROAD ACCESSIBILITY</span>
              <span className="text-lg font-black text-danger">LIMITED</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-warning/10 border border-warning/30 p-3 rounded-sm mt-1">
            <span className="text-[10px] text-warning font-bold tracking-widest uppercase">IMPACT SCORE</span>
            <span className="text-warning font-black">{data.impactScore} / 100 <span className="text-xs ml-1">SEVERE</span></span>
          </div>
        </div>

        {/* Recovery Assessment */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2 border-b border-white/10 pb-2">
            <Activity className="w-4 h-4 text-primary" /> ESTIMATED RECOVERY
          </h3>
          <div className="flex flex-col gap-4 bg-white/5 border border-white/10 p-4 rounded-sm">
            <div className="flex justify-between items-end">
              <span className="text-2xl font-black text-primary">{data.estimatedRecoveryMin}–{data.estimatedRecoveryMax} MONTHS</span>
              <span className="text-[10px] text-danger font-bold tracking-widest uppercase bg-danger/20 px-2 py-1 rounded-sm border border-danger/50">LONG DURATION</span>
            </div>
            
            {/* Timeline Graphic */}
            <div className="relative mt-2">
              <div className="h-1 w-full bg-white/10 rounded-full" />
              <div className="absolute top-0 left-0 h-1 bg-primary rounded-full" style={{ width: '80%' }} />
              <div className="flex justify-between text-[9px] text-textMuted font-bold mt-2">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>9</span>
                <span>12+ MO</span>
              </div>
            </div>

            <div className="text-[9px] text-textMuted uppercase tracking-widest border-t border-white/10 pt-3 mt-1 flex items-start gap-2">
              <Info className="w-3 h-3 text-primary shrink-0" />
              <span>Prototype estimate. Operational deployment should be calibrated with historical recovery and authority/field data.</span>
            </div>
          </div>
        </div>

        {/* Evidence Trace */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2 border-b border-white/10 pb-2">
            <Database className="w-4 h-4 text-white/50" /> EVIDENCE TRACE
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col gap-2">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Bhuvan / NRSC</span>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Contribution</span>
                <span className="text-danger font-bold">HIGH</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Confidence</span>
                <span className="text-white font-bold">0.91</span>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col gap-2">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Rainfall Anomaly</span>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Contribution</span>
                <span className="text-danger font-bold">HIGH</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Confidence</span>
                <span className="text-white font-bold">0.94</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col gap-2">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">DEM / Terrain</span>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Contribution</span>
                <span className="text-warning font-bold">MEDIUM</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Confidence</span>
                <span className="text-white font-bold">0.98</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col gap-2">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">WorldPop / Census</span>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Contribution</span>
                <span className="text-warning font-bold">MEDIUM</span>
              </div>
              <div className="flex justify-between text-[9px]">
                <span className="text-textMuted uppercase">Confidence</span>
                <span className="text-white font-bold">0.85</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-border/30 bg-black shrink-0">
        <button 
          onClick={() => navigate('/population-analytics')}
          className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500 font-bold text-xs py-4 px-4 rounded-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
        >
          <Users className="w-5 h-5" />
          POPULATION ANALYTICS &rarr;
        </button>
      </div>

    </div>
  );
};

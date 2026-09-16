import React from 'react';
import { AlertTriangle, BarChart2, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMapState } from '../../context/MapContext';

export const DecisionSummary: React.FC = () => {
  const { selectedSettlement } = useMapState();

  return (
    <div className="h-20 bg-black border-t border-border flex items-center px-6 gap-6 z-50">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col min-w-[200px]">
        <h2 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <div className="w-4 h-5 bg-primary/20 border border-primary/50 flex items-center justify-center">
            <span className="text-primary text-[10px]">&#9776;</span>
          </div>
          DECISION SUMMARY
        </h2>
        <span className="text-[10px] text-textMuted mt-1 leading-tight">
          From Risk to Relocation<br/>for Safer Communities
        </span>
      </div>

      <div className="w-px h-10 bg-border/50"></div>

      {/* Metrics Strip */}
      <div className="flex-1 flex items-center justify-between">
        
        {/* Risk */}
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-8 h-8 text-danger" />
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">RISK</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-danger">{selectedSettlement.riskScore}</span>
              <span className="text-xs font-semibold text-danger uppercase">{selectedSettlement.riskLevel}</span>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="flex items-center gap-4">
          <BarChart2 className="w-8 h-8 text-warning" />
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">IMPACT</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-warning">{selectedSettlement.impactScore}</span>
              <span className="text-xs font-semibold text-warning uppercase">SEVERE</span>
            </div>
          </div>
        </div>

        {/* Population */}
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-white" />
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">POPULATION</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{(selectedSettlement.populationExposed).toLocaleString()}</span>
              <span className="text-xs font-semibold text-textMuted uppercase">EXPOSED</span>
            </div>
          </div>
        </div>

        {/* Recovery */}
        <div className="flex items-center gap-4">
          <Clock className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">RECOVERY</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">{selectedSettlement.estimatedRecoveryMin} &ndash; {selectedSettlement.estimatedRecoveryMax} MONTHS</span>
              <span className="text-xs font-semibold text-danger uppercase">LONG</span>
            </div>
          </div>
        </div>

        {/* Relocation */}
        <div className="flex items-center gap-4">
          <ArrowRight className="w-8 h-8 text-danger" />
          <div className="flex flex-col">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">RELOCATION</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-danger leading-tight uppercase">{selectedSettlement.relocationPriority}</span>
              <span className="text-[9px] font-semibold text-textMuted uppercase">ACTION REQUIRED</span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-px h-10 bg-border/50"></div>

      {/* Status Right */}
      <div className="flex items-center gap-3 min-w-[200px] justify-end">
        <CheckCircle2 className="w-8 h-8 text-success" />
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-success uppercase tracking-wider">MULTI-SOURCE ANALYSIS COMPLETE</span>
          <span className="text-[9px] text-textMuted">5 evidence layers analyzed</span>
        </div>
      </div>

    </div>
  );
};

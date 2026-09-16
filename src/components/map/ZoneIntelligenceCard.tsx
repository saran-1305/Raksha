import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Radio, ArrowRight } from 'lucide-react';
import { useMapState } from '../../context/MapContext';
import { cn } from '../../utils/cn';

const EVIDENCE_STEPS = [
  { label: 'FLOOD EVIDENCE', factor: 'flood', weight: 0.25 },
  { label: 'LANDSLIDE EVIDENCE', factor: 'landslide', weight: 0.25 },
  { label: 'RAINFALL ANOMALY', factor: 'rainfall', weight: 0.15 },
  { label: 'DEM / TERRAIN', factor: 'terrain', weight: 0.10 },
  { label: 'HISTORICAL RECURRENCE', factor: 'historical', weight: 0.10 },
  { label: 'POPULATION EXPOSURE', factor: 'population', weight: 0.10 },
  { label: 'INFRASTRUCTURE', factor: 'infrastructure', weight: 0.05 },
];

export const ZoneIntelligenceCard: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSettlement, zoneCardState, setZoneCardState } = useMapState();
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  // Reset state when card re-enters analyzing
  useEffect(() => {
    if (zoneCardState === 'analyzing') {
      setCompletedSteps(0);
      setCalculatedScore(null);

      // Progressive evidence check animation (2-4s total)
      const timers: ReturnType<typeof setTimeout>[] = [];
      EVIDENCE_STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => {
          setCompletedSteps(i + 1);
        }, 350 * (i + 1)));
      });

      // After all steps, calculate and transition
      timers.push(setTimeout(() => {
        const factors = selectedSettlement.riskFactors;
        const score = Math.round(
          factors.flood * 0.25 +
          factors.landslide * 0.25 +
          factors.rainfall * 0.15 +
          factors.terrain * 0.10 +
          factors.historical * 0.10 +
          factors.population * 0.10 +
          factors.infrastructure * 0.05
        );
        setCalculatedScore(score);
      }, 350 * EVIDENCE_STEPS.length + 400));

      timers.push(setTimeout(() => {
        setZoneCardState('complete');
      }, 350 * EVIDENCE_STEPS.length + 1200));

      return () => timers.forEach(clearTimeout);
    }
  }, [zoneCardState, selectedSettlement, setZoneCardState]);

  if (zoneCardState === 'hidden') return null;

  // ──── STATE 1: DETECTED ────
  if (zoneCardState === 'detected') {
    return (
      <div className="bg-black/95 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_25px_rgba(0,229,255,0.15)] rounded-sm min-w-[240px] max-w-[260px] pointer-events-auto">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyan-500/20">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">ZONE DETECTED</span>
        </div>

        {/* Body */}
        <div className="px-4 py-3 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-white font-black tracking-widest text-sm uppercase">{selectedSettlement.name}</span>
            <span className="text-[9px] text-textMuted uppercase tracking-widest">{selectedSettlement.district}, {selectedSettlement.state}</span>
          </div>

          <div className="flex flex-col gap-1.5 text-[10px] tracking-widest uppercase">
            <div className="flex justify-between">
              <span className="text-textMuted">RISK SCORE</span>
              <span className="text-danger font-bold">{selectedSettlement.riskScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textMuted">POPULATION</span>
              <span className="text-white font-bold">{selectedSettlement.populationExposed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textMuted">STATUS</span>
              <span className="text-danger font-bold">{selectedSettlement.riskLevel.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="px-4 pb-3">
          <button
            onClick={() => setZoneCardState('analyzing')}
            className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 py-2 text-[10px] font-bold tracking-widest uppercase text-center rounded-sm transition-all flex items-center justify-center gap-2"
          >
            ANALYZE ZONE <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  // ──── STATE 2: ANALYZING ────
  if (zoneCardState === 'analyzing') {
    return (
      <div className="bg-black/95 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_25px_rgba(0,229,255,0.15)] rounded-sm min-w-[240px] max-w-[260px] pointer-events-auto">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyan-500/20">
          <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">ZONE ANALYSIS</span>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          <span className="text-white font-black tracking-widest text-xs uppercase">{selectedSettlement.name}</span>

          <div className="flex flex-col gap-1.5">
            {EVIDENCE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 text-[10px] tracking-widest uppercase">
                {i < completedSteps ? (
                  <CheckCircle2 className="w-3 h-3 text-safe shrink-0" />
                ) : i === completedSteps ? (
                  <Loader2 className="w-3 h-3 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-white/20 shrink-0" />
                )}
                <span className={cn(
                  "transition-colors duration-300",
                  i < completedSteps ? "text-safe" : i === completedSteps ? "text-cyan-400" : "text-white/30"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {calculatedScore !== null ? (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
              <span className="text-[10px] text-textMuted uppercase tracking-widest">COMPOSITE RISK</span>
              <span className="text-danger font-black text-lg">{calculatedScore}<span className="text-[10px] text-textMuted"> / 100</span></span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">CALCULATING COMPOSITE RISK...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ──── STATE 3: COMPLETE ────
  return (
    <div className="bg-black/95 backdrop-blur-md border border-safe/30 shadow-[0_0_25px_rgba(0,208,132,0.15)] rounded-sm min-w-[240px] max-w-[260px] pointer-events-auto">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-safe/20">
        <CheckCircle2 className="w-3.5 h-3.5 text-safe" />
        <span className="text-[10px] text-safe font-bold tracking-widest uppercase">ANALYSIS COMPLETE</span>
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        <span className="text-white font-black tracking-widest text-xs uppercase">{selectedSettlement.name}</span>

        <div className="flex flex-col gap-1.5 text-[10px] tracking-widest uppercase">
          <div className="flex justify-between">
            <span className="text-textMuted">RISK</span>
            <span className="text-danger font-bold">{selectedSettlement.riskScore} / 100 {selectedSettlement.riskLevel.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">EXPOSED</span>
            <span className="text-white font-bold">{selectedSettlement.populationExposed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">IMPACT</span>
            <span className="text-warning font-bold">{selectedSettlement.impactScore} / 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">RECOVERY</span>
            <span className="text-primary font-bold">{selectedSettlement.estimatedRecoveryMin}–{selectedSettlement.estimatedRecoveryMax} MO</span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">PRIORITY</span>
            <span className="text-danger font-bold">{selectedSettlement.relocationPriority}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <button
          onClick={() => {
            setZoneCardState('hidden');
            navigate(`/hazard-intelligence/${selectedSettlement.id}`);
          }}
          className="w-full bg-safe/10 hover:bg-safe/20 text-safe border border-safe/40 py-2 text-[10px] font-bold tracking-widest uppercase text-center rounded-sm transition-all flex items-center justify-center gap-2"
        >
          OPEN INTELLIGENCE <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

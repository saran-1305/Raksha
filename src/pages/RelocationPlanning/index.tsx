import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMapState } from '../../context/MapContext';
import { mockApi } from '../../services/mockApi';
import type { Settlement, RelocationSite } from '../../types';

import { RelocationHeader } from '../../components/relocation/RelocationHeader';
import { RelocationWorkflow, WORKFLOW_STEPS } from '../../components/relocation/RelocationWorkflow';
import type { WorkflowStepId } from '../../components/relocation/RelocationWorkflow';
import { CandidateDiscovery } from '../../components/relocation/CandidateDiscovery';
import { SafetyAssessment } from '../../components/relocation/SafetyAssessment';
import { CapacityAssessment } from '../../components/relocation/CapacityAssessment';
import { InfrastructureAssessment } from '../../components/relocation/InfrastructureAssessment';
import { SuitabilityAssessment } from '../../components/relocation/SuitabilityAssessment';
import { RecommendationPanel } from '../../components/relocation/RecommendationPanel';

export const RelocationPlanning: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedSettlement, setSelectedSettlement, setHoveredFeature, setRelocationState } = useMapState();
  
  const [data, setData] = useState<Settlement | null>(null);
  const [candidates, setCandidates] = useState<RelocationSite[]>([]);
  const [searchSteps, setSearchSteps] = useState<{radius: number, status: 'SUFFICIENT' | 'INSUFFICIENT', candidates: number}[]>([]);
  const [currentStepId, setCurrentStepId] = useState<WorkflowStepId>('discover');
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    let isCancelled = false;
    
    const loadData = async () => {
      setLoading(true);
      try {
        const settlementId = id || selectedSettlement.id;
        const settlementData = await mockApi.getSettlementRisk(settlementId);
        
        if (isCancelled) return;
        setData(settlementData);
        if (settlementData.id !== selectedSettlement.id) {
          setSelectedSettlement(settlementData);
        }

        let currentRadius = 5;
        let finalSites: any[] = [];
        const steps: {radius: number, status: 'SUFFICIENT' | 'INSUFFICIENT', candidates: number}[] = [];

        while (currentRadius <= 15) {
          const sites = await mockApi.getRelocationCandidates(settlementId, currentRadius);
          
          const populatedSites = await Promise.all(sites.map(async (site) => {
            const safety = await mockApi.assessSiteSafety(site.id);
            let capacity, infrastructure, suitability;
            if (safety?.status === 'eligible') {
              const capData = await mockApi.calculateCapacity(site.id);
              capacity = capData.capacity;
              infrastructure = capData.infrastructure;
              suitability = await mockApi.calculateSiteSuitability(site.id);
            }
            return { ...site, safety, capacity, infrastructure, suitability };
          }));

          const eligibleSites = populatedSites.filter(s => s.safety?.status === 'eligible');
          const totalCapacity = eligibleSites.reduce((sum, s) => sum + (s.capacity?.estimatedSafeCapacity || 0), 0);
          
          if (totalCapacity >= settlementData.populationExposed) {
            steps.push({ radius: currentRadius, status: 'SUFFICIENT', candidates: sites.length });
            finalSites = populatedSites;
            break;
          } else {
            steps.push({ radius: currentRadius, status: 'INSUFFICIENT', candidates: sites.length });
            finalSites = populatedSites;
            currentRadius += 5;
          }
        }

        if (isCancelled) return;
        setSearchSteps(steps);
        setCandidates(finalSites);

      } catch (err) {
        console.error("Failed to load relocation data", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadData();
    return () => { isCancelled = true; };
  }, [id]);

  const handleHoverSite = (site: RelocationSite | null) => {
    if (site) {
      setHoveredFeature({ type: 'relocation', data: site });
    } else {
      setHoveredFeature(null);
    }
  };

  useEffect(() => {
    switch (currentStepId) {
      case 'discover': setRelocationState('searching'); break;
      case 'safety': setRelocationState('assessing_safety'); break;
      case 'capacity': setRelocationState('assessing_capacity'); break;
      case 'infrastructure': setRelocationState('capacity_complete'); break;
      case 'suitability': setRelocationState('capacity_complete'); break;
      case 'recommendation': setRelocationState('capacity_complete'); break;
      default: setRelocationState('idle'); break;
    }
  }, [currentStepId, setRelocationState]);

  if (loading || !data) {
    return (
      <div className="w-full h-full bg-black border-l border-border/30 p-8 flex items-center justify-center pointer-events-auto">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === currentStepId);
  const isLastStep = currentIndex === WORKFLOW_STEPS.length - 1;

  const handleNext = () => {
    if (currentIndex < WORKFLOW_STEPS.length - 1) {
      setCurrentStepId(WORKFLOW_STEPS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentStepId(WORKFLOW_STEPS[currentIndex - 1].id);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStepId) {
      case 'discover':
        return <CandidateDiscovery settlement={data} candidates={candidates} searchSteps={searchSteps} onHoverSite={handleHoverSite} />;
      case 'safety':
        return <SafetyAssessment candidates={candidates} />;
      case 'capacity':
        return <CapacityAssessment settlement={data} candidates={candidates} />;
      case 'infrastructure':
        return <InfrastructureAssessment candidates={candidates} />;
      case 'suitability':
        return <SuitabilityAssessment candidates={candidates} />;
      case 'recommendation':
        return <RecommendationPanel settlement={data} candidates={candidates} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-black border-l border-border/30 pointer-events-auto relative z-10 overflow-hidden">
      
      {/* 1. Header (Fixed at top) */}
      <RelocationHeader settlement={data} />
      
      {/* 2. Workflow Tracker (Fixed below header) */}
      <RelocationWorkflow currentStep={currentStepId} onStepClick={setCurrentStepId} />
      
      {/* 3. Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="min-h-full pb-20">
          {renderCurrentStep()}
        </div>
      </div>

      {/* Manual Step Navigation for Phase 1 Review (Floating at bottom right) */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-white/10"
        >
          &larr; PREV
        </button>
        {isLastStep ? (
          <>
            <button 
              className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10"
              onClick={() => {}}
            >
              [ VIEW ON MAP ]
            </button>
            <button 
              className="px-4 py-2 bg-safe/20 border border-safe/50 text-safe text-xs font-bold uppercase tracking-widest cursor-default"
            >
              ANALYSIS COMPLETE ✓
            </button>
          </>
        ) : (
          <button 
            onClick={handleNext} 
            className="px-4 py-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/30 transition-colors"
          >
            NEXT &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

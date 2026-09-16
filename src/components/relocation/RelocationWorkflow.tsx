import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export type WorkflowStepId = 'discover' | 'safety' | 'capacity' | 'infrastructure' | 'suitability' | 'recommendation';

export const WORKFLOW_STEPS: { id: WorkflowStepId; label: string }[] = [
  { id: 'discover', label: 'DISCOVER' },
  { id: 'safety', label: 'SAFETY' },
  { id: 'capacity', label: 'CAPACITY' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE' },
  { id: 'suitability', label: 'SUITABILITY' },
  { id: 'recommendation', label: 'RECOMMENDATION' }
];

interface RelocationWorkflowProps {
  currentStep: WorkflowStepId;
  onStepClick: (stepId: WorkflowStepId) => void;
}

export const RelocationWorkflow: React.FC<RelocationWorkflowProps> = ({ currentStep, onStepClick }) => {
  const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="flex flex-col bg-black px-6 py-6 shrink-0 relative z-10 border-b border-border/30 h-[90px]">
      <div className="flex justify-between items-center w-full relative">
        <div className="absolute left-0 right-0 top-[6px] h-0.5 bg-white/10 -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 top-[6px] h-0.5 bg-cyan-400 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
        />
        
        {WORKFLOW_STEPS.map((step, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          
          return (
            <button 
              key={step.id} 
              className={cn("flex flex-col items-center gap-2 relative z-10", (isPast || isCurrent) ? "cursor-pointer" : "cursor-default")}
              onClick={() => {
                if (isPast || isCurrent) onStepClick(step.id);
              }}
            >
              <div className={cn(
                "w-3 h-3 rounded-full flex items-center justify-center ring-4 ring-black transition-all duration-300",
                isPast ? "bg-safe text-black" :
                isCurrent ? "bg-cyan-400 scale-[1.3] shadow-[0_0_12px_rgba(0,229,255,0.6)]" :
                "bg-white/20"
              )}>
                {isPast && <Check className="w-2.5 h-2.5" strokeWidth={4} />}
              </div>
              <span className={cn(
                "text-[9px] font-bold tracking-widest absolute top-5 w-28 text-center transition-colors duration-300 whitespace-nowrap",
                isPast ? "text-safe" : isCurrent ? "text-cyan-400" : "text-white/30"
              )}>
                {String(i + 1).padStart(2, '0')} {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

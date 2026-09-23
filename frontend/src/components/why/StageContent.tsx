import React from 'react';

const stageData = [
  {
    num: "01 / 04",
    title: "DETECT RISK",
    description: "Identify hazardous areas using multi-source geospatial intelligence.",
    metricsTitle: "LIVE HAZARD ANALYSIS",
    metrics: [
      { label: "Rainfall (24h)", value: "182 mm" },
      { label: "Terrain Slope", value: "34°" },
      { label: "Soil Saturation", value: "78%" },
      { label: "Hazard Probability", value: "87%" },
    ],
    footer: "DYNAMIC RISK ENVELOPE"
  },
  {
    num: "02 / 04",
    title: "UNDERSTAND IMPACT",
    description: "Measure population, infrastructure and accessibility exposure before routes become impassable.",
    metricsTitle: "HUMAN EXPOSURE",
    metrics: [
      { label: "Population Exposed", value: "12,840" },
      { label: "Infrastructure", value: "47" },
      { label: "Critical Roads", value: "12" },
      { label: "Accessibility", value: "63%" },
    ],
    footer: "EXPOSURE INDEX — HIGH"
  },
  {
    num: "03 / 04",
    title: "FIND SAFER GROUND",
    description: "Search, filter and rank potential relocation sites using progressive safety analysis.",
    metricsTitle: "SELECTED SAFE LOCATION",
    metrics: [
      { label: "SITE A", value: "" },
      { label: "Safety Score", value: "94.2%" },
    ],
    checks: [
      "Low Hazard Risk",
      "Higher Elevation",
      "Accessible by Road",
      "Adequate Resources"
    ],
    footer: "CONCENTRIC SAFETY SEARCH"
  },
  {
    num: "04 / 04",
    title: "PLAN & RELOCATE",
    description: "Turn intelligence into an actionable relocation strategy.",
    metricsTitle: "RELOCATION OVERVIEW",
    metrics: [
      { label: "People to relocate", value: "12,840" },
      { label: "Safe Location", value: "SITE A" },
      { label: "Route Distance", value: "18.6 km" },
      { label: "Travel Time", value: "2.8 hrs" },
      { label: "Safety Score", value: "94.2%" },
    ],
    footer: "RELOCATION ROUTE GENERATED"
  }
];

interface StageContentProps {
  stage: number;
  activeStage: number;
}

export const StageContent: React.FC<StageContentProps> = ({ stage, activeStage }) => {
  const data = stageData[stage];
  
  // Base initial styles match what GSAP expects
  return (
    <div 
      data-stage={stage}
      className={`w-full flex flex-col justify-between ${stage === activeStage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ gridArea: '1 / 1 / 2 / 2' }}
    >
      <div>
        <div className="font-mono text-raksha-accent text-xs tracking-widest mb-2">{data.num}</div>
        <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider">{data.title}</h3>
        <p className="font-inter text-raksha-textMuted text-sm md:text-base leading-relaxed mb-4 max-w-sm">
          {data.description}
        </p>
        
        <div className="border-t border-white/10 pt-4">
          <div className="font-mono text-[10px] text-white/50 tracking-[0.2em] mb-3">{data.metricsTitle}</div>
          
          <div className="space-y-2 font-mono text-xs md:text-sm">
            {data.metrics.map((m, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-white/70">{m.label}</span>
                <span className="text-white font-semibold">{m.value}</span>
              </div>
            ))}
          </div>

          {data.checks && (
            <div className="mt-3 space-y-1 font-inter text-sm">
              {data.checks.map((c, i) => (
                <div key={i} className="flex items-center text-raksha-safe gap-2">
                  <span className="text-raksha-safe/80">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 font-mono text-[10px] text-raksha-accent tracking-widest uppercase opacity-80">
        {data.footer}
      </div>
    </div>
  );
};

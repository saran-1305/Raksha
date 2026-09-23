import React from 'react';
import { WhyContentPanel } from './WhyContentPanel';
import { WhyVisualContainer } from './WhyVisualContainer';

interface WhyLayoutProps {
  activeStage: number;
}

export const WhyLayout: React.FC<WhyLayoutProps> = ({ activeStage }) => {
  return (
    <div className="sticky top-0 w-full min-h-screen pt-20 pb-4 flex flex-col md:flex-row overflow-hidden">
      {/* 
        Layout constraints:
        Left Content: 35-40% 
        Right Visual: 55-60%
        We use w-[40%] and w-[60%] on desktop.
      */}
      
      {/* Left Content Area */}
      <div className="w-full md:w-[45%] lg:w-[40%] h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-20">
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.2em] text-white font-mono uppercase mb-2">Core Value Proposition</p>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight">
            <span className="text-white">WHY</span> <span className="text-raksha-accent">RAKSHA</span>
          </h2>
          <p className="text-sm md:text-base text-raksha-textMuted mt-4 max-w-sm font-inter leading-relaxed">
            From detecting risk to enabling relocation, RAKSHA connects the intelligence needed to make safer decisions.
          </p>
        </div>

        {/* The Card container */}
        <WhyContentPanel activeStage={activeStage} />
      </div>

      {/* Right Visual Area */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-full relative z-10">
        <WhyVisualContainer activeStage={activeStage} />
      </div>
    </div>
  );
};

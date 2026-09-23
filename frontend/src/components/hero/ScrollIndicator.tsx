import React from 'react';

export const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute left-8 bottom-1/2 -translate-y-1/2 z-30 pointer-events-none hidden xl:flex flex-col items-center gap-4">
      <div className="w-[1px] h-24 bg-raksha-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-raksha-accent animate-[bounce_2s_infinite]" />
      </div>
      <div className="transform -rotate-90 text-[10px] tracking-[0.3em] font-mono text-raksha-textMuted uppercase whitespace-nowrap mt-8">
        Scroll to Explore
      </div>
    </div>
  );
};

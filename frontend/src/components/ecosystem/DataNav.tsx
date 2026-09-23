import React from 'react';

export const DataNav: React.FC = () => {
  const navItems = [
    { num: '01', label: 'DETECT RISK' },
    { num: '02', label: 'UNDERSTAND IMPACT' },
    { num: '03', label: 'DATA ECOSYSTEM', active: true },
    { num: '04', label: 'REAL WORLD OUTCOMES' },
  ];

  return (
    <div className="flex flex-col h-full justify-center space-y-12 relative">
      {/* Vertical connection line */}
      <div className="absolute left-[5px] top-4 bottom-16 w-px bg-white/10 -z-10" />

      {navItems.map((item, i) => (
        <div key={i} className={`flex items-center gap-4 ${item.active ? 'opacity-100' : 'opacity-40'}`}>
          <div className="relative flex items-center justify-center w-3 h-3">
            {item.active ? (
              <>
                <div className="absolute inset-0 rounded-full border border-raksha-accent opacity-50 scale-150 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-raksha-accent shadow-[0_0_10px_rgba(66,217,232,0.5)]" />
              </>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            )}
          </div>
          <div className="flex flex-col">
            <span className={`font-mono text-[10px] tracking-widest ${item.active ? 'text-raksha-accent' : 'text-white'}`}>
              {item.num}
            </span>
            <span className={`font-space-grotesk text-xs uppercase tracking-widest mt-1 ${item.active ? 'text-white' : 'text-white/70'}`}>
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'LIVE MAP', path: '/' },
  { name: 'HAZARD INTELLIGENCE', path: '/hazard-intelligence' },
  { name: 'POPULATION ANALYTICS', path: '/population-analytics' },
  { name: 'RELOCATION PLANNING', path: '/relocation-planning' },
  { name: 'SCENARIO SIMULATION', path: '/scenario-simulation' },
  { name: 'REPORTS', path: '/reports' }
];

export const SecondaryNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 bg-black border-b border-border/50 text-[10px] font-semibold tracking-widest uppercase relative z-20">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-4 py-2.5 border-b-2 transition-colors",
                isActive 
                  ? "border-primary text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" 
                  : "border-transparent text-textMuted hover:text-secondary"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="hidden lg:flex items-center gap-4 text-secondary/70">
        <span>A SAFER INDIA</span>
        <span>|</span>
        <span>MORE RESILIENT COMMUNITIES</span>
      </div>
    </nav>
  );
};

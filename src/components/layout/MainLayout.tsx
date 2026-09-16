import React from 'react';
import { Header } from './Header';
import { SecondaryNav } from './SecondaryNav';
import { DecisionSummary } from './DecisionSummary';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full bg-black text-white overflow-hidden">
      <Header />
      <SecondaryNav />
      
      {/* Main Content Area */}
      <main className="flex-1 relative flex overflow-hidden">
        {children}
      </main>

      <DecisionSummary />
      
      {/* Minimal Footer */}
      <footer className="h-6 bg-black border-t border-border/30 flex items-center justify-between px-6 text-[9px] text-textMuted uppercase tracking-wider">
        <div>
          RAKSHA | <span className="opacity-70">National Disaster Response Command Center</span>
        </div>
        <div className="flex gap-2">
          <span>Ministry of Home Affairs</span>
          <span>|</span>
          <span>National Disaster Management Authority</span>
          <span>|</span>
          <span>Government of India</span>
        </div>
        <div className="text-primary opacity-80">
          Build a Safer Tomorrow.
        </div>
      </footer>
    </div>
  );
};

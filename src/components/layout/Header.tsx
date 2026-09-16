import React from 'react';
import { Mountain, ChevronDown, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-black z-50">
      {/* Left side: Logo & Tagline */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Mountain className="w-10 h-10 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-[0.2em] text-primary leading-tight">RAKSHA</h1>
            <span className="text-[9px] uppercase tracking-wider text-secondary">AI-Driven Multi-Hazard Relocation Intelligence</span>
          </div>
        </div>
        <div className="h-6 w-px bg-border/50 hidden md:block"></div>
        <div className="hidden md:block text-xs italic text-textMuted">
          "Detect Risk. Prioritize People. Find Safer Ground."
        </div>
      </div>

      {/* Center: Status */}
      <div className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#00ff88]"></div>
          <span className="text-xs font-semibold tracking-wider text-success">SYSTEM OPERATIONAL</span>
        </div>
        <div className="flex flex-col text-[10px] text-textMuted uppercase tracking-wider">
          <span>Data Updated:</span>
          <span className="text-white">14 SEP 2026 | 10:24 IST</span>
        </div>
      </div>

      {/* Right side: Region & User */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-textMuted uppercase tracking-wider">Pilot Region</span>
          <button className="flex items-center gap-1 border border-border rounded px-2 py-1 hover:bg-border/20 transition-colors">
            <span className="font-semibold text-primary">UTTARAKHAND</span>
            <ChevronDown className="w-3 h-3 text-secondary" />
          </button>
        </div>
        
        <div className="h-8 w-px bg-border/50"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[9px] text-textMuted">National Disaster Management Authority</span>
            <span className="text-[9px] text-textMuted">Government of India</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-panel">
            <User className="w-4 h-4 text-textMuted" />
          </div>
        </div>
      </div>
    </header>
  );
};

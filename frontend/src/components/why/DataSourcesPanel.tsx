import React from 'react';
import { Database, CloudFog, Map, Users, Share2 } from 'lucide-react';

export const DataSourcesPanel: React.FC = () => {
  const sources = [
    { label: 'Satellite', icon: <Map className="w-3 h-3" />, active: true },
    { label: 'Weather', icon: <CloudFog className="w-3 h-3" />, active: true },
    { label: 'Terrain', icon: <Database className="w-3 h-3" />, active: true },
    { label: 'Population', icon: <Users className="w-3 h-3" />, active: true },
    { label: 'Infrastructure', icon: <Share2 className="w-3 h-3" />, active: true },
  ];

  return (
    <div className="absolute top-12 right-12 flex flex-col items-end pointer-events-none opacity-80">
      <span className="font-mono text-[10px] tracking-widest text-white/50 mb-4">DATA SOURCES</span>
      
      <div className="flex flex-col gap-2 items-end">
        {sources.map((src, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/70">{src.label}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${src.active ? 'bg-raksha-accent' : 'bg-gray-600'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

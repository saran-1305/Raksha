import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ============================================================================
// 1. SENTINEL-1 SAR (Radar Sweep)
// ============================================================================
export const RadarVisualization = () => {
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(sweepRef.current, {
      rotate: 360,
      duration: 4,
      repeat: -1,
      ease: 'linear'
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#02060B] overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(66, 217, 232, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(66, 217, 232, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px' 
      }} />
      
      {/* Radar circles */}
      <div className="absolute w-[600px] h-[600px] border border-raksha-accent/20 rounded-full" />
      <div className="absolute w-[400px] h-[400px] border border-raksha-accent/30 rounded-full" />
      <div className="absolute w-[200px] h-[200px] border border-raksha-accent/40 rounded-full" />
      
      {/* Target Points */}
      <div className="absolute top-[30%] left-[40%] w-2 h-2 bg-raksha-accent rounded-full shadow-[0_0_10px_#42D9E8]" />
      <div className="absolute top-[60%] left-[65%] w-2 h-2 bg-raksha-accent rounded-full shadow-[0_0_10px_#42D9E8]" />
      <div className="absolute top-[45%] left-[25%] w-1.5 h-1.5 bg-raksha-accent/60 rounded-full" />

      {/* Sweep */}
      <div 
        ref={sweepRef}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 270deg, rgba(66, 217, 232, 0.4) 360deg)',
          clipPath: 'circle(50% at 50% 50%)'
        }}
      />
      <div className="absolute w-2 h-2 bg-raksha-accent rounded-full" />
    </div>
  );
};

// ============================================================================
// 2. SENTINEL-2 L2A (Multispectral Layers)
// ============================================================================
export const MultispectralVisualization = () => {
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(layer2.current, { opacity: 1, duration: 2, ease: 'power2.inOut', delay: 1 })
      .to(layer2.current, { opacity: 0, duration: 2, ease: 'power2.inOut', delay: 1 });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0a0f16] overflow-hidden">
      {/* True Color Layer */}
      <div ref={layer1} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543265430-80e5d48bd3ba?q=80&w=1080')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
      
      {/* False Color Layer (NDVI/Infrared style) */}
      <div ref={layer2} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543265430-80e5d48bd3ba?q=80&w=1080')] bg-cover bg-center opacity-0" style={{ filter: 'hue-rotate(200deg) saturate(200%) contrast(150%)' }} />
      
      {/* Overlay UI */}
      <div className="absolute inset-0 border-[20px] border-black/50" />
      <div className="absolute top-8 left-8 border border-white/20 p-2 font-mono text-[9px] text-white/70 tracking-widest bg-black/40">
        B04 (RED) / B08 (NIR)
      </div>
      <div className="absolute bottom-8 right-8 border border-raksha-accent/30 p-2 font-mono text-[9px] text-raksha-accent tracking-widest bg-black/40">
        VEGETATION INDEX: ACTIVE
      </div>
    </div>
  );
};

// ============================================================================
// 3. DEM / TERRAIN (Topographic Contours)
// ============================================================================
export const TopoVisualization = () => {
  const linesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.fromTo(linesRef.current, 
      { filter: 'hue-rotate(0deg)' },
      { filter: 'hue-rotate(30deg)', duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' }
    );
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#02060b] overflow-hidden">
      {/* We use a repeating radial gradient to simulate topographic contours */}
      <div 
        ref={linesRef}
        className="absolute w-[150%] h-[150%] opacity-40"
        style={{
          background: 'repeating-radial-gradient(circle at 40% 60%, transparent 0, transparent 20px, rgba(66, 217, 232, 0.4) 21px, rgba(66, 217, 232, 0.1) 22px)',
          filter: 'drop-shadow(0 0 10px rgba(66, 217, 232, 0.2))'
        }}
      />
      <div 
        className="absolute w-[150%] h-[150%] opacity-20"
        style={{
          background: 'repeating-radial-gradient(circle at 70% 30%, transparent 0, transparent 30px, rgba(66, 217, 232, 0.3) 31px, rgba(66, 217, 232, 0.05) 32px)'
        }}
      />
      
      {/* Elevation labels */}
      <div className="absolute top-[40%] left-[38%] text-raksha-accent font-mono text-[8px] bg-black/50 px-1">4200m</div>
      <div className="absolute top-[60%] left-[68%] text-raksha-accent font-mono text-[8px] bg-black/50 px-1">3800m</div>
    </div>
  );
};

// ============================================================================
// 4. WEATHER / RAIN (Heatmap)
// ============================================================================
export const WeatherVisualization = () => {
  const cloudRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.to(cloudRef.current, {
      x: 50,
      y: 20,
      scale: 1.1,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-[#020508] overflow-hidden">
      {/* Base map hint */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1080')] bg-cover" />
      
      {/* Rainfall Heatmap Blobs */}
      <div 
        ref={cloudRef}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[60px]"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(245,158,11,0.4) 40%, rgba(59,130,246,0.2) 80%, transparent 100%)' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full blur-[40px] animate-pulse"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(14,165,233,0.2) 70%, transparent 100%)' }}
      />

      {/* Simulated rain particles overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '4px 4px' }} />
      
      {/* Legend */}
      <div className="absolute bottom-16 right-8 flex flex-col gap-1">
        <span className="font-mono text-[8px] text-white/50 tracking-widest uppercase">PRECIPITATION INTENSITY</span>
        <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-amber-500 to-red-500 rounded" />
      </div>
    </div>
  );
};

// ============================================================================
// 5. OSM / INFRA (Illuminated Roads)
// ============================================================================
export const InfraVisualization = () => {
  return (
    <div className="relative w-full h-full bg-[#040810] overflow-hidden flex items-center justify-center">
      {/* Abstract network of roads */}
      <svg className="absolute w-[150%] h-[150%] opacity-40" viewBox="0 0 100 100">
        <path d="M0,50 L40,40 L60,80 L100,20" stroke="rgba(66,217,232,0.6)" strokeWidth="0.5" fill="none" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5,5" />
        <path d="M20,100 L40,40 L80,10 L100,30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" fill="none" />
        <path d="M10,0 L30,60 L90,90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none" />
        
        {/* Nodes */}
        <circle cx="40" cy="40" r="1.5" fill="#42D9E8" className="animate-pulse" />
        <circle cx="60" cy="80" r="1" fill="#fff" />
        <circle cx="30" cy="60" r="1" fill="#fff" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#040810] to-transparent opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-raksha-accent/30 bg-black/60 backdrop-blur p-3 font-mono text-[9px] text-white tracking-widest">
        CRITICAL INFRASTRUCTURE IDENTIFIED<br/>
        <span className="text-raksha-accent">3 HOSPITALS | 2 BRIDGES</span>
      </div>
    </div>
  );
};

// ============================================================================
// 6. DYNAMIC AOI (Hazard Radius)
// ============================================================================
export const AoiVisualization = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.fromTo(ringRef.current,
      { scale: 0.1, opacity: 1 },
      { scale: 1, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0a0505] overflow-hidden flex items-center justify-center">
      {/* Terrain hint */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1543265430-80e5d48bd3ba?q=80&w=1080')] bg-cover grayscale" />
      
      {/* Target Crosshair */}
      <div className="absolute w-full h-px bg-red-500/20" />
      <div className="absolute h-full w-px bg-red-500/20" />
      
      {/* AOI Core */}
      <div className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_#ef4444] z-10 animate-pulse" />
      
      {/* Expanding Ring */}
      <div ref={ringRef} className="absolute w-[400px] h-[400px] border-2 border-red-500 rounded-full bg-red-500/10" />
      
      {/* Static Boundary */}
      <div className="absolute w-[300px] h-[300px] border border-red-500/40 rounded-full border-dashed" />
      
      <div className="absolute top-1/4 right-1/4 text-red-400 font-mono text-[9px] tracking-widest bg-red-950/80 px-2 py-1 border border-red-500/30">
        HAZARD RADIUS: 15KM
      </div>
    </div>
  );
};

// ============================================================================
// 7. CARTOSAT-3 (High Res Zoom)
// ============================================================================
export const CartosatVisualization = () => {
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(zoomRef.current, {
      scale: 1.5,
      duration: 10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <div 
        ref={zoomRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1080')] bg-cover bg-center opacity-60"
        style={{ filter: 'contrast(120%) grayscale(20%)' }}
      />
      
      {/* Targeting Reticle */}
      <div className="absolute w-32 h-32 border-2 border-amber-400/50 flex items-center justify-center">
        <div className="w-2 h-2 bg-amber-400 rounded-full" />
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-400 -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-400 translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-400 -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-400 translate-x-1 translate-y-1" />
      </div>
      
      <div className="absolute bottom-16 left-8 font-mono text-[10px] text-amber-400 tracking-widest bg-black/60 px-2 py-1">
        RESOLUTION: 0.28M (SUB-METER)
      </div>
    </div>
  );
};

// ============================================================================
// 8. ISRO BHUVAN (Land Use Layers)
// ============================================================================
export const BhuvanVisualization = () => {
  return (
    <div className="relative w-full h-full bg-[#0a0c10] overflow-hidden flex items-center justify-center">
      {/* Segmented polygons mimicking land use */}
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 40,0 30,50 0,60" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.5)" strokeWidth="0.2"/>
        <polygon points="40,0 100,0 100,40 60,60 30,50" fill="rgba(234,179,8,0.2)" stroke="rgba(234,179,8,0.5)" strokeWidth="0.2"/>
        <polygon points="100,40 100,100 50,100 60,60" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.2"/>
        <polygon points="0,60 30,50 60,60 50,100 0,100" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.5)" strokeWidth="0.2"/>
      </svg>
      
      {/* Legend */}
      <div className="absolute top-8 right-8 bg-black/80 border border-white/10 p-4 flex flex-col gap-3 font-mono text-[9px] uppercase tracking-widest text-white/70">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500/40 border border-green-500" /> FOREST / VEGETATION</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500/40 border border-yellow-500" /> AGRICULTURE</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500/40 border border-blue-500" /> WATER BODY</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500/40 border border-purple-500" /> URBAN BUILDUP</div>
      </div>
    </div>
  );
};

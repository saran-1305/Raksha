import React, { useEffect, useRef } from 'react';

interface Segment {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  thickness: number;
}

export const RainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Rain drop generation removed as per user request

    let animationFrameId: number;
    let lastThunderTime = 0;
    
    // For lightning effect
    let lightningSequence = 0;
    let thunderAlpha = 0;
    let lightningSegments: Segment[] = [];

    const generateLightning = () => {
      const segments: Segment[] = [];
      const startX = Math.random() * width;
      
      const branch = (x: number, y: number, thickness: number, angle: number) => {
        if (thickness < 0.5 || y > height) return;
        
        const length = Math.random() * 40 + 20;
        const endX = x + Math.sin(angle) * length;
        const endY = y + Math.cos(angle) * length;
        
        segments.push({ startX: x, startY: y, endX, endY, thickness });
        
        // Continue main branch with jagged angle
        branch(endX, endY, thickness * 0.9, angle + (Math.random() - 0.5) * 0.8);
        
        // Randomly split into a fork
        if (Math.random() < 0.15) {
          branch(endX, endY, thickness * 0.6, angle + (Math.random() - 0.5) * 1.5);
        }
      };

      // Start the bolt at the top
      branch(startX, 0, Math.random() * 2 + 3, (Math.random() - 0.5) * 0.5);
      return segments;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Handle Thunder (Lightning flicker)
      if (time - lastThunderTime > 5000 && Math.random() < 0.005) {
        lastThunderTime = time;
        lightningSequence = 5; // number of flickers
        lightningSegments = generateLightning(); // Generate new bolt pattern
      }

      if (lightningSequence > 0) {
        // Toggle opacity wildly to simulate lightning flickers
        thunderAlpha = lightningSequence % 2 === 1 ? Math.random() * 0.6 + 0.4 : 0;
        lightningSequence--;
      } else if (thunderAlpha > 0) {
        thunderAlpha = 0;
        lightningSegments = []; // clear bolt memory
      }

      // Draw lightning bolt
      if (thunderAlpha > 0 && lightningSegments.length > 0) {
        // Subtle sky flash
        ctx.fillStyle = `rgba(180, 230, 255, ${thunderAlpha * 0.15})`; 
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'miter';
        
        // Glow effect
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00E5FF';

        ctx.beginPath();
        for (let i = 0; i < lightningSegments.length; i++) {
          const seg = lightningSegments[i];
          ctx.moveTo(seg.startX, seg.startY);
          ctx.lineTo(seg.endX, seg.endY);
          // Note: varying thickness per segment requires separate strokes, 
          // but for performance we can stroke it all at once with a median thickness
          // OR we can bucket them, but drawing them separately is fine for a few segments
        }
        
        // We will do a multi-pass stroke to simulate core and glow
        // Outer glow
        ctx.lineWidth = 4;
        ctx.strokeStyle = `rgba(0, 229, 255, ${thunderAlpha * 0.5})`;
        ctx.stroke();

        // Inner core
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${thunderAlpha})`;
        ctx.stroke();
        
        ctx.restore();
      }

      // Rain drawing removed as per user request

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

import { useState, useEffect } from 'react';

export default function ScaryEyes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showEyes, setShowEyes] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setEyePosition({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 50)
        });
        setShowEyes(true);

        setTimeout(() => {
          setShowEyes(false);
        }, 3000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!showEyes) return null;

  const calculatePupilPosition = (eyeX: number) => {
    const deltaX = mousePos.x - eyeX;
    const deltaY = mousePos.y - eyePosition.y;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(8, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50);
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  const leftPupil = calculatePupilPosition(eyePosition.x + 20);
  const rightPupil = calculatePupilPosition(eyePosition.x + 60);

  return (
    <div 
      className="fixed z-[60] pointer-events-none animate-fade-in"
      style={{ left: eyePosition.x, top: eyePosition.y }}
    >
      <div className="flex gap-6">
        <div className="relative">
          <div className="w-12 h-12 bg-destructive/90 rounded-full border-2 border-foreground animate-pulse" />
          <div 
            className="absolute top-1/2 left-1/2 w-5 h-5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${leftPupil.x}px), calc(-50% + ${leftPupil.y}px))`
            }}
          />
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 bg-destructive/90 rounded-full border-2 border-foreground animate-pulse" />
          <div 
            className="absolute top-1/2 left-1/2 w-5 h-5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${rightPupil.x}px), calc(-50% + ${rightPupil.y}px))`
            }}
          />
        </div>
      </div>
    </div>
  );
}

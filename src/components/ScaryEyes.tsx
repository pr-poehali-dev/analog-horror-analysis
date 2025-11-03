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
      if (Math.random() > 0.7) {
        setEyePosition({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 50)
        });
        setShowEyes(true);

        setTimeout(() => {
          setShowEyes(false);
        }, 4000 + Math.random() * 2000);
      }
    }, 8000);

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
      className="fixed z-[60] pointer-events-none animate-fade-in glitch-intense"
      style={{ left: eyePosition.x, top: eyePosition.y }}
    >
      <div className="flex gap-6">
        <div className="relative">
          <div className="w-14 h-14 bg-destructive/95 rounded-full border-4 border-foreground animate-pulse pulse-glow shadow-2xl" />
          <div 
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${leftPupil.x}px), calc(-50% + ${leftPupil.y}px))`
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-70" 
               style={{
                 transform: `translate(calc(-50% + ${leftPupil.x + 2}px), calc(-50% + ${leftPupil.y - 2}px))`
               }}
          />
        </div>
        
        <div className="relative">
          <div className="w-14 h-14 bg-destructive/95 rounded-full border-4 border-foreground animate-pulse pulse-glow shadow-2xl" />
          <div 
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${rightPupil.x}px), calc(-50% + ${rightPupil.y}px))`
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-70" 
               style={{
                 transform: `translate(calc(-50% + ${rightPupil.x + 2}px), calc(-50% + ${rightPupil.y - 2}px))`
               }}
          />
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="w-20 h-1 bg-foreground/50 mx-auto blur-sm" />
      </div>
    </div>
  );
}
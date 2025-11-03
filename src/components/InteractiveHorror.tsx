import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface InteractiveHorrorProps {
  enabled: boolean;
}

export default function InteractiveHorror({ enabled }: InteractiveHorrorProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHand, setShowHand] = useState(false);
  const [showFace, setShowFace] = useState(false);

  if (!enabled) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (Math.random() < 0.001) {
      setShowHand(true);
      setTimeout(() => setShowHand(false), 2000);
    }
  };

  const handleCornerHover = () => {
    if (Math.random() < 0.3) {
      setShowFace(true);
      setTimeout(() => setShowFace(false), 1500);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-[90]"
        onMouseMove={handleMouseMove}
      />
      
      {showHand && (
        <div 
          className="fixed pointer-events-none z-[95] text-8xl opacity-50 animate-fade-in"
          style={{
            left: `${mousePos.x + 100}px`,
            top: `${mousePos.y + 100}px`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)',
          }}
        >
          🖐️
        </div>
      )}

      {showFace && (
        <div className="fixed bottom-0 left-0 w-48 h-48 pointer-events-none z-[95] animate-fade-in">
          <div className="text-9xl opacity-20 glitch-intense">😱</div>
        </div>
      )}

      <div 
        className="fixed top-0 right-0 w-4 h-4 pointer-events-auto cursor-pointer opacity-0 hover:opacity-100 z-[30]"
        onMouseEnter={handleCornerHover}
      />
      <div 
        className="fixed bottom-0 left-0 w-4 h-4 pointer-events-auto cursor-pointer opacity-0 hover:opacity-100 z-[30]"
        onMouseEnter={handleCornerHover}
      />

      <div className="fixed bottom-4 right-4 pointer-events-none z-[30]">
        <Card className="bg-black/80 border-destructive p-2 opacity-20 vhs-distortion">
          <p className="text-destructive text-xs vhs-text">REC ●</p>
          <p className="text-muted-foreground text-xs font-mono">
            {new Date().toLocaleTimeString()}
          </p>
        </Card>
      </div>
    </>
  );
}

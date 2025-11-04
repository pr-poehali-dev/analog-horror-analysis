import { useEffect, useState } from 'react';

export default function ShadowFigure() {
  const [figures, setFigures] = useState<Array<{ id: number; x: number; y: number; side: string }>>([]);

  useEffect(() => {
    const spawnFigure = () => {
      if (Math.random() < 0.008) {
        const sides = ['left', 'right', 'top'];
        const side = sides[Math.floor(Math.random() * sides.length)];
        
        const newFigure = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          side
        };

        setFigures(prev => [...prev, newFigure]);

        setTimeout(() => {
          setFigures(prev => prev.filter(f => f.id !== newFigure.id));
        }, 3000 + Math.random() * 2000);
      }
    };

    const interval = setInterval(spawnFigure, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {figures.map(figure => {
        let position = {};
        let animation = '';

        switch (figure.side) {
          case 'left':
            position = { left: '-120px', top: `${figure.y}%` };
            animation = 'slideFromLeft 3s ease-in-out';
            break;
          case 'right':
            position = { right: '-120px', top: `${figure.y}%` };
            animation = 'slideFromRight 3s ease-in-out';
            break;
          case 'top':
            position = { left: `${figure.x}%`, top: '-120px' };
            animation = 'slideFromTop 3s ease-in-out';
            break;
        }

        return (
          <div
            key={figure.id}
            className="fixed w-24 h-40 z-50 pointer-events-none opacity-40"
            style={{
              ...position,
              animation,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              filter: 'blur(8px)',
            }}
          />
        );
      })}
    </>
  );
}

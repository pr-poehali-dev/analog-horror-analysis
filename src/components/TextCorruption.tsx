import { useEffect, useState } from 'react';

const corruptChars = '█▓▒░▄▀■□▪▫';

export default function TextCorruption() {
  const [corruptions, setCorruptions] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);

  useEffect(() => {
    const corrupt = () => {
      if (Math.random() < 0.015) {
        const length = Math.floor(Math.random() * 8) + 3;
        let text = '';
        for (let i = 0; i < length; i++) {
          text += corruptChars[Math.floor(Math.random() * corruptChars.length)];
        }

        const newCorruption = {
          id: Date.now(),
          text,
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5
        };

        setCorruptions(prev => [...prev, newCorruption]);

        setTimeout(() => {
          setCorruptions(prev => prev.filter(c => c.id !== newCorruption.id));
        }, 1500 + Math.random() * 1000);
      }
    };

    const interval = setInterval(corrupt, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {corruptions.map(corruption => (
        <div
          key={corruption.id}
          className="fixed pointer-events-none z-[97] text-destructive text-2xl font-mono animate-pulse"
          style={{
            left: `${corruption.x}%`,
            top: `${corruption.y}%`,
            textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
            animation: 'glitch 0.3s infinite',
          }}
        >
          {corruption.text}
        </div>
      ))}
    </>
  );
}

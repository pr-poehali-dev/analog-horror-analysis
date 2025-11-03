import { useEffect, useState } from 'react';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
}

export default function FlowerMode() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const emojis = ['🦋', '🌸', '🌺', '🌼', '🌻', '🌷', '💐', '🌹'];
      const newButterfly: Butterfly = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: 8 + Math.random() * 4,
      };

      setButterflies(prev => [...prev, newButterfly]);

      setTimeout(() => {
        setButterflies(prev => prev.filter(b => b.id !== newButterfly.id));
      }, newButterfly.duration * 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {butterflies.map(butterfly => (
        <div
          key={butterfly.id}
          className="fixed pointer-events-none z-50 text-4xl animate-float"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animation: `float ${butterfly.duration}s ease-in-out`,
          }}
        >
          {butterfly.emoji}
        </div>
      ))}

      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

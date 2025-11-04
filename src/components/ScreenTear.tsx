import { useEffect, useState } from 'react';

export default function ScreenTear() {
  const [tears, setTears] = useState<Array<{ id: number; height: number; delay: number }>>([]);

  useEffect(() => {
    const createTear = () => {
      if (Math.random() < 0.01) {
        const newTear = {
          id: Date.now(),
          height: Math.random() * 40 + 10,
          delay: Math.random() * 2
        };

        setTears(prev => [...prev, newTear]);

        setTimeout(() => {
          setTears(prev => prev.filter(t => t.id !== newTear.id));
        }, 1000);
      }
    };

    const interval = setInterval(createTear, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {tears.map(tear => (
        <div
          key={tear.id}
          className="fixed left-0 w-full pointer-events-none z-[98]"
          style={{
            top: `${Math.random() * 80}%`,
            height: `${tear.height}px`,
            background: 'rgba(0, 255, 0, 0.3)',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
            animation: `screenTearFlash 0.3s ease-in-out ${tear.delay}s`,
            transform: 'translateX(-100%)',
          }}
        />
      ))}
    </>
  );
}

import { useEffect, useState } from 'react';

export default function Distortion() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      if (Math.random() < 0.015) {
        setActive(true);
        setTimeout(() => setActive(false), 200 + Math.random() * 400);
      }
    };

    const interval = setInterval(trigger, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!active) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[99] mix-blend-difference"
      style={{
        animation: 'distortionShake 0.1s infinite',
        filter: 'hue-rotate(180deg)',
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 animate-pulse" />
    </div>
  );
}

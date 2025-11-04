import { useEffect, useState } from 'react';

export default function StaticEffect() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerStatic = () => {
      if (Math.random() < 0.02) {
        setVisible(true);
        setTimeout(() => setVisible(false), 100 + Math.random() * 300);
      }
    };

    const interval = setInterval(triggerStatic, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-30">
      <div className="w-full h-full bg-white animate-pulse"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
        }}
      />
    </div>
  );
}

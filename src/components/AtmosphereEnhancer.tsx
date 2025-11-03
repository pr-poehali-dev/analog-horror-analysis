import { useEffect, useState } from 'react';

interface AtmosphereEnhancerProps {
  enabled: boolean;
  intensity: number;
}

export default function AtmosphereEnhancer({ enabled, intensity }: AtmosphereEnhancerProps) {
  const [vignette, setVignette] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [chromaticLevel, setChromaticLevel] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    setVignette(true);

    const vignetteInterval = setInterval(() => {
      const shouldFlash = Math.random() < (intensity / 200);
      if (shouldFlash) {
        setRedFlash(true);
        setTimeout(() => setRedFlash(false), 100);
      }
    }, 3000);

    const chromaticInterval = setInterval(() => {
      const level = Math.random() * (intensity / 50);
      setChromaticLevel(level);
    }, 500);

    return () => {
      clearInterval(vignetteInterval);
      clearInterval(chromaticInterval);
      setVignette(false);
    };
  }, [enabled, intensity]);

  if (!enabled) return null;

  return (
    <>
      {vignette && (
        <div 
          className="fixed inset-0 pointer-events-none z-[85]"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)',
            opacity: intensity / 100,
          }}
        />
      )}

      {redFlash && (
        <div 
          className="fixed inset-0 bg-destructive pointer-events-none z-[90]"
          style={{ opacity: 0.1 }}
        />
      )}

      <div 
        className="fixed inset-0 pointer-events-none z-[80]"
        style={{
          filter: `saturate(${0.7 + (intensity / 200)}) contrast(${1.1 + (intensity / 200)}) brightness(${0.9 - (intensity / 300)})`,
          mixBlendMode: 'multiply',
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-[75]"
        style={{
          background: `linear-gradient(transparent ${100 - chromaticLevel}%, rgba(255,0,0,0.05) 100%)`,
        }}
      />

      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive/30 to-transparent z-[70] pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive/30 to-transparent z-[70] pointer-events-none animate-pulse" />
    </>
  );
}

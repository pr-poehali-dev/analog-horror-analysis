import { useEffect, useState } from 'react';

interface RandomHorrorEventsProps {
  enabled: boolean;
  intensity: number;
}

export default function RandomHorrorEvents({ enabled, intensity }: RandomHorrorEventsProps) {
  const [showFlash, setShowFlash] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [whisperText, setWhisperText] = useState('');

  const whispers = [
    'за тобой',
    'не оборачивайся',
    'я вижу тебя',
    'ты не один',
    'уходи',
    'слишком поздно',
    'помоги мне',
    'не открывай дверь',
  ];

  useEffect(() => {
    if (!enabled) return;

    const baseInterval = Math.max(5000, 15000 - (intensity * 100));

    const triggerRandomEvent = () => {
      const events = [
        () => {
          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 100);
        },
        () => {
          setShowShadow(true);
          setTimeout(() => setShowShadow(false), 2000);
        },
        () => {
          setShowStatic(true);
          setTimeout(() => setShowStatic(false), 500);
        },
        () => {
          const whisper = whispers[Math.floor(Math.random() * whispers.length)];
          setWhisperText(whisper);
          setTimeout(() => setWhisperText(''), 3000);
        },
        () => {
          document.body.classList.add('screen-shake');
          setTimeout(() => document.body.classList.remove('screen-shake'), 500);
        },
      ];

      const randomEvent = events[Math.floor(Math.random() * events.length)];
      randomEvent();
    };

    const interval = setInterval(triggerRandomEvent, baseInterval);
    return () => clearInterval(interval);
  }, [enabled, intensity]);

  return (
    <>
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[100] pointer-events-none" />
      )}
      
      {showShadow && (
        <div className="fixed bottom-0 right-0 w-64 h-96 bg-gradient-to-t from-black/60 to-transparent z-40 pointer-events-none animate-fade-in">
          <div className="absolute bottom-10 right-10 text-6xl opacity-20">👤</div>
        </div>
      )}
      
      {showStatic && (
        <div className="fixed inset-0 static-noise z-[100] pointer-events-none opacity-80" />
      )}
      
      {whisperText && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none">
          <p className="text-destructive text-4xl vhs-text chromatic-aberration opacity-30">
            {whisperText}
          </p>
        </div>
      )}
    </>
  );
}

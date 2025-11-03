import { useEffect, useState } from 'react';

interface JumpscareProps {
  onComplete: () => void;
}

export default function Jumpscare({ onComplete }: JumpscareProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi77eefTRAMUKfj8LZjHAY4ktfyzXksBSR4yPDckEAKFF607uunVRQKRp/g8r5tIQUrgs/z2Ys3CBlpvO3nnk0QDFCo4/C2YxwGOJLX8s15LAUkeMjw3I9AChRete7rp1UUCkaf4PK+bSEFK4PP89mLNwgZabzt559NEAxQqOPwtmMcBjiS1/LNeSwFJHjI8NyPQAoUXrXu66dVFApGn+DyvW0hBSuDz/PZizcIGWm87eefTRAMUKjj8LdjHAY4ktfyzXksBSR4yPDcj0AKFF617uunVRQKRp/g8r1tIQUrg8/z2Ys3CBlpvO3nn00QDFCo4/C2YxwGOJLX8sx5LAUkeMjw3I9AChRete7rpVUUCkaf4PK9bSEFK4PP89mMNwgZabzt559NEAxQqOPwtmMcBjiS1/LMeSwFJHjI8NyPQAoUXrXu66VVFApGn+Dyvmw=');
    audio.volume = 0.5;

    const timer1 = setTimeout(() => {
      setStage(1);
      audio.play().catch(() => {});
    }, 100);

    const timer2 = setTimeout(() => {
      setStage(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      audio.pause();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {stage === 0 && (
        <div className="w-full h-full bg-black" />
      )}
      
      {stage === 1 && (
        <div className="w-full h-full bg-black flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="text-[20rem] animate-bounce">👁️</div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div 
          className="w-full h-full flex items-center justify-center animate-shake screen-shake"
          style={{
            background: 'linear-gradient(45deg, #000000 0%, #ff0000 25%, #000000 50%, #ff0000 75%, #000000 100%)',
            backgroundSize: '400% 400%',
            animation: 'shake 0.08s infinite, glitch-intense 0.1s infinite, color-shift 0.3s infinite'
          }}
        >
          <div className="text-center space-y-8">
            <div className="text-[30rem] leading-none glitch-intense" style={{ 
              textShadow: '0 0 80px red, 0 0 150px red, 10px 10px 0 cyan, -10px -10px 0 yellow',
              animation: 'pulse 0.05s infinite'
            }}>
              😱
            </div>
            <h1 
              className="text-[12rem] font-bold text-white horror-title text-glitch-heavy chromatic-aberration"
              data-text="НЕ НАДО БЫЛО СТУЧАТЬ"
              style={{
                textShadow: '8px 8px 0 #ff0000, -8px -8px 0 #00ff00, 0 0 100px #ff0000',
                animation: 'glitch-intense 0.08s infinite'
              }}
            >
              НЕ НАДО БЫЛО СТУЧАТЬ
            </h1>
            <p className="text-8xl text-red-500 vhs-text pulse-glow" style={{
              animation: 'pulse 0.1s infinite, chromatic-aberration 0.15s infinite'
            }}>
              ОН УСЛЫШАЛ
            </p>
            <div className="text-6xl opacity-70 glitch">
              🚪💀🔪
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-10px, -10px) rotate(-2deg); }
          20% { transform: translate(10px, 10px) rotate(2deg); }
          30% { transform: translate(-10px, 10px) rotate(-2deg); }
          40% { transform: translate(10px, -10px) rotate(2deg); }
          50% { transform: translate(-10px, -10px) rotate(-2deg); }
          60% { transform: translate(10px, 10px) rotate(2deg); }
          70% { transform: translate(-10px, 10px) rotate(-2deg); }
          80% { transform: translate(10px, -10px) rotate(2deg); }
          90% { transform: translate(-10px, -10px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
}
import { useEffect, useRef, useState } from 'react';

export function useSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playStaticNoise = () => {
    if (!audioContextRef.current) return;

    const bufferSize = audioContextRef.current.sampleRate * 2;
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioContextRef.current.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    const bandpass = audioContextRef.current.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;

    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = 0.02;

    whiteNoise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    whiteNoise.start();
    setIsPlaying(true);

    return () => {
      whiteNoise.stop();
      setIsPlaying(false);
    };
  };

  const playGlitchSound = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContextRef.current.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const playKnockSound = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContextRef.current.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.2);
  };

  const playAmbientDrone = () => {
    if (!audioContextRef.current || isPlaying) return;

    const osc1 = audioContextRef.current.createOscillator();
    const osc2 = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.value = 55;
    osc2.frequency.value = 110.5;

    gainNode.gain.value = 0.05;

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    osc1.start();
    osc2.start();

    oscillatorRef.current = osc1;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  };

  const stopAmbientDrone = () => {
    if (oscillatorRef.current && gainNodeRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    playStaticNoise,
    playGlitchSound,
    playKnockSound,
    playAmbientDrone,
    stopAmbientDrone
  };
}

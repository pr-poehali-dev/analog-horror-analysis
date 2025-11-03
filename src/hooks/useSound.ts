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

  const playWhisper = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
    oscillator.frequency.linearRampToValueAtTime(150, audioContextRef.current.currentTime + 1);

    filter.type = 'lowpass';
    filter.frequency.value = 300;

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 1);
  };

  const playScream = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    const distortion = audioContextRef.current.createWaveShaper();

    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      curve[i] = Math.tanh((i - 128) / 64);
    }
    distortion.curve = curve;

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(2000, audioContextRef.current.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

    oscillator.connect(distortion);
    distortion.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  const playHeartbeat = () => {
    if (!audioContextRef.current) return;

    const playBeat = (time: number, intensity: number) => {
      if (!audioContextRef.current) return;
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = 40;

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(intensity, time + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, time + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start(time);
      oscillator.stop(time + 0.15);
    };

    const now = audioContextRef.current.currentTime;
    playBeat(now, 0.3);
    playBeat(now + 0.15, 0.15);
  };

  const playDistortedLaugh = () => {
    if (!audioContextRef.current) return;

    const createLaughSegment = (startTime: number, freq: number) => {
      if (!audioContextRef.current) return;
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      const filter = audioContextRef.current.createBiquadFilter();

      oscillator.type = 'square';
      oscillator.frequency.value = freq;

      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 5;

      gainNode.gain.setValueAtTime(0.1, startTime);
      gainNode.gain.linearRampToValueAtTime(0, startTime + 0.1);

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.1);
    };

    const now = audioContextRef.current.currentTime;
    const laughPattern = [400, 450, 400, 500, 400, 550, 400, 600];
    
    laughPattern.forEach((freq, i) => {
      createLaughSegment(now + (i * 0.15), freq);
    });
  };

  return {
    isPlaying,
    playStaticNoise,
    playGlitchSound,
    playKnockSound,
    playAmbientDrone,
    stopAmbientDrone,
    playWhisper,
    playScream,
    playHeartbeat,
    playDistortedLaugh
  };
}
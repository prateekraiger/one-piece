import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const SoundController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Gain Nodes for mixing
  const oceanGainRef = useRef<GainNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const tensionGainRef = useRef<GainNode | null>(null);
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const initAudio = async () => {
    if (audioContextRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // --- TRACK 1: OCEAN & WIND (Hero / Start) ---
    // Pink/Brown noise generator for waves
    const bufferSize = 4096;
    const noiseNode = ctx.createScriptProcessor(bufferSize, 1, 1);
    noiseNode.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
      }
    };
    const oceanFilter = ctx.createBiquadFilter();
    oceanFilter.type = 'lowpass';
    oceanFilter.frequency.value = 400;
    // LFO to simulate wave crashing cycles
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15; 
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300; 
    lfo.connect(lfoGain);
    lfoGain.connect(oceanFilter.frequency);
    lfo.start();

    const oceanGain = ctx.createGain();
    oceanGain.gain.value = 0;
    oceanGainRef.current = oceanGain;
    
    noiseNode.connect(oceanFilter);
    oceanFilter.connect(oceanGain);
    oceanGain.connect(ctx.destination);

    // --- TRACK 2: ORCHESTRAL DRONE (Arc Timeline) ---
    // Detuned sawtooths for a cinematic pad sound
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 110.00; // A2
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 110.25; // Slight detune for width
    
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 600;
    
    const musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGainRef.current = musicGain;

    osc1.connect(padFilter);
    osc2.connect(padFilter);
    padFilter.connect(musicGain);
    musicGain.connect(ctx.destination);
    osc1.start();
    osc2.start();

    // --- TRACK 3: TENSION SUB-BASS (Power Systems) ---
    // Binaural beating sine waves
    const subOsc1 = ctx.createOscillator();
    subOsc1.type = 'sine';
    subOsc1.frequency.value = 60; 
    const subOsc2 = ctx.createOscillator();
    subOsc2.type = 'sine';
    subOsc2.frequency.value = 62; // 2Hz beat freq (Anxiety/Tension)

    const tensionFilter = ctx.createBiquadFilter();
    tensionFilter.type = 'lowpass';
    tensionFilter.frequency.value = 150;

    const tensionGain = ctx.createGain();
    tensionGain.gain.value = 0;
    tensionGainRef.current = tensionGain;

    subOsc1.connect(tensionFilter);
    subOsc2.connect(tensionFilter);
    tensionFilter.connect(tensionGain);
    tensionGain.connect(ctx.destination);
    subOsc1.start();
    subOsc2.start();

    await ctx.resume();
  };

  const toggleSound = async () => {
    if (!audioContextRef.current) {
      await initAudio();
    }

    if (isPlaying) {
      // Fade out all
      const ctx = audioContextRef.current!;
      const now = ctx.currentTime;
      oceanGainRef.current?.gain.linearRampToValueAtTime(0, now + 1);
      musicGainRef.current?.gain.linearRampToValueAtTime(0, now + 1);
      tensionGainRef.current?.gain.linearRampToValueAtTime(0, now + 1);
      
      setTimeout(() => {
        ctx.suspend();
        setIsPlaying(false);
      }, 1000);
    } else {
      await audioContextRef.current!.resume();
      setIsPlaying(true);
      updateVolumes(scrollYProgress.get());
    }
  };

  const updateVolumes = (progress: number) => {
    if (!audioContextRef.current || !isPlaying) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const rampTime = 0.5;

    // SCROLL MAPPING:
    // 0.0 - 0.35: Ocean dominant (Hero / Luffy)
    // 0.35 - 0.75: Music dominant (Arcs)
    // 0.75 - 1.0: Tension dominant (Fruits / Haki)

    let vOcean = 0;
    let vMusic = 0;
    let vTension = 0;

    if (progress < 0.35) {
      // Zone 1: Ocean
      vOcean = 0.15;
      vMusic = 0;
      vTension = 0;
    } else if (progress >= 0.35 && progress < 0.75) {
      // Zone 2: Arcs
      vOcean = 0.02; // Keep faint ocean background
      vMusic = 0.12;
      vTension = 0;
    } else {
      // Zone 3: Power
      vOcean = 0;
      vMusic = 0.02; // Faint music
      vTension = 0.25;
    }

    oceanGainRef.current?.gain.setTargetAtTime(vOcean, now, rampTime);
    musicGainRef.current?.gain.setTargetAtTime(vMusic, now, rampTime);
    tensionGainRef.current?.gain.setTargetAtTime(vTension, now, rampTime);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    updateVolumes(latest);
  });

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-ocean-black/80 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-amber-500/50 transition-all group shadow-2xl"
      onClick={toggleSound}
    >
      <span>{isPlaying ? 'Ambience On' : 'Ambience Off'}</span>
      <div className="relative flex items-center justify-center w-4 h-4 overflow-hidden">
        {isPlaying ? (
          <div className="flex gap-[2px] items-end h-3 w-full justify-center">
             <div className="w-[2px] bg-amber-500 animate-[pulse_1s_ease-in-out_infinite] h-full" />
             <div className="w-[2px] bg-amber-500 animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-1/2" />
             <div className="w-[2px] bg-amber-500 animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-3/4" />
          </div>
        ) : (
          <div className="w-full h-[1px] bg-slate-500 rotate-45" />
        )}
      </div>
    </motion.button>
  );
};

export default SoundController;
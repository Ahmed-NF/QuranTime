import React, { createContext, useContext, useRef, useState } from 'react';
import type { Ayah } from '../types/quran';

interface AudioContextType {
  stopCurrentAudio: () => void;
  setCurrentAudio: (audio: HTMLAudioElement) => void;
  currentAyah: Ayah | null;
  setCurrentAyah: (ayah: Ayah | null) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      setCurrentAyah(null);
    }
  };

  const setCurrentAudio = (audio: HTMLAudioElement) => {
    stopCurrentAudio();
    currentAudioRef.current = audio;
  };

  return (
    <AudioContext.Provider value={{ 
      stopCurrentAudio, 
      setCurrentAudio, 
      currentAyah, 
      setCurrentAyah 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
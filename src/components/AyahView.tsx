import React from 'react';
import { useAudio } from '../contexts/AudioContext';
import type { Ayah } from '../types/quran';

interface AyahViewProps {
  ayah: Ayah;
  onClick: (ayah: Ayah) => void;
  surahName: string;
}

export const AyahView: React.FC<AyahViewProps> = ({ ayah, onClick, surahName }) => {
  const { currentAyah } = useAudio();
  const isPlaying = currentAyah?.number === ayah.number;

  return (
    <div 
      onClick={() => onClick(ayah)}
      className={`inline whitespace-normal ${
        isPlaying ? 'text-secondary' : 'hover:text-primary'
      }`}
      data-ayah={ayah.numberInSurah}
    >
      <span className="font-quran text-2xl">{ayah.text}</span>
      <span className={`verse-number ${isPlaying ? 'text-secondary' : ''}`}>
        ﴿{ayah.numberInSurah}﴾
      </span>
    </div>
  );
}
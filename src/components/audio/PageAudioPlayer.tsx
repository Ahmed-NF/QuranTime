import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../icons';
import { IconButton } from '../ui/IconButton';
import { useAudio } from '../../contexts/AudioContext';
import type { Ayah } from '../../types/quran';

interface PageAudioPlayerProps {
  ayahs: Ayah[];
  className?: string;
}

export const PageAudioPlayer: React.FC<PageAudioPlayerProps> = ({
  ayahs,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [nextAudioLoaded, setNextAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const nextAudioRef = useRef<HTMLAudioElement>(null);
  const { setCurrentAudio, setCurrentAyah } = useAudio();

  useEffect(() => {
    setCurrentAyahIndex(0);
    setIsPlaying(false);
    setNextAudioLoaded(false);
    setCurrentAyah(null);
  }, [ayahs, setCurrentAyah]);

  useEffect(() => {
    if (nextAudioRef.current && currentAyahIndex < ayahs.length - 1) {
      nextAudioRef.current.src = ayahs[currentAyahIndex + 1].audio;
      nextAudioRef.current.load();
    }
  }, [currentAyahIndex, ayahs]);

  const playNextAyah = async () => {
    if (currentAyahIndex < ayahs.length - 1) {
      setCurrentAyahIndex(prev => prev + 1);
      if (audioRef.current && nextAudioRef.current && nextAudioLoaded) {
        const tempSrc = audioRef.current.src;
        audioRef.current.src = nextAudioRef.current.src;
        nextAudioRef.current.src = tempSrc;
        
        try {
          setCurrentAudio(audioRef.current);
          setCurrentAyah(ayahs[currentAyahIndex + 1]);
          await audioRef.current.play();
          if (currentAyahIndex + 1 < ayahs.length - 1) {
            nextAudioRef.current.src = ayahs[currentAyahIndex + 2].audio;
            nextAudioRef.current.load();
          }
        } catch (error) {
          console.error('Error playing next ayah:', error);
          setIsPlaying(false);
          setCurrentAyah(null);
        }
      }
    } else {
      setIsPlaying(false);
      setCurrentAyahIndex(0);
      setNextAudioLoaded(false);
      setCurrentAyah(null);
    }
  };

  const togglePlayback = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentAyah(null);
      } else {
        try {
          audioRef.current.src = ayahs[currentAyahIndex].audio;
          setCurrentAudio(audioRef.current);
          setCurrentAyah(ayahs[currentAyahIndex]);
          await audioRef.current.play();
          setIsPlaying(true);
          if (currentAyahIndex < ayahs.length - 1) {
            nextAudioRef.current!.src = ayahs[currentAyahIndex + 1].audio;
            nextAudioRef.current!.load();
          }
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
          setCurrentAyah(null);
        }
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IconButton
        icon={isPlaying ? Icons.Pause : Icons.Play}
        onClick={togglePlayback}
        label={isPlaying ? 'إيقاف تلاوة الصفحة' : 'استمع للصفحة كاملة'}
        variant="secondary"
        size="md"
        className="relative group"
      />
      
      <audio
        ref={audioRef}
        onEnded={playNextAyah}
        preload="auto"
      />

      <audio
        ref={nextAudioRef}
        preload="auto"
        onCanPlayThrough={() => setNextAudioLoaded(true)}
        style={{ display: 'none' }}
      />
      
      {isPlaying && (
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
          <div className="audio-wave">
            <span className="bg-primary"></span>
            <span className="bg-primary"></span>
            <span className="bg-primary"></span>
            <span className="bg-primary"></span>
          </div>
          <span className="text-sm text-primary font-medium mr-2">
            الآية {currentAyahIndex + 1} من {ayahs.length}
          </span>
        </div>
      )}
    </div>
  );
};
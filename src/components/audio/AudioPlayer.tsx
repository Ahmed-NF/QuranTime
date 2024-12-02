import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../icons';
import { IconButton } from '../ui/IconButton';
import { useAudio } from '../../contexts/AudioContext';
import type { Ayah } from '../../types/quran';

interface AudioPlayerProps {
  src: string;
  ayah: Ayah;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  ayah,
  onPlay,
  onPause,
  onEnded,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setCurrentAudio, setCurrentAyah, stopCurrentAudio } = useAudio();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [src]);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        setIsLoading(true);
        stopCurrentAudio(); // Stop any currently playing audio
        await audioRef.current.load(); // Reload the audio
        setCurrentAudio(audioRef.current);
        setCurrentAyah(ayah);
        await audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
          setCurrentAyah(null);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentAyah(null);
      onPause?.();
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentAyah(null);
        onEnded?.();
      };

      const handleError = (e: ErrorEvent) => {
        if (e.error?.name !== 'AbortError') {
          console.error('Audio error occurred:', e.error);
          setIsPlaying(false);
          setCurrentAyah(null);
        }
        setIsLoading(false);
      };

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('canplay', handleCanPlay);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [onEnded, setCurrentAyah]);

  useEffect(() => {
    return () => {
      if (audioRef.current && isPlaying) {
        handlePause();
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IconButton
        icon={isPlaying ? Icons.Pause : Icons.Play}
        onClick={togglePlayback}
        label={isPlaying ? 'إيقاف التلاوة' : 'استمع للتلاوة'}
        variant="primary"
        size="lg"
        className={`relative group ${isLoading ? 'opacity-70' : ''}`}
        disabled={isLoading}
      />
      
      <audio
        ref={audioRef}
        preload="none"
      />
      
      {(isPlaying || isLoading) && (
        <div className="flex items-center gap-1 bg-primary/10 px-3 py-2 rounded-full">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <div className="audio-wave">
              <span className="bg-primary"></span>
              <span className="bg-primary"></span>
              <span className="bg-primary"></span>
              <span className="bg-primary"></span>
            </div>
          )}
          <span className="text-sm text-primary font-medium mr-2">
            {isLoading ? 'جاري التحميل' : 'جاري التشغيل'}
          </span>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { X } from 'lucide-react';
import type { Ayah } from '../types/quran';
import { AudioPlayer } from './audio/AudioPlayer';
import { ShareButton } from './sharing/ShareButton';

interface AyahDetailsProps {
  ayah: Ayah;
  surahName: string;
  onClose: () => void;
}

export const AyahDetails: React.FC<AyahDetailsProps> = ({ ayah, surahName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-4 sm:p-6 lg:p-8 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute left-2 sm:left-4 top-2 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
          aria-label="إغلاق"
        >
          <X size={24} />
        </button>
        
        <div className="mb-6 sm:mb-8 text-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              الآية {ayah.numberInSurah}
            </span>
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              صفحة {ayah.page}
            </span>
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              جزء {ayah.juz}
            </span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl leading-[2.5] text-right font-quran">
            {ayah.text}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <ShareButton
            text={ayah.text}
            verseNumbers={ayah.numberInSurah.toString()}
            surahName={surahName}
          />
          <AudioPlayer src={ayah.audio} ayah={ayah} />
        </div>
      </div>
    </div>
  );
};
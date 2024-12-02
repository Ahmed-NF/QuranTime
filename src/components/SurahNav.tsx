import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SurahNavProps {
  currentSurah: number;
  onChangeSurah: (number: number) => void;
}

export const SurahNav: React.FC<SurahNavProps> = ({ currentSurah, onChangeSurah }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => currentSurah > 1 && onChangeSurah(currentSurah - 1)}
        disabled={currentSurah <= 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 hover:bg-primary-hover transition-colors"
      >
        <ChevronRight size={20} />
        <span>السورة السابقة</span>
      </button>

      <button
        onClick={() => currentSurah < 114 && onChangeSurah(currentSurah + 1)}
        disabled={currentSurah >= 114}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 hover:bg-primary-hover transition-colors"
      >
        <span>السورة التالية</span>
        <ChevronLeft size={20} />
      </button>
    </div>
  );
};
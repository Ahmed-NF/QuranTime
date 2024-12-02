import React from 'react';
import type { Surah } from '../types/quran';

interface ReadingProgressProps {
  surah: Surah;
  currentPage: number;
  totalPages: number;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  surah,
  currentPage,
  totalPages,
}) => {
  const progress = (currentPage / totalPages) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-primary">
            {surah.name}
          </span>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <span className="text-sm text-gray-600">
            الصفحة {currentPage} من {totalPages}
          </span>
        </div>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out relative rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
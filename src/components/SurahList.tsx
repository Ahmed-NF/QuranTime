import React from 'react';
import type { Surah } from '../types/quran';
import { SurahListItem } from './surah/SurahListItem';
import { useBookmarks } from '../hooks/useBookmarks';

interface SurahListProps {
  surahs: Surah[];
  onSelect: (number: number) => void;
}

export const SurahList: React.FC<SurahListProps> = ({ surahs, onSelect }) => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {surahs.map((surah) => (
        <SurahListItem
          key={surah.number}
          surah={surah}
          onSelect={onSelect}
          isBookmarked={bookmarks.includes(surah.number)}
          onToggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};
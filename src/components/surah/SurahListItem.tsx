import React from 'react';
import type { Surah } from '../../types/quran';
import { Icons } from '../icons';
import { IconButton } from '../ui/IconButton';

interface SurahListItemProps {
  surah: Surah;
  onSelect: (number: number) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (number: number) => void;
}

export const SurahListItem: React.FC<SurahListItemProps> = ({
  surah,
  onSelect,
  isBookmarked = false,
  onToggleBookmark
}) => {
  return (
    <div className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/30 flex items-center gap-4">
      <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
        {surah.number}
      </div>
      
      <div className="flex-grow" onClick={() => onSelect(surah.number)}>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-text-primary">{surah.name}</h3>
          {isBookmarked && (
            <Icons.Star className="text-secondary w-4 h-4" />
          )}
        </div>
        <p className="text-text-secondary text-sm flex items-center gap-2">
          <span>عدد الآيات: {surah.numberOfAyahs}</span>
          <Icons.Volume className="w-4 h-4 opacity-50" />
        </p>
      </div>

      <div className="flex items-center gap-2">
        {onToggleBookmark && (
          <IconButton
            icon={Icons.Bookmark}
            variant="ghost"
            size="sm"
            className={isBookmarked ? 'text-secondary' : 'opacity-50 hover:opacity-100'}
            onClick={() => onToggleBookmark(surah.number)}
            label={isBookmarked ? 'إزالة من المحفوظات' : 'إضافة إلى المحفوظات'}
          />
        )}
        <IconButton
          icon={Icons.BookOpen}
          variant="primary"
          size="sm"
          onClick={() => onSelect(surah.number)}
          label="قراءة السورة"
        />
      </div>
    </div>
  );
};
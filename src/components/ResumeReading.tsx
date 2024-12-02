import React from 'react';
import { Icons } from './icons';
import { IconButton } from './ui/IconButton';
import { useReadingProgress } from '../hooks/useReadingProgress';

interface ResumeReadingProps {
  onResume: (surahNumber: number, ayahNumber: number) => void;
}

export const ResumeReading: React.FC<ResumeReadingProps> = ({ onResume }) => {
  const { progress, clearProgress } = useReadingProgress();

  if (!progress) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Icons.BookOpen className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              متابعة القراءة
            </h3>
            <p className="text-sm text-text-secondary">
              سورة {progress.surahNumber} - الآية {progress.ayahNumber}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <IconButton
            icon={Icons.Book}
            variant="primary"
            onClick={() => onResume(progress.surahNumber, progress.ayahNumber)}
            label="متابعة القراءة"
          />
          <IconButton
            icon={Icons.Star}
            variant="ghost"
            onClick={clearProgress}
            label="مسح التقدم"
            className="opacity-50 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};
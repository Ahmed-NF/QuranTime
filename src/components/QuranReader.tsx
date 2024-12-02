import React, { useEffect, useRef } from 'react';
import { SurahHeader } from './SurahHeader';
import { SurahNav } from './SurahNav';
import { ReciterSelect } from './ReciterSelect';
import { AyahView } from './AyahView';
import { AyahDetails } from './AyahDetails';
import { PageNavigation } from './PageNavigation';
import { ReadingProgress } from './ReadingProgress';
import { PageAudioPlayer } from './audio/PageAudioPlayer';
import { BackButton } from './ui/BackButton';
import { FocusButton } from './ui/FocusButton';
import { groupAyahsByPage } from '../utils/quranUtils';
import { useQuranNavigation } from '../hooks/useQuranNavigation';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useFocus } from '../contexts/FocusContext';
import type { Surah, Ayah } from '../types/quran';

interface QuranReaderProps {
  surah: Surah;
  currentSurah: number;
  initialAyah: number | null;
  selectedReciter: string;
  onReciterChange: (reciterId: string) => void;
  onChangeSurah: (number: number) => void;
  onBack: () => void;
  onAyahView: (surahNumber: number, ayahNumber: number, page: number) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  surah,
  currentSurah,
  initialAyah,
  selectedReciter,
  onReciterChange,
  onChangeSurah,
  onBack,
  onAyahView,
}) => {
  const [selectedAyah, setSelectedAyah] = React.useState<Ayah | null>(null);
  const quranTextRef = useRef<HTMLDivElement>(null);
  const { updateProgress } = useReadingProgress();
  const { isFocusMode, toggleFocusMode } = useFocus();
  const pages = groupAyahsByPage(surah.ayahs);
  
  const { 
    currentPageIndex,
    setCurrentPageIndex, 
    isTransitioning,
    handleNext, 
    handlePrevious,
    totalPages 
  } = useQuranNavigation({
    surah,
    currentSurah,
    initialAyah,
    onChangeSurah,
  });

  const currentPage = pages[currentPageIndex];

  useEffect(() => {
    if (currentPage && currentPage.ayahs.length > 0) {
      const firstAyah = currentPage.ayahs[0];
      onAyahView(surah.number, firstAyah.numberInSurah, firstAyah.page);
      updateProgress(surah.number, firstAyah.numberInSurah, firstAyah.page);
    }
  }, [currentPageIndex, surah.number]);

  useEffect(() => {
    if (initialAyah && quranTextRef.current) {
      const ayahElement = quranTextRef.current.querySelector(`[data-ayah="${initialAyah}"]`);
      if (ayahElement) {
        setTimeout(() => {
          ayahElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    }
  }, [initialAyah, currentPageIndex]);

  useEffect(() => {
    if (quranTextRef.current && isFocusMode) {
      quranTextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFocusMode]);

  return (
    <div className={`max-w-4xl mx-auto relative pt-20 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
      isFocusMode ? 'focus-mode pt-4' : ''
    }`}>
      <div className={`transition-opacity duration-500 ${isFocusMode ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-8'}`}>
        <BackButton onClick={onBack} />
      </div>

      <div className={`transition-opacity duration-500 ${isFocusMode ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <SurahHeader 
          name={surah.name}
          number={surah.number}
          ayahCount={surah.numberOfAyahs}
        />
        
        <div className="space-y-6 sm:space-y-4">
          <div className="flex items-center justify-between">
            <ReciterSelect
              selectedReciter={selectedReciter}
              onReciterChange={onReciterChange}
              variant="minimal"
            />
            <ReadingProgress
              surah={surah}
              currentPage={currentPageIndex + 1}
              totalPages={totalPages}
            />
          </div>

          <SurahNav
            currentSurah={currentSurah}
            onChangeSurah={onChangeSurah}
          />
        </div>
      </div>
      
      <div className={`quran-border p-4 sm:p-6 lg:p-8 min-h-[60vh] mt-6 ${isTransitioning ? 'transitioning' : ''} ${
        isFocusMode ? 'focus-mode-border' : ''
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <PageAudioPlayer ayahs={currentPage.ayahs} />
            <FocusButton isFocused={isFocusMode} onToggle={toggleFocusMode} />
          </div>
          <div className="flex items-center gap-4">
            {isFocusMode && (
              <span className="text-primary/60 text-sm font-medium transition-opacity duration-300">
                {surah.name}
              </span>
            )}
            {!isFocusMode && (
              <span className="page-number">{currentPage.page}</span>
            )}
          </div>
        </div>
        <div 
          ref={quranTextRef}
          className={`quran-text ${isTransitioning ? 'transitioning' : ''} ${
            isFocusMode ? 'focus-mode-text' : ''
          }`}
        >
          {currentPage.ayahs.map((ayah) => (
            <AyahView
              key={ayah.number}
              ayah={ayah}
              onClick={setSelectedAyah}
              surahName={surah.name}
            />
          ))}
        </div>
      </div>

      <PageNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        disableNext={currentPageIndex >= totalPages - 1 && currentSurah >= 114}
        disablePrevious={currentPageIndex <= 0 && currentSurah <= 1}
        isTransitioning={isTransitioning}
        isFocusMode={isFocusMode}
      />

      {selectedAyah && !isFocusMode && (
        <AyahDetails
          ayah={selectedAyah}
          onClose={() => setSelectedAyah(null)}
          surahName={surah.name}
        />
      )}
    </div>
  );
};
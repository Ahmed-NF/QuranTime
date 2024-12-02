import { useState, useEffect } from 'react';
import type { Surah } from '../types/quran';
import { groupAyahsByPage, findPageIndexByAyah } from '../utils/quranUtils';

interface UseQuranNavigationProps {
  surah: Surah;
  currentSurah: number;
  initialAyah: number | null;
  onChangeSurah: (number: number) => void;
}

export const useQuranNavigation = ({
  surah,
  currentSurah,
  initialAyah,
  onChangeSurah,
}: UseQuranNavigationProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const pages = groupAyahsByPage(surah.ayahs);
  const totalPages = pages.length;

  useEffect(() => {
    if (initialAyah) {
      const targetPageIndex = findPageIndexByAyah(pages, initialAyah);
      if (targetPageIndex !== -1) {
        setCurrentPageIndex(targetPageIndex);
      }
    }
  }, [initialAyah, surah.number]);

  const handleNext = () => {
    setIsTransitioning(true);
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (currentSurah < 114) {
      onChangeSurah(currentSurah + 1);
      setCurrentPageIndex(0);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentSurah > 1) {
      onChangeSurah(currentSurah - 1);
      setCurrentPageIndex(0);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return {
    currentPageIndex,
    setCurrentPageIndex,
    isTransitioning,
    handleNext,
    handlePrevious,
    totalPages,
  };
};
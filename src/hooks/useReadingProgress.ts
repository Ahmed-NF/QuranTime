import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import type { ReadingStats } from '../types/progress';

interface ReadingProgress {
  surahNumber: number;
  ayahNumber: number;
  page: number;
  timestamp?: number;
}

interface ReadingHistory {
  date: string;
  pages: number[];
  verses: number;
}

const INITIAL_STATS: ReadingStats = {
  today: { pages: 0, verses: 0 },
  thisWeek: { pages: 0, verses: 0 },
  average: { pagesPerDay: 0, versesPerDay: 0 },
  weeklyData: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    dayName: new Date(Date.now() - i * 86400000).toLocaleDateString('ar-SA', { weekday: 'short' }),
    pages: 0,
    verses: 0
  })).reverse()
};

export const useReadingProgress = () => {
  const [progress, setProgress] = useState<ReadingProgress | null>(() => 
    getStorageItem(STORAGE_KEYS.READING_PROGRESS)
  );
  
  const [history, setHistory] = useState<ReadingHistory[]>(() =>
    getStorageItem(STORAGE_KEYS.READING_HISTORY) || []
  );

  const [stats, setStats] = useState<ReadingStats>(INITIAL_STATS);

  useEffect(() => {
    if (progress) {
      setStorageItem(STORAGE_KEYS.READING_PROGRESS, progress);
    }
  }, [progress]);

  useEffect(() => {
    if (history.length > 0) {
      setStorageItem(STORAGE_KEYS.READING_HISTORY, history);
      calculateStats();
    }
  }, [history]);

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayStats = history.find(h => h.date === today) || { pages: [], verses: 0 };
    
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    const weeklyStats = history.filter(h => new Date(h.date) >= weekStart);
    
    const totalPages = weeklyStats.reduce((sum, day) => sum + day.pages.length, 0);
    const totalVerses = weeklyStats.reduce((sum, day) => sum + day.verses, 0);
    
    const weeklyData = INITIAL_STATS.weeklyData.map(day => {
      const dayStats = history.find(h => h.date === day.date);
      return {
        ...day,
        pages: dayStats?.pages.length || 0,
        verses: dayStats?.verses || 0
      };
    });

    setStats({
      today: {
        pages: todayStats.pages.length,
        verses: todayStats.verses
      },
      thisWeek: {
        pages: totalPages,
        verses: totalVerses
      },
      average: {
        pagesPerDay: Math.round(totalPages / 7 * 10) / 10,
        versesPerDay: Math.round(totalVerses / 7 * 10) / 10
      },
      weeklyData
    });
  };

  const updateProgress = (surahNumber: number, ayahNumber: number, page: number) => {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];
    
    setProgress({ surahNumber, ayahNumber, page, timestamp: now });
    
    setHistory(prev => {
      const todayIndex = prev.findIndex(h => h.date === today);
      if (todayIndex === -1) {
        return [...prev, { date: today, pages: [page], verses: 1 }];
      }
      
      const updatedHistory = [...prev];
      const todayHistory = updatedHistory[todayIndex];
      
      if (!todayHistory.pages.includes(page)) {
        todayHistory.pages.push(page);
      }
      todayHistory.verses += 1;
      
      return updatedHistory;
    });
  };

  const clearProgress = () => {
    setProgress(null);
    setHistory([]);
    setStats(INITIAL_STATS);
    removeStorageItem(STORAGE_KEYS.READING_PROGRESS);
    removeStorageItem(STORAGE_KEYS.READING_HISTORY);
  };

  return { progress, stats, updateProgress, clearProgress };
};
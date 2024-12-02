import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import type { QuizHistory, QuizResult } from '../types/quiz';

const INITIAL_HISTORY: QuizHistory = {
  results: [],
  bestScore: 0
};

export const useQuizHistory = () => {
  const [history, setHistory] = useState<QuizHistory>(() =>
    getStorageItem(STORAGE_KEYS.QUIZ_HISTORY) || INITIAL_HISTORY
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.QUIZ_HISTORY, history);
  }, [history]);

  const addResult = (surahNumber: number, score: number) => {
    const result: QuizResult = {
      surahNumber,
      score,
      timestamp: Date.now()
    };

    setHistory(prev => ({
      results: [...prev.results, result],
      bestScore: Math.max(prev.bestScore, score)
    }));
  };

  const clearHistory = () => {
    setHistory(INITIAL_HISTORY);
  };

  return {
    history,
    addResult,
    clearHistory
  };
};
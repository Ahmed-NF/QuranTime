import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import type { Reciter } from '../types/quran';

interface ReciterContextType {
  selectedReciter: string;
  setSelectedReciter: (reciterId: string) => void;
}

const ReciterContext = createContext<ReciterContextType | null>(null);

export const ReciterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedReciter, setSelectedReciter] = useState<string>(() => 
    getStorageItem(STORAGE_KEYS.SELECTED_RECITER) || 'ar.alafasy'
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SELECTED_RECITER, selectedReciter);
  }, [selectedReciter]);

  return (
    <ReciterContext.Provider value={{ selectedReciter, setSelectedReciter }}>
      {children}
    </ReciterContext.Provider>
  );
};

export const useReciter = () => {
  const context = useContext(ReciterContext);
  if (!context) {
    throw new Error('useReciter must be used within a ReciterProvider');
  }
  return context;
};
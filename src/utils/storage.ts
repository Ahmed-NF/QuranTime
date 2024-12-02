import { THEME_OPTIONS } from './constants';

type StorageKey = 'quran-theme' | 'quran-bookmarks' | 'quran-reading-progress' | 
                  'quran-reading-history' | 'quran-quiz-history' | 'quran-selected-reciter';

type StorageValue<K extends StorageKey> = 
  K extends 'quran-theme' ? typeof THEME_OPTIONS[number]['id'] :
  K extends 'quran-bookmarks' ? number[] :
  K extends 'quran-reading-progress' ? { surahNumber: number; ayahNumber: number; page: number } :
  K extends 'quran-reading-history' ? Array<{ date: string; pages: number[]; verses: number }> :
  K extends 'quran-quiz-history' ? { results: any[]; bestScore: number } :
  K extends 'quran-selected-reciter' ? string :
  never;

export const getStorageItem = <K extends StorageKey>(key: K): StorageValue<K> | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    
    // Type-specific validation
    if (key === 'quran-theme') {
      return THEME_OPTIONS.some(theme => theme.id === parsed) ? parsed : null;
    }
    
    if (key === 'quran-bookmarks') {
      return Array.isArray(parsed) ? parsed.filter(num => typeof num === 'number') : null;
    }
    
    if (key === 'quran-reading-progress') {
      return typeof parsed === 'object' && parsed !== null &&
             typeof parsed.surahNumber === 'number' &&
             typeof parsed.ayahNumber === 'number' &&
             typeof parsed.page === 'number' ? parsed : null;
    }
    
    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error parsing storage item ${key}:`, error.message);
    }
    removeStorageItem(key); // Clean up invalid data
    return null;
  }
};

export const setStorageItem = <K extends StorageKey>(key: K, value: StorageValue<K>): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error setting storage item ${key}:`, error.message);
    }
    // Try to clean up if setting failed
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore cleanup errors
    }
  }
};

export const removeStorageItem = (key: StorageKey): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error removing storage item ${key}:`, error.message);
    }
  }
};
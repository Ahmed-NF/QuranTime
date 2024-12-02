import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>(() => 
    getStorageItem(STORAGE_KEYS.BOOKMARKS) ?? []
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
  }, [bookmarks]);

  const toggleBookmark = (surahNumber: number) => {
    setBookmarks(prev => 
      prev.includes(surahNumber)
        ? prev.filter(num => num !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    removeStorageItem(STORAGE_KEYS.BOOKMARKS);
  };

  return { bookmarks, toggleBookmark, clearBookmarks };
};
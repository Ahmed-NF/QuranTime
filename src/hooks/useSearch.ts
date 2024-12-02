import { useState, useMemo } from 'react';
import { normalizeArabicText, ARABIC_NAMES_MAP } from '../utils/arabicUtils';
import type { Surah } from '../types/quran';

export const useSearch = (items: Surah[]) => {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;

    const searchTerm = normalizeArabicText(query.toLowerCase().trim());
    
    return items.filter(surah => {
      // Check normalized name
      const normalizedName = normalizeArabicText(surah.name.toLowerCase());
      if (normalizedName.includes(searchTerm)) return true;

      // Check alternative names
      const alternatives = ARABIC_NAMES_MAP[surah.name] || [];
      if (alternatives.some(alt => normalizeArabicText(alt).includes(searchTerm))) return true;

      // Check English name
      if (surah.englishName.toLowerCase().includes(searchTerm)) return true;

      // Check surah number
      if (surah.number.toString().includes(searchTerm)) return true;

      return false;
    });
  }, [items, query]);

  return {
    query,
    setQuery,
    filteredItems
  };
};
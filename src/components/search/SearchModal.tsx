import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { fetchAllSurahs } from '../../services/quranApi';
import { getSurahNameFromNumber } from '../../utils/surahMapping';
import type { Surah } from '../../types/quran';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { query, setQuery, filteredItems } = useSearch(allSurahs);

  useEffect(() => {
    if (isOpen) {
      loadSurahs();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      const data = await fetchAllSurahs();
      setAllSurahs(data);
    } catch (err) {
      console.error('Error loading surahs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSurahSelect = (number: number) => {
    const surahName = getSurahNameFromNumber(number);
    navigate(`/surah/${surahName}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#f8f9fa] w-full max-w-2xl mt-20 rounded-2xl shadow-xl animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">البحث في القرآن</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <SearchInput
            value={query}
            onChange={setQuery}
            loading={loading}
          />

          <div className="max-h-[60vh] overflow-y-auto">
            <SearchResults
              results={filteredItems}
              query={query}
              loading={loading}
              onSelect={handleSurahSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
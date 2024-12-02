import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { SearchResults } from '../components/search/SearchResults';
import { SearchInput } from '../components/search/SearchInput';
import { BackButton } from '../components/ui/BackButton';
import { fetchAllSurahs } from '../services/quranApi';
import { getSurahNameFromNumber } from '../utils/surahMapping';
import type { Surah } from '../types/quran';

export const SearchPage: React.FC = () => {
  const [allSurahs, setAllSurahs] = React.useState<Surah[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { query, setQuery, filteredItems } = useSearch(allSurahs);

  React.useEffect(() => {
    loadSurahs();
  }, []);

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
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <BackButton onClick={() => navigate('/browse')} />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <SearchIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">البحث في القرآن</h1>
          </div>
          <p className="text-text-secondary">
            ابحث عن السور باسمها أو رقمها
          </p>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          loading={loading}
        />

        <SearchResults
          results={filteredItems}
          query={query}
          loading={loading}
          onSelect={handleSurahSelect}
        />
      </div>
    </div>
  );
};
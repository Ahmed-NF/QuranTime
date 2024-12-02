import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SurahList } from '../components/SurahList';
import { ResumeReading } from '../components/ResumeReading';
import { SearchModal } from '../components/search/SearchModal';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { fetchAllSurahs } from '../services/quranApi';
import { getSurahNameFromNumber } from '../utils/surahMapping';
import type { Surah } from '../types/quran';

export const BrowsePage: React.FC = () => {
  const [surahs, setSurahs] = React.useState<Surah[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllSurahs();
      setSurahs(data);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل قائمة السور');
    } finally {
      setLoading(false);
    }
  };

  const handleSurahSelect = (number: number) => {
    const surahName = getSurahNameFromNumber(number);
    navigate(`/surah/${surahName}`);
  };

  const handleResume = (surahNumber: number, ayahNumber: number) => {
    const surahName = getSurahNameFromNumber(surahNumber);
    navigate(`/surah/${surahName}?ayah=${ayahNumber}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadSurahs} />;
  }

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">القرآن الكريم</h1>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border
                       hover:border-primary/30 transition-all duration-200"
            >
              <Search className="w-5 h-5 text-primary" />
              <span className="text-text-secondary">بحث</span>
            </button>
          </div>

          <ResumeReading onResume={handleResume} />
          <SurahList surahs={surahs} onSelect={handleSurahSelect} />
        </div>
      </div>

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
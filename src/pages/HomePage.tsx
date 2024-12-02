import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurahList } from '../components/SurahList';
import { ResumeReading } from '../components/ResumeReading';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { fetchAllSurahs } from '../services/quranApi';
import { getSurahNameFromNumber } from '../utils/surahMapping';
import type { Surah } from '../types/quran';

export const BrowsePage: React.FC = () => {
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllSurahs();
      setAllSurahs(data);
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
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          القرآن الكريم
        </h1>
        <ResumeReading onResume={handleResume} />
        <SurahList
          surahs={allSurahs}
          onSelect={handleSurahSelect}
        />
      </div>
    </div>
  );
};
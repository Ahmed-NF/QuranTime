import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { QuranReader } from '../components/QuranReader';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { fetchSurah } from '../services/quranApi';
import { useReciter } from '../contexts/ReciterContext';
import { getSurahNumberFromName, getSurahNameFromNumber } from '../utils/surahMapping';
import type { Surah } from '../types/quran';

export const SurahPage: React.FC = () => {
  const { englishName } = useParams<{ englishName: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedReciter, setSelectedReciter } = useReciter();
  
  const currentSurah = englishName ? getSurahNumberFromName(englishName) : null;
  const initialAyah = searchParams.get('ayah') ? parseInt(searchParams.get('ayah')!) : null;

  useEffect(() => {
    if (currentSurah) {
      loadSurah(currentSurah);
    }
  }, [currentSurah, selectedReciter]);

  const loadSurah = async (surahNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSurah(surahNumber, selectedReciter);
      setSelectedSurah(data);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل السورة');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSurah = (number: number) => {
    const surahName = getSurahNameFromNumber(number);
    navigate(`/surah/${surahName}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => currentSurah && loadSurah(currentSurah)} />;
  }

  if (!selectedSurah || !currentSurah) {
    return <ErrorMessage message="السورة غير موجودة" />;
  }

  return (
    <QuranReader
      surah={selectedSurah}
      currentSurah={currentSurah}
      initialAyah={initialAyah}
      selectedReciter={selectedReciter}
      onReciterChange={setSelectedReciter}
      onChangeSurah={handleChangeSurah}
      onBack={() => navigate('/browse')}
      onAyahView={(surahNumber, ayahNumber, page) => {
        const surahName = getSurahNameFromNumber(surahNumber);
        const newUrl = `/surah/${surahName}?ayah=${ayahNumber}`;
        window.history.replaceState(null, '', newUrl);
      }}
    />
  );
};
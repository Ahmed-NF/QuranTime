import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';
import { BackButton } from '../components/ui/BackButton';
import { SurahListItem } from '../components/surah/SurahListItem';
import { fetchAllSurahs } from '../services/quranApi';
import type { Surah } from '../types/quran';

export const BookmarksPage: React.FC = () => {
  const [surahs, setSurahs] = React.useState<Surah[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadBookmarkedSurahs = async () => {
      try {
        const allSurahs = await fetchAllSurahs();
        const bookmarkedSurahs = allSurahs.filter(surah => 
          bookmarks.includes(surah.number)
        );
        setSurahs(bookmarkedSurahs);
      } catch (error) {
        console.error('Error loading bookmarked surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarkedSurahs();
  }, [bookmarks]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton onClick={() => navigate('/')} />
        </div>

        <h1 className="text-3xl font-bold mb-8 text-primary text-center">
          المحفوظات
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">جاري التحميل...</div>
        ) : surahs.length === 0 ? (
          <div className="text-center text-gray-600">
            لا توجد سور محفوظة
          </div>
        ) : (
          <div className="grid gap-4">
            {surahs.map(surah => (
              <SurahListItem
                key={surah.number}
                surah={surah}
                onSelect={(number) => navigate(`/surah/${number}`)}
                isBookmarked={true}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
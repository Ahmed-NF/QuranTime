import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { ReciterSelect } from '../components/ReciterSelect';
import { ThemeSelector } from '../components/settings/ThemeSelector';
import { useBookmarks } from '../hooks/useBookmarks';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useReciter } from '../contexts/ReciterContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { clearBookmarks } = useBookmarks();
  const { clearProgress } = useReadingProgress();
  const { selectedReciter, setSelectedReciter } = useReciter();

  const handleClearData = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
      clearBookmarks();
      clearProgress();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <BackButton onClick={() => navigate('/')} />
        </div>

        <h1 className="text-3xl font-bold mb-8 text-primary text-center">
          الإعدادات
        </h1>

        <div className="bg-white rounded-xl shadow-sm space-y-8 divide-y divide-gray-100">
          <div className="p-6">
            <ThemeSelector />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">القارئ الافتراضي</h2>
            <ReciterSelect
              selectedReciter={selectedReciter}
              onReciterChange={setSelectedReciter}
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">خيارات متقدمة</h2>
            <button
              onClick={handleClearData}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              حذف جميع البيانات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
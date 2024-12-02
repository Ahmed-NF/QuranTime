import React from 'react';
import type { Surah } from '../../types/quran';
import { Book, Search } from 'lucide-react';

interface SearchResultsProps {
  results: Surah[];
  query: string;
  loading: boolean;
  onSelect: (number: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  loading,
  onSelect
}) => {
  if (loading) {
    return (
      <div className="text-center text-gray-500 py-12">
        جاري البحث...
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Book className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">
          لا توجد نتائج للبحث عن "{query}"
        </p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <p className="text-text-secondary">
          اكتب اسم أو رقم السورة للبحث
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((surah) => (
        <button
          key={surah.number}
          onClick={() => onSelect(surah.number)}
          className="w-full bg-white p-4 rounded-xl border border-border hover:border-primary/30
                   transition-all duration-200 group text-right"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center 
                          justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              {surah.number}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {surah.name}
              </h3>
              <p className="text-text-secondary text-sm">
                عدد الآيات: {surah.numberOfAyahs}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
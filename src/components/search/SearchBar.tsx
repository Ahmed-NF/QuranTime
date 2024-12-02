import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'ابحث عن سورة...'
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 pl-24 bg-white border border-border rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                   transition-all duration-200 text-right placeholder:text-gray-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="مسح البحث"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover 
                     transition-colors text-sm font-medium"
          >
            بحث
          </button>
        </div>
      </div>
    </form>
  );
};
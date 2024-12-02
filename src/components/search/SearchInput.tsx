import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  loading = false
}) => {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ابحث عن سورة..."
          className="w-full px-12 py-4 bg-white border border-border rounded-2xl
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                   transition-all duration-200 text-right text-lg
                   placeholder:text-gray-400"
          autoFocus
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={20} />
        </div>
        
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 
                     hover:text-gray-600 transition-colors rounded-full
                     hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {loading && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
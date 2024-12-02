import React from 'react';
import { RECITERS } from '../utils/constants';
import { Volume2, ChevronDown } from 'lucide-react';

interface ReciterSelectProps {
  selectedReciter: string;
  onReciterChange: (reciterId: string) => void;
  variant?: 'default' | 'minimal';
}

export const ReciterSelect: React.FC<ReciterSelectProps> = ({
  selectedReciter,
  onReciterChange,
  variant = 'default'
}) => {
  const selectedReciterName = RECITERS.find(r => r.id === selectedReciter)?.name;

  if (variant === 'minimal') {
    return (
      <div className="relative group">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-primary" />
          <select
            value={selectedReciter}
            onChange={(e) => onReciterChange(e.target.value)}
            className="appearance-none bg-transparent pr-2 pl-8 py-2 text-primary font-medium
                     hover:bg-primary/5 rounded-lg transition-colors cursor-pointer focus:outline-none
                     focus:ring-2 focus:ring-primary/20"
            aria-label="اختر القارئ"
          >
            {RECITERS.map((reciter) => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-primary/70 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none
                               group-hover:text-primary transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        اختر القارئ
      </label>
      <div className="relative">
        <select
          value={selectedReciter}
          onChange={(e) => onReciterChange(e.target.value)}
          className="w-full appearance-none bg-white border border-border rounded-lg px-4 py-3 pr-4 pl-10
                   text-right transition-all hover:border-primary/30 focus:outline-none focus:ring-2 
                   focus:ring-primary/20"
          aria-label="اختر القارئ"
        >
          {RECITERS.map((reciter) => (
            <option key={reciter.id} value={reciter.id}>
              {reciter.name}
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Volume2 className="w-5 h-5 text-primary/70" />
        </div>
      </div>
    </div>
  );
};
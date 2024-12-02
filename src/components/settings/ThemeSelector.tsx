import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { THEME_OPTIONS } from '../../utils/constants';
import { Check } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6 text-primary">لون التطبيق</h2>
      <div className="flex flex-wrap gap-4">
        {THEME_OPTIONS.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`group relative flex-1 min-w-[160px] flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
              currentTheme === theme.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border hover:border-primary/30 hover:bg-primary/5'
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full shadow-md transition-transform group-hover:scale-110 ${
                  currentTheme === theme.id ? 'scale-110' : ''
                }`}
                style={{ backgroundColor: theme.colors.primary }}
              />
              {currentTheme === theme.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="font-semibold text-lg">{theme.name}</span>
              <div className="flex gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
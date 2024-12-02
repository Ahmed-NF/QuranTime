import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, THEME_OPTIONS } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/storage';

type ThemeColors = typeof THEME_OPTIONS[number]['colors'];
type ThemeId = typeof THEME_OPTIONS[number]['id'];

interface ThemeContextType {
  colors: ThemeColors;
  currentTheme: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const DEFAULT_THEME: ThemeId = 'green';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    const saved = getStorageItem('quran-theme');
    return saved || DEFAULT_THEME;
  });

  const theme = THEME_OPTIONS.find(t => t.id === currentTheme) || THEME_OPTIONS[0];
  const colors = theme.colors;

  useEffect(() => {
    const root = document.documentElement;
    const rgb = hexToRgb(colors.primary);
    
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--primary-hover', adjustColor(colors.primary, -10));
    root.style.setProperty('--primary-light', adjustColor(colors.primary, 90));
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--bg-color', colors.background);
    
    if (rgb) {
      root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
  }, [colors]);

  const setTheme = (themeId: ThemeId) => {
    if (THEME_OPTIONS.some(theme => theme.id === themeId)) {
      setCurrentTheme(themeId);
      setStorageItem('quran-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
// القراء المتاحون
export const RECITERS = [
  { id: 'ar.alafasy', name: 'مشاري العفاسي' },
  { id: 'ar.abdurrahmaansudais', name: 'عبد الرحمن السديس' },
  { id: 'ar.hudhaify', name: 'علي الحذيفي' },
  { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
  { id: 'ar.minshawi', name: 'محمد صديق المنشاوي' },
] as const;

export const API_BASE_URL = 'https://api.alquran.cloud/v1';

export const STORAGE_KEYS = {
  BOOKMARKS: 'quran-bookmarks',
  READING_PROGRESS: 'quran-reading-progress',
  READING_HISTORY: 'quran-reading-history',
  QUIZ_HISTORY: 'quran-quiz-history',
  THEME: 'quran-theme',
  SELECTED_RECITER: 'quran-selected-reciter',
} as const;

export const THEME_OPTIONS = [
  {
    id: 'green',
    name: 'الأخضر',
    colors: {
      primary: '#34785C',
      secondary: '#B8860B',
      background: '#F8F9FA'
    }
  },
  {
    id: 'burgundy',
    name: 'العنابي',
    colors: {
      primary: '#6A1E55',
      secondary: '#9333EA',
      background: '#F8FAFC'
    }
  },
  {
    id: 'brown',
    name: 'البني',
    colors: {
      primary: '#3B1C32',
      secondary: '#B45309',
      background: '#FDF2F2'
    }
  }
] as const;
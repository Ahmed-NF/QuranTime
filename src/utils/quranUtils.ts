import type { Surah } from '../types/quran';

export const groupAyahsByPage = (ayahs: Surah['ayahs']) => {
  const pages = new Map<number, Surah['ayahs']>();
  
  ayahs.forEach(ayah => {
    if (!pages.has(ayah.page)) {
      pages.set(ayah.page, []);
    }
    pages.get(ayah.page)?.push(ayah);
  });

  return Array.from(pages.entries())
    .sort(([pageA], [pageB]) => pageA - pageB)
    .map(([page, ayahs]) => ({
      page,
      ayahs: ayahs.sort((a, b) => a.numberInSurah - b.numberInSurah)
    }));
};

export const findPageIndexByAyah = (pages: ReturnType<typeof groupAyahsByPage>, ayahNumber: number): number => {
  return pages.findIndex(page => 
    page.ayahs.some(ayah => ayah.numberInSurah === ayahNumber)
  );
};
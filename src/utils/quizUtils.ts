import type { Surah } from '../types/quran';
import type { Question } from '../types/quiz';

export const generateQuestions = (surah: Surah): Question[] => {
  const questions: Question[] = [];
  const usedAyahs = new Set<number>();

  // Generate "Complete the verse" questions
  for (let i = 0; i < Math.min(5, surah.ayahs.length); i++) {
    const ayah = getRandomAyah(surah, usedAyahs);
    if (!ayah) continue;

    const words = ayah.text.split(' ');
    if (words.length < 4) continue;

    const missingWordIndex = Math.floor(Math.random() * (words.length - 3)) + 2;
    const correctAnswer = words[missingWordIndex];
    
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomAyah = surah.ayahs[Math.floor(Math.random() * surah.ayahs.length)];
      const randomWord = randomAyah.text.split(' ')[
        Math.floor(Math.random() * randomAyah.text.split(' ').length)
      ];
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }

    words[missingWordIndex] = '...';
    
    questions.push({
      text: words.join(' '),
      options: shuffleArray(options),
      correctAnswer,
      type: 'complete'
    });
  }

  return questions;
};

const getRandomAyah = (surah: Surah, usedAyahs: Set<number>) => {
  const availableAyahs = surah.ayahs.filter(
    ayah => !usedAyahs.has(ayah.number)
  );
  
  if (availableAyahs.length === 0) return null;
  
  const ayah = availableAyahs[Math.floor(Math.random() * availableAyahs.length)];
  usedAyahs.add(ayah.number);
  
  return ayah;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
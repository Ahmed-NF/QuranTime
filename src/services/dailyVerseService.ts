import axios from 'axios';
import type { DailyVerse } from '../types/verse';
import { API_BASE_URL } from '../utils/constants';

const VERSES = [
  {
    text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    surah: "الشرح",
    ayahNumber: 6,
    translation: "Indeed, with hardship comes ease",
    interpretation: "في هذه الآية تذكير بأن مع كل صعوبة تأتي معها اليسر والفرج، وهي بشارة من الله تعالى بأن الفرج قريب"
  },
  {
    text: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا",
    surah: "الطور",
    ayahNumber: 48,
    translation: "And be patient for the decision of your Lord, for indeed, you are in Our eyes",
    interpretation: "دعوة للصبر والثقة في الله، فالمؤمن في رعاية الله وحفظه"
  },
  {
    text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    surah: "الطلاق",
    ayahNumber: 2,
    translation: "And whoever fears Allah, He will make for him a way out",
    interpretation: "من يتقي الله في أموره كلها، يجعل له مخرجاً من كل ضيق وهم"
  }
];

export const getDailyVerse = (): DailyVerse => {
  // Get a verse based on the day of the year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return VERSES[dayOfYear % VERSES.length];
};
import axios from 'axios';
import type { Surah } from '../types/quran';
import { API_BASE_URL } from '../utils/constants';

export const fetchSurah = async (surahNumber: number, reciterId: string = 'ar.alafasy'): Promise<Surah> => {
  try {
    const [textResponse, audioResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/surah/${surahNumber}/quran-uthmani`),
      axios.get(`${API_BASE_URL}/surah/${surahNumber}/${reciterId}`)
    ]);

    const textData = textResponse.data.data;
    const audioData = audioResponse.data.data;

    return {
      ...textData,
      ayahs: textData.ayahs.map((ayah: any, index: number) => ({
        ...ayah,
        audio: audioData.ayahs[index].audio
      }))
    };
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw new Error('فشل في تحميل السورة');
  }
};

export const fetchAllSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surah`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw new Error('فشل في تحميل قائمة السور');
  }
};
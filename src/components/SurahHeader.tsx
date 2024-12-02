import React from 'react';
import { Bookmark } from 'lucide-react';

interface SurahHeaderProps {
  name: string;
  number: number;
  ayahCount: number;
}

export const SurahHeader: React.FC<SurahHeaderProps> = ({ name, number, ayahCount }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-xl mb-6 text-center relative">
      <Bookmark className="absolute right-4 top-4 cursor-pointer hover:text-primary-light transition-colors" />
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="text-lg text-primary-light/90">
        <span>سورة رقم {number}</span>
        <span className="mx-2">|</span>
        <span>عدد الآيات: {ayahCount}</span>
      </div>
    </div>
  );
};
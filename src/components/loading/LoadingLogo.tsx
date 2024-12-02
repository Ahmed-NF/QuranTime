import React from 'react';
import { Book } from 'lucide-react';

export const LoadingLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <Book 
          className="w-24 h-24 text-primary animate-float" 
          strokeWidth={1.5} 
        />
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ripple" />
        <div className="absolute inset-0 bg-primary/5 rounded-full animate-ripple-delayed" />
      </div>
      <h1 className="text-3xl font-bold text-primary mt-4 font-quran animate-fade-in">
        القرآن الكريم
      </h1>
    </div>
  );
};
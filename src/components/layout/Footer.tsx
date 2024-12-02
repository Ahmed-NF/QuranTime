import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-sm text-text-secondary bg-white border-t border-border">
      <p className="flex items-center justify-center gap-1">
        صنع بكل
        <Heart className="w-4 h-4 text-red-500 fill-current" />
        بواسطة أحمد
      </p>
    </footer>
  );
};
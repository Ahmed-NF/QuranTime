import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface EnterButtonProps {
  onClick: () => void;
  timeLeft: number;
}

export const EnterButton: React.FC<EnterButtonProps> = ({ onClick, timeLeft }) => {
  return (
    <div className="text-center space-y-3">
      <button
        onClick={onClick}
        className="group relative px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium">ابدأ القراءة</span>
          <ArrowLeft className="w-5 h-5" />
        </div>
      </button>
      
      <div className="text-sm text-text-secondary">
        سيتم الدخول تلقائياً خلال {timeLeft} ثوان
      </div>
    </div>
  );
};
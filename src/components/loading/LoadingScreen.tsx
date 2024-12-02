import React, { useState, useEffect } from 'react';
import { DailyVerse } from './DailyVerse';
import { EnterButton } from './EnterButton';
import { getRandomContent } from '../../utils/randomContent';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [content] = useState(getRandomContent());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-[#f8f9fa] flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-4xl w-full">
        <DailyVerse content={content} />
        <div className="mt-8 flex flex-col items-center">
          <EnterButton onClick={handleEnter} timeLeft={timeLeft} />
        </div>
      </div>
    </div>
  );
};
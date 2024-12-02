import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DailyVerse } from '../components/loading/DailyVerse';
import { EnterButton } from '../components/loading/EnterButton';
import { getRandomContent } from '../utils/randomContent';
import { useLoading } from '../contexts/LoadingContext';

export const LandingPage: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [content] = useState(getRandomContent());
  const navigate = useNavigate();
  const { setHasShownLoadingScreen } = useLoading();

  const handleEnter = useCallback(() => {
    setIsExiting(true);
    setHasShownLoadingScreen(true);
    setTimeout(() => {
      navigate('/browse');
    }, 300);
  }, [navigate, setHasShownLoadingScreen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      handleEnter();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeLeft, handleEnter]);

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
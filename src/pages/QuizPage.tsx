import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { QuizGame } from '../components/quiz/QuizGame';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useQuizHistory } from '../hooks/useQuizHistory';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useReadingProgress();
  const { history, addResult } = useQuizHistory();

  if (!progress) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <BackButton onClick={() => navigate('/')} />
          </div>
          <p className="text-lg text-text-secondary">
            ابدأ بقراءة القرآن أولاً لتتمكن من اختبار معرفتك
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton onClick={() => navigate('/')} />
        </div>

        <h1 className="text-3xl font-bold mb-8 text-primary text-center">
          اختبر معرفتك
        </h1>

        <QuizGame
          surahNumber={progress.surahNumber}
          onComplete={(score) => addResult(progress.surahNumber, score)}
        />
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { fetchSurah } from '../../services/quranApi';
import { generateQuestions } from '../../utils/quizUtils';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Question } from '../../types/quiz';

interface QuizGameProps {
  surahNumber: number;
  onComplete: (score: number) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ surahNumber, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const surah = await fetchSurah(surahNumber);
        const quizQuestions = generateQuestions(surah);
        setQuestions(quizQuestions);
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [surahNumber]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      onComplete(score);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isComplete) {
    return (
      <QuizResults
        score={score}
        total={questions.length}
        onRetry={() => {
          setCurrentQuestion(0);
          setScore(0);
          setIsComplete(false);
        }}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-text-secondary">
          السؤال {currentQuestion + 1} من {questions.length}
        </span>
        <span className="text-sm font-medium text-primary">
          النقاط: {score}
        </span>
      </div>

      <QuizQuestion
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};
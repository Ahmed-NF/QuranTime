import React, { useState } from 'react';
import type { Question } from '../../types/quiz';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answer === question.correctAnswer);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-xl font-semibold mb-6 text-text-primary">
        {question.text}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          
          let buttonClass = 'w-full text-right p-4 rounded-lg border-2 transition-all duration-300 ';
          
          if (!showResult) {
            buttonClass += isSelected
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/30 hover:bg-primary/5';
          } else if (isSelected || isCorrect) {
            buttonClass += isCorrect
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-red-500 bg-red-50 text-red-700';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={buttonClass}
            >
              <span className="font-quran text-lg">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
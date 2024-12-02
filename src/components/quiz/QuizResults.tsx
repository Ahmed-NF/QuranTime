import React from 'react';
import { Trophy, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizResultsProps {
  score: number;
  total: number;
  onRetry: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  total,
  onRetry,
}) => {
  const percentage = Math.round((score / total) * 100);
  const isPerfectScore = percentage === 100;
  const isGoodScore = percentage >= 70;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-border text-center">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          {isPerfectScore ? (
            <Trophy className="w-10 h-10 text-primary" />
          ) : (
            <BookOpen className="w-10 h-10 text-primary" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">
          {isPerfectScore ? 'ممتاز!' : 'أحسنت المحاولة!'}
        </h3>
        <p className="text-text-secondary">
          لقد أكملت الاختبار
        </p>
      </div>

      <div className="mb-8">
        <div className="text-4xl font-bold text-primary mb-2">
          {percentage}%
        </div>
        <p className="text-text-secondary mb-4">
          أجبت على {score} من {total} أسئلة بشكل صحيح
        </p>

        {isPerfectScore ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
            <p className="font-medium mb-2">تهانينا! لقد أحسنت في جميع الإجابات</p>
            <p className="text-sm">
              هل تريد تحدياً جديداً؟ اقرأ المزيد من السور واختبر معرفتك
            </p>
            <Link
              to="/home"
              className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              اقرأ المزيد
            </Link>
          </div>
        ) : (
          <div className={`${isGoodScore ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'} p-4 rounded-lg mb-6`}>
            <p className="font-medium mb-2">
              {isGoodScore
                ? 'نتيجة جيدة! واصل التقدم'
                : 'لا بأس، يمكنك التحسن مع المزيد من القراءة'}
            </p>
            <p className="text-sm">
              {isGoodScore
                ? 'اقرأ المزيد من السور لتحسين مستواك أكثر'
                : 'كلما قرأت أكثر، ستظهر لك أسئلة جديدة وستتحسن نتائجك'}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={onRetry}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                حاول مرة أخرى
              </button>
              <Link
                to="/home"
                className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                اقرأ المزيد
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
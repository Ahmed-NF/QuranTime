export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  type: 'complete' | 'choose';
}

export interface QuizResult {
  surahNumber: number;
  score: number;
  timestamp: number;
}

export interface QuizHistory {
  results: QuizResult[];
  bestScore: number;
}
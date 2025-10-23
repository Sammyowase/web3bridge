export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  isComplete: boolean;
  timeRemaining?: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  totalQuestions: number;
}

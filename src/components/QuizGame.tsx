import { useState, useEffect } from 'react';
import type { Question, QuizState, LeaderboardEntry } from '../types/quiz';
import QuestionCard from './QuestionCard.tsx';
import ScoreBoard from './ScoreBoard.tsx';
import Leaderboard from './Leaderboard.tsx';
import LoadingSpinner from './LoadingSpinner.tsx';
import questionsData from '../data/questions.json';

const TIMER_DURATION = 30;

const QuizGame = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: Array(questionsData.length).fill(null),
    isComplete: false,
    timeRemaining: TIMER_DURATION,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    try {
      if (!questionsData || questionsData.length === 0) {
        throw new Error('No questions available');
      }
      setQuestions(questionsData);
      setQuizState({
        currentQuestionIndex: 0,
        score: 0,
        answers: Array(questionsData.length).fill(null),
        isComplete: false,
        timeRemaining: TIMER_DURATION,
      });
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (quizState.isComplete || showFeedback) return;

    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeRemaining! <= 1) {
          handleTimeout();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining! - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.currentQuestionIndex, quizState.isComplete, showFeedback]);

  const handleTimeout = () => {
    setShowFeedback(true);
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: prev.answers.map((ans, idx) =>
        idx === prev.currentQuestionIndex ? answerIndex : ans
      ),
    }));

    setShowFeedback(true);

    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const moveToNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: TIMER_DURATION,
      }));
    } else {
      setQuizState((prev) => ({ ...prev, isComplete: true }));
    }
  };

  const restartQuiz = () => {
    if (questions.length === 0) return;
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: Array(questions.length).fill(null),
      isComplete: false,
      timeRemaining: TIMER_DURATION,
    });
    setShowFeedback(false);
    setSelectedAnswer(null);
    setShowLeaderboard(false);
  };

  const saveToLeaderboard = (name: string) => {
    try {
      const entry: LeaderboardEntry = {
        name,
        score: quizState.score,
        date: new Date().toISOString(),
        totalQuestions: questions.length,
      };

      const leaderboard = JSON.parse(
        localStorage.getItem('quizLeaderboard') || '[]'
      );
      leaderboard.push(entry);
      leaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
      localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));
      setShowLeaderboard(true);
    } catch (err) {
      console.error('Failed to save to leaderboard:', err);
      alert('Failed to save score. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-pink-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Quiz</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
          >
            🔄 Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (quizState.isComplete) {
    return (
      <ScoreBoard
        score={quizState.score}
        totalQuestions={questions.length}
        onRestart={restartQuiz}
        onSaveScore={saveToLeaderboard}
        showLeaderboard={showLeaderboard}
      />
    );
  }

  if (showLeaderboard) {
    return <Leaderboard onClose={() => setShowLeaderboard(false)} />;
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-2xl">
                Web Quiz
              </h1>
              <div className="absolute -top-2 -left-2 text-4xl sm:text-5xl">🎯</div>
            </div>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-base sm:text-lg font-black rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105 hover:-rotate-1"
            >
              <span className="relative z-10">🏆 Leaderboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </button>
          </div>

          {/* Progress Cards - Redesigned */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
            {/* Question Counter */}
            <div className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 px-5 py-5 sm:px-6 sm:py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 border-3 border-white/20">
              <div className="absolute top-2 right-2 text-2xl opacity-20">📊</div>
              <div className="text-xs font-black text-white/80 mb-1 uppercase tracking-widest">Question</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                {quizState.currentQuestionIndex + 1}
              </div>
              <div className="text-base sm:text-lg font-bold text-white/60 mt-1">
                of {questions.length}
              </div>
            </div>
            
            {/* Score Counter */}
            <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-500 px-5 py-5 sm:px-6 sm:py-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 border-3 border-white/20">
              <div className="absolute top-2 right-2 text-2xl opacity-20">⭐</div>
              <div className="text-xs font-black text-white/80 mb-1 uppercase tracking-widest">Score</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                {quizState.score}
              </div>
              <div className="text-base sm:text-lg font-bold text-white/60 mt-1">
                points
              </div>
            </div>
          </div>

          {/* Timer - Redesigned */}
          <div className="relative bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border-3 border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">⏱️</span>
                <span className="text-base sm:text-lg md:text-xl font-black text-white drop-shadow-lg">Time Remaining</span>
              </div>
              <div className={`relative px-5 py-2 sm:px-6 sm:py-3 rounded-xl shadow-2xl font-black text-2xl sm:text-3xl transition-all ${
                quizState.timeRemaining! <= 10 
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white animate-pulse scale-110' 
                  : 'bg-gradient-to-r from-emerald-400 to-green-500 text-white'
              }`}>
                {quizState.timeRemaining}s
              </div>
            </div>
            <div className="relative w-full bg-black/30 backdrop-blur-sm rounded-full h-4 sm:h-5 shadow-inner overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 shadow-2xl relative ${
                  quizState.timeRemaining! <= 10 
                    ? 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-600' 
                    : 'bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500'
                }`}
                style={{ width: `${(quizState.timeRemaining! / TIMER_DURATION) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Section - Flex grow to fill remaining space */}
        <div className="flex-1 flex flex-col">
          <QuestionCard
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizGame;

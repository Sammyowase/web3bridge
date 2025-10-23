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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
            🎮 Web Quiz
          </h1>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="px-8 py-4 bg-white text-violet-600 text-lg font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            🏆 Leaderboard
          </button>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 sm:mb-16">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl text-center shadow-2xl">
            <div className="text-sm font-semibold text-violet-600 mb-2">QUESTION</div>
            <div className="text-4xl sm:text-5xl font-bold text-gray-800">
              {quizState.currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-3xl text-center shadow-2xl">
            <div className="text-sm font-semibold text-emerald-600 mb-2">SCORE</div>
            <div className="text-4xl sm:text-5xl font-bold text-gray-800">{quizState.score}</div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-12 sm:mb-16">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">⏱️ Time Remaining</span>
            <span className={`text-3xl sm:text-4xl font-bold px-8 py-3 rounded-2xl shadow-2xl ${
              quizState.timeRemaining! <= 10 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'bg-white text-emerald-600'
            }`}>
              {quizState.timeRemaining}s
            </span>
          </div>
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-6 shadow-inner">
            <div
              className={`h-6 rounded-full transition-all duration-1000 shadow-lg ${
                quizState.timeRemaining! <= 10 
                  ? 'bg-gradient-to-r from-rose-500 to-red-600' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-600'
              }`}
              style={{ width: `${(quizState.timeRemaining! / TIMER_DURATION) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      </div>
    </div>
  );
};

export default QuizGame;

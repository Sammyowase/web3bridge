import { useState, useEffect } from 'react';
import type { Question, QuizState, LeaderboardEntry } from '../types/quiz';
import QuestionCard from './QuestionCard.tsx';
import ScoreBoard from './ScoreBoard.tsx';
import Leaderboard from './Leaderboard.tsx';
import questionsData from '../data/questions.json';

const TIMER_DURATION = 30; // seconds per question

const QuizGame = () => {
  const [questions] = useState<Question[]>(questionsData);
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
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Quiz Game</h1>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              🏆 Leaderboard
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold text-gray-700">
              Question {quizState.currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Score: {quizState.score}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Time Remaining</span>
              <span className={`text-lg font-bold ${
                quizState.timeRemaining! <= 10 ? 'text-red-600' : 'text-green-600'
              }`}>
                {quizState.timeRemaining}s
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  quizState.timeRemaining! <= 10 ? 'bg-red-600' : 'bg-green-600'
                }`}
                style={{ width: `${(quizState.timeRemaining! / TIMER_DURATION) * 100}%` }}
              />
            </div>
          </div>

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

import { useState } from 'react';

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onSaveScore: (name: string) => void;
  showLeaderboard: boolean;
}

const ScoreBoard = ({
  score,
  totalQuestions,
  onRestart,
  onSaveScore,
  showLeaderboard,
}: ScoreBoardProps) => {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);

  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName.trim());
      setSaved(true);
    }
  };

  const getPerformanceMessage = () => {
    if (percentage === 100) return '🏆 Perfect Score! You\'re a genius!';
    if (percentage >= 80) return '🌟 Excellent! Great job!';
    if (percentage >= 60) return '👍 Good work! Keep it up!';
    if (percentage >= 40) return '📚 Not bad! Room for improvement!';
    return '💪 Keep practicing! You\'ll do better next time!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-lg w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8">
          🎉 Quiz Complete!
        </h1>
        
        <div className="mb-10">
          <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {score}/{totalQuestions}
          </div>
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            {percentage}%
          </div>
          <div className="text-lg font-semibold text-indigo-700 bg-indigo-50 rounded-2xl p-5">
            {getPerformanceMessage()}
          </div>
        </div>

        {!saved && !showLeaderboard && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none mb-4 text-lg font-medium"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {saved && (
          <div className="mb-6 p-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-lg shadow-md">
            ✓ Score saved successfully!
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

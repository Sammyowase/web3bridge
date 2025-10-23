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
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full text-center border-2 sm:border-4 border-purple-300">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          🎉 Quiz Complete!
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-3 sm:mb-4 animate-pulse">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            {percentage}%
          </div>
          <div className="text-base sm:text-lg md:text-xl font-semibold text-purple-700 bg-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            {getPerformanceMessage()}
          </div>
        </div>

        {!saved && !showLeaderboard && (
          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 sm:border-3 border-purple-300 rounded-xl sm:rounded-2xl focus:border-purple-500 focus:outline-none mb-3 sm:mb-4 text-base sm:text-lg font-semibold shadow-md"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {saved && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg">
            ✓ Score saved successfully!
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

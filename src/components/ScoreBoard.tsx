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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12">
          🎉 Quiz Complete!
        </h1>
        
        <div className="mb-12">
          <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {score}/{totalQuestions}
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">
            {percentage}%
          </div>
          <div className="text-xl md:text-2xl font-semibold text-violet-700 bg-violet-50 rounded-3xl p-6">
            {getPerformanceMessage()}
          </div>
        </div>

        {!saved && !showLeaderboard && (
          <div className="mb-8">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-6 py-5 border-3 border-gray-300 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-200 focus:outline-none mb-5 text-xl font-medium"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xl font-bold rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {saved && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold text-xl shadow-lg">
            ✓ Score saved successfully!
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full px-8 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

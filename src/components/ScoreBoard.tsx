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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-4xl">
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white drop-shadow-2xl mb-20">
          🎉 Quiz Complete!
        </h1>
        
        <div className="mb-20">
          <div className="text-9xl sm:text-[10rem] font-bold text-white drop-shadow-2xl mb-10">
            {score}/{totalQuestions}
          </div>
          <div className="text-6xl sm:text-7xl font-bold text-emerald-300 drop-shadow-xl mb-16">
            {percentage}%
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-violet-700">
              {getPerformanceMessage()}
            </div>
          </div>
        </div>

        {!saved && !showLeaderboard && (
          <div className="mb-16 space-y-8">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-10 py-8 border-4 border-white/50 bg-white/95 backdrop-blur-sm rounded-3xl focus:border-white focus:ring-4 focus:ring-white/30 focus:outline-none text-3xl font-semibold text-gray-800 shadow-2xl"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-12 py-8 bg-white text-violet-600 text-3xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:bg-white/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {saved && (
          <div className="mb-16 p-10 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl font-bold text-3xl shadow-2xl">
            ✓ Score saved successfully!
          </div>
        )}

        <button
          onClick={onRestart}
          className="px-16 py-8 bg-white text-violet-600 text-3xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

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
    <div className="min-h-screen h-full bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-16 px-8 sm:py-20 sm:px-16 md:px-20 lg:px-24">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-16 sm:mb-20 md:mb-24">
          🎉 Quiz Complete!
        </h1>
        
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="text-7xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-2xl mb-8 sm:mb-10">
            {score}/{totalQuestions}
          </div>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-emerald-300 drop-shadow-xl mb-10 sm:mb-12 md:mb-14">
            {percentage}%
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 sm:p-12 md:p-14 shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700">
              {getPerformanceMessage()}
            </div>
          </div>
        </div>

        {!saved && !showLeaderboard && (
          <div className="mb-12 sm:mb-16 space-y-8 sm:space-y-10">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-8 py-6 sm:px-10 sm:py-8 border-4 border-white/50 bg-white/95 backdrop-blur-sm rounded-3xl focus:border-white focus:ring-4 focus:ring-white/30 focus:outline-none text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 shadow-xl"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-10 py-6 sm:px-12 sm:py-8 bg-white text-violet-600 text-2xl sm:text-3xl md:text-4xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:bg-white/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {saved && (
          <div className="mb-12 sm:mb-16 p-8 sm:p-10 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl font-bold text-2xl sm:text-3xl md:text-4xl shadow-xl">
            ✓ Score saved successfully!
          </div>
        )}

        <button
          onClick={onRestart}
          className="px-12 py-6 sm:px-14 sm:py-8 bg-white text-violet-600 text-2xl sm:text-3xl md:text-4xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

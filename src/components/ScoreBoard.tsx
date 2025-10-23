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
    <div className="min-h-screen h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-6 sm:py-12 sm:px-10 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto">
        
        {/* Celebration Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-2xl mb-2">
            Quiz Complete!
          </h1>
        </div>
        
        {/* Score Display Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-3 border-white/20 shadow-2xl mb-6 sm:mb-8">
          <div className="text-center mb-6">
            <div className="text-sm sm:text-base font-black text-white/60 uppercase tracking-widest mb-3">Your Score</div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
                {score}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white/40">/</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/60">
                {totalQuestions}
              </div>
            </div>
            
            {/* Percentage Badge */}
            <div className={`inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-black text-3xl sm:text-4xl shadow-2xl ${
              percentage >= 80 
                ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' 
                : percentage >= 60
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
            }`}>
              {percentage}%
            </div>
          </div>
          
          {/* Performance Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border-2 border-white/20">
            <div className="text-base sm:text-lg md:text-xl font-bold text-white text-center">
              {getPerformanceMessage()}
            </div>
          </div>
        </div>

        {/* Name Input & Save Button */}
        {!saved && !showLeaderboard && (
          <div className="mb-6 sm:mb-8 space-y-4">
            <input
              type="text"
              placeholder="✨ Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-5 py-4 sm:px-6 sm:py-5 border-3 border-white/30 bg-white/10 backdrop-blur-xl rounded-2xl focus:border-white/50 focus:ring-4 focus:ring-white/20 focus:outline-none text-lg sm:text-xl font-semibold text-white placeholder-white/50 shadow-xl"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-lg sm:text-xl font-black rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50"
            >
              💾 Save to Leaderboard
            </button>
          </div>
        )}

        {/* Success Message */}
        {saved && (
          <div className="mb-6 sm:mb-8 p-5 sm:p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold text-lg sm:text-xl shadow-2xl border-3 border-emerald-400 flex items-center justify-center gap-3">
            <span className="text-2xl">✓</span>
            Score saved successfully!
          </div>
        )}

        {/* Play Again Button */}
        <button
          onClick={onRestart}
          className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg sm:text-xl font-black rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

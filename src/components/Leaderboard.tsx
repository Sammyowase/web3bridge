import { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types/quiz';

interface LeaderboardProps {
  onClose: () => void;
}

const Leaderboard = ({ onClose }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const leaderboard = JSON.parse(
      localStorage.getItem('quizLeaderboard') || '[]'
    );
    setEntries(leaderboard);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const clearLeaderboard = () => {
    if (confirm('Are you sure you want to clear the leaderboard?')) {
      localStorage.removeItem('quizLeaderboard');
      setEntries([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full border-2 sm:border-4 border-purple-300">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm sm:text-base font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition shadow-lg transform hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🎯</div>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              No scores yet!
            </p>
            <p className="text-base sm:text-lg text-purple-600 font-semibold">Be the first to complete the quiz!</p>
          </div>
        ) : (
          <>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg transform transition hover:scale-102 ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 border-2 sm:border-3 border-yellow-500 shadow-yellow-300'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 border-2 sm:border-3 border-gray-500 shadow-gray-300'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 border-2 sm:border-3 border-orange-500 shadow-orange-300'
                      : 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 sm:border-3 border-purple-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    <div className="text-2xl sm:text-3xl font-bold w-8 sm:w-10">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    <div>
                      <div className={`font-bold text-sm sm:text-base md:text-lg ${index < 3 ? 'text-white' : 'text-purple-800'}`}>
                        {entry.name}
                      </div>
                      <div className={`text-xs sm:text-sm ${index < 3 ? 'text-white/90' : 'text-purple-600'}`}>
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${index < 3 ? 'text-white' : 'text-purple-800'}`}>
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold ${index < 3 ? 'text-white/90' : 'text-purple-600'}`}>
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearLeaderboard}
              className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-red-600 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🗑️ Clear Leaderboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

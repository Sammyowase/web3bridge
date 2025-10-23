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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            🏆 Leaderboard
          </h1>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-3 bg-gray-600 text-white text-sm sm:text-base font-bold rounded-xl hover:bg-gray-700 transition-all shadow-md transform hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🎯</div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              No scores yet!
            </p>
            <p className="text-base sm:text-lg text-gray-600 font-medium">Be the first to complete the quiz!</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-xl shadow-md transform transition hover:scale-[1.02] ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-200 to-yellow-300 border-2 border-amber-400'
                      : index === 1
                      ? 'bg-gradient-to-r from-slate-200 to-gray-300 border-2 border-slate-400'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-200 to-amber-300 border-2 border-orange-400'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    <div className="text-2xl sm:text-3xl font-bold w-8 sm:w-10">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    <div>
                      <div className={`font-bold text-sm sm:text-base md:text-lg ${index < 3 ? 'text-gray-800' : 'text-gray-800'}`}>
                        {entry.name}
                      </div>
                      <div className={`text-xs sm:text-sm ${index < 3 ? 'text-gray-700' : 'text-gray-600'}`}>
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${index < 3 ? 'text-gray-800' : 'text-gray-800'}`}>
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold ${index < 3 ? 'text-gray-700' : 'text-gray-600'}`}>
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearLeaderboard}
              className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm sm:text-base font-bold rounded-xl hover:from-rose-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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

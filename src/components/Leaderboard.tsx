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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              🏆 Leaderboard
            </h1>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-600 text-white text-lg font-bold rounded-2xl hover:bg-gray-700 transition-all shadow-lg transform hover:scale-105"
            >
              ✕ Close
            </button>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-9xl mb-8">🎯</div>
              <p className="text-3xl font-bold text-gray-800 mb-4">
                No scores yet!
              </p>
              <p className="text-xl text-gray-600 font-medium">Be the first to complete the quiz!</p>
            </div>
          ) : (
            <>
              <div className="space-y-5 mb-10">
                {entries.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-6 md:p-8 rounded-2xl shadow-lg transform transition hover:scale-[1.02] ${
                      index === 0
                        ? 'bg-gradient-to-r from-amber-200 to-yellow-300 border-3 border-amber-400'
                        : index === 1
                        ? 'bg-gradient-to-r from-slate-200 to-gray-300 border-3 border-slate-400'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-200 to-amber-300 border-3 border-orange-400'
                        : 'bg-gradient-to-r from-violet-50 to-purple-50 border-3 border-violet-200'
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                      <div className="text-4xl font-bold w-12">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </div>
                      <div>
                        <div className="font-bold text-xl text-gray-800">
                          {entry.name}
                        </div>
                        <div className="text-base text-gray-600 mt-1">
                          {formatDate(entry.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl md:text-4xl font-bold text-gray-800">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                      <div className="text-base font-semibold text-gray-600 mt-1">
                        {Math.round((entry.score / entry.totalQuestions) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clearLeaderboard}
                className="w-full px-8 py-5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-lg font-bold rounded-2xl hover:from-rose-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🗑️ Clear Leaderboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

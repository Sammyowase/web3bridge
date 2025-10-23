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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
            🏆 Leaderboard
          </h1>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-white text-violet-600 text-lg font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-9xl mb-10">🎯</div>
            <p className="text-4xl font-bold text-white drop-shadow-lg mb-6">
              No scores yet!
            </p>
            <p className="text-2xl text-white/90 drop-shadow-md">Be the first to complete the quiz!</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-12">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-8 sm:p-10 rounded-3xl shadow-2xl transform transition hover:scale-[1.02] ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-300 to-yellow-400 border-4 border-amber-500'
                      : index === 1
                      ? 'bg-gradient-to-r from-slate-300 to-gray-400 border-4 border-slate-500'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-300 to-amber-400 border-4 border-orange-500'
                      : 'bg-white/95 backdrop-blur-sm border-4 border-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-5xl font-bold w-16">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    <div>
                      <div className="font-bold text-2xl sm:text-3xl text-gray-800">
                        {entry.name}
                      </div>
                      <div className="text-lg text-gray-600 mt-2">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl sm:text-5xl font-bold text-gray-800">
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div className="text-xl font-semibold text-gray-600 mt-2">
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearLeaderboard}
              className="w-full px-10 py-6 bg-white text-rose-600 text-xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
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

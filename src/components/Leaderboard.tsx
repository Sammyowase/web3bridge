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
    <div className="min-h-screen h-full bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-16 px-8 sm:py-20 sm:px-16 lg:px-24">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 mb-24">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg">
            🏆 Leaderboard
          </h1>
          <button
            onClick={onClose}
            className="px-10 py-5 bg-white text-violet-600 text-xl font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="py-24">
            <div className="text-9xl mb-12">🎯</div>
            <p className="text-5xl font-bold text-white drop-shadow-lg mb-8">
              No scores yet!
            </p>
            <p className="text-3xl text-white/90 drop-shadow-md">Be the first to complete the quiz!</p>
          </div>
        ) : (
          <>
            <div className="space-y-10 sm:space-y-12 mb-20">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-12 sm:p-14 md:p-16 rounded-3xl shadow-2xl transform transition hover:scale-[1.01] ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-300 to-yellow-400 border-4 border-amber-500'
                      : index === 1
                      ? 'bg-gradient-to-r from-slate-300 to-gray-400 border-4 border-slate-500'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-300 to-amber-400 border-4 border-orange-500'
                      : 'bg-white/95 backdrop-blur-sm border-4 border-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-8">
                    <div className="text-6xl font-bold w-20">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    <div>
                      <div className="font-bold text-3xl sm:text-4xl text-gray-800">
                        {entry.name}
                      </div>
                      <div className="text-xl text-gray-600 mt-2">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl sm:text-6xl font-bold text-gray-800">
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div className="text-2xl font-semibold text-gray-600 mt-2">
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearLeaderboard}
              className="w-full px-12 py-8 bg-white text-rose-600 text-2xl font-bold rounded-3xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
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

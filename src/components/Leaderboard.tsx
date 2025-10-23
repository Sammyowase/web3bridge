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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-3xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🏆 Leaderboard
          </h1>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-all shadow-md transform hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎯</div>
            <p className="text-2xl font-bold text-gray-800 mb-3">
              No scores yet!
            </p>
            <p className="text-lg text-gray-600 font-medium">Be the first to complete the quiz!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-5 sm:p-6 rounded-xl shadow-md transform transition hover:scale-[1.02] ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-200 to-yellow-300 border-2 border-amber-400'
                      : index === 1
                      ? 'bg-gradient-to-r from-slate-200 to-gray-300 border-2 border-slate-400'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-200 to-amber-300 border-2 border-orange-400'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold w-10">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-800">
                        {entry.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearLeaderboard}
              className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface LeaderboardEntry {
  userId: string;
  name: string;
  totalSteps: number;
  rank?: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the backend
    const fetchLeaderboard = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock leaderboard data
          const mockLeaderboard = [
            { userId: '1', name: 'John Doe', totalSteps: 85000 },
            { userId: '2', name: 'Jane Smith', totalSteps: 78500 },
            { userId: '3', name: 'Bob Johnson', totalSteps: 72000 },
            { userId: '4', name: 'Alice Williams', totalSteps: 68900 },
            { userId: '5', name: 'Charlie Brown', totalSteps: 65200 },
            { userId: '6', name: 'Diana Prince', totalSteps: 62100 },
            { userId: '7', name: 'Edward Clark', totalSteps: 58700 },
            { userId: '8', name: 'Fiona Green', totalSteps: 55300 },
            { userId: '9', name: 'George Wilson', totalSteps: 52800 },
            { userId: '10', name: 'Hannah Davis', totalSteps: 49500 },
          ];
          
          // Add rank
          const rankedLeaderboard = mockLeaderboard.map((entry, index) => ({
            ...entry,
            rank: index + 1,
          }));
          
          setLeaderboard(rankedLeaderboard);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [period]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Leaderboard</h1>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setPeriod('day')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  period === 'day'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setPeriod('week')}
                className={`px-4 py-2 text-sm font-medium ${
                  period === 'week'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                This Week
              </button>
              <button
                type="button"
                onClick={() => setPeriod('month')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  period === 'month'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                This Month
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="mt-6 text-center">
              <p>Loading leaderboard...</p>
            </div>
          ) : (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Steps
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry) => (
                    <tr key={entry.userId} className={entry.rank === 1 ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            entry.rank === 1 ? 'bg-yellow-400' :
                            entry.rank === 2 ? 'bg-gray-300' :
                            entry.rank === 3 ? 'bg-yellow-700' : 'bg-gray-100'
                          }`}>
                            <span className={`text-sm font-medium ${
                              entry.rank === 1 || entry.rank === 3 ? 'text-white' : 'text-gray-900'
                            }`}>
                              {entry.rank}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {entry.totalSteps.toLocaleString()} steps
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
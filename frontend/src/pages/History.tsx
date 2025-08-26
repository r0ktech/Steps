import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

interface StepEntry {
  id: string;
  date: string;
  count: number;
}

interface RewardEntry {
  id: string;
  date: string;
  amount: number;
  transactionHash: string;
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [stepHistory, setStepHistory] = useState<StepEntry[]>([]);
  const [rewardHistory, setRewardHistory] = useState<RewardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the backend
    const fetchHistory = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock step history data
          const mockStepHistory = [
            { id: '1', date: '2023-08-25', count: 12500 },
            { id: '2', date: '2023-08-24', count: 9800 },
            { id: '3', date: '2023-08-23', count: 11200 },
            { id: '4', date: '2023-08-22', count: 8500 },
            { id: '5', date: '2023-08-21', count: 10300 },
          ];
          
          // Mock reward history data
          const mockRewardHistory = [
            { id: '1', date: '2023-08-25', amount: 10, transactionHash: 'mock-tx-abc123' },
            { id: '2', date: '2023-08-23', amount: 10, transactionHash: 'mock-tx-def456' },
            { id: '3', date: '2023-08-21', amount: 10, transactionHash: 'mock-tx-ghi789' },
          ];
          
          setStepHistory(mockStepHistory);
          setRewardHistory(mockRewardHistory);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Activity History</h1>
          
          {loading ? (
            <div className="mt-6 text-center">
              <p>Loading your history...</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Step History */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Step History
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Your daily step counts
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {stepHistory.map((entry) => (
                      <li key={entry.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {entry.count.toLocaleString()} steps
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="relative w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`absolute h-2 rounded-full ${
                                entry.count >= 10000 ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min((entry.count / 10000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 text-xs font-medium">
                            {Math.min((entry.count / 10000) * 100, 100).toFixed(0)}%
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Reward History */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Reward History
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Your SUI token rewards
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {rewardHistory.map((entry) => (
                      <li key={entry.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            +{entry.amount} SUI
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Transaction: {entry.transactionHash}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
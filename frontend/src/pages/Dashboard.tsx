import React, { useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Components to be created later
import Navbar from '../components/Navbar';
import StepCounter from '../components/StepCounter';
import RewardCard from '../components/RewardCard';

const Dashboard: React.FC = () => {
  const { connected, address } = useWallet();
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from the backend
    const fetchData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setSteps(6500);
          setTokens(25);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const claimReward = async () => {
    if (steps >= goal && !rewardClaimed) {
      try {
        // In a real app, this would call the backend API
        // await axios.post('/api/rewards/claim');
        setRewardClaimed(true);
        setTokens(tokens + 10);
        alert('Congratulations! You earned 10 SUI tokens!');
      } catch (error) {
        console.error('Error claiming reward:', error);
      }
    }
  };

  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Daily Step Tracker
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Track your steps and earn SUI tokens!
              </p>
            </div>
            
            {loading ? (
              <div className="px-4 py-5 sm:p-6 text-center">
                <p>Loading your step data...</p>
              </div>
            ) : (
              <>
                <div className="px-4 py-5 sm:p-6">
                  <StepCounter steps={steps} goal={goal} />
                  
                  <div className="mt-6">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <RewardCard 
                      tokens={tokens} 
                      canClaim={steps >= goal && !rewardClaimed}
                      onClaim={claimReward}
                    />
                    
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Wallet Address
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          {connected ? (
                            <span className="text-sm">{address?.substring(0, 10)}...{address?.substring(address.length - 6)}</span>
                          ) : (
                            <span className="text-sm text-red-500">Not connected</span>
                          )}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between">
                  <Link
                    to="/history"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    View History
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                  >
                    Leaderboard
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
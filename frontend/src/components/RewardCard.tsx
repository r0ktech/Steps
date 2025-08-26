import React from 'react';

interface RewardCardProps {
  tokens: number;
  canClaim: boolean;
  onClaim: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ tokens, canClaim, onClaim }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">
          SUI Token Balance
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">
          {tokens} SUI
        </dd>
        <div className="mt-4">
          <button
            onClick={onClaim}
            disabled={!canClaim}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              canClaim
                ? 'bg-secondary hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'
            } focus:outline-none`}
          >
            {canClaim ? 'Claim Daily Reward' : 'Complete Goal to Claim'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
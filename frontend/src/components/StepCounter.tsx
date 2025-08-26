import React from 'react';

interface StepCounterProps {
  steps: number;
  goal: number;
}

const StepCounter: React.FC<StepCounterProps> = ({ steps, goal }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">
          Today's Steps
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">
          {steps.toLocaleString()} / {goal.toLocaleString()}
        </dd>
        <div className="mt-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-green-700 focus:outline-none"
            onClick={() => {
              // In a real app, this would connect to health APIs
              alert('This would connect to Google Fit / Apple Health in a real app');
            }}
          >
            Sync with Health App
          </button>
          <button
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            onClick={() => {
              // In a real app, this would open a modal for manual entry
              const steps = prompt('Enter steps manually:');
              if (steps && !isNaN(Number(steps))) {
                alert(`Added ${steps} steps manually!`);
              }
            }}
          >
            Enter Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
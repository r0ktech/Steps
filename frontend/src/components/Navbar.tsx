import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@suiet/wallet-kit';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">StepRewards</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link to="/history" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">History</Link>
                <Link to="/leaderboard" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Leaderboard</Link>
                <Link to="/profile" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ConnectButton />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            <Link to="/history" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">History</Link>
            <Link to="/leaderboard" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Leaderboard</Link>
            <Link to="/profile" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="flex items-center px-5">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
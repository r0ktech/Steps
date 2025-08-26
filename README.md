# Step Tracker with SUI Token Rewards

A full-stack web application where users can track their daily steps and earn SUI tokens when they reach a specific step goal.

## Features

- User authentication and profile management
- Step tracking (manual entry or health app integration)
- SUI token rewards for reaching daily step goals
- Transaction history and step history
- Admin panel for managing goals and rewards
- Leaderboard for competitive motivation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional, mock data is used by default)

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Configuration

1. Backend configuration:
   - Update the `.env` file in the backend directory with your own values:
     - JWT_SECRET: Secret key for JWT token generation
     - MONGO_URI: MongoDB connection string (if using MongoDB)
     - SUI_PRIVATE_KEY: Private key for the SUI wallet that will distribute rewards
     - SUI_NETWORK: SUI network to connect to (testnet/devnet/mainnet)

2. Frontend configuration:
   - Update the API endpoint in the frontend if needed (default is http://localhost:5000)

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

1. Register a new account or log in with existing credentials
2. Connect your SUI wallet to receive rewards
3. Track your daily steps (manually or via health app integration)
4. Claim your SUI token rewards when you reach your daily step goal
5. View your history and check the leaderboard

## Admin Access

Access the admin panel at http://localhost:3000/admin to:
- Manage user accounts
- Configure daily step goals
- Set reward amounts
- View system statistics

## License

MIT
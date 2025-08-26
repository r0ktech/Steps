const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const users = [];
const steps = {};
const rewards = {};

// Routes
app.get('/', (req, res) => {
  res.send('Steps Tracker API is running');
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, walletAddress } = req.body;
  
  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, this would be hashed
    walletAddress
  };
  
  users.push(newUser);
  
  // Initialize steps and rewards for the user
  steps[newUser.id] = [];
  rewards[newUser.id] = { totalTokens: 0, history: [] };
  
  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      walletAddress: newUser.walletAddress
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress
    },
    token: 'mock-jwt-token'
  });
});

// Steps routes
app.post('/api/steps', (req, res) => {
  const { userId, count, date } = req.body;
  
  // Validate user
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Add steps
  const stepEntry = {
    id: Date.now().toString(),
    userId,
    count,
    date: date || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  
  if (!steps[userId]) {
    steps[userId] = [];
  }
  
  steps[userId].push(stepEntry);
  
  res.status(201).json(stepEntry);
});

app.get('/api/steps/:userId', (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;
  
  // Validate user
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Get steps
  let userSteps = steps[userId] || [];
  
  // Filter by date if provided
  if (date) {
    userSteps = userSteps.filter(step => step.date === date);
  }
  
  res.json(userSteps);
});

// Rewards routes
app.post('/api/rewards/claim', (req, res) => {
  const { userId, date } = req.body;
  const today = date || new Date().toISOString().split('T')[0];
  
  // Validate user
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Check if user has already claimed reward for today
  if (rewards[userId] && rewards[userId].history) {
    const alreadyClaimed = rewards[userId].history.some(reward => reward.date === today);
    if (alreadyClaimed) {
      return res.status(400).json({ message: 'Reward already claimed for today' });
    }
  }
  
  // Check if user has reached the step goal
  const dailySteps = steps[userId] ? steps[userId].filter(step => step.date === today) : [];
  const totalSteps = dailySteps.reduce((sum, step) => sum + step.count, 0);
  
  const STEP_GOAL = 10000; // This would be configurable in a real app
  const REWARD_AMOUNT = 10; // SUI tokens
  
  if (totalSteps < STEP_GOAL) {
    return res.status(400).json({ 
      message: 'Step goal not reached', 
      currentSteps: totalSteps, 
      goal: STEP_GOAL 
    });
  }
  
  // Add reward
  if (!rewards[userId]) {
    rewards[userId] = { totalTokens: 0, history: [] };
  }
  
  const reward = {
    id: Date.now().toString(),
    userId,
    amount: REWARD_AMOUNT,
    date: today,
    transactionHash: `mock-tx-${Math.random().toString(36).substring(2, 10)}`,
    createdAt: new Date().toISOString()
  };
  
  rewards[userId].history.push(reward);
  rewards[userId].totalTokens += REWARD_AMOUNT;
  
  res.status(201).json({
    reward,
    totalTokens: rewards[userId].totalTokens
  });
});

app.get('/api/rewards/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Validate user
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Get rewards
  const userRewards = rewards[userId] || { totalTokens: 0, history: [] };
  
  res.json(userRewards);
});

// Leaderboard route
app.get('/api/leaderboard', (req, res) => {
  const { period } = req.query;
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate start date based on period
  let startDate;
  if (period === 'week') {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    startDate = d.toISOString().split('T')[0];
  } else if (period === 'month') {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    startDate = d.toISOString().split('T')[0];
  } else {
    // Default to today
    startDate = today;
  }
  
  // Calculate total steps for each user
  const leaderboard = users.map(user => {
    const userSteps = steps[user.id] || [];
    const filteredSteps = userSteps.filter(step => step.date >= startDate && step.date <= today);
    const totalSteps = filteredSteps.reduce((sum, step) => sum + step.count, 0);
    
    return {
      userId: user.id,
      name: user.name,
      totalSteps
    };
  });
  
  // Sort by total steps (descending)
  leaderboard.sort((a, b) => b.totalSteps - a.totalSteps);
  
  res.json(leaderboard);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
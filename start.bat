@echo off
echo Starting Step Tracker Application...

start cmd /k "cd frontend && npm start"
start cmd /k "cd backend && node server.js"

echo Application started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
Write-Host "Starting Step Tracker Application..." -ForegroundColor Green

# Start the frontend
Start-Process powershell -ArgumentList "-Command cd 'C:\Users\ROK TECH\Desktop\steps\frontend'; npx serve -s build -l 3000"

# Start the backend
Start-Process powershell -ArgumentList "-Command cd 'C:\Users\ROK TECH\Desktop\steps\backend'; node server.js"

Write-Host "Application started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
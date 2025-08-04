@echo off
echo Stopping any existing backend processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting backend with CORS fix...
cd backend
start cmd /k "npm run dev"

echo Backend restarting in new window...
echo Check the new command window for backend status.
pause
@echo off
title RAKSHA - Disaster Relocation Decision Engine
color 0B
echo =====================================================================
echo   RAKSHA: Earth Observation & AI-Powered Disaster Relocation Engine
echo   Smart India Hackathon (SIH) Prototype
echo =====================================================================
echo.
echo [1/2] Checking Python dependencies...
python -m pip install -r requirements.txt --quiet
echo.
echo [2/2] Launching RAKSHA Web Command Center...
echo.
echo ---------------------------------------------------------------------
echo   Open your browser at: http://127.0.0.1:8050
echo ---------------------------------------------------------------------
echo.
python -m uvicorn main:app --host 127.0.0.1 --port 8050
pause


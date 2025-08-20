@echo off
echo 🚀 EF Polymer CRM - Installation Script
echo =======================================

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ LTS from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

:: Install dependencies
echo 📦 Installing dependencies...
call npm install

echo 📦 Installing backend dependencies...
cd backend
call npm install

echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install

cd ..

:: Setup environment
echo ⚙️ Setting up environment...
cd backend
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file (please review and customize)
) else (
    echo ⚠️ .env file already exists, keeping existing configuration
)

:: Create data directory
if not exist data mkdir data

:: Setup database
echo 🗄️ Setting up database...
call npx prisma generate
call npx prisma migrate deploy

:: Seed database
echo 🌱 Seeding database with sample data...
call npm run seed

echo.
echo ✅ Installation completed successfully!
echo.
echo 🎯 Next steps:
echo   1. Review backend\.env for configuration
echo   2. Run 'npm run dev' to start development server
echo   3. Open https://localhost:8443
echo   4. Login with: admin@local / ChangeMe!123
echo.
echo 📖 Documentation: README.md
echo 🔧 Production build: npm run build
echo 📦 Package as app: npm run app:pack

pause
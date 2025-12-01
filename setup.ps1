# FYP Management System - Setup Script
# Run this script to set up both frontend and backend

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "FYP Management System Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js v18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
    if ($mongoProcess) {
        Write-Host "✓ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠ MongoDB process not found. Make sure MongoDB is installed and running." -ForegroundColor Yellow
        Write-Host "  Or use MongoDB Atlas cloud database." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Could not check MongoDB status" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Setting up Backend (Server)" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Setup backend
Set-Location server

# Create .env if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating server/.env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ Created .env file. Please edit it with your configuration." -ForegroundColor Green
    Write-Host "  Required: MONGODB_URI, JWT_SECRET, EMAIL credentials" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Go back to root
Set-Location ..

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Create frontend .env if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    "VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath .env -Encoding utf8
    Write-Host "✓ Created .env file" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit server/.env with your MongoDB URI and other credentials" -ForegroundColor White
Write-Host "2. Start MongoDB (if using local instance)" -ForegroundColor White
Write-Host "3. Run 'npm run start:all' to start both servers" -ForegroundColor White
Write-Host "   OR run them separately:" -ForegroundColor White
Write-Host "   - Backend: cd server; npm run dev" -ForegroundColor Gray
Write-Host "   - Frontend: npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "The app will be available at:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend API: http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see IMPLEMENTATION_README.md" -ForegroundColor Yellow
Write-Host ""

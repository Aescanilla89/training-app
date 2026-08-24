# Script de deployment automático
# Uso: .\deploy.ps1 -GitHubUser tu_usuario

param([string]$GitHubUser = $(Read-Host "Ingresa tu usuario de GitHub"))

if (-not $GitHubUser) {
    Write-Host "❌ Usuario de GitHub requerido" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$GitHubUser/training-app.git"

Write-Host "🚀 Iniciando deployment..." -ForegroundColor Cyan
Write-Host ""

# Paso 1: Configurar git remote
Write-Host "📦 Paso 1: Configurando repositorio remoto..." -ForegroundColor Yellow
git remote set-url origin $repoUrl
if ($LASTEXITCODE -ne 0) {
    git remote add origin $repoUrl
}

# Paso 2: Cambiar a rama main
Write-Host "📦 Paso 2: Preparando rama main..." -ForegroundColor Yellow
git branch -M main

# Paso 3: Push al repositorio
Write-Host "📦 Paso 3: Subiendo código a GitHub..." -ForegroundColor Yellow
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Código subido exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1️⃣  Crea BD en Neon:" -ForegroundColor White
    Write-Host "   → Ve a https://neon.tech/" -ForegroundColor Gray
    Write-Host "   → Regístrate y crea un proyecto" -ForegroundColor Gray
    Write-Host "   → Copia tu DATABASE_URL" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2️⃣  Deploy en Vercel:" -ForegroundColor White
    Write-Host "   → Ve a https://vercel.com/new" -ForegroundColor Gray
    Write-Host "   → Importa tu repo: $GitHubUser/training-app" -ForegroundColor Gray
    Write-Host "   → Agrega Environment Variables:" -ForegroundColor Gray
    Write-Host "      DATABASE_URL = Tu URL de Neon" -ForegroundColor Gray
    Write-Host "      PIN = 1234" -ForegroundColor Gray
    Write-Host "   → Click Deploy" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🎉 ¡Tu app estará lista en 2-3 minutos!" -ForegroundColor Green
} else {
    Write-Host "❌ Error al subir código" -ForegroundColor Red
    Write-Host "Verifica tu conexión y permisos de GitHub" -ForegroundColor Yellow
}

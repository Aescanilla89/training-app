# ⚡ Setup rápido - Ejecuta esto para subir a GitHub y Vercel
#
# Uso: En PowerShell, en la carpeta training-app, ejecuta:
#      .\quick-setup.ps1

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🚀 SETUP DE APP DE ENTRENAMIENTO   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar git
Write-Host "✓ Verificando git..." -ForegroundColor Green
git --version | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git no está instalado" -ForegroundColor Red
    exit 1
}

# Pedir usuario de GitHub
$githubUser = Read-Host "👤 Tu usuario de GitHub (ej: Aescanilla89)"
if (-not $githubUser) {
    Write-Host "❌ Usuario requerido" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$githubUser/training-app.git"

Write-Host ""
Write-Host "───────────────────────────────────────" -ForegroundColor Gray
Write-Host "PASO 1: Verificar que el repo existe en GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Abriendo GitHub para crear el repo..." -ForegroundColor Cyan
Write-Host "(Si ya lo creaste, presiona Escape)"
Write-Host ""

# Intentar abrir navegador
Start-Process "https://github.com/new"

Write-Host "⏰ Esperando 15 segundos..." -ForegroundColor Cyan
Write-Host ""

# Contar hacia atrás
for ($i = 15; $i -gt 0; $i--) {
    Write-Host "   $i segundos..." -ForegroundColor Gray -NoNewline
    Write-Host "`r" -NoNewline
    Start-Sleep -Seconds 1
}
Write-Host "                        " -NoNewline
Write-Host "`r"
Write-Host ""

$proceed = Read-Host "¿Ya creaste el repo en GitHub? (s/n)"
if ($proceed -ne 's') {
    Write-Host "❌ Crea el repo primero y vuelve a ejecutar esto" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "───────────────────────────────────────" -ForegroundColor Gray
Write-Host "PASO 2: Configurar Git..." -ForegroundColor Yellow

# Configurar remote
git remote set-url origin $repoUrl 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin $repoUrl
}

Write-Host "✓ Remote configurado: $repoUrl" -ForegroundColor Green

# Cambiar a main
git branch -M main
Write-Host "✓ Rama: main" -ForegroundColor Green

Write-Host ""
Write-Host "───────────────────────────────────────" -ForegroundColor Gray
Write-Host "PASO 3: Subir código a GitHub..." -ForegroundColor Yellow
Write-Host "(Esto puede pedir tu contraseña o token)" -ForegroundColor Gray
Write-Host ""

# Push
git push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Código subido a GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "───────────────────────────────────────" -ForegroundColor Gray
    Write-Host "PASO 4: Crear BD en Neon (1 minuto)..." -ForegroundColor Yellow
    Write-Host ""

    # Abrir Neon
    Start-Process "https://neon.tech/"
    Write-Host "Abriendo Neon..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pasos en Neon:" -ForegroundColor White
    Write-Host "  1. Regístrate o inicia sesión" -ForegroundColor Gray
    Write-Host "  2. Crea un nuevo proyecto" -ForegroundColor Gray
    Write-Host "  3. Ve a Connection String" -ForegroundColor Gray
    Write-Host "  4. Copia la URL (comienza con 'postgresql://')" -ForegroundColor Gray
    Write-Host "  5. Guárdala temporalmente" -ForegroundColor Gray
    Write-Host ""

    $neonUrl = Read-Host "Pega aquí tu DATABASE_URL de Neon (o presiona Enter para saltar)"

    Write-Host ""
    Write-Host "───────────────────────────────────────" -ForegroundColor Gray
    Write-Host "PASO 5: Abriendo Vercel para Deploy..." -ForegroundColor Yellow
    Write-Host ""

    Start-Process "https://vercel.com/new"
    Write-Host "Abriendo Vercel..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pasos en Vercel:" -ForegroundColor White
    Write-Host "  1. Haz login con GitHub" -ForegroundColor Gray
    Write-Host "  2. Importa: $githubUser/training-app" -ForegroundColor Gray
    Write-Host "  3. Agrega Environment Variables:" -ForegroundColor Gray

    if ($neonUrl) {
        Write-Host "      DATABASE_URL = $neonUrl" -ForegroundColor Yellow
    } else {
        Write-Host "      DATABASE_URL = (tu URL de Neon)" -ForegroundColor Yellow
    }

    Write-Host "      PIN = 1234" -ForegroundColor Yellow
    Write-Host "  4. Click Deploy" -ForegroundColor Gray
    Write-Host "  5. Espera 2-3 minutos" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🎉 ¡Tu app estará lista en: https://training-app-xxx.vercel.app" -ForegroundColor Green

} else {
    Write-Host ""
    Write-Host "❌ Error al hacer push" -ForegroundColor Red
    Write-Host "Verifica:" -ForegroundColor Yellow
    Write-Host "  • Tu conexión a internet" -ForegroundColor Gray
    Write-Host "  • Que el repo existe en GitHub" -ForegroundColor Gray
    Write-Host "  • Que tienes permisos (crea un token si falla)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Token: https://github.com/settings/tokens" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Presiona Enter para cerrar..." -ForegroundColor Gray
Read-Host

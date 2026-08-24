# 🚀 Setup automático (3 pasos rápidos)

## Paso 1: Crear repo en GitHub (1 minuto)

Ejecuta este comando (abre el navegador automáticamente):

```powershell
Start-Process "https://github.com/new"
```

Luego:
- **Repository name:** `training-app`
- **Visibility:** Public o Private (elige)
- Click "Create repository"

## Paso 2: Copiar URL del repo

En la página que se abrió, verás un botón "Code" (verde).
- Haz clic en el botón Code
- Copia la URL que dice "Clone with HTTPS" (algo como `https://github.com/Aescanilla89/training-app.git`)

## Paso 3: Ejecutar comando de push

En PowerShell, en la carpeta training-app:

```powershell
# Reemplaza AQUI_LA_URL con la URL que copiaste
git remote set-url origin AQUI_LA_URL
git branch -M main
git push -u origin main
```

Ejemplo:
```powershell
git remote set-url origin https://github.com/Aescanilla89/training-app.git
git branch -M main
git push -u origin main
```

Si te pide contraseña:
- **Usuario:** Tu email de GitHub o usuario
- **Contraseña:** Tu token de acceso personal (si no lo tienes, crea uno aquí: https://github.com/settings/tokens)

## Paso 4: Deploy en Vercel

Una vez subido el código:

1. Ve a https://vercel.com/new
2. Haz login con GitHub
3. Importa `training-app`
4. **Antes de Deploy**, agrega estas variables:

```
DATABASE_URL = postgresql://... (de Neon)
PIN = 1234
```

5. Click "Deploy"
6. Espera 2 minutos
7. ¡Tu app está lista!

---

## ⚠️ Si algo falla

### "Repository not found"
→ El repo en GitHub no existe aún. Crea desde https://github.com/new

### "Permission denied"
→ Necesitas un Personal Access Token:
1. Ve a https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Dale permisos: `repo`, `workflow`
4. Copia el token
5. Usa el token como contraseña en lugar de tu contraseña

### Más ayuda
Lee `DEPLOYMENT.md` para detalles técnicos.

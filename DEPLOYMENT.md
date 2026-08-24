# 📋 Plan de Entrenamiento - Guía de Deployment

## Paso 1: Preparar el proyecto para Vercel

```bash
# En la carpeta training-app
cd C:\Users\Usuario\training-app

# Inicializar Git si no está hecho
git init
git add .
git commit -m "Initial commit"
```

## Paso 2: Crear BD en Neon (gratis)

1. Ve a https://neon.tech/
2. Regístrate (puedes usar GitHub)
3. Crea un nuevo proyecto
4. Copia la conexión string (DATABASE_URL)
5. Esa URL es tu `DATABASE_URL`

## Paso 3: Subir a GitHub

1. Crea un repositorio en GitHub (https://github.com/new)
2. Asigna el nombre: `training-app`
3. En tu terminal:

```bash
git remote add origin https://github.com/TU_USUARIO/training-app.git
git branch -M main
git push -u origin main
```

## Paso 4: Conectar a Vercel

1. Ve a https://vercel.com/new
2. Importa tu repositorio de GitHub
3. En "Environment Variables", agrega:
   - `DATABASE_URL`: Tu URL de Neon (copiar completa)
   - `PIN`: Tu código de 4 dígitos (ej: 1234)
4. Haz click en "Deploy"

**¡Listo!** Vercel te dará una URL pública como:
`https://training-app-abc123.vercel.app`

## Uso

1. Abre tu URL en el navegador
2. Ingresa tu PIN (4 dígitos)
3. Accede a tu plan de entrenamiento desde cualquier dispositivo
4. Los datos se guardan automáticamente en la nube

## Cambiar el PIN

Para cambiar el PIN:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Edita `PIN` con tu nuevo código
4. Redeploy

## Solución de problemas

### "Error de conexión a la base de datos"
- Verifica que DATABASE_URL está bien copiada en Vercel
- Asegúrate que Neon está en estado "ready"

### "El PIN no funciona"
- Verifica que hayas puesto exactamente 4 dígitos en Vercel
- Redeploy después de cambiar el PIN

### Los datos no se guardan
- Abre la consola (F12) y mira si hay errores
- Verifica que la BD está conectada en Vercel

## Variables de entorno necesarias

```
DATABASE_URL=postgresql://...  # De Neon
PIN=1234                        # Tu código de acceso
```

## Desarrollo local (opcional)

Para probar localmente antes de publicar:

```bash
npm install
npm run dev
```

Luego entra a `http://localhost:3000`

Necesitas tener los mismos valores en `.env.local`:
```
DATABASE_URL=postgresql://...
PIN=1234
```

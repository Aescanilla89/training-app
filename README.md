# 🏋️ Plan de Entrenamiento - App Web

Tu plan de entrenamiento personalizado, accesible desde cualquier dispositivo, con sincronización automática en la nube.

## ✨ Características

- 📱 **Responsive**: Funciona perfecto en móvil, tablet y desktop
- ☁️ **Sincronización automática**: Tus datos se guardan en la nube
- 🔐 **Seguro con PIN**: Acceso protegido con código de 4 dígitos
- 📊 **Seguimiento completo**: Registra entrenamientos, pesos, composición corporal
- 🎯 **Plan adaptativo**: Ajustes automáticos según tu progreso
- ⚡ **Ultra rápido**: Desplegado en Vercel, carga al instante

## 🚀 Inicio rápido

### Opción 1: Deploy automático en Vercel (recomendado)

1. **Crear BD gratis en Neon** (2 minutos):
   - Ve a https://neon.tech/
   - Regístrate (GitHub es más rápido)
   - Crea un proyecto
   - Copia tu `DATABASE_URL`

2. **Subir código a GitHub** (3 minutos):
   ```bash
   cd C:\Users\Usuario\training-app
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/training-app.git
   git push -u origin main
   ```

3. **Conectar a Vercel** (2 minutos):
   - Ve a https://vercel.com/new
   - Importa tu repo de GitHub
   - Agrega variables de entorno:
     - `DATABASE_URL`: Tu URL de Neon
     - `PIN`: Tu código (ej: 1234)
   - Click Deploy
   - ¡Listo! Tu URL es: `https://training-app-xxx.vercel.app`

### Opción 2: Desarrollo local

```bash
cd C:\Users\Usuario\training-app
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador

## 📖 Guía de uso

### Primera vez
1. Entra a tu URL de Vercel
2. Ingresa tu PIN (4 dígitos)
3. Verás tu plan de entrenamiento

### Registrar entrenamientos
- **Hoy**: Ve la sesión del día y registra tu RPE, cargas, etc.
- **Semana**: Ve todas las sesiones de la semana
- **Progreso**: Visualiza gráficos de peso, fuerza y constancia
- **Ajustes**: Configura tus datos iniciales (peso, composición, fuerzas)

### Los datos se guardan automáticamente
- No hay botón "guardar" - cambia valores y listo
- Se sincroniza cada 2-3 segundos
- Accede desde cualquier dispositivo

## 🔧 Variables de entorno

```
DATABASE_URL=postgresql://usuario:contraseña@host/db  # De Neon
PIN=1234                                               # Tu PIN de acceso
```

En desarrollo local, coloca en `.env.local`
En Vercel, coloca en Project Settings → Environment Variables

## 🛠️ Stack técnico

- **Frontend**: Next.js 16 + React 19 + Tailwind
- **Backend**: Next.js API Routes
- **BD**: Neon (PostgreSQL)
- **Deploy**: Vercel (gratis)

## 📝 Cambiar PIN

Para cambiar tu código de acceso:

1. En Vercel: Project Settings → Environment Variables
2. Edita `PIN` con tu nuevo código (4 dígitos)
3. Redeploy

## ❓ Preguntas frecuentes

**¿Es gratis?**
Sí, completamente. Vercel y Neon tienen planes gratis suficientes.

**¿Mis datos son seguros?**
Sí. Están en BD PostgreSQL encriptada de Neon, en servidores seguros.

**¿Funciona offline?**
Parcialmente. Puedes ver datos en cache, pero se sincroniza cuando haya conexión.

**¿Puedo descargar mis datos?**
Sí, desde la sección Ajustes → Descargar registro

**¿Cuánto espacio tengo?**
Neon te da 500 MB gratis. Para este plan es más que suficiente.

## 🐛 Solución de problemas

### "Error al conectar a la BD"
- Verifica que DATABASE_URL está correcto en Vercel
- Espera 2 minutos después de cambiar variables

### "El PIN no funciona"
- Asegúrate de exactamente 4 dígitos
- Redeploy después de cambiar

### Los datos no se guardan
- Abre F12 (Desarrollador) y mira la consola
- Verifica conexión a internet

## 📚 Más detalles

Ver `DEPLOYMENT.md` para instrucciones técnicas detalladas.

---

**Creado con ❤️ para tu entrenamiento**

Tu plan, sincronizado, siempre a mano.

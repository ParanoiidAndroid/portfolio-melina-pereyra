# 🚀 Guía de Deployment

Esta guía te ayudará a deployar el portfolio en producción usando Vercel (frontend) y Render (backend).

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Render](https://render.com)
- Cuenta de Gmail con contraseña de aplicación configurada
- Repositorio de GitHub con el código

## 🌐 Frontend - Vercel

### 1. Preparar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

### 2. Deploy en Vercel

**Opción A: Desde el Dashboard de Vercel**
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raíz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Agrega las variables de entorno:
   - `VITE_API_URL`: URL de tu backend en Render (la obtendrás después)
5. Haz clic en "Deploy"

**Opción B: Desde la CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 3. Configurar Dominio

Tu sitio estará disponible en: `https://portfolio-melina-pereyra.vercel.app`

## 🖥️ Backend - Render

### 1. Preparar el Backend

El backend ya está configurado con:
- ✅ Archivo `render.yaml` para configuración automática
- ✅ CORS configurado para Vercel
- ✅ Variables de entorno definidas

### 2. Deploy en Render

1. Ve a [render.com/dashboard](https://dashboard.render.com)
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name**: `portfolio-backend` (o el nombre que prefieras)
   - **Region**: Oregon (o la más cercana)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Configurar Variables de Entorno en Render

Agrega las siguientes variables en la sección "Environment":

```
NODE_ENV=production
PORT=3001
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-password-de-aplicacion-gmail
EMAIL_TO=melina.lujan.pereyra@gmail.com
FRONTEND_URL=https://portfolio-melina-pereyra.vercel.app
```

**Importante**: 
- `EMAIL_PASS` debe ser una [contraseña de aplicación de Gmail](https://support.google.com/accounts/answer/185833)
- No uses tu contraseña de Gmail normal

### 4. Obtener URL del Backend

Una vez deployado, Render te dará una URL como:
```
https://portfolio-backend-xxxx.onrender.com
```

### 5. Actualizar Frontend con URL del Backend

Vuelve a Vercel y actualiza la variable de entorno:
- `VITE_API_URL`: `https://portfolio-backend-xxxx.onrender.com`

Luego redeploya el frontend (automático o manual).

## 🔐 Configurar Gmail para Envío de Emails

### Paso 1: Activar Verificación en 2 Pasos
1. Ve a [myaccount.google.com/security](https://myaccount.google.com/security)
2. Activa la "Verificación en 2 pasos"

### Paso 2: Generar Contraseña de Aplicación
1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona "Mail" y tu dispositivo
3. Genera la contraseña
4. Copia la contraseña de 16 caracteres
5. Úsala en `EMAIL_PASS`

## ✅ Verificar el Deployment

### 1. Verificar Backend
```bash
curl https://tu-backend.onrender.com/
```
Deberías ver:
```json
{
  "message": "Backend del Portfolio de Traducción funcionando correctamente",
  "status": "OK"
}
```

### 2. Verificar Frontend
1. Ve a `https://portfolio-melina-pereyra.vercel.app`
2. Completa el formulario de contacto
3. Verifica que el email llegue a `melina.lujan.pereyra@gmail.com`

## 🔄 Actualización Continua

### Frontend (Vercel)
Vercel redeploya automáticamente cuando:
- Haces push a la rama `main`
- Haces merge de un PR

### Backend (Render)
Render redeploya automáticamente cuando:
- Haces push a la rama `main`
- Los cambios están en la carpeta `backend/`

## 🐛 Troubleshooting

### Error de CORS
**Problema**: El frontend no puede conectarse al backend

**Solución**:
1. Verifica que `FRONTEND_URL` en Render coincida con tu URL de Vercel
2. Verifica que `VITE_API_URL` en Vercel apunte a tu backend de Render

### Email no se envía
**Problema**: El formulario no envía emails

**Solución**:
1. Verifica que `EMAIL_USER` y `EMAIL_PASS` sean correctos
2. Asegúrate de usar una contraseña de aplicación, no tu contraseña normal
3. Revisa los logs en Render Dashboard

### Backend "sleeping" (Render Free Tier)
**Problema**: Primera petición es muy lenta

**Explicación**: Render pone a dormir los servicios gratuitos después de 15 minutos de inactividad.

**Solución**:
- Espera 10-15 segundos en la primera carga
- Considera usar un servicio de "ping" para mantenerlo activo
- Upgrade a plan pagado para evitar el sleep

## 📊 Monitoreo

### Logs en Render
- Ve a tu servicio en Render Dashboard
- Haz clic en "Logs" para ver los logs en tiempo real

### Analytics en Vercel
- Ve a tu proyecto en Vercel Dashboard
- Revisa "Analytics" para ver estadísticas de uso

## 🔒 Seguridad

- ✅ Variables de entorno nunca se commitean al repo
- ✅ Contraseñas de aplicación en lugar de contraseñas reales
- ✅ CORS configurado para permitir solo dominios específicos
- ✅ HTTPS habilitado por defecto en Vercel y Render

## 💡 Tips

1. **Free Tier de Render**: El servicio se duerme después de 15 min de inactividad
2. **Redeploys automáticos**: Ambos servicios redeplayan automáticamente con git push
3. **Preview Deployments**: Vercel crea previews automáticos para cada PR
4. **Variables de entorno**: Nunca commitees archivos `.env` al repositorio

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Render](https://render.com/docs)
- [Contraseñas de aplicación de Google](https://support.google.com/accounts/answer/185833)

---

¿Necesitas ayuda? Revisa los logs en Render Dashboard o contacta con soporte.


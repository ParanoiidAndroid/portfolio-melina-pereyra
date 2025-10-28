# Backend del Portfolio de Traducción

Este backend maneja el envío de emails desde el formulario de contacto del portfolio.

## Configuración

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `env.example` a `.env` y configura las variables:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Configuración del servidor
PORT=3001

# Configuración de email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-password-de-aplicacion
EMAIL_TO=melina.lujan.pereyra@gmail.com

# Configuración de CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Gmail para envío de emails

Para usar Gmail como servicio de email, necesitas:

1. **Activar la verificación en 2 pasos** en tu cuenta de Google
2. **Generar una contraseña de aplicación**:
   - Ve a tu cuenta de Google
   - Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones
   - Genera una contraseña para "Mail"
   - Usa esta contraseña en `EMAIL_PASS`

### 4. Ejecutar el servidor

#### Modo desarrollo (con nodemon):
```bash
npm run dev
```

#### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## API Endpoints

### POST /api/send-email

Envía un email con los datos del formulario de contacto.

**Parámetros:**
- `nombre` (string, requerido): Nombre del cliente
- `apellido` (string, requerido): Apellido del cliente
- `titulo` (string, requerido): Título del email
- `asunto` (string, requerido): Asunto del mensaje
- `cuerpo` (string, requerido): Cuerpo del mensaje
- `files` (array, opcional): Archivos adjuntos (máximo 5, 10MB cada uno)

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "messageId": "message-id"
}
```

**Respuesta de error:**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## Características

- ✅ Validación de datos requeridos
- ✅ Manejo de archivos adjuntos (hasta 5 archivos, 10MB cada uno)
- ✅ Filtro de tipos de archivo permitidos
- ✅ Email HTML formateado
- ✅ Manejo de errores
- ✅ CORS configurado para el frontend
- ✅ Variables de entorno para configuración segura

## Tipos de archivo permitidos

- PDF (.pdf)
- Word (.doc, .docx)
- Excel (.xls, .xlsx)
- PowerPoint (.ppt, .pptx)
- Texto (.txt)
- Subtítulos (.srt, .vtt)

## Estructura del proyecto

```
backend/
├── package.json          # Dependencias y scripts
├── server.js            # Servidor principal
├── env.example          # Ejemplo de variables de entorno
└── README.md           # Este archivo
```

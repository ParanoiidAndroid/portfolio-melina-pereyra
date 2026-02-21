# 📧 Configuración de SendGrid para Render

## ¿Por qué SendGrid?

**Render Free Tier bloquea los puertos SMTP** (como los de Gmail), por lo que necesitas usar un servicio de email externo. SendGrid es **100% GRATIS** para hasta 100 emails por día.

---

## 🚀 Pasos para Configurar SendGrid

### Paso 1: Crear Cuenta en SendGrid

1. Ve a [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. Completa el formulario de registro:
   - **Email**: Usa tu email personal o de trabajo
   - **Password**: Crea una contraseña segura
   - **Nombre de compañía**: Puedes poner "Freelance" o tu nombre
3. Verifica tu email (recibirás un email de SendGrid)
4. Completa el cuestionario inicial (solo info, no afecta la funcionalidad)

---

### Paso 2: Crear API Key

1. Una vez en el Dashboard, ve a **Settings** (menú lateral izquierdo)
2. Haz clic en **API Keys**
3. Haz clic en el botón **"Create API Key"** (azul, arriba a la derecha)
4. Configura la API Key:
   - **API Key Name**: `Portfolio Backend` (o el nombre que prefieras)
   - **API Key Permissions**: Selecciona **"Full Access"**
5. Haz clic en **"Create & View"**
6. **⚠️ IMPORTANTE**: Copia la API Key que aparece. Solo la verás UNA VEZ.
   - Se verá algo como: `SG.xxxxxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyy`
   - Guárdala en un lugar seguro (bloc de notas, etc.)

---

### Paso 3: Verificar Sender (Email de Origen)

SendGrid requiere que **verifiques el email desde el cual enviarás mensajes**.

#### Opción A: Verificación de Single Sender (Más Fácil)

1. En el menú lateral, ve a **Settings** → **Sender Authentication**
2. Haz clic en **"Verify a Single Sender"**
3. Haz clic en **"Create New Sender"**
4. Completa el formulario:
   - **From Name**: `Portfolio Melina` (o el nombre que quieras)
   - **From Email Address**: Un email válido que controles
     - Puede ser tu Gmail: `melina.lujan.pereyra@gmail.com`
     - O un email personalizado: `noreply@tudominio.com`
   - **Reply To**: `melina.lujan.pereyra@gmail.com`
   - **Company Address**: Tu dirección (puede ser genérica)
   - **City, State, Zip, Country**: Información de contacto
5. Haz clic en **"Create"**
6. **Verifica el email**: SendGrid te enviará un email al **From Email Address** que pusiste
   - Abre el email y haz clic en **"Verify Single Sender"**
7. Una vez verificado, verás un ✅ al lado del email en SendGrid

#### Opción B: Domain Authentication (Más Avanzado)

Si tienes un dominio propio (ej: `miportfolio.com`), puedes autenticar todo el dominio. Esto requiere configurar registros DNS. Sáltate esto por ahora si no tienes dominio.

---

### Paso 4: Configurar Variables de Entorno en Render

1. Ve a tu servicio backend en [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en tu servicio (`portfolio-backend` o como lo hayas llamado)
3. En el menú lateral, haz clic en **"Environment"**
4. Agrega las siguientes variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `SENDGRID_API_KEY` | `SG.xxxxxx...` (la API Key que copiaste) |
| `SENDGRID_FROM_EMAIL` | El email que verificaste (ej: `melina.lujan.pereyra@gmail.com`) |
| `EMAIL_TO` | `melina.lujan.pereyra@gmail.com` |
| `FRONTEND_URL` | `https://portfolio-melina-pereyra.vercel.app` |

5. Haz clic en **"Save Changes"**
6. Render redesplegará automáticamente el backend (toma 1-2 minutos)

---

### Paso 5: Verificar que Funciona

1. Ve a tu portfolio en Vercel: [https://portfolio-melina-pereyra.vercel.app/](https://portfolio-melina-pereyra.vercel.app/)
2. Scrollea hasta el formulario de contacto (abajo)
3. Completa el formulario:
   - Nombre: `Test`
   - Apellido: `SendGrid`
   - Email: Tu email personal
   - Título: `Prueba de envío`
   - Asunto: `Verificando configuración`
   - Mensaje: `Si recibes este email, SendGrid está funcionando correctamente.`
4. Haz clic en **"Enviar Mensaje"**
5. Deberías ver: **"¡Mensaje enviado con éxito!"**
6. Revisa la casilla `melina.lujan.pereyra@gmail.com`
   - Debería llegar un email con el asunto: `[Portfolio] Prueba de envío - Test SendGrid`
   - El remitente será el email que verificaste en SendGrid

---

## ✅ Checklist Final

- [ ] Cuenta de SendGrid creada y verificada
- [ ] API Key generada y copiada
- [ ] Sender (email de origen) verificado en SendGrid
- [ ] Variables de entorno configuradas en Render
- [ ] Backend redesplegado en Render
- [ ] Formulario de contacto probado y funcionando
- [ ] Email recibido en `melina.lujan.pereyra@gmail.com`

---

## 🐛 Problemas Comunes

### "Invalid API Key" en los logs
**Solución**: La API Key está mal copiada o expiró.
- Ve a SendGrid → Settings → API Keys
- Crea una nueva API Key
- Actualiza `SENDGRID_API_KEY` en Render

### "Sender identity not verified"
**Solución**: No verificaste el email en SendGrid.
- Ve a Settings → Sender Authentication
- Busca el email pendiente
- Reenvía el email de verificación
- Verifica haciendo clic en el link del email

### Email no llega a la bandeja de entrada
**Solución**: Revisa la carpeta de spam.
- Si está en spam, marca como "No es spam"
- Agrega el remitente a tus contactos

### "Request limit exceeded"
**Solución**: Superaste el límite de 100 emails/día del plan gratuito.
- Espera 24 horas
- O upgrade a un plan pagado de SendGrid

---

## 📊 Monitoreo

Puedes ver estadísticas de tus emails en SendGrid:
1. Ve a **Activity** en el menú lateral
2. Aquí verás todos los emails enviados, entregados, abiertos, etc.

---

## 💰 Costos

- **Plan Gratuito**: 100 emails/día, gratis para siempre
- Si necesitas más, puedes upgradear:
  - **Essentials**: $19.95/mes (50,000 emails/mes)
  - **Pro**: Desde $89.95/mes

Para un portfolio personal, el plan gratuito es más que suficiente.

---

¡Listo! Tu formulario de contacto ahora debería funcionar perfectamente en Render. 🎉



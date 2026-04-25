import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import process from 'process';

import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv con ruta explícita
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar Rate Limit para el envío de correos
const emailRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // Limitar cada IP a 5 peticiones por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes de contacto. Por favor, intenta de nuevo en una hora.'
  },
  standardHeaders: true, // Retornar info de rate limit en los headers `RateLimit-*`
  legacyHeaders: false, // Desactivar los headers `X-RateLimit-*`
});

// Configurar Resend
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️ ADVERTENCIA: RESEND_API_KEY no está definida en el archivo .env');
}
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://portfolio-melina-pereyra.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (como desde Postman o apps móviles)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB por archivo
    files: 5 // Máximo 5 archivos
  },
  fileFilter: (req, file, cb) => {
    // Tipos de archivo permitidos
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/vtt',
      'application/x-subrip'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend del Portfolio de Traducción funcionando con Resend',
    status: 'OK',
    service: 'Resend'
  });
});

// Ruta para enviar emails con protección contra bots y rate limit
app.post('/api/send-email', emailRateLimiter, upload.array('files', 5), async (req, res) => {
  try {
    const { nombre, apellido, email, asunto, cuerpo, hp_field, submission_speed } = req.body;
    const files = req.files || [];

    // 1. Verificación de Honeypot (Si el campo oculto está lleno, es un bot)
    if (hp_field) {
      console.warn('🤖 Bot detectado via Honeypot');
      return res.status(400).json({
        success: false,
        message: 'Acceso denegado'
      });
    }

    // 2. Verificación de Velocidad de Envío (Si es demasiado rápido, probablemente es un bot)
    if (submission_speed && parseInt(submission_speed) < 2000) {
      console.warn(`🤖 Bot detectado via velocidad (${submission_speed}ms)`);
      return res.status(400).json({
        success: false,
        message: 'Has enviado el formulario demasiado rápido. Intenta de nuevo.'
      });
    }

    // Validar datos requeridos
    if (!nombre || !apellido || !email || !asunto || !cuerpo) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    const emailTo = process.env.EMAIL_TO || 'melina.lujan.pereyra@gmail.com';
    
    // Preparar contenido HTML usando tus estilos originales
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D0A2F3, #C08BEF); padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">Nuevo mensaje del Portfolio</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <h3 style="color: #6A5A87; margin-top: 0;">Información del cliente:</h3>
          <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <h3 style="color: #6A5A87;">Asunto:</h3>
          <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #D0A2F3;">${asunto}</p>
          
          <h3 style="color: #6A5A87;">Mensaje:</h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #D0A2F3; white-space: pre-wrap;">${cuerpo}</div>
          
          ${files.length > 0 ? `
            <h3 style="color: #6A5A87;">Archivos adjuntos (${files.length}):</h3>
            <ul style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #D0A2F3;">
              ${files.map(file => `<li>${file.originalname} (${(file.size / 1024).toFixed(2)} KB)</li>`).join('')}
            </ul>
          ` : ''}
          
          <hr style="border: none; border-top: 2px solid #D0A2F3; margin: 20px 0;">
          <p style="color: #6A5A87; font-size: 14px; text-align: center;">
            Este mensaje fue enviado desde el formulario de contacto del portfolio.
          </p>
        </div>
      </div>
    `;

    // Preparar adjuntos para Resend
    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    console.log('📧 Enviando email con Resend...');

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      to: [emailTo],
      replyTo: email,
      subject: `[Portfolio] ${asunto} - ${nombre} ${apellido}`,
      html: htmlContent,
      attachments: attachments
    });

    if (error) {
      console.error('❌ Error de Resend:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al enviar el email con Resend',
        error: error.message
      });
    }

    console.log('✅ Email enviado exitosamente con Resend. ID:', data.id);
    
    res.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      service: 'Resend',
      messageId: data.id
    });

  } catch (error) {
    console.error('❌ Error general al enviar email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno al procesar el mensaje',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
  }
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 10MB por archivo.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Demasiados archivos. Máximo 5 archivos.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
  
  next();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
  console.log(`📧 Email configurado para: ${process.env.EMAIL_TO || 'melina.lujan.pereyra@gmail.com'}`);
  console.log(`🔑 Servicio activo: Resend`);
  
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️  ALERTA CRÍTICA: Configure su RESEND_API_KEY en .env');
  }
});

export default app;

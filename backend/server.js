import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv con ruta explícita
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

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

// Configuración del transporter de Nodemailer
const createTransporter = () => {
  // Solo necesitas credenciales SMTP para ENVIAR emails, no para recibirlos
  // El email del usuario viene del formulario y se usa en replyTo
  console.log('🔍 Verificando credenciales SMTP...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ No configurado');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ No configurado');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  No hay credenciales SMTP configuradas.');
    console.log('⚠️  Para enviar emails reales, configura EMAIL_USER y EMAIL_PASS en .env');
    return null; // Retornar null para manejar el error
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend del Portfolio de Traducción funcionando correctamente',
    status: 'OK'
  });
});

// Ruta para enviar emails
app.post('/api/send-email', upload.array('files', 5), async (req, res) => {
  try {
    const { nombre, apellido, email, titulo, asunto, cuerpo } = req.body;
    const files = req.files || [];

    // Validar datos requeridos
    if (!nombre || !apellido || !email || !titulo || !asunto || !cuerpo) {
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

    // Crear el transporter
    const transporter = createTransporter();
    
    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Servicio de email no configurado. Por favor contacta al administrador.'
      });
    }

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'contacto@portfolio.com',
      to: process.env.EMAIL_TO || 'melina.lujan.pereyra@gmail.com',
      replyTo: email, // Email del usuario para responder (quien llenó el formulario)
      subject: `[Portfolio] ${titulo} - ${nombre} ${apellido}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D0A2F3, #C08BEF); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">Nuevo mensaje del Portfolio</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h3 style="color: #6A5A87; margin-top: 0;">Información del cliente:</h3>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Título del mensaje:</strong> ${titulo}</p>
            
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
      `,
      attachments: files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      }))
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado exitosamente:', info.messageId);
    
    res.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
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
  console.log(`📁 Ruta del .env: ${path.join(__dirname, '.env')}`);
      console.log(`🔑 EMAIL_USER existe: ${!!process.env.EMAIL_USER}`);
    console.log(`🔑 EMAIL_PASS existe: ${!!process.env.EMAIL_PASS}`);
});

export default app;

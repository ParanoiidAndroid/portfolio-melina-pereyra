// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paperclip, X, Mail, User, FileText, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

const Form = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    titulo: '',
    asunto: '',
    cuerpo: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mountTime] = useState(Date.now());
  const [honeypot, setHoneypot] = useState('');
  const [modalStatus, setModalStatus] = useState({ isOpen: false, type: 'success', message: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (!value || value.trim() === '') {
      error = t('form.validation.required');
    } else if ((name === 'nombre' || name === 'apellido') && /[0-9]/.test(value)) {
      error = t('form.validation.noNumbers');
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = t('form.validation.invalidEmail');
    } else if (name === 'cuerpo' && value.length < 10) {
      error = t('form.validation.tooShort');
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validar en tiempo real si ya fue tocado
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles].slice(0, 5); // Máximo 5 archivos
    setFiles(newFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const newErrors = {};
    let hasErrors = false;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      
      // Agregar datos del formulario
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('apellido', formData.apellido);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('asunto', formData.asunto);
      formDataToSend.append('cuerpo', formData.cuerpo);
      
      // Agregar datos de seguridad
      formDataToSend.append('hp_field', honeypot);
      formDataToSend.append('submission_speed', Date.now() - mountTime);
      
      // Agregar archivos
      files.forEach((file) => {
        formDataToSend.append('files', file);
      });
      
      // Enviar al backend
      const response = await fetch(API_ENDPOINTS.SEND_EMAIL, {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setModalStatus({ isOpen: true, type: 'success', message: t('form.successMessage') });
        // Resetear formulario
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          titulo: '',
          asunto: '',
          cuerpo: ''
        });
        setFiles([]);
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setModalStatus({ 
        isOpen: true, 
        type: 'error', 
        message: error.message || t('form.errorMessage') 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b from-white to-[#F8F6F9] px-10 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Título de la sección */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent font-playfair mb-4 leading-normal py-2">
            {t('form.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-[#6A5A87] font-lora max-w-2xl mx-auto">
            {t('form.subtitle')}
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white border-[#D0A2F3]/20 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Honeypot - Invisible para humanos */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="confirm_email_security"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex="-1"
                    autocomplete="off"
                  />
                </div>

                {/* Información personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      {t('form.firstName')} *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.nombre && touched.nombre ? 'border-red-400' : 'border-[#D0A2F3]/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora`}
                      placeholder={t('form.placeholders.firstName')}
                    />
                    <AnimatePresence>
                      {errors.nombre && touched.nombre && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                        >
                          {errors.nombre}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div>
                    <label htmlFor="apellido" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      {t('form.lastName')} *
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.apellido && touched.apellido ? 'border-red-400' : 'border-[#D0A2F3]/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora`}
                      placeholder={t('form.placeholders.lastName')}
                    />
                    <AnimatePresence>
                      {errors.apellido && touched.apellido && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                        >
                          {errors.apellido}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border ${
                      errors.email && touched.email ? 'border-red-400' : 'border-[#D0A2F3]/30'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora`}
                    placeholder={t('form.placeholders.email')}
                  />
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contenido del mensaje */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      {t('form.emailTitle')} *
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.titulo && touched.titulo ? 'border-red-400' : 'border-[#D0A2F3]/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora`}
                      placeholder={t('form.placeholders.emailTitle')}
                    />
                    <AnimatePresence>
                      {errors.titulo && touched.titulo && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                        >
                          {errors.titulo}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="asunto" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      {t('form.subject')} *
                    </label>
                    <input
                      type="text"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.asunto && touched.asunto ? 'border-red-400' : 'border-[#D0A2F3]/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora`}
                      placeholder={t('form.placeholders.subject')}
                    />
                    <AnimatePresence>
                      {errors.asunto && touched.asunto && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                        >
                          {errors.asunto}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="cuerpo" className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      {t('form.message')} *
                    </label>
                    <textarea
                      id="cuerpo"
                      name="cuerpo"
                      value={formData.cuerpo}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 border ${
                        errors.cuerpo && touched.cuerpo ? 'border-red-400' : 'border-[#D0A2F3]/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0A2F3] focus:border-transparent transition-all duration-300 font-lora resize-none`}
                      placeholder={t('form.placeholders.message')}
                    />
                    <AnimatePresence>
                      {errors.cuerpo && touched.cuerpo && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-xs mt-1 ml-1 font-lora font-medium"
                        >
                          {errors.cuerpo}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Carga de archivos */}
                <div>
                  <label className="block text-sm font-semibold text-[#6A5A87] font-lora mb-2">
                    <Paperclip className="w-4 h-4 inline mr-2" />
                    {t('form.files')}
                  </label>
                  <div className="border-2 border-dashed border-[#D0A2F3]/30 rounded-lg p-6 text-center hover:border-[#D0A2F3]/50 transition-colors duration-300">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx,.srt,.vtt"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Paperclip className="w-8 h-8 text-[#D0A2F3] mx-auto mb-2" />
                      <p className="text-[#6A5A87] font-lora">
                        {t('form.filesDescription')}
                      </p>
                      <p className="text-sm text-[#6A5A87]/70 font-lora mt-1">
                        {t('form.filesSupported')}
                      </p>
                    </label>
                  </div>

                  {/* Lista de archivos seleccionados */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-[#6A5A87] font-lora">
                        {t('form.filesSelected')} ({files.length}/5):
                      </p>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-[#F8F6F9] rounded-lg px-4 py-2">
                          <span className="text-[#6A5A87] font-lora text-sm truncate flex-1">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-[#D0A2F3] hover:text-red-500 transition-colors duration-300 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] hover:from-[#C08BEF] hover:to-[#9152C9] text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-lora cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('form.sending')}
                      </span>
                    ) : (
                      t('form.submit')
                    )}
                  </motion.button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>


      </div>

      {/* Modal de Feedback */}
      <AnimatePresence>
        {modalStatus.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center border border-[#D0A2F3]/20"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                modalStatus.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {modalStatus.type === 'success' ? (
                  <CheckCircle className="w-10 h-10" />
                ) : (
                  <X className="w-10 h-10" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold font-playfair text-[#6A5A87] mb-3">
                {modalStatus.type === 'success' ? t('form.successTitle') : t('form.errorTitle')}
              </h3>
              
              <p className="text-[#6A5A87] font-lora mb-8">
                {modalStatus.message}
              </p>
              
              <button
                type="button"
                onClick={() => setModalStatus({ ...modalStatus, isOpen: false })}
                className="w-full py-4 bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] hover:from-[#C08BEF] hover:to-[#9152C9] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 font-lora"
              >
                {t('form.close')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Form;

/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Phone, Globe, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#DEC2F4] to-[#D0A2F3] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full blur-md"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
           <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <img
                  src="/assets/logo1-mp.png"
                  alt="Melina Pereyra Logo"
                  className="h-16 w-auto"
                />
                <div>
                  <h3 className="text-2xl font-bold font-playfair">Melina Pereyra</h3>
                  <p className="text-sm opacity-90 font-lora">Traductora Pública ES↔EN</p>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-base leading-relaxed opacity-90 font-lora max-w-md"
              >
                Conectando culturas y lenguajes con traducciones precisas, profesionales y hechas a medida para tus necesidades.
              </motion.p>

              {/* Redes Sociales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                <motion.a
                  href="mailto:melina.lujan.pereyra@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
                  aria-label="Enviar email"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/melina-p-b02279136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="https://melinapereyra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
                  aria-label="Sitio web"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>

            {/* Enlaces Rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold font-playfair">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {[
                  { name: "Inicio", id: "hero" },
                  { name: "Sobre Mí", id: "about" },
                  { name: "Servicios", id: "services" },
                  { name: "FAQs", id: "faq" }
                ].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 font-lora hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold font-playfair">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm opacity-90">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href="mailto:melina.pereyra@email.com"
                    className="hover:text-white transition-colors duration-300 font-lora"
                  >
                    melina.pereyra@email.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 text-sm opacity-90">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="font-lora">+54 9 11 1234-5678</span>
                </div>
                
                <div className="flex items-start space-x-3 text-sm opacity-90">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="font-lora">Buenos Aires, Argentina</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm opacity-80 font-lora text-center md:text-left"
              >
                © {currentYear} Melina Pereyra. Todos los derechos reservados.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-sm opacity-80 font-lora"
              >
                <span>Hecho con</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>en Argentina</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

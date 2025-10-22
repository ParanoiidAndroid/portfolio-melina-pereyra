import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuánto se tarda en traducir un texto?",
      answer: "El tiempo de traducción depende de varios factores como la longitud del texto, la complejidad del contenido y el tipo de traducción. Para textos estándar, calculo aproximadamente 2,000-2,500 palabras por día hábil. Para traducciones juradas o textos técnicos especializados, el tiempo puede ser mayor. Siempre te proporcionaré una fecha de entrega estimada cuando me envíes el proyecto."
    },
    {
      question: "Si quiero traducir un texto, ¿en qué formato tengo que mandar los archivos?",
      answer: "Acepto archivos en múltiples formatos: Word (.docx, .doc), PDF, PowerPoint (.pptx), Excel (.xlsx), y archivos de texto plano (.txt). También trabajo con archivos de subtítulos (.srt, .vtt) y formatos de localización. Si tienes un formato específico que no mencioné, consultame y veré si puedo trabajar con él. Lo importante es que me envíes el archivo más editable posible para garantizar la mejor calidad."
    },
    {
      question: "¿Qué son las traducciones juradas?",
      answer: "Las traducciones juradas son traducciones oficiales que tienen validez legal y administrativa. Están certificadas por un traductor público (como yo) y llevan mi sello, firma y número de matrícula. Estas traducciones son requeridas para documentos oficiales como títulos universitarios, certificados de nacimiento, documentos legales, contratos, etc. que necesitan ser presentados ante organismos oficiales, universidades, o para trámites migratorios."
    },
    {
      question: "¿Puedo ver algunas de tus traducciones?",
      answer: "Por razones de confidencialidad y acuerdos de no divulgación con mis clientes, no puedo compartir traducciones completas de proyectos anteriores. Sin embargo, puedo proporcionarte muestras de traducción de textos públicos o crear una muestra específica del tipo de contenido que necesitas traducir. También puedo compartir testimonios de clientes satisfechos que dan fe de la calidad de mi trabajo."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <section id="faq" className="relative bg-white px-10 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Título de la sección */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent font-playfair mb-4">
            Preguntas Frecuentes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] mx-auto rounded-full"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-[#D0A2F3]/20 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#EFEAEF]/50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-[#6A5A87] font-lora pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-[#9152C9] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#9152C9] flex-shrink-0" />
                      )}
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D0A2F3]/30 to-transparent mb-4"></div>
                      <p className="text-[#6A5A87] font-lora leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#6A5A87] font-lora mb-4">
              ¿Tienes más preguntas?
            </h3>
            <p className="text-lg text-[#6A5A87] font-lora mb-8">
              No dudes en contactarme para resolver cualquier duda sobre tus proyectos de traducción
            </p>
            <button 
              onClick={() => scrollToSection('hero')}
              className="bg-[#D0A2F3] hover:bg-[#9152C9] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Contáctame
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;


// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer')
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer')
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
            {t('faq.title')}
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
              {t('faq.moreQuestions')}
            </h3>
            <p className="text-lg text-[#6A5A87] font-lora mb-8">
              {t('faq.moreQuestionsText')}
            </p>
            <button 
              onClick={() => scrollToSection('hero')}
              className="bg-[#D0A2F3] hover:bg-[#9152C9] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              {t('faq.contactButton')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;


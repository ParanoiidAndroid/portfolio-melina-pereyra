// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Globe, Award, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative bg-white px-10 md:px-20 py-20">
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
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col gap-12">
          {/* Biografía */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="space-y-4">
              <p className="text-lg text-[#6A5A87] leading-relaxed font-lora whitespace-pre-wrap">
                {t('about.description')}
              </p>
            </div>

            {/* Pasiones y especialidades */}
            <div className="space-y-8 pt-8">
              <h4 className="text-2xl font-semibold text-[#6A5A87] font-lora">
                {t('about.passionsTitle')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                      <BookOpen className="w-6 h-6 text-[#9152C9]" />
                    </div>
                    <span className="text-base font-medium text-[#6A5A87]">{t('about.passions.literature')}</span>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                      <Globe className="w-6 h-6 text-[#9152C9]" />
                    </div>
                    <span className="text-base font-medium text-[#6A5A87]">{t('about.passions.cultures')}</span>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                      <Award className="w-6 h-6 text-[#9152C9]" />
                    </div>
                    <span className="text-base font-medium text-[#6A5A87]">{t('about.passions.precision')}</span>
                  </CardContent>
                </Card>
                <Card className="bg-[#EFEAEF]/50 border-[#D0A2F3]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                      <Heart className="w-6 h-6 text-[#9152C9]" />
                    </div>
                    <span className="text-base font-medium text-[#6A5A87]">{t('about.passions.communication')}</span>
                  </CardContent>
                </Card>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

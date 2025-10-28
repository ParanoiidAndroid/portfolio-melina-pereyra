// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Star, CheckCircle, Languages, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center bg-[#EFEAEF] px-10 md:px-20 pt-32 pb-20 overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(208, 162, 243, 0.15), rgba(192, 139, 239, 0.1), transparent 40%)`
      }}
    >
      {/* Spotlight gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(208, 162, 243, 0.08), transparent 50%)`
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-[#D0A2F3]/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-12 h-12 bg-[#C08BEF]/15 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-[#9152C9]/10 rounded-full blur-sm"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl space-y-10">
        {/* Nombre */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] bg-clip-text text-transparent leading-tight font-playfair"
        >
          Melina <br /> Pereyra
        </motion.h1>

        {/* Subtítulo */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl font-medium text-[#6A5A87] font-lora"
        >
          {t('hero.subtitle')}
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-lg text-[#6A5A87] leading-relaxed font-lora max-w-2xl"
        >
          {t('hero.description')}
        </motion.p>

        {/* Elementos de confianza */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center gap-6 text-sm text-[#6A5A87]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#9152C9]" />
            <span className="font-medium">{t('hero.certified')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#9152C9]" />
            <span className="font-medium">{t('hero.years')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-[#9152C9]" />
            <span className="font-medium">{t('hero.languages')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#9152C9]" />
            <span className="font-medium">{t('hero.global')}</span>
          </div>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          {/* Botón 1: Ver Portfolio */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-[#D0A2F3] hover:bg-[#9152C9] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              {t('hero.viewPortfolio')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Botón 2: Contáctame */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline"
              size="lg"
              className="bg-white hover:bg-[#EFEAEF] text-[#9152C9] hover:text-[#9152C9] border-2 border-[#D0A2F3] hover:border-[#9152C9] font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              {t('hero.contact')}
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
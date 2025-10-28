// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const LanguageTransition = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLang}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20, 
          scale: 0.98,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageTransition;


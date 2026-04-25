import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DownloadFAB = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Muestra el botón cuando se ha hecho scroll hacia abajo 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-[90]"
        >
          <motion.a
            href={`/assets/${t('hero.cvFilename')}`}
            download={t('hero.cvFilename')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#D0A2F3] to-[#C08BEF] text-white shadow-2xl hover:shadow-[#D0A2F3]/40 transition-shadow duration-300 group relative"
          >
            <div className="absolute -top-12 right-0 bg-[#6A5A87] text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              {t('hero.downloadCV')}
              {/* Flecha del tooltip */}
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#6A5A87] rotate-45"></div>
            </div>

            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Download className="w-8 h-8" />
            </motion.div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadFAB;

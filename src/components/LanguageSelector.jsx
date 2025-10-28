import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
    { code: 'en', name: 'English', shortName: 'EN', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white backdrop-blur-sm border border-white/10 hover:border-white/20"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="text-sm font-semibold hidden sm:inline">{currentLanguage.shortName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar el menú */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menú desplegable */}
            <Motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-[#D0A2F3]/30 overflow-hidden z-20"
            >
              {languages.map((lang, index) => (
                <Motion.button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, backgroundColor: '#F8F6F9' }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-5 py-4 transition-all duration-200 ${
                    currentLanguage.code === lang.code
                      ? 'bg-gradient-to-r from-[#F8F6F9] to-[#EFEAEF] text-[#9152C9] font-semibold border-l-4 border-[#9152C9]'
                      : 'text-[#6A5A87] hover:text-[#9152C9]'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <span className="font-lora block">{lang.name}</span>
                    <span className="text-xs opacity-70">{lang.shortName}</span>
                  </div>
                  {currentLanguage.code === lang.code && (
                    <Motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-[#9152C9] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </Motion.div>
                  )}
                </Motion.button>
              ))}
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;


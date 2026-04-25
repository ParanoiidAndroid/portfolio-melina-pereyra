import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className="w-5 h-4 rounded-sm shadow-sm">
    <path fill="#c60b1e" d="M0 0h750v500H0z"/>
    <path fill="#ffc400" d="M0 125h750v250H0z"/>
    <path fill="#c60b1e" d="M0 0h750v125H0zm0 375h750v125H0z"/>
  </svg>
);

const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-4 rounded-sm shadow-sm">
    <clipPath id="a"><path d="M0 0h60v30H0z"/></clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0h60v30H0z" fill="#012169"/>
      <path d="m0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6"/>
      <path d="m0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="4"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6"/>
    </g>
  </svg>
);

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'es', name: 'ES', flag: <FlagES /> },
    { code: 'en', name: 'EN', flag: <FlagEN /> }
  ];

  const currentLanguageCode = (i18n.language || 'es').split('-')[0].toLowerCase();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center shadow-lg">
      <div className="flex relative items-center">
        {languages.map((lang) => {
          const isActive = currentLanguageCode === lang.code;
          
          return (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 transition-all duration-300 cursor-pointer active:scale-95 ${
                isActive ? "text-[#9152C9]" : "text-white/70 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center">
                {lang.flag}
              </div>
              <span className="text-xs font-bold tracking-wider">{lang.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full z-[-1] shadow-md"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;



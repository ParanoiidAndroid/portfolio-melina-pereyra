import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Background scroll effect
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scrollspy logic
      const sections = ["about", "services", "faq", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          } else if (scrollPosition < 500) {
            setActiveSection(""); // Al inicio (Home)
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuOpen(false); // Cierra el menú móvil después de hacer clic
  };

  return (
    <nav
      className={`${
        scrolled ? "navbar-scrolled" : "bg-[#DEC2F4]"
      } text-white shadow-md font-poppins fixed w-full z-50`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center md:justify-start justify-center w-full md:w-auto">
          <img
            src={t('logo')}
            alt="Logo"
            className="h-12 md:h-16 w-auto max-w-full scale-150 md:scale-280 transition-transform duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-2 text-lg font-semibold">
            {[
              { name: t('nav.about'), id: "about" },
              { name: t('nav.services'), id: "services" },
              { name: t('nav.faq'), id: "faq" },
              { name: t('nav.contact'), id: "contact" }
            ].map((item) => (
              <li
                key={item.id}
                className="relative cursor-pointer px-4 py-2 group overflow-hidden transition-all duration-300"
                onClick={() => scrollToSection(item.id)}
              >
                {/* Texto con efecto de elevación suave */}
                <span className={`relative z-10 transition-transform duration-300 ${activeSection === item.id ? "-translate-y-0.5 text-white" : "group-hover:-translate-y-0.5"} inline-block`}>
                  {item.name}
                </span>

                {/* Fondo suave al hacer hover o estar activo */}
                <div className={`absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 ease-out ${activeSection === item.id ? "scale-100 opacity-100" : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`} />
                
                {/* Línea inferior detallada - Estilo Minimalista Premium */}
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ease-out rounded-full opacity-80 ${activeSection === item.id ? "w-2/3" : "w-0 group-hover:w-2/3"}`} />
              </li>
            ))}
          </ul>
          <div className="ml-4 pl-4 border-l border-white/20">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Menu Button - Animated Hamburger */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
          onClick={toggleMenu}
        >
          {/* Línea Superior */}
          <span 
            className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : "group-hover:w-4"
            }`}
          />
          {/* Línea Media */}
          <span 
            className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              menuOpen ? "opacity-0 -translate-x-2" : ""
            }`}
          />
          {/* Línea Inferior */}
          <span 
            className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2" : "group-hover:w-5"
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation - Animated Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-[#D0A2F3] backdrop-blur-lg border-b border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col text-center space-y-2 py-8 text-xl font-semibold">
              {[
                { name: t('nav.about'), id: "about" },
                { name: t('nav.services'), id: "services" },
                { name: t('nav.faq'), id: "faq" },
                { name: t('nav.contact'), id: "contact" }
              ].map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative cursor-pointer py-4 group transition-all duration-300"
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="relative z-10 transition-transform duration-300 active:scale-90 inline-block">
                    {item.name}
                  </span>

                  {/* Línea inferior centrada para móvil */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white opacity-40 group-active:w-1/3 transition-all duration-300 ease-out rounded-full" />
                </motion.li>
              ))}
            </ul>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center pb-8 pt-4 border-t border-white/10 mx-10"
            >
              <LanguageSelector />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
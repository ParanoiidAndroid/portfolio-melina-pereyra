import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center md:justify-start justify-center w-full md:w-auto">
          <img
            src="/assets/logo1-mp.png"
            alt="Logo"
            className="h-16 w-auto max-w-full scale-280"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-lg font-semibold">
            {[
              { name: t('nav.about'), id: "about" },
              { name: t('nav.services'), id: "services" },
              { name: t('nav.faq'), id: "faq" },
              { name: t('nav.contact'), id: "contact" }
            ].map((item) => (
              <li
                key={item.id}
                className="relative group cursor-pointer transition-all duration-300"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="px-4 py-2 rounded-full group-hover:bg-[#C08BEF] group-hover:text-white transition-all duration-300">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none hover:text-[#C08BEF] transition-all"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#D0A2F3] text-white shadow-md">
          <ul className="flex flex-col text-center space-y-4 py-4 text-lg font-semibold">
            {[
              { name: t('nav.about'), id: "about" },
              { name: t('nav.services'), id: "services" },
              { name: t('nav.faq'), id: "faq" },
              { name: t('nav.contact'), id: "contact" }
            ].map((item) => (
              <li
                key={item.id}
                className="relative group cursor-pointer transition-all duration-300"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="px-4 py-2 rounded-full group-hover:bg-[#C08BEF] group-hover:text-white transition-all duration-300">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center py-4">
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
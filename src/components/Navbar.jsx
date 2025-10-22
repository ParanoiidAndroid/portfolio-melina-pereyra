import React, { useState, useEffect } from "react";

const Navbar = () => {
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
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          {[
            { name: "Home", id: "hero" },
            { name: "About me", id: "about" },
            { name: "Services", id: "services" },
            { name: "FAQs", id: "faq" },
            { name: "Contact", id: "contact" }
          ].map((item) => (
            <li
              key={item.name}
              className="relative group cursor-pointer transition-all duration-300"
              onClick={() => scrollToSection(item.id)}
            >
              <span className="px-4 py-2 rounded-full group-hover:bg-[#C08BEF] group-hover:text-white transition-all duration-300">
                {item.name}
              </span>
            </li>
          ))}
        </ul>

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
              { name: "Home", id: "hero" },
              { name: "About me", id: "about" },
              { name: "Services", id: "services" },
              { name: "FAQs", id: "faq" },
              { name: "Contact", id: "contact" }
            ].map((item) => (
              <li
                key={item.name}
                className="relative group cursor-pointer transition-all duration-300"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="px-4 py-2 rounded-full group-hover:bg-[#C08BEF] group-hover:text-white transition-all duration-300">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
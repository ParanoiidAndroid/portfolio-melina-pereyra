import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Form from "./components/Form";
import Footer from "./components/Footer";
import LanguageTransition from "./components/LanguageTransition";
import DownloadFAB from "./components/DownloadFAB";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('form.pageTitle');
    document.documentElement.lang = i18n.language;
  }, [i18n.language, t]);

  return (
    <>
      <Navbar />
      
      <LanguageTransition>
        <main>
         <Hero />
         <AboutMe />
         <Services />
         <FAQ />
         <Form />
        </main>
      </LanguageTransition>
      
      <DownloadFAB />
      <Footer />
    </>
  );
}

export default App;
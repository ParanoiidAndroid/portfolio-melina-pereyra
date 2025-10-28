import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Form from "./components/Form";
import Footer from "./components/Footer";
import LanguageTransition from "./components/LanguageTransition";

function App() {
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
      
      <Footer />
    </>
  );
}

export default App;
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      

      <main>
       <Hero />
       <AboutMe />
       <Services />
       <FAQ />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Events from "./components/Events";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import Cards from "./components/Cards";


function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Events />
      <Speakers />
      <Sponsors />
      <Register/>
      <Contact/>
      <Footer />
      {/* <Cards/> */}

    </main>
  );
}

export default App;

import NeonLight from "./components/NeonLight.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Journey from "./pages/Journey.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <section
        className={`relative w-auto h-auto bg-neonBlack overflow-x-hidden`}
      >
        <div className="grainy-overlay"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <NeonLight
            color="bg-neon1"
            size={500}
            className="top-[-200px] left-[-150px]"
          />
          <NeonLight
            color="bg-neon2"
            size={400}
            className="bottom-[-250px] left-[-200px] md:left-[300px]"
          />
          <NeonLight
            color="bg-neon3"
            size={500}
            className="top-[200px] right-[-400px]"
          />
          <NeonLight
            color="md:bg-neon4"
            size={300}
            className="top-[60px] right-[350px]"
          />
        </div>

        <div className="w-screen min-h-screen z-10 relative">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/journey" element={<Journey />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
}

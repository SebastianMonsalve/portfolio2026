import NeonLight from "./components/NeonLight.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/About.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <section
        className={`relative w-auto h-auto bg-neonBlack overflow-x-hidden`}
      >
        <div className="grainy-overlay"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <NeonLight color="bg-neonRed" size={400} top={-100} left={-50} />
          <NeonLight
            color="bg-neonMagenta"
            size={300}
            bottom={-150}
            left={-50}
          />
          <NeonLight color="bg-neonOrange" size={400} top={200} right={-300} />
        </div>

        <div className="w-screen min-h-screen z-10 relative">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
}

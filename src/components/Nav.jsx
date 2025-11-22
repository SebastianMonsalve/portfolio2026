import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const options = [
  { link: "/", label: "Home" },
  { link: "/work", label: "Work" },
  { link: "/about", label: "About" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`bg-transparent h-16 w-full fixed top-0 left-0 z-50 p-4 flex items-center justify-center transition-all duration-600
      ${isScrolled ? "backdrop-blur-sm bg-neonBlack/30 shadow-md" : ""}`}
    >
      <section className="w-full flex items-center justify-between">
        <NavLink to="/" onClick={closeMenu} className="z-20">
          <h1 className="text-neonWhite font-bold text-base">
            SEBASTIAN MONSALVE
          </h1>
        </NavLink>
        <div
          className="flex flex-col gap-1 cursor-pointer md:hidden z-20 items-end"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-8 h-1 bg-neonWhite transition-all ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-1 bg-neonWhite transition-all ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-4 h-1 bg-neonWhite transition-all ${
              isOpen ? "w-8 -rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
        {/* mobile menu */}
        <div
          className={`
            absolute top-0 left-0 w-full h-screen bg-neonBlack
            flex flex-col items-center justify-center gap-10
            transition-all duration-300 md:hidden z-10
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {options.map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className={({ isActive }) =>
                `text-neonWhite text-2xl font-semibold transition-all ${
                  isActive ? "underline" : ""
                }`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="grainy-overlay"></div>
        </div>
        {/* desktop menu */}
        <div className="hidden md:flex gap-8">
          {options.map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className={({ isActive }) =>
                `text-neonWhite transition-all hover:opacity-80 ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </section>
    </nav>
  );
};

export default Nav;

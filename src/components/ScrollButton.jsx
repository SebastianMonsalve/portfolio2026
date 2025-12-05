import React, { useState, useEffect } from "react";
import { CaretDoubleUp } from "phosphor-react";

const ScrollButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      title="Scroll up"
      className={`
        fixed right-4 bottom-4 z-99 cursor-pointer
        w-14 h-14 rounded-lg  overflow-hidden flex items-center justify-center hover:bg-neonGray/10
        transition-all duration-300 ease-out

        ${
          isScrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
    >
      <div className="absolute w-full h-full bg-neonGray/20"></div>
      <CaretDoubleUp weight="fill" className="text-neonWhite" size={20} />
    </button>
  );
};

export default ScrollButton;

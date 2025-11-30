import React, { useState, useEffect, useRef } from "react";
import { skillsByGroup } from "../data/skillsData.js";
import { neonColors } from "../data/colors.js";
import Title from "../components/Title.jsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = "Skills | Sebastian Monsalve";
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-20 flex flex-col items-center px-4 gap-10">
      <Title text="Skills" />
      {Object.entries(skillsByGroup).map(([groupName, groupSkills], groupI) => (
        <div
          key={groupI}
          className="w-full sm:w-[80%] md:w-[65%] lg:w-[50%] mb-10"
        >
          <h1 className="text-neonWhite font-bold text-center uppercase text-base md:text-xl mb-2">
            {groupName}
          </h1>

          <div
            ref={containerRef}
            className="w-full p-1 flex flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center"
          >
            {groupSkills.map((name, i) => {
              const color = neonColors[i % neonColors.length];
              const id = `tooltip-${name}`;
              const index = `${groupI}-${i}`;
              const isActive = activeIndex === index;

              return (
                <article
                  key={index}
                  data-tooltip-id={id}
                  data-tooltip-content={name}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`group w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 
                    flex items-center justify-center 
                    rounded-lg p-6 transition-colors duration-300 border select-none
                    ${color.bgSoft} ${color.border} ${color.hoverBg} cursor-pointer`}
                >
                  <img
                    src={`/skills/${name}.svg`}
                    alt={`${name} logo`}
                    draggable="false"
                    className={`w-full h-full object-cover duration-300
                      ${
                        isActive
                          ? "grayscale-0"
                          : "grayscale group-hover:grayscale-0"
                      }`}
                  />

                  <ReactTooltip
                    id={id}
                    place="bottom"
                    arrow={true}
                    disableFlip={true}
                    offset={-15}
                    className="tooltip-neon"
                    style={{
                      backgroundColor: "transparent",
                      padding: 0,
                      border: "none",
                      zIndex: 9999,
                    }}
                    render={({ content }) => (
                      <div
                        className={`relative px-4 py-2 rounded-lg font-bold text-lg tracking-wide text-white shadow-lg border transition-all duration-300 bg-neonGray/30 border-neonGray`}
                      >
                        {content}
                      </div>
                    )}
                  />
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;

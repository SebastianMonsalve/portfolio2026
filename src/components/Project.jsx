import React, { useState } from "react";
import { ArrowSquareOut, GithubLogo, FigmaLogo } from "phosphor-react";
import ProjectSlider from "./ProjectSlider.jsx";
import ProjectLinkIcon from "./ProjectLinkIcon.jsx";
import { neonColors } from "../data/colors.js";

const Project = ({ project, index }) => {
  const media = project.media || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const color = neonColors[index % neonColors.length];
  const isEven = index % 2 === 0;

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] pt-16 relative md:grid md:grid-cols-2">
      {/* LEFT - SLIDER */}
      <article
        className={`w-full h-full flex items-center justify-center mb-10 md:mb-0
          ${isEven ? "md:order-1" : "md:order-2"}`}
      >
        <ProjectSlider
          media={media}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          thumbColor={color.bg}
        />
      </article>

      {/* RIGHT */}
      <article
        className={`w-full h-full flex flex-col justify-center items-center
          ${isEven ? "md:order-2" : "md:order-1"}`}
      >
        <div className="w-full md:w-[80%] flex flex-col gap-4">
          <div>
            <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
              {project.subtitle}
            </h2>
            <h1 className="text-neonWhite font-bold text-2xl md:text-4xl ">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-row gap-2 flex-wrap">
            {project.role?.map((r, i) => (
              <span
                key={i}
                className="px-4 py-2 relative rounded-lg overflow-hidden"
              >
                <div
                  className={`${color.bg} absolute inset-0 opacity-20 saturate-40`}
                />
                <p
                  className={`${color.text} text-xs md:text-sm font-medium relative z-10`}
                >
                  {r}
                </p>
              </span>
            ))}
          </div>

          <p className="text-neonWhite text-base md:text-xl">
            {project.description}
          </p>

          <div className="w-full flex flex-row flex-wrap gap-1">
            {project.technologies?.map((tech, i) => (
              <span
                key={i}
                className="w-auto px-3 py-1 relative rounded-lg overflow-hidden flex items-center justify-center hover:bg-neonGray/10"
              >
                <div className="absolute w-full h-full bg-neonGray/20"></div>
                <p className="text-xs md:text-sm text-neonWhite">{tech}</p>
              </span>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <ProjectLinkIcon
              href={project.links?.figma}
              Icon={FigmaLogo}
              bgClass={color.bg}
              textClass={color.text}
              title="Figma Prototype"
            />
            <ProjectLinkIcon
              href={project.links?.github}
              Icon={GithubLogo}
              bgClass={color.bg}
              textClass={color.text}
              title="GitHub Repository"
            />
            <ProjectLinkIcon
              href={project.links?.web}
              Icon={ArrowSquareOut}
              bgClass={color.bg}
              textClass={color.text}
              title="Visit Website"
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default React.memo(Project);

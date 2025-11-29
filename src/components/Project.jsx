import React, { useState } from "react";
import { ArrowSquareOut, GithubLogo, FigmaLogo } from "phosphor-react";
import ProjectSlider from "./ProjectSlider.jsx";
import ProjectLinkIcon from "./ProjectLinkIcon.jsx";
import TagList from "./TagList.jsx";
import { neonColors } from "../data/colors.js";

const Project = ({ project, index }) => {
  const media = project.media || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const color = neonColors[index % neonColors.length];
  const isEven = index % 2 === 0;

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] relative md:grid md:grid-cols-2">
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
          <TagList
            items={project.role}
            wrapperClass="flex flex-row gap-2 flex-wrap"
            itemClass="px-4 py-2"
            bgClass={`${color.bg} opacity-20 saturate-40`}
            textClass={`${color.text} text-xs md:text-sm font-medium`}
          />
          <p className="text-neonWhite text-base md:text-xl">
            {project.description}
          </p>
          <TagList
            items={project.technologies}
            wrapperClass="w-full flex flex-row flex-wrap gap-1"
            itemClass="w-auto px-3 py-1 flex items-center justify-center"
            bgClass="bg-neonGray/20"
            textClass="text-xs md:text-sm text-neonWhite"
          />
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

import React, { useState } from "react";
import { Link, GithubLogo, FigmaLogo } from "phosphor-react";
import ProjectSlider from "./ProjectSlider.jsx";
import ProjectLinkIcon from "./ProjectLinkIcon.jsx";

const colors = ["neon1", "neon2", "neon3"];

const Project = ({ project, index }) => {
  const media = project.media || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorKey = colors[index % colors.length];

  const bgClass =
    colorKey === "neon1"
      ? "bg-neon1"
      : colorKey === "neon2"
      ? "bg-neon2"
      : colorKey === "neon3"
      ? "bg-neon3"
      : colorKey === "neon4"
      ? "bg-neon4"
      : "";

  const textClass =
    colorKey === "neon1"
      ? "text-neon1"
      : colorKey === "neon2"
      ? "text-neon2"
      : colorKey === "neon3"
      ? "text-neon3"
      : colorKey === "neon4"
      ? "text-neon4"
      : "";

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
                  className={`${bgClass} absolute inset-0 opacity-20 saturate-40`}
                />
                <p
                  className={`${textClass} text-xs md:text-sm font-medium relative z-10`}
                >
                  {r}
                </p>
              </span>
            ))}
          </div>

          <p className="text-neonWhite text-base md:text-xl">
            {project.description}
          </p>

          <div className="flex flex-row gap-2">
            <ProjectLinkIcon
              href={project.links?.figma}
              Icon={FigmaLogo}
              bgClass={bgClass}
              textClass={textClass}
            />
            <ProjectLinkIcon
              href={project.links?.github}
              Icon={GithubLogo}
              bgClass={bgClass}
              textClass={textClass}
            />
            <ProjectLinkIcon
              href={project.links?.web}
              Icon={Link}
              bgClass={bgClass}
              textClass={textClass}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default React.memo(Project);

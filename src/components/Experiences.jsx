import React, { useState } from "react";
import { ArrowSquareRight } from "phosphor-react";
import TagList from "./TagList.jsx";
import { neonColors } from "../data/colors.js";

const Experiences = ({ experience, index }) => {
  const color = neonColors[index % neonColors.length];

  return (
    <section className="w-full h-auto flex flex-col items-center">
      <article className="w-full md:w-[80%] lg:w-[65%] h-full flex flex-col justify-center items-center">
        <div className="w-full md:grid md:grid-cols-2">
          <article className="w-full flex flex-col gap-2 md:gap-4 mb-4 md:mb-0 md:p-4">
            <a
              href={experience.linkCompany}
              target="_blank"
              rel="noopener noreferrer"
              className="w-30 md:w-40 relative overflow-hidden cursor-pointer group"
            >
              <img
                src={experience.logoCompany}
                alt={experience.company}
                className="w-full h-full object-cover brightness-0 invert group-hover:opacity-90"
                title="Visit Official Website"
              />
            </a>
            <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
              {experience.company}
            </h2>
            <h1 className="text-neonWhite font-bold text-2xl md:text-4xl ">
              {experience.role}
            </h1>
            <TagList
              items={experience.info}
              wrapperClass="flex flex-row gap-2 flex-wrap"
              itemClass="px-4 py-2"
              bgClass={`${color.bg} opacity-20 saturate-40`}
              textClass={`${color.text} text-xs md:text-sm font-medium`}
            />
          </article>
          <article className="w-full flex flex-col gap-2 md:gap-4 mb-6 md:mb-0 justify-center">
            <div className="flex flex-col gap-2 text-neonWhite text-base md:text-xl">
              {experience.contributions.map((line, i) => (
                <span key={i} className="text-neonWhite text-base md:text-xl">
                  <ArrowSquareRight
                    className={`${color.text} inline mr-2 mb-1`}
                  />
                  {line}
                </span>
              ))}
            </div>
            <TagList
              items={experience.skills}
              wrapperClass="w-full flex flex-row flex-wrap gap-1"
              itemClass="w-auto px-3 py-1 flex items-center justify-center"
              bgClass="bg-neonGray/20"
              textClass="text-xs md:text-sm text-neonWhite"
            />
          </article>
        </div>
      </article>
    </section>
  );
};

export default Experiences;

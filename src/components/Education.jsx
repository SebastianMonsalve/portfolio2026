import React, { useState } from "react";
import TagList from "./TagList.jsx";
import { neonColors } from "../data/colors.js";

const Education = ({ education, index }) => {
  const color = neonColors[index % neonColors.length];
  return (
    <section className="w-full h-auto flex flex-col items-center mt-4">
      <article className="w-full md:w-[90%] lg:w-[65%] flex flex-col items-start">
        <div className="w-full md:grid md:grid-cols-2 relative">
          <article className="w-full flex flex-col gap-2 md:gap-2 mb-4 md:mb-0 md:p-4">
            <a
              href={education.linkEntity}
              target="_blank"
              rel="noopener noreferrer"
              className="w-30 md:w-40 relative overflow-hidden cursor-pointer group"
            >
              <img
                src={education.logoEntity}
                alt={education.entity}
                className="w-full h-full object-cover brightness-0 invert group-hover:opacity-90"
                title="Visit Official Website"
              />
            </a>
            <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
              {education.entity}
            </h2>
            <h1 className="text-neonWhite font-bold text-xl md:text-2xl ">
              {education.title}
            </h1>
          </article>
          <article className="w-full flex flex-col gap-2 md:gap-4 mb-6 md:mb-0 justify-center">
            <TagList
              items={education.info}
              wrapperClass="flex flex-row gap-2 flex-wrap"
              itemClass="px-4 py-2"
              bgClass={`${color.bg} opacity-20 saturate-40`}
              textClass={`${color.text} text-xs md:text-sm font-medium`}
            />
            <div className="flex flex-col gap-2 text-neonWhite text-base md:text-xl">
              <p className="text-neonWhite text-base md:text-xl">
                {education.description}
              </p>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};

export default Education;

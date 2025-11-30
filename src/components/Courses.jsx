import React, { useState } from "react";
import TagList from "./TagList.jsx";
import ProjectLinkIcon from "./ProjectLinkIcon.jsx";
import { neonColors } from "../data/colors.js";
import { ArrowSquareOut } from "phosphor-react";

const Courses = ({ courses, index }) => {
  const color = neonColors[index % neonColors.length];
  return (
    <section className="w-full h-auto flex flex-col items-center mt-6 md:mt-2">
      <article className="w-full md:w-[90%] lg:w-[65%] flex flex-col items-start">
        <div className="w-full md:grid md:grid-cols-2 relative">
          <article className="w-full flex flex-col items-center md:items-start gap-1 mb-4 md:mb-0 md:p-4">
            <a
              href={courses.linkEntity}
              target="_blank"
              rel="noopener noreferrer"
              className="w-30 md:w-40 relative overflow-hidden cursor-pointer group"
            >
              <img
                src={courses.logoEntity}
                alt={courses.entity}
                className="w-full h-full object-cover brightness-0 invert group-hover:opacity-90"
                title="Visit Official Website"
              />
            </a>
            <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
              {courses.entity}
            </h2>
            <TagList
              items={courses.info}
              wrapperClass="flex flex-row gap-2 flex-wrap"
              itemClass="px-4 py-2"
              bgClass={`${color.bg} opacity-20 saturate-40`}
              textClass={`${color.text} text-xs md:text-sm font-medium`}
            />
          </article>
          <article className="w-full flex flex-col items-center md:items-start gap-1 justify-center">
            <h1 className="text-neonWhite font-bold text-center md:text-start text-xl md:text-2xl ">
              {courses.title}
            </h1>
            <div className="w-auto flex">
              <ProjectLinkIcon
                href={courses.linkCourse}
                bgClass={color.bg}
                textClass={color.text}
                title="View Certificate"
                Icon={ArrowSquareOut}
              />
            </div>
          </article>
        </div>
      </article>
    </section>
  );
};

export default Courses;

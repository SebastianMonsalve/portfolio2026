import React, { useEffect } from "react";
import { InView } from "react-intersection-observer";
import { experiences, education, courses } from "../data/journeyData.js";
import Experiences from "../components/Experiences.jsx";
import Education from "../components/Education.jsx";
import Courses from "../components/Courses.jsx";
import Title from "../components/Title.jsx";

const journey = () => {
  useEffect(() => {
    document.title = "Journey | Sebastian Monsalve";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-20 flex flex-col items-center px-4 gap-10">
      <Title text="Experiences" />
      {[...experiences].reverse().map((exp, index) => (
        <InView triggerOnce threshold={0.2} key={exp.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Experiences experience={exp} index={index} />
              ) : (
                <div className="w-full h-[40vh] animate-pulse bg-black" />
              )}
            </div>
          )}
        </InView>
      ))}
      <Title text="Education" />
      {[...education].reverse().map((edu, index) => (
        <InView triggerOnce threshold={0.2} key={edu.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Education education={edu} index={index} />
              ) : (
                <div className="w-full h-[40vh] animate-pulse bg-black" />
              )}
            </div>
          )}
        </InView>
      ))}
      <Title text="Courses & Certifications" />
      {[...courses].reverse().map((course, index) => (
        <InView triggerOnce threshold={0.2} key={course.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Courses courses={course} index={index} />
              ) : (
                <div className="w-full h-[40vh] animate-pulse bg-black" />
              )}
            </div>
          )}
        </InView>
      ))}
    </section>
  );
};

export default journey;

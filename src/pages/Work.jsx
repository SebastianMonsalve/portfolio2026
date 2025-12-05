import React, { useEffect } from "react";
import { InView } from "react-intersection-observer";
import Project from "../components/Project.jsx";
import { projects } from "../data/projectsData.js";
import Title from "../components/Title.jsx";

const Work = () => {
  useEffect(() => {
    document.title = "Work | Sebastian Monsalve";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-20 flex flex-col items-center px-4 gap-10">
      <Title text="Work" />
      {[...projects].reverse().map((p, index) => (
        <InView triggerOnce threshold={0.2} key={p.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Project project={p} index={index} />
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

export default Work;

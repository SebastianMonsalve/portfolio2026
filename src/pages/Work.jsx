import React, { useEffect } from "react";
import { InView } from "react-intersection-observer";
import Project from "../components/Project.jsx";
import { projects } from "../data/projectsData.js";

const Work = () => {
  useEffect(() => {
    document.title = "Work | Sebastian Monsalve";
  }, []);
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-0 pt-16 flex flex-col items-center px-4 gap-10">
      {[...projects].reverse().map((p, index) => (
        <InView triggerOnce threshold={0.2} key={p.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Project project={p} index={index} />
              ) : (
                <div className="w-full h-[80vh] animate-pulse bg-[#111]" />
              )}
            </div>
          )}
        </InView>
      ))}
    </section>
  );
};

export default Work;

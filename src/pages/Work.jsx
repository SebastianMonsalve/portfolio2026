import React from "react";
import { InView } from "react-intersection-observer";
import Project from "../components/Project.jsx";
import { projects } from "../data/projectsData.js";

const Work = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] pt-16 flex flex-col items-center px-4 mb-10 md:mb-0">
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
    </div>
  );
};

export default Work;

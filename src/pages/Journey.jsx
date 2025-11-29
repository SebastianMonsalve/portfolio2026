import React, { useEffect } from "react";
import { InView } from "react-intersection-observer";
import Experiences from "../components/Experiences.jsx";
import { experiences } from "../data/journeyData.js";

const journey = () => {
  useEffect(() => {
    document.title = "Journey | Sebastian Monsalve";
  }, []);
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-8 md:mt-16 pt-16 flex flex-col items-center px-4 gap-10">
      {[...experiences].map((exp, index) => (
        <InView triggerOnce threshold={0.2} key={exp.id}>
          {({ inView, ref }) => (
            <div ref={ref} className="w-full">
              {inView ? (
                <Experiences experience={exp} index={index} />
              ) : (
                <div className="w-full h-[60vh] animate-pulse bg-[#111]" />
              )}
            </div>
          )}
        </InView>
      ))}
    </section>
  );
};

export default journey;

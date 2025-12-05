import React, { useEffect } from "react";
import Title from "../components/Title";

const About = () => {
  useEffect(() => {
    document.title = "About | Sebastian Monsalve";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-20 flex flex-col items-center px-4 gap-10">
      <Title text="About" />
    </section>
  );
};

export default About;

import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex flex-col items-center justify-center text-neonWhite gap-4 ">
        <h1 className="font-medium text-xl">Software Engineer</h1>
        <h1 className="font-bold text-3xl">Sebastian Monsalve</h1>
        <p className="text-sm font-light">Frontend web & Mobile Developer</p>
      </div>
    </section>
  );
};

export default Hero;

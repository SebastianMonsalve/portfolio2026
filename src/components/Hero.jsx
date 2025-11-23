import React from "react";
import {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  CaretDown,
} from "phosphor-react";

const Hero = () => {
  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex flex-col items-center justify-center text-neonWhite gap-4 ">
        <h1 className="font-medium text-xl md:text-2xl">Software Engineer</h1>
        <h1 className="font-bold text-3xl md:text-4xl">Sebastian Monsalve</h1>
        <p className="font-light text-sm md:text-base">
          Frontend web & Mobile Developer
        </p>
        <article className="flex flex-row items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/sebastianmonsalve16/"
            className="text-neonWhite text-3xl md:text-4xl cursor-pointer hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo weight="fill" />
          </a>
          <a
            href="https://github.com/SebastianMonsalve/"
            className="text-neonWhite text-3xl md:text-4xl cursor-pointer hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo weight="fill" />
          </a>
          <a
            href="https://www.instagram.com/sebastianmonsalve_16/"
            className="text-neonWhite text-3xl md:text-4xl cursor-pointer hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo weight="fill" />
          </a>
        </article>
        <CaretDown className="absolute bottom-6 text-3xl md:text-4xl cursor-pointer" />
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  CaretDown,
} from "phosphor-react";

const Hero = () => {
  return (
    <section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex flex-col items-center justify-center text-neonWhite gap-4">
        <h1 className="font-medium text-xl md:text-2xl">Software Engineer</h1>
        <h1 className="font-bold text-3xl md:text-5xl">Sebastian Monsalve</h1>
        <p className="font-light text-sm md:text-base text-neonGray">
          Frontend web & Mobile Developer
        </p>
        <article className="flex flex-row items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/sebastianmonsalve16/"
            className="text-neonGray hover:text-neonWhite text-3xl md:text-4xl cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <LinkedinLogo weight="fill" />
          </a>
          <a
            href="https://github.com/SebastianMonsalve/"
            className="text-neonGray hover:text-neonWhite text-3xl md:text-4xl cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <GithubLogo weight="fill" />
          </a>
          <a
            href="https://www.instagram.com/sebastianmonsalve_16/"
            className="text-neonGray hover:text-neonWhite text-3xl md:text-4xl cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <InstagramLogo weight="fill" />
          </a>
        </article>
        <div className="w-full flex flex-col gap-4 absolute items-center bottom-18 md:bottom-10">
          <CaretDown className="bottom-6 text-3xl md:text-4xl cursor-pointer translate-y-2 animate-bounce" />
          <NavLink
            to="/work"
            className="w-auto px-4 py-2 relative rounded-lg overflow-hidden flex items-center justify-center hover:bg-neonGray/10"
          >
            <div className="absolute w-full h-full bg-neonGray/20"></div>
            <h1 className="text-sm md:text-base text-neonWhite">
              View Projects
            </h1>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useState } from "react";
import {
  aboutParagraphs,
  randomThings,
  photography,
} from "../data/aboutData.js";
import Title from "../components/Title";
import { XSquare } from "phosphor-react";
import Banner from "../components/Banner.jsx";

const About = () => {
  useEffect(() => {
    document.title = "About | Sebastian Monsalve";
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] mt-16 md:mt-20 flex flex-col items-center px-4 gap-10">
      <Title text="About me" />
      <div className="pt-2">
        <img
          src="/profile/profile.webp"
          alt="Profile"
          draggable="false"
          className="w-80 h-auto object-cover self-center md:self-start"
        />
      </div>
      <article className="flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-[80%]">
        <div className="w-full md:w-[60%] gap-4 flex flex-col">
          <h1 className="text-neonWhite font-bold text-2xl md:text-4xl ">
            Hi, I’m Sebastián!👋🏼
          </h1>
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className="text-neonWhite text-base md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="w-full md:w-[40%] gap-4 flex flex-col">
          <h1 className="text-neonWhite font-bold text-2xl md:text-4xl ">
            Random things about me
          </h1>
          {randomThings.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-neonWhite font-bold text-xl md:text-3xl">
                {item.title}
              </h2>
              <p className="text-neonWhite pb-2 md:pb-4 text-base md:text-xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </article>
      <article className="w-full md:w-[70%] pt-8 ">
        <h1 className="text-neonWhite font-bold text-2xl md:text-4xl pb-4 ">
          Not everything is code
        </h1>
        <p className="text-neonWhite pb-6 text-base md:text-xl">
          When I’m not programming, I’m probably taking photos of whatever
          happens to catch my attention.
        </p>

        <div className="w-full columns-2 md:columns-3 gap-1 md:gap-2">
          {photography.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden mb-1 md:mb-2 break-inside-avoid"
            >
              <img
                src={photo}
                alt={`Photography ${index + 1}`}
                draggable="false"
                loading="lazy"
                decoding="async"
                onClick={() => setSelectedImage(photo)}
                className="w-full object-cover cursor-pointer transition-transform duration-700 hover:scale-108"
              />
            </div>
          ))}
        </div>
      </article>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            title="Close image"
            className="absolute top-4 md:top-6 right-4 md:right-6 text-white text-3xl font-light hover:rotate-180 transition cursor-pointer"
          >
            <XSquare size={45} />
          </button>

          <img
            src={selectedImage}
            alt="Full view"
            draggable="false"
            className="max-h-[98vh] max-w-[98vw] object-contain transform scale-98 animate-[zoomIn_.3s_ease_forwards]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <p className="text-neonWhite text-base md:text-xl text-center p-6">
        Curiosity, technology, and many ideas. <br /> Some already exist. Others
        are still on the way.
      </p>
      <Banner />
    </section>
  );
};

export default About;

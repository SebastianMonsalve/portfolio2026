import React from "react";
import { contact, connect, ubication } from "../data/contactData.js";

const CallToAction = () => {
  return (
    <section className="w-full xl:w-[90%] 2xl:w-[80%] h-auto p-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
      <div className="w-full h-auto">
        <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
          Get in touch
        </h2>
        <a
          href={`mailto:${contact[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact for email"
          title="Contact for email"
          className="text-neonWhite font-bold text-xl md:text-2xl hover:text-neonGray duration-300"
        >
          {contact[0]}
        </a>
      </div>
      <div className="w-full h-auto">
        <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
          Connect
        </h2>

        <div className="flex flex-row gap-2 items-center">
          {connect.map((item, index) => (
            <React.Fragment key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.name}`}
                className="text-neonWhite font-bold text-xl md:text-2xl hover:text-neonGray duration-300"
              >
                {item.name}
              </a>

              {index < connect.length - 1 && <p className="text-neonGray">|</p>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-full h-20">
        <h2 className="text-neonGray font-medium uppercase text-sm md:text-lg">
          Location
        </h2>
        <h1 className="text-neonWhite font-bold text-xl md:text-2xl hover:text-neonGray duration-300">
          {ubication[0]}
        </h1>
      </div>
    </section>
  );
};

export default CallToAction;

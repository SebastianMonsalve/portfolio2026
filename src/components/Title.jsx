import React from "react";

const Title = ({ text }) => {
  return (
    <h1 className="text-bold text-xl md:text-2xl text-neonGray mt-10 -mb-4 tracking-wide relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-neonGray after:transition-all after:duration-300 after:w-[60%]">
      {text}
    </h1>
  );
};

export default Title;

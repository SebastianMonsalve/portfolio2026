import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | Sebastian Monsalve";
  }, []);
  return <div>About</div>;
};

export default About;

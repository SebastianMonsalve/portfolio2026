import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";

const Home = () => {
  useEffect(() => {
    document.title = "Sebastian Monsalve";
  }, []);
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] pt-16">
      <Hero />
    </div>
  );
};

export default Home;

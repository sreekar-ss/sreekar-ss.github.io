import React from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Publications from "./Publications";
import Photography from "./Photography";

function Home() {
  return (
    <div className="homeContainer">
      <About />
      <Experience />
      <Education />
      <Projects />
      <Publications />
      <Photography />
    </div>
  );
}

export default Home;

import React from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";

function Home() {
  return (
    <div className="homeContainer">
      <About />
      <Experience />
      <Education />
      <Projects />
    </div>
  );
}

export default Home;

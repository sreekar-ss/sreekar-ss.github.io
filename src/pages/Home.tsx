import React from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";

function Home() {
  return (
    <div className="homeContainer">
      <About />
      <Experience />
      <Education />
    </div>
  );
}

export default Home;

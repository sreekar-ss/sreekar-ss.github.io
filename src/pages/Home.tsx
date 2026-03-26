import React from "react";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Publications from "./Publications";
import Photography from "./Photography";
import Contact from "./Contact";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import ContactIcon from "@mui/icons-material/ContactPage";
import DownloadIcon from "@mui/icons-material/Download";
import { GitHub, LinkedIn } from "@mui/icons-material";
import resume from "../resume/Sreekar-Resume.pdf";

function Home() {
  return (
    <div className="homeContainer">
      <About />
      <Experience />
      <Education />
      <Projects />
      <Publications />
      <Photography />
      <Contact />
      <SpeedDial
        ariaLabel="Quick Links"
        className="quickLinks"
        icon={<ContactIcon />}
      >
        <SpeedDialAction
          key="download-resume"
          icon={<DownloadIcon />}
          tooltipTitle="Download Resume"
          onClick={() => {
            const link = document.createElement("a");
            link.href = resume;
            link.download = "Sreekar-Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />
        <SpeedDialAction
          key="linkedIn-connect"
          icon={<LinkedIn />}
          tooltipTitle="LinkedIn"
          onClick={() =>
            window.open("https://linkedin.com/in/sreekarsiddula", "_blank")
          }
        />
        <SpeedDialAction
          key="github"
          icon={<GitHub />}
          tooltipTitle="GitHub"
          onClick={() => window.open("https://github.com/sreekar-ss", "_blank")}
        />
      </SpeedDial>
    </div>
  );
}

export default Home;

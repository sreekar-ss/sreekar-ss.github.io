import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import photo from "../icons/sreekar.jpeg";

function About() {
  return (
    <div id="about" className="aboutSection section">
      <div className="heroContent">
        <Paper className="imageContainer" elevation={8}>
          <img className="personalImage" src={photo} alt="sreekar" />
        </Paper>
        <Box className="aboutText">
          <Typography variant="h3">Hi, I am Sreekar!</Typography>
          <Typography variant="body1">
            I'm a <span className="highlight">Senior Software Engineer</span> with{" "}
            <span className="highlight">5+ years</span> of experience building scalable, 
            user-centric web applications. I specialize in <span className="highlight">React</span>,{" "}
            <span className="highlight">modern frontend architecture</span>, 
            and <span className="highlight">mentoring teams</span> to deliver high-quality solutions. 
            When I'm not architecting code or advocating for better{" "}
            <span className="highlight">UX</span>, you'll find me capturing the world through my 
            camera lens. Scroll down to explore my journey in tech and creativity!
          </Typography>
        </Box>
      </div>
      <div className="scroll"></div>
    </div>
  );
}

export default About;

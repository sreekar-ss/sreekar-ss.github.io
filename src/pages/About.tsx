import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import photo from "../images/sreekar.jpeg";

function About() {
  return (
    <div id="about" className="aboutSection section">
      <Paper className="imageContainer" elevation={8}>
        <img className="personalImage" src={photo} alt="sreekar" />
      </Paper>
      <Box className="aboutText">
        <Typography variant="h3">Hi, I am Sreekar!</Typography>
        <Typography variant="body1">
          By day, I’m a coding wizard crafting amazing websites. When I’m not
          coding, I’m out capturing the world through my lens. Dive in below to
          explore my work and see how I blend tech and creativity!
        </Typography>
      </Box>
    </div>
  );
}

export default About;

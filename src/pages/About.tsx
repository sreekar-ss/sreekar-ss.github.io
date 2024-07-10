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
          I am a developer by the day and photographer by the night. I
          specialize in creating websites. You can find more about my work by
          scrolling below.
        </Typography>
      </Box>
    </div>
  );
}

export default About;

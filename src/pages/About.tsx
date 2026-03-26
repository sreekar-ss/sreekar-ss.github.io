import { Box, Typography } from "@mui/material";
import React from "react";
import photo from "../icons/sreekar.jpeg";
import { motion } from "framer-motion";

function About() {
  return (
    <div id="about" className="aboutSection section">
      <div className="heroContent">
        <motion.div
          className="heroImageWrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="heroImageGlow" />
          <img className="personalImage" src={photo} alt="sreekar" />
        </motion.div>

        <Box className="aboutText">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography variant="overline" className="heroGreeting">
              Hello, I'm
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Typography variant="h2" className="heroName">
              Sreekar Siddula
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Typography variant="h5" className="heroRole">
              Senior Software Engineer
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Typography variant="body1" className="heroDescription">
              I build scalable, user-centric web applications with{" "}
              <span className="highlight">5+ years</span> of experience in{" "}
              <span className="highlight">React</span>,{" "}
              <span className="highlight">modern frontend architecture</span>,
              and <span className="highlight">mentoring teams</span> to deliver
              high-quality solutions. When I'm not architecting code or
              advocating for better{" "}
              <span className="highlight">UX</span>, you'll find me capturing
              the world through my camera lens.
            </Typography>
          </motion.div>
        </Box>
      </div>
      <div className="scroll"></div>
    </div>
  );
}

export default About;

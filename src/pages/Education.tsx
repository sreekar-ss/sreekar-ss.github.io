import { Paper, Typography } from "@mui/material";
import React from "react";
import InformationCard from "../components/InformationCard";
import northeastenIcon from "../icons/northeastern.png";
import snuIcon from "../icons/snu.png";

function Education() {
  return (
    <div id="education" className="section educationSection">
      <Paper className="educationContainer sectionContainer">
        <Typography variant="h3" className="sectionHeading">
          Education
        </Typography>
        <InformationCard
          title="Master of Science in Computer Systems Engineering with Specialization in IoT"
          organization="Northeastern University"
          location="Boston, MA"
          duration="August 2019 - May 2021"
          bulletPoints={{
            gpa: "4.0",
            details: [
              "Societies: President, NU IotConnect Club; Graduate Student Ambassador, College of Engineering",
              "Coursework: Web Development, Foundations of AI, Data mining techniques, UX Desgin, Connected Devices, Data Networking, Object Oriented Design",
            ],
          }}
          expanded={true}
          orgIcon={northeastenIcon}
        />
        <InformationCard
          title="Bachelor of Technology in Electronics and Communication Engineering"
          organization="Shiv Nadar University"
          location="Delhi, India"
          duration="August 2014 - May 2018"
          bulletPoints={{
            gpa: "3.7",
            details: [
              "Minor: Computer Science Engineering",
              "Societies and Activities: Chairperson, SNU Food Committee",
              "Coursework: Computer Networks, Computer Architecture, Operating Systems, Data Structures, Object Oriented Programming, Wireless Sensor Networks",
            ],
          }}
          expanded={true}
          orgIcon={snuIcon}
        />
      </Paper>
    </div>
  );
}

export default Education;

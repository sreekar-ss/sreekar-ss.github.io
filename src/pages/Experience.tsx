import React from "react";
import InformationCard from "../components/InformationCard";
import { Paper, Typography } from "@mui/material";
import ddIcon from "../images/ddicon.png";
import northeasternIcon from "../images/northeastern.png";
import smartprixIcon from "../images/smartprix.png";

function Experience() {
  return (
    <div id="experience" className="section experienceSection">
      <Paper className="experienceContainer sectionContainer" elevation={8}>
        <Typography variant="h3" className="sectionHeading">
          Work Experience
        </Typography>
        <InformationCard
          title="Software Engineer II"
          organization="Ductus Inc."
          location="Maynard, MA"
          duration="June 2021 - Present"
          bulletPoints={{
            details: [
              "Delivered 10+ projects in React and Angular for a client to help with network automation",
              "Collaborated with cross-functional teams to plan and design applications, providing frontend insights and translating requirements into Figma wireframes",
              "Advocated for and integrated the UX design lifecycle, ensuring user-friendly applications and optimizing development time through better requirements gathering, user flows, and usability testing",
              "Spearheaded discussions to determine frontend architecture, select optimal patterns and libraries for efficient development, and improve testing standards",
              "Advocated for better testing practices and trained new developers in utilizing frameworks such as Testing Library, Enzyme, Jest",
              "Trained and onboarded new team members, integrating them into projects and sharing knowledge through code reviews and pair programming to enhance code quality",
              "Proactively updated our development lifecycle with tools like Swagger mock server, GitHub Copilot, and Figma developer mode, reducing development time, and trained teammates on their use",
            ],
          }}
          orgIcon={ddIcon}
          expanded={true}
        />
        <InformationCard
          title="Software Engineer Co-Op"
          organization="Ductus Inc."
          location="Maynard, MA"
          duration="May 2020 - December 2020"
          bulletPoints={{
            details: [
              "Built an internal CLI tool aimed at automating generation of CloudFormation templates utilized for deploying AWS cloud resources efficiently",
              "Engaged in feature development with frontend team on multiple Angular projects, contributing to the creation of various components with Bootstrap for enhanced user experience",
              "Developed reusable web components in VanillaJS tailored to meet client requirements, ensuring compatibility and versatility across different application frameworks",
            ],
          }}
          orgIcon={ddIcon}
          expanded={false}
        />
        <InformationCard
          title="Graduate Student Ambassador"
          organization="Northeastern University"
          location="Boston, MA"
          duration="Jan 2020 - May 2021"
          orgIcon={northeasternIcon}
        />
        <InformationCard
          title="Technical Writer"
          organization="Smartprix Pvt. Ltd"
          location="Noida, Uttar Pradesh"
          duration="Sep 2018 - Jan 2019"
          bulletPoints={{
            details: [
              "Covered the latest happenings and trends in the Tech Industry through news articles",
              "Provided detailed reviews about the latest Tech products to help users make a purchase decision",
              `Links to a few blogs: \n 1. "https://www.smartprix.com/bytes/what-is-5g-here-is-what-to-expect-from-the-next-decade-of-wireless-communication/"> \n 2. https://www.smartprix.com/bytes/wifi-6-everything-you-should-know/ \n 3. https://www.smartprix.com/bytes/top-10-noise-cancelling-wireless-headphones-available-in-the-market/ \n`,
            ],
          }}
          orgIcon={smartprixIcon}
        />
      </Paper>
    </div>
  );
}

export default Experience;

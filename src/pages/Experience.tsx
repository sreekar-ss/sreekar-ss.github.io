import React from "react";
import { Box, Paper, Typography, Chip, Stack, Avatar } from "@mui/material";
import ddIcon from "../icons/ddicon.png";
import cvsIcon from "../icons/cvs.png";
import smartprixIcon from "../icons/smartprix.png";

type Job = {
  title: string;
  organization: string;
  location: string;
  period: string;
  icon: string;
  bullets?: string[];
  tags?: string[];
};

const JOBS: Job[] = [
  {
    title: "Senior Software Engineer",
    organization: "Branding Brand Inc.",
    location: "Boston, MA",
    period: "Jan 2025 - Present",
    icon: cvsIcon,
    bullets: [
      "Contributing to the modernization of CVS Health's legacy Java-based pharmacy application—used across 10,000 stores nationwide—by helping rebuild core workflows in React, enhancing usability and performance.",
      "Collaborated with a team of senior engineers to architect scalable solutions, reducing component re-renders and improving workflow efficiency by ~30% in high-traffic areas of the app.",
      "Partnered with cross-functional teams (UX, product, backend) to deliver features impacting millions of prescriptions processed daily, while adapting to shifting requirements under tight deadlines.",
      "Mentored 2 - 3 junior developers weekly, providing guidance on architecture, code quality, and best practices",
      "Spearheaded reusable component patterns and accessibility improvements, directly reducing duplicate UI logic by 40% across prescriber flows.",
    ],
    tags: ["React", "UX", "Accessibility", "Mentorship", "Scalability"],
  },
  {
    title: "Software Engineer II",
    organization: "Ductus Inc.",
    location: "Maynard, MA",
    period: "June 2021 - August 2024",
    icon: ddIcon,
    bullets: [
      "Delivered 10+ projects in React and Angular for a client to help with network automation",
      "Collaborated with cross-functional teams to plan and design applications, providing frontend insights and translating requirements into Figma wireframes",
      "Advocated for and integrated the UX design lifecycle, ensuring user-friendly applications and optimizing development time through better requirements gathering, user flows, and usability testing",
      "Spearheaded discussions to determine frontend architecture, select optimal patterns and libraries for efficient development, and improve testing standards",
      "Advocated for better testing practices and trained new developers in utilizing frameworks such as Testing Library, Enzyme, Jest",
      "Trained and onboarded new team members, integrating them into projects and sharing knowledge through code reviews and pair programming to enhance code quality",
      "Proactively updated our development lifecycle with tools like Swagger mock server, GitHub Copilot, and Figma developer mode, reducing development time, and trained teammates on their use",
    ],
    tags: ["React", "Angular", "Testing", "UX"],
  },
  {
    title: "Software Engineer Co-Op",
    organization: "Ductus Inc.",
    location: "Maynard, MA",
    period: "May 2020 - December 2020",
    icon: ddIcon,
    bullets: [
      "Built an internal CLI tool aimed at automating generation of CloudFormation templates utilized for deploying AWS cloud resources efficiently",
      "Engaged in feature development with frontend team on multiple Angular projects, contributing to the creation of various components with Bootstrap for enhanced user experience",
      "Developed reusable web components in VanillaJS tailored to meet client requirements, ensuring compatibility and versatility across different application frameworks",
    ],
    tags: ["AWS", "CLI", "Angular"],
  },
  {
    title: "Technical Writer",
    organization: "Smartprix Pvt. Ltd",
    location: "Noida, Uttar Pradesh",
    period: "Sep 2018 - Jan 2019",
    icon: smartprixIcon,
    bullets: [
      "Covered the latest happenings and trends in the Tech Industry through news articles",
      "Provided detailed reviews about the latest Tech products to help users make a purchase decision",
      `Links to a few blogs: \n 1. "https://www.smartprix.com/bytes/what-is-5g-here-is-what-to-expect-from-the-next-decade-of-wireless-communication/"> \n 2. https://www.smartprix.com/bytes/wifi-6-everything-you-should-know/ \n 3. https://www.smartprix.com/bytes/top-10-noise-cancelling-wireless-headphones-available-in-the-market/ \n`,
    ],
    tags: ["Writing", "Reviews", "Research"],
  },
];

const getYear = (period: string) => {
  const match = period.match(/\b(\d{4})\b/);
  return match ? match[1] : "";
};

function Experience() {
  return (
    <div id="experience" className="section experienceSection">
      <Paper className="experienceContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader">
          <Typography variant="h6" className="sectionHeading">
            Experience
          </Typography>
        </Box>

        <Box className="timelineContainer">
          {JOBS.map((job, index) => (
            <Box key={index} className="timelineItem">
              {/* Timeline Line and Dot */}
              <Box className="timelineLine">
                <Box className="timelineDot">
                  <Avatar
                    src={job.icon}
                    alt={job.organization}
                    className="timelineAvatar"
                  />
                </Box>
                {index !== JOBS.length - 1 && (
                  <Box className="timelineConnector" />
                )}
              </Box>

              {/* Timeline Content */}
              <Box className="timelineContent">
                <Paper elevation={3} className="experienceCard">
                  {/* Year Badge */}
                  <Box className="yearBadge">{getYear(job.period)}</Box>

                  {/* Header */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    className="experienceCardHeader"
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" className="jobTitle">
                        {job.title}
                      </Typography>
                      <Typography variant="h6" className="jobOrganization">
                        {job.organization}
                      </Typography>
                      <Typography variant="body2" className="jobLocation">
                        {job.location} • {job.period}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Bullets */}
                  {job.bullets && job.bullets.length > 0 && (
                    <Box className="jobDetails">
                      <ul>
                        {job.bullets.map((bullet, i) => (
                          <li key={i}>
                            <Typography variant="body2">{bullet}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <Stack direction="row" spacing={1} className="jobTags">
                      {job.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

export default Experience;

import React from "react";
import { Box, Paper, Typography, Chip, Stack, Avatar } from "@mui/material";
import northeastenIcon from "../icons/northeastern.png";
import snuIcon from "../icons/snu.png";

type Degree = {
  title: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  icon: string;
  gpa?: string;
  details?: string[];
  coursework?: string[];
};

const DEGREES: Degree[] = [
  {
    title: "Master of Science",
    degree: "Computer Systems Engineering (IoT Specialization)",
    school: "Northeastern University",
    location: "Boston, MA",
    period: "Aug 2019 - May 2021",
    icon: northeastenIcon,
    gpa: "4.0",
    details: [
      "President, NU IotConnect Club",
      "Graduate Student Ambassador, College of Engineering",
    ],
    coursework: [
      "Web Development",
      "Foundations of AI",
      "Data Mining",
      "UX Design",
      "Connected Devices",
      "Data Networking",
      "Object Oriented Design",
    ],
  },
  {
    title: "Bachelor of Technology",
    degree: "Electronics and Communication Engineering",
    school: "Shiv Nadar University",
    location: "Delhi, India",
    period: "Aug 2014 - May 2018",
    icon: snuIcon,
    gpa: "3.7",
    details: [
      "Minor: Computer Science Engineering",
      "Chairperson, SNU Food Committee",
    ],
    coursework: [
      "Computer Networks",
      "Computer Architecture",
      "Operating Systems",
      "Data Structures",
      "Object Oriented Programming",
      "Wireless Sensor Networks",
    ],
  },
];

function Education() {
  return (
    <div id="education" className="section educationSection">
      <Paper className="educationContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader" sx={{ mb: 2, p: 2, borderRadius: "8px" }}>
          <Typography variant="h6" className="sectionHeading">
            Education
          </Typography>
        </Box>

        <Box className="educationGrid">
          {DEGREES.map((deg, index) => (
            <Paper
              key={`${deg.title}-${index}`}
              elevation={4}
              className="educationCard"
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: "var(--secondary-color)",
                borderRadius: "12px",
                transition: "transform 300ms ease, box-shadow 300ms ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar
                  src={deg.icon}
                  alt={deg.school}
                  sx={{ width: 56, height: 56, border: "2px solid rgba(255,255,255,0.2)" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {deg.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {deg.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {deg.school} • {deg.location}
                  </Typography>
                </Box>
                {deg.gpa && (
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="overline" color="text.secondary">
                      GPA
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--accent-color)" }}>
                      {deg.gpa}
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                {deg.period}
              </Typography>

              {deg.details && deg.details.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                    {deg.details.map((d, i) => (
                      <li key={i}>
                        <Typography variant="body1">{d}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {deg.coursework && deg.coursework.length > 0 && (
                <Box>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 1 }}>
                    Coursework
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {deg.coursework.map((c) => (
                      <Chip key={c} label={c} size="small" sx={{ mb: 1 }} />
                    ))}
                  </Stack>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

export default Education;

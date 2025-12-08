import React from "react";
import { Box, Paper, Typography, Chip, Stack, Avatar } from "@mui/material";
import { DEGREES } from "../data/education";

function Education() {
  return (
    <div id="education" className="section educationSection">
      <Paper className="educationContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader">
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
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                className="educationHeader"
              >
                <Avatar
                  src={deg.icon}
                  alt={deg.school}
                  className="educationAvatar"
                />
                <Box className="educationInfo">
                  <Typography variant="h5" className="degreeTitle">
                    {deg.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {deg.degree}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="degreeLocation"
                  >
                    {deg.school} • {deg.location}
                  </Typography>
                </Box>
                {deg.gpa && (
                  <Box className="gpaContainer">
                    <Typography variant="overline" color="text.secondary">
                      GPA
                    </Typography>
                    <Typography variant="h5" className="gpaValue">
                      {deg.gpa}
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                className="periodText"
              >
                {deg.period}
              </Typography>

              {deg.details && deg.details.length > 0 && (
                <Box className="detailsList">
                  <ul>
                    {deg.details.map((d, i) => (
                      <li key={i}>
                        <Typography variant="body1">{d}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {deg.coursework && deg.coursework.length > 0 && (
                <Box className="courseworkSection">
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    className="courseworkLabel"
                  >
                    Coursework
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    className="courseworkChips"
                  >
                    {deg.coursework.map((c) => (
                      <Chip key={c} label={c} size="small" />
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

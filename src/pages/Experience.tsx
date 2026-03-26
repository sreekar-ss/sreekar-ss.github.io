import React from "react";
import { Box, Paper, Typography, Chip, Stack, Avatar } from "@mui/material";
import { JOBS } from "../data/experience";

const getYear = (period: string) => {
  const match = period.match(/\b(\d{4})\b/);
  return match ? match[1] : "";
};

function Experience() {
  return (
    <div id="experience" className="section experienceSection">
      <Box className="sectionHeader">
        <Typography variant="h6" className="sectionHeading">
          Experience
        </Typography>
      </Box>

      <Box className="timelineContainer">
        {JOBS.map((job, index) => (
          <Box key={index} className="timelineItem">
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

            <Box className="timelineContent">
              <Paper elevation={3} className="experienceCard">
                <Box className="yearBadge">{getYear(job.period)}</Box>

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
    </div>
  );
}

export default Experience;

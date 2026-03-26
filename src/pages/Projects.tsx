import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  Grid,
  Collapse,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { Project } from "../types";
import { PROJECTS } from "../data/projects";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <Grid item xs={12} md={6} className="projectGridItem">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        <Paper
          elevation={expanded ? 8 : 2}
          className="projectCard"
          sx={{
            p: 3,
            transition: "all 0.3s ease-in-out",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            "&:hover": {
              boxShadow: "0 20px 40px -10px rgba(110, 231, 242, 0.15)",
              borderColor: "rgba(110, 231, 242, 0.3)",
            },
          }}
        >
          {/* Card Header - Always Visible */}
          <Box
            className={`projectCardHeader ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            <Box className="projectCardInfo">
              <Typography variant="h6" className="projectCardTitle">
                {project.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                className="projectCardMeta"
              >
                {project.organization} • {project.period}
              </Typography>
            </Box>
            <IconButton
              size="small"
              className={`projectExpandIcon ${expanded ? "expanded" : ""}`}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          {/* Tech Stack - Collapses when expanded */}
          <Collapse in={!expanded} timeout={300}>
            <Box className="projectPreviewTech">
              <Stack
                direction="row"
                spacing={0.5}
                className="projectPreviewTechStack"
              >
                {project.tech.slice(0, 4).map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    className="projectTechChip"
                  />
                ))}
                {project.tech.length > 4 && (
                  <Chip
                    label={`+${project.tech.length - 4} more`}
                    size="small"
                    className="projectTechChipMore"
                    color="default"
                  />
                )}
              </Stack>
            </Box>
          </Collapse>

          {/* Expandable Details */}
          <Collapse in={expanded} timeout={300}>
            <Box className="projectExpandedContent">
              {/* Full Details */}
              <Box className="projectDetailsList">
                <ul>
                  {project.details.map((detail, i) => (
                    <li key={i}>
                      <Typography variant="body2">{detail}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* All Tech Stack - Swooshes to bottom */}
              <Box className="projectFullTech">
                <Typography
                  variant="overline"
                  color="text.secondary"
                  className="projectFullTechLabel"
                >
                  Technologies
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.5}
                  className="projectFullTechStack"
                >
                  {project.tech.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      className="projectFullTechChip"
                    />
                  ))}
                </Stack>
              </Box>

              {/* GitHub Button */}
              {project.githubLink && (
                <Button
                  component="a"
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="projectGithubButton"
                >
                  Open in GitHub
                </Button>
              )}
            </Box>
          </Collapse>
        </Paper>
      </motion.div>
    </Grid>
  );
};

function Projects() {
  return (
    <div id="projects" className="section projectSection">
      <Box className="sectionHeader">
        <Typography variant="h6" className="sectionHeading">
          Projects
        </Typography>
      </Box>

      <Grid container spacing={3} className="projectGrid">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </Grid>
    </div>
  );
}

export default Projects;

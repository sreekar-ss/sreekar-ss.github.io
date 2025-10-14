import React, { useState } from "react";
import { Box, Paper, Typography, Chip, Stack, Button, Grid, Collapse, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Project = {
  title: string;
  organization: string;
  location: string;
  period: string;
  details: string[];
  tech: string[];
  githubLink?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Creating AI Players for Sushi Go Game",
    organization: "Northeastern University",
    location: "Boston, MA",
    period: "March 2021 - April 2021",
    details: [
      "Created AI players using algorithms such as Minimax, Q learning to play the Sushi Go game",
      "These agents played against Rule-based and Random players. The agents were trained extensively and the performance of each agent at different stages of training was closely studied",
      "Concepts: Minimax, Alpha-Beta Pruning, Q Learning, Q Learning with Linear Function Approximation",
    ],
    tech: ["Python", "AI/ML", "Minimax", "Q-Learning", "Alpha-Beta Pruning"],
    githubLink: "https://github.com/Ryan-Newell/CS5100_SushiGo_AI",
  },
  {
    title: "Flood Control Management using IoT",
    organization: "Northeastern University",
    location: "Boston, MA",
    period: "March 2020 - April 2020",
    details: [
      "Developed a generic IoT solution for better management of Floods using IoT. Python is used to program Constrained Devices, Java is used to program the Gateway devices",
      "Sensors and Actuators are interfaced to the Raspberry Pi. Data is sent to the Gateways using the CoAP protocol",
      "Gateways forward the data to the Ubidots Cloud Platform which aggregates all the data and triggers the Actuation",
      "MQTT protocol is used on all Gateways to listen for actuation and forward the necessary commands to the Devices. SMTP is used to send regular updates to the users",
      "Concepts: Raspberry Pi, Python, Java, Sensors, Actuators, RedisDB, MQTT, CoAP, I2C, SMTP, Ubidots",
    ],
    tech: ["Python", "Java", "Raspberry Pi", "MQTT", "CoAP", "IoT", "RedisDB", "Ubidots"],
    githubLink: "https://bitbucket.org/sreekar_ss/iot-device/src/master/apps/project/",
  },
  {
    title: "Web Application for a Learning Management System",
    organization: "Northeastern University",
    location: "Boston, MA",
    period: "January 2020 - April 2020",
    details: [
      "Developed a Learning Management System (LMS) for students and instructors, deployed on Heroku",
      "On the Faculty side of the application, React is used to render UI dynamically. Redux is used to manage the states. Java Persistence API is used to provide access to MySQL Database. Java REST controllers and services have been used to access data from the server",
      "On the Student side of the application, Angular is used to render UI dynamically. Node.js and Express are used for REST controllers and services for server data access. MongoDB is used as the NoSQL database. Mongoose is used for the JavaScript data access layer",
      "Concepts: React, Redux, Spring, Node.js, Express, REST, Angular, MySQL, MongoDB, Mongoose, Heroku, Bootstrap",
    ],
    tech: ["React", "Redux", "Angular", "Node.js", "Spring Boot", "MySQL", "MongoDB", "Heroku", "Bootstrap"],
    githubLink: "https://github.com/sreekar-ss",
  },
  {
    title: "Alexa Voice Interface for Day Care Management",
    organization: "Northeastern University",
    location: "Boston, MA",
    period: "November 2019",
    details: [
      "Developed a Java-based application to handle all the operations in a Day Care service using MVC Design Pattern",
      "All the data was stored in a MySQL database and could be accessed through an internal port",
      "Alexa Skill sets were used to configure Intents in Python. The Intents could access data from the SQL database and generate the appropriate response. The response was then tunneled to a public URL",
      "Alexa Developer Console accesses the public URL to give commands and get the appropriate outputs",
      "Concepts: Object-Oriented Design, MVC, MySQL, ngrok, Python Socket Programming, Amazon Alexa Skill Set",
    ],
    tech: ["Java", "Python", "MySQL", "Alexa Skills", "MVC", "ngrok"],
  },
  {
    title: "Network Configuration for Multi-National Company",
    organization: "Northeastern University",
    location: "Boston, MA",
    period: "November 2019",
    details: [
      "Simulated the backend network architecture for a company that has offices distributed across the globe using the Cisco Packet Tracer software",
      "Each Department at a location was configured to be in a VLAN and each host is allocated an IP through a DHCP server. OSPF routing protocol was implemented between different locations along with Frame Relay",
      "RSTP and HSRP were implemented to add redundancy and increase fault tolerance",
      "Concepts: TCP/IP, OSPF, HSRP, Frame Relay, DHCP, RSTP, VLAN, ARP, Access Lists",
    ],
    tech: ["Cisco", "TCP/IP", "OSPF", "HSRP", "VLAN", "DHCP", "Frame Relay", "RSTP", "ARP"],
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <Grid item xs={12} md={6} sx={{ display: "flex" }}>
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          backgroundColor: "var(--secondary-color)",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
          border: "1px solid rgba(255,255,255,0.08)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(110, 231, 242, 0.15)",
            borderColor: "rgba(110, 231, 242, 0.3)",
          },
        }}
      >
        {/* Card Header - Always Visible */}
        <Box
          sx={{
            p: 2.5,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: expanded ? "rgba(110, 231, 242, 0.05)" : "transparent",
            borderBottom: expanded ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {project.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              {project.organization} • {project.period}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 300ms ease",
              color: "var(--accent-color)",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {/* Tech Stack - Collapses when expanded */}
        <Collapse in={!expanded} timeout={300}>
          <Box sx={{ px: 2.5, pb: 2 }}>
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
              {project.tech.slice(0, 4).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    mb: 0.5,
                    backgroundColor: "rgba(110, 231, 242, 0.1)",
                    color: "var(--accent-color)",
                    border: "1px solid rgba(110, 231, 242, 0.25)",
                    fontSize: "0.75rem",
                  }}
                />
              ))}
              {project.tech.length > 4 && (
                <Chip
                  label={`+${project.tech.length - 4} more`}
                  size="small"
                  sx={{
                    mb: 0.5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                />
              )}
            </Stack>
          </Box>
        </Collapse>

        {/* Expandable Details */}
        <Collapse in={expanded} timeout={300}>
          <Box sx={{ px: 2.5, pb: 2.5 }}>
            {/* Full Details */}
            <Box sx={{ mb: 2 }}>
              <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                {project.details.map((detail, i) => (
                  <li key={i}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {detail}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>

            {/* All Tech Stack - Swooshes to bottom */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 1 }}>
                Technologies
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
                {project.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      mb: 0.5,
                      backgroundColor: "rgba(110, 231, 242, 0.1)",
                      color: "var(--accent-color)",
                      border: "1px solid rgba(110, 231, 242, 0.3)",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* GitHub Button */}
            {project.githubLink && (
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  background: "linear-gradient(45deg, var(--accent-color), var(--accent-secondary))",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    filter: "brightness(1.1)",
                  },
                }}
              >
                Open in GitHub
              </Button>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Grid>
  );
};

function Projects() {
  return (
    <div id="projects" className="section projectSection">
      <Paper className="projectContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader" sx={{ mb: 2, p: 2, borderRadius: "8px" }}>
          <Typography variant="h6" className="sectionHeading">
            Projects
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ px: 2, alignItems: "flex-start" }}>
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </Grid>
      </Paper>
    </div>
  );
}

export default Projects;

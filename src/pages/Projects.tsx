import { Paper, Typography } from "@mui/material";
import React from "react";
import InformationCard from "../components/InformationCard";
import northeasternIcon from "../images/northeastern.png";

function Projects() {
  return (
    <div id="projects" className="section projectSection">
      <Paper className="projectContainer sectionContainer">
        <Typography variant="h3" className="sectionHeading">
          Projects
        </Typography>
        <InformationCard
          title="Creating AI Players for Sushi Go Game"
          organization="Northeastern University"
          location="Boston, MA"
          duration="March 2021 - April 2021"
          bulletPoints={{
            details: [
              "Created AI players using algorithms such as Minimax, Q learning to play the Sushi Go game",
              "These agents played against Rule-based and Random players. The agents were trained extensively and the performance of each agent at different stages of training was closely studied",
              "Concepts: Minimax, Alpha-Beta Pruning, Q Learning, Q Learning with Linear Function Approximation",
            ],
            githubLink: "https://github.com/Ryan-Newell/CS5100_SushiGo_AI",
          }}
          orgIcon={northeasternIcon}
          expanded={true}
        />
        <InformationCard
          title="Flood Control Management using IoT"
          organization="Northeastern University"
          location="Boston, MA"
          duration="March 2020 - April 2020"
          bulletPoints={{
            details: [
              "Developed a generic IoT solution for better management of Floods using IoT. Python is used to program Constrained Devices, Java is used to program the Gateway devices",
              "Sensors and Actuators are interfaced to the Raspberry Pi. Data is sent to the Gateways using the CoAP protocol",
              "Gateways forward the data to the Ubidots Cloud Platform which aggregates all the data and triggers the Actuation",
              "MQTT protocol is used on all Gateways to listen for actuation and forward the necessary commands to the Devices. SMTP is used to send regular updates to the users",
              "Concepts: Raspberry Pi, Python, Java, Sensors, Actuators, RedisDB, MQTT, CoAP, I2C, SMTP, Ubidots",
            ],
            githubLink:
              "https://bitbucket.org/sreekar_ss/iot-device/src/master/apps/project/",
          }}
          orgIcon={northeasternIcon}
          expanded={false}
        />
        <InformationCard
          title="Web Application for a Learning Management System"
          organization="Northeastern University"
          location="Boston, MA"
          duration="January 2020 - April 2020"
          bulletPoints={{
            details: [
              "Developed a Learning Management System (LMS) for students and instructors, deployed on Heroku",
              "On the Faculty side of the application, React is used to render UI dynamically. Redux is used to manage the states. Java Persistence API is used to provide access to MySQL Database. Java REST controllers and services have been used to access data from the server",
              "On the Student side of the application, Angular is used to render UI dynamically. Node.js and Express are used for REST controllers and services for server data access. MongoDB is used as the NoSQL database. Mongoose is used for the JavaScript data access layer",
              "Concepts: React, Redux, Spring, Node.js, Express, REST, Angular, MySQL, MongoDB, Mongoose, Heroku, Bootstrap",
            ],
            githubLink: "https://github.com/sreekar-ss",
          }}
          orgIcon={northeasternIcon}
          expanded={false}
        />
        <InformationCard
          title="
            Alexa Voice Interface for an Application to handle tasks in a Day Care"
          organization="Northeastern University"
          location="Boston, MA"
          duration="November 2019 - November 2019"
          bulletPoints={{
            details: [
              "Developed a Java-based application to handle all the operations in a Day Care service using MVC Design Pattern",
              "All the data was stored in a MySQL database and could be accessed through an internal port",
              "Alexa Skill sets were used to configure Intents in Python. The Intents could access data from the SQL database and generate the appropriate response. The response was then tunneled to a public URL",
              "Alexa Developer Console accesses the public URL to give commands and get the appropriate outputs",
              "Concepts: Object-Oriented Design, MVC, MySQL, ngrok, Python Socket Programming, Amazon Alexa Skill Set",
            ],
          }}
          orgIcon={northeasternIcon}
          expanded={false}
        />
        <InformationCard
          title="Network Configuration for a Multi-National Company using Cisco Packet Tracer"
          organization="Northeastern University"
          location="Boston, MA"
          duration="November 2019 - November 2019"
          bulletPoints={{
            details: [
              "Simulated the backend network architecture for a company that has offices distributed across the globe using the Cisco Packet Tracer software",
              "Each Department at a location was configured to be in a VLAN and each host is allocated an IP through a DHCP server. OSPF routing protocol was implemented between different locations along with Frame Relay",
              "RSTP and HSRP were implemented to add redundancy and increase fault tolerance",
              "Concepts: TCP/IP, OSPF, HSRP, Frame Relay, DHCP, RSTP, VLAN, ARP, Access Lists",
            ],
          }}
          orgIcon={northeasternIcon}
          expanded={false}
        />
      </Paper>
    </div>
  );
}

export default Projects;

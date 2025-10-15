import { Box, Paper, Typography, Divider } from "@mui/material";
import React from "react";
import ieeeIcon from "../icons/ieee.png";

type Publication = {
  title: string;
  authors: string;
  conference: string;
  year: string;
  citedBy: string;
  abstract: string;
};

const PUBLICATIONS: Publication[] = [
  {
    title: "Water Level Monitoring and Management of Dams using IoT",
    authors: "Sai Sreekar Siddula; Phaneendra Babu; P.C. Jain",
    conference:
      "3rd International Conference on Internet of Things: Smart Innovation and Usages (IoT-SIU)",
    year: "2018",
    citedBy: "113",
    abstract:
      "The history, culture, current and future socio-economic status and environmental sustainability of India and its people are intricately linked to the water resources which are available from dams. These water resources available through dams are one of the main sources available for the usage to industries, livestock, irrigation etc. and there is a critical need to ensure the safety of the water level at these dams against any natural or anthropogenic threats and to develop an effective Water Level Management system using IoT. This paper gives an outline for the development of an information system based on the existing systems with the utilization of some sensors and IoT. This paper also proposes a novel idea of collecting and sharing real-time information about water levels to an authorized central command center through far field communication. The authorized central command center then takes a call whether to release the water by opening dam gates or keep them closed. By doing so, the operation of dams all over the country is centralized and automatized.",
  },
  {
    title:
      "Real Time Monitoring and Controlling of Water Level in Dams using IoT",
    authors: "Sai Sreekar Siddula; P.C. Jain; Madhur Deo Upadhayay",
    conference: "8th International Advance Computing Conference (IACC)",
    year: "2018",
    citedBy: "22",
    abstract:
      "Dams provide us with a wide range of social, economic, environmental benefits by helping us in controlling the flow of water, generating hydroelectric power, flood control, waste management, navigational purposes and act as habitats for aquatic life. India has progressed a lot in the construction of dams and water reservoirs after Independence and now we are among the best dam builders in the world. We have around 4300 dams in India and many more are already under the process of construction. But even today most of these dams use the conventional methods of dam management for controlling the dam gates and dam maintenance. In the current fast paced modern world where we are trying to automate all the processes around us, it's high time that we revamp the management of our dams using Internet of Things. In this paper we have proposed and implemented a novel idea of automating the process of dam management from collecting the data of water level to control the dam gates. This idea will help us to streamline the control of dams throughout the country and reduce the manpower for dam maintenance.",
  },
];

function Publications() {
  return (
    <div id="publications" className="section publicationsSection">
      <Paper className="publicationContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader">
          <Typography variant="h6" className="sectionHeading">
            Publications
          </Typography>
        </Box>

        <Box className="publicationsContent">
          {PUBLICATIONS.map((pub, index) => (
            <Paper key={index} elevation={3} className="publicationCard">
              <Typography variant="h5" className="publicationTitle">
                {pub.title}
              </Typography>

              <Box className="publicationLayout">
                {/* Left Column - Metadata */}
                <Box>
                  <Typography variant="body2" className="publicationAuthors">
                    <Box component="span" className="label">
                      Authors:{" "}
                    </Box>
                    {pub.authors}
                  </Typography>

                  <Typography variant="body2" className="publicationConference">
                    <Box component="span" className="label">
                      Conference:{" "}
                    </Box>
                    {pub.conference}
                  </Typography>

                  <Divider className="publicationDivider" />

                  <Box className="publicationStats">
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Year
                      </Typography>
                      <Typography variant="h6" className="statValue">
                        {pub.year}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Citations
                      </Typography>
                      <Typography variant="h6" className="citationsValue">
                        {pub.citedBy}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className="publisherLabel"
                      >
                        Publisher
                      </Typography>
                      <img
                        src={ieeeIcon}
                        alt="IEEE"
                        className="publisherIcon"
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Right Column - Abstract */}
                <Box>
                  <Typography variant="overline" className="abstractLabel">
                    Abstract
                  </Typography>
                  <Typography variant="body2" className="abstractText">
                    {pub.abstract}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

export default Publications;

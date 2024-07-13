import { Paper, Typography } from "@mui/material";
import React from "react";
import PublicationCard from "../components/PublicationCard";

function Publications() {
  return (
    <div id="publications" className="section publicationsSection">
      <Paper className="publicationContainer sectionContainer" elevation={8}>
        <Typography variant="h3" className="sectionHeading">
          Publications
        </Typography>
        <PublicationCard
          title="Water Level Monitoring and Management of Dams using IoT"
          authors="Sai Sreekar Siddula; Phaneendra Babu; P.C. Jain"
          conference="3rd International Conference on Internet of Things: Smart Innovation and Usages (IoT-SIU)"
          year="2018"
          abstract="The history, culture, current and future socio-economic status and environmental sustainability of India and its people are intricately linked to the water resources which are available from dams. These water resources available through dams are one of the main sources available for the usage to industries, livestock, irrigation etc. and there is a critical need to ensure the safety of the water level at these dams against any natural or anthropogenic threats and to develop an effective Water Level Management system using IoT. This paper gives an outline for the development of an information system based on the existing systems with the utilization of some sensors and IoT. This paper also proposes a novel idea of collecting and sharing real-time information about water levels to an authorized central command center through far field communication. The authorized central command center then takes a call whether to release the water by opening dam gates or keep them closed. By doing so, the operation of dams all over the country is centralized and automatized."
          citedBy="40"
        />
        <PublicationCard
          title="Real Time Monitoring and Controlling of Water Level in Dams using IoT"
          authors="Sai Sreekar Siddula; P.C. Jain; Madhur Deo Upadhayay"
          conference="8th International Advance Computing Conference (IACC)"
          year="2018"
          abstract="Dams provide us with a wide range of social, economic, environmental benefits by helping us in controlling the flow of water, generating hydroelectric power, flood control, waste management, navigational purposes and act as habitats for aquatic life. India has progressed a lot in the construction of dams and water reservoirs after Independence and now we are among the best dam builders in the world. We have around 4300 dams in India and many more are already under the process of construction. But even today most of these dams use the conventional methods of dam management for controlling the dam gates and dam maintenance. In the current fast paced modern world where we are trying to automate all the processes around us, it's high time that we revamp the management of our dams using Internet of Things. In this paper we have proposed and implemented a novel idea of automating the process of dam management from collecting the data of water level to control the dam gates. This idea will help us to streamline the control of dams throughout the country and reduce the manpower for dam maintenance."
          citedBy="7"
        />
      </Paper>
    </div>
  );
}

export default Publications;

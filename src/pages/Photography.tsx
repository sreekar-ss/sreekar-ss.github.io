import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import aurora from "../images/aurora.jpeg";
import bikes from "../images/bikes.jpeg";
import bridge from "../images/bridge.jpeg";
import dawn from "../images/dawn.jpeg";
import dusk from "../images/dusk.jpeg";
import flower from "../images/flower.jpeg";
import fog from "../images/fog.jpeg";
import lighthouse from "../images/lighthouse.jpeg";
import milkyway from "../images/milkyway.jpeg";
import pier from "../images/pier.jpeg";
import skyline from "../images/skyline.jpeg";
import train from "../images/train.jpeg";

function Photography() {
  const imageData = [
    {
      img: aurora,
      title: "Aurora",
    },
    {
      img: bikes,
      title: "Biker Gang",
    },
    {
      img: bridge,
      title: "Brooklyn Bridge",
    },
    {
      img: dawn,
      title: "Nubble at Dawn",
    },
    {
      img: dusk,
      title: "Dusk",
    },
    {
      img: flower,
      title: "Daisy",
    },
    {
      img: fog,
      title: "Manhattan Bridge",
    },
    {
      img: lighthouse,
      title: "Portland Head Light",
    },
    {
      img: milkyway,
      title: "Milkyway",
    },
    {
      img: pier,
      title: "Quincy Pier",
    },
    {
      img: skyline,
      title: "Boston",
    },
    {
      img: train,
      title: "Conway Scenic Railroad",
    },
  ];

  return (
    <div id="photography" className="section photographySection">
      <Paper className="photographyContainer sectionContainer">
        <Accordion className="sectionAccordion" expanded={true}>
          <AccordionSummary className="sectionHeader">
            <Typography variant="h6" className="sectionHeading">
              Photography
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="sectionAccordionDetails">
            <Box className="imageContainer">
              <ImageList variant="masonry" cols={5} gap={10}>
                {imageData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      className="imageTitle"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

export default Photography;

import {
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
      <Paper className="photographyContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader" sx={{ mb: 3, p: 2, borderRadius: "8px" }}>
          <Typography variant="h6" className="sectionHeading">
            Photography
          </Typography>
        </Box>

        <Box className="imageContainer">
          <ImageList variant="masonry" cols={6} gap={10}>
            {imageData.map((item) => (
              <ImageListItem
                key={item.img}
                sx={{
                  overflow: "hidden",
                  borderRadius: "8px",
                  transition: "transform 300ms ease, box-shadow 300ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(110, 231, 242, 0.2)",
                  },
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                  }}
                />
                <ImageListItemBar
                  title={item.title}
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    "& .MuiImageListItemBar-title": {
                      fontWeight: 600,
                    },
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Paper>
    </div>
  );
}

export default Photography;

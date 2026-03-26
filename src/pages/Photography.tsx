import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState, useCallback } from "react";
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

const imageData = [
  { img: aurora, title: "Aurora" },
  { img: bikes, title: "Biker Gang" },
  { img: bridge, title: "Brooklyn Bridge" },
  { img: dawn, title: "Nubble at Dawn" },
  { img: dusk, title: "Dusk" },
  { img: flower, title: "Daisy" },
  { img: fog, title: "Manhattan Bridge" },
  { img: lighthouse, title: "Portland Head Light" },
  { img: milkyway, title: "Milkyway" },
  { img: pier, title: "Quincy Pier" },
  { img: skyline, title: "Boston" },
  { img: train, title: "Conway Scenic Railroad" },
];

function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        if (direction === "next") return (prev + 1) % imageData.length;
        return (prev - 1 + imageData.length) % imageData.length;
      });
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateLightbox("next");
      else if (e.key === "ArrowLeft") navigateLightbox("prev");
      else if (e.key === "Escape") closeLightbox();
    },
    [navigateLightbox],
  );

  return (
    <div id="photography" className="section photographySection">
      <Box className="sectionHeader">
        <Typography variant="h6" className="sectionHeading">
          Photography
        </Typography>
      </Box>

      <Box className="masonryContainer">
        <ImageList variant="masonry" cols={5} gap={10}>
          {imageData.map((item, index) => (
            <ImageListItem
              key={item.title}
              className="masonryItem"
              onClick={() => openLightbox(index)}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              <Box className="masonryOverlay">
                <Typography className="masonryTitle">{item.title}</Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Modal
        open={lightboxIndex !== null}
        onClose={closeLightbox}
        className="lightboxModal"
      >
        <Box
          className="lightboxBackdrop"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <IconButton className="lightboxClose" onClick={closeLightbox}>
            <CloseIcon />
          </IconButton>

          <IconButton
            className="lightboxNav lightboxPrev"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {lightboxIndex !== null && (
            <Box
              className="lightboxContent"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageData[lightboxIndex].img}
                alt={imageData[lightboxIndex].title}
                className="lightboxImage"
              />
              <Typography className="lightboxCaption">
                {imageData[lightboxIndex].title}
              </Typography>
            </Box>
          )}

          <IconButton
            className="lightboxNav lightboxNext"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}

export default Photography;

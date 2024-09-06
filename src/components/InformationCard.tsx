import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import githubIcon from "../icons/github.png";

export interface BulletPointsType {
  gpa?: string;
  details: Array<string>;
  links?: Map<string, string>;
  githubLink?: string;
}

export interface InformatinCardProps {
  title: string;
  organization: string;
  location: string;
  duration: string;
  bulletPoints?: BulletPointsType;
  orgIcon?: string;
  expanded?: boolean;
}

function InformationCard({
  title,
  organization,
  location,
  duration,
  bulletPoints,
  orgIcon,
  expanded = false,
}: InformatinCardProps) {
  const [expandCard, setExpandCard] = useState<boolean>(expanded);
  return (
    <Paper className="informationCardContainer" elevation={8}>
      <Accordion
        className="informationCard"
        expanded={expandCard}
        onChange={() => setExpandCard(!expandCard)}
      >
        <AccordionSummary
          className={`${expandCard ? "active informationCardTitle" : "informationCardTitle"}`}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="informationCardDetails">
          <div className="cardHighlights">
            <div>
              {orgIcon ? <img src={orgIcon} alt="organizationphoto" /> : null}
              <Typography variant="h6">{organization}</Typography>
              <Typography variant="body2">{location}</Typography>
            </div>
            <div>{duration}</div>
          </div>
          {bulletPoints?.gpa ? (
            <Typography className="gpa">GPA: {bulletPoints?.gpa}</Typography>
          ) : (
            <></>
          )}
          <List>
            {bulletPoints?.details.length ? (
              bulletPoints?.details.map((point) => (
                <ListItem key={Math.random()}>
                  <CircleIcon className="bulletPoint" />
                  {point}
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
          {bulletPoints?.githubLink?.length ? (
            <a href={bulletPoints.githubLink} target="_blank" rel="noreferrer">
              <Button
                variant="contained"
                className="githubButton"
                endIcon={<img src={githubIcon} alt="githubicon" />}
              >
                Open in Github
              </Button>
            </a>
          ) : (
            <></>
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default InformationCard;

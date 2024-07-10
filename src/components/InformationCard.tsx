import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";

export interface InformatinCardProps {
  title: string;
  organization: string;
  location: string;
  duration: string;
  bulletPoints?: Array<string>;
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
          <Typography variant="h5">{title}</Typography>
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
          <List>
            {bulletPoints?.length ? (
              bulletPoints?.map((point) => (
                <ListItem key={Math.random()}>
                  <CircleIcon className="bulletPoint" />
                  {point}
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default InformationCard;

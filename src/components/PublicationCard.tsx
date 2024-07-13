import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import ieeeIcon from "../images/ieee.png";

export interface PublicationCardProps {
  title: string;
  authors: string;
  conference: string;
  year: string;
  citedBy: string;
  abstract: string;
}

function PublicationCard({
  title,
  authors,
  conference,
  year,
  citedBy,
  abstract,
}: PublicationCardProps) {
  return (
    <Card className="publicationCard">
      <CardHeader
        title={title}
        subheader={`Authors: ${authors}`}
        className="publicationCardHeader"
      />
      <CardContent className="publicationCardContent">
        <div>
          <Typography>Conference: </Typography> {conference}
        </div>
        <div className="subHeading2">
          <div>
            <Typography>Year:</Typography> {year}
          </div>
          <div>
            <Typography>Citations:</Typography> {citedBy}
          </div>
          <div>
            <Typography>Publisher:</Typography>{" "}
            <img src={ieeeIcon} alt="ieeeicon" />
          </div>
        </div>
        <Typography>Abstract:</Typography>
        {abstract}
      </CardContent>
    </Card>
  );
}

export default PublicationCard;

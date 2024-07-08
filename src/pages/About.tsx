import { Paper } from "@mui/material";
import React from "react";
import photo from "../images/sreekar.jpeg";

function About () {
    return (
        <div className="aboutSection">
            <Paper className="imageContainer" elevation={3}>
                <img className="personalImage" src={photo} alt="sreekar"/>
            </Paper>
        </div>
    );
};

export default About;
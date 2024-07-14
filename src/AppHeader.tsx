import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-scroll";
import React from "react";

function AppHeader() {
  return (
    <Box>
      <AppBar component="nav" className="headerBar">
        <Toolbar className="headerSection">
          <Box className="headerTextSection">
            <IconButton
              className="headerExpand"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="headingText" variant="h6">
              Sai Sreekar Siddula
            </Typography>
          </Box>
          <Box className="headerButtons">
            <Link to="about" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                About
              </Button>
            </Link>
            <Link to="experience" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Work Experience
              </Button>
            </Link>
            <Link to="education" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Education
              </Button>
            </Link>
            <Link to="projects" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Projects
              </Button>
            </Link>
            <Link to="publications" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Publications
              </Button>
            </Link>
            <Link to="photography" activeClass="active" smooth spy>
              <Button
                className="headerNavButton"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Photography
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;

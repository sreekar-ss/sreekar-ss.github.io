import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";

function AppHeader() {
    return (
    <Box>
        <AppBar component="nav" className="headerBar">
            <Toolbar className="headerSection">
                <Box className="headerTextSection">
                    <IconButton className="headerExpand" sx={{ display: {xs: 'block', md: 'none'}}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className="headingText" variant="h6">
                        Sai Sreekar Siddula
                    </Typography>
                </Box>
                <Box className="headerButtons">
                    <Button className="headerNavButton" sx={{ display: {xs: 'none', md: 'block'}}}>About</Button>
                    <Button className="headerNavButton" sx={{ display: {xs: 'none', md: 'block'}}}>Work Experience</Button>
                    <Button className="headerNavButton" sx={{ display: {xs: 'none', md: 'block'}}}>Education</Button>
                    <Button className="headerNavButton" sx={{ display: {xs: 'none', md: 'block'}}}>Projects and Publications</Button>
                    <Button className="headerNavButton" sx={{ display: {xs: 'none', md: 'block'}}}>Hobbies</Button>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
    );
};

export default AppHeader;
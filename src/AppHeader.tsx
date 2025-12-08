import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-scroll";
import React, { useState } from "react";

const NAV_ITEMS = [
  { label: "About", to: "about" },
  { label: "Work Experience", to: "experience" },
  { label: "Education", to: "education" },
  { label: "Projects", to: "projects" },
  { label: "Publications", to: "publications" },
  { label: "Photography", to: "photography" },
];

function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sai Sreekar Siddula
      </Typography>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.to} disablePadding>
            <Link
              to={item.to}
              activeClass="active"
              smooth
              spy
              onClick={handleDrawerToggle}
              style={{ width: "100%", textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar component="nav" className="headerBar">
        <Toolbar className="headerSection">
          <Box className="headerTextSection">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="headerExpand"
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="headingText" variant="h6">
              Sai Sreekar Siddula
            </Typography>
          </Box>
          <Box className="headerButtons" sx={{ display: { xs: "none !important", md: "block !important" } }}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} activeClass="active" smooth spy>
                <Button className="headerNavButton">{item.label}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default AppHeader;

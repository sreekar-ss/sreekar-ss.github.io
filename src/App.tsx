import React from "react";
import "./App.css";
import Home from "./pages/Home";
import AppHeader from "./AppHeader";
import { Box, Alert } from "@mui/material";

function App() {
  const [showNotice, setShowNotice] = React.useState(true);

  return (
    <>
      <AppHeader />
      {showNotice && (
        <Box className="noticeBanner">
          <Alert
            severity="info"
            onClose={() => setShowNotice(false)}
            className="noticeAlert"
          >
            🚀 Site upgrade in progress... Thanks for your patience with any
            temporary quirks!
          </Alert>
        </Box>
      )}
      <Home />
    </>
  );
}

export default App;

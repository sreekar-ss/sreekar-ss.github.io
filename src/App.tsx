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
        <Box
          sx={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 1100,
            display: "flex",
            justifyContent: "center",
            px: 2,
            pt: 1,
          }}
        >
          <Alert
            severity="info"
            onClose={() => setShowNotice(false)}
            sx={{
              width: "100%",
              maxWidth: "800px",
              backgroundColor: "rgba(110, 231, 242, 0.15)",
              color: "white",
              borderRadius: "8px",
              border: "1px solid rgba(110, 231, 242, 0.3)",
              "& .MuiAlert-icon": {
                color: "var(--accent-color)",
              },
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            🚀 Site upgrade in progress... Thanks for your patience with any temporary quirks!
          </Alert>
        </Box>
      )}
      <Home />
    </>
  );
}

export default App;

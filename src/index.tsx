import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/700.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6ee7f2" },
    secondary: { main: "#a78bfa" },
    background: { default: "#0b1020", paper: "#131a2a" },
    text: { primary: "#f8fafc", secondary: "#cbd5e1" },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

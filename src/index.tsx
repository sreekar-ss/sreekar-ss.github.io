import React from "react";
import ReactDOM from "react-dom/client";
import CommandPalette from "./site/CommandPalette";
import reportWebVitals from "./reportWebVitals";

// "/"   → main site (command palette design)
// "/v1" → earlier contact sheet design, loaded as its own chunk
// "/v2" → redirected to "/" by build/v2/index.html (see scripts/postbuild.js)
const ContactSheet = React.lazy(() => import("./site/ContactSheet"));

const route = window.location.pathname.replace(/\/+$/, "") || "/";

function Root() {
  if (route === "/v1") {
    return (
      <React.Suspense fallback={null}>
        <ContactSheet />
      </React.Suspense>
    );
  }
  return <CommandPalette />;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

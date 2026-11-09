import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { initAnalytics } from "./site/analytics";

// "/"   → main site (command palette design)
// "/v1" → earlier contact sheet design
// "/v2" → a static redirect to "/" written by scripts/prerender.mjs
//
// In production both pages arrive as pre-rendered HTML (see scripts/prerender.mjs),
// so React hydrates them. In development the root is empty and React renders.

const route = window.location.pathname.replace(/\/+$/, "") || "/";

async function main() {
  // Each page is its own chunk with its own CSS, so a visit only downloads
  // what that page uses. The pre-rendered HTML already links and preloads them.
  const Page =
    route === "/v1"
      ? (await import("./site/ContactSheet")).default
      : (await import("./site/CommandPalette")).default;
  const root = document.getElementById("root") as HTMLElement;
  const app = (
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

initAnalytics();
main();

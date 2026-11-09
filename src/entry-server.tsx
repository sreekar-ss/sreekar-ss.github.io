// Server entry used only at build time by scripts/prerender.mjs.
// It renders each route to HTML and exposes the content used to generate
// llms.txt and the JSON-LD Person schema, so they come from the same source.
import React from "react";
import { renderToString } from "react-dom/server";
import CommandPalette from "./site/CommandPalette";
import ContactSheet from "./site/ContactSheet";

export * as content from "./site/content";

export const routes = {
  "/": { Page: CommandPalette, title: "Sai Sreekar Siddula · Senior Software Engineer" },
  "/v1": { Page: ContactSheet, title: "Sai Sreekar Siddula · Contact sheet (v1)" },
} as const;

export type Route = keyof typeof routes;

export function render(route: Route): string {
  const { Page } = routes[route];
  return renderToString(
    <React.StrictMode>
      <Page />
    </React.StrictMode>,
  );
}

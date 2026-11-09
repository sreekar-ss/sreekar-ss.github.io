import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Two builds share this config (see "build" in package.json):
//   1. the client app, written to build/
//   2. an SSR build of src/entry-server.tsx, written to build-ssr/, which
//      scripts/prerender.mjs uses to write full HTML for "/" and "/v1".
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: isSsrBuild ? "build-ssr" : "build",
    assetsDir: "static",
    // Never inline fonts into CSS as data URIs: that bloats the render-blocking
    // stylesheet with every language subset. As files, the browser downloads only
    // the subsets a page uses (and the prerender step preloads the key ones).
    assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
    // The prerender step reads the manifest to link /v1's own CSS chunk.
    manifest: !isSsrBuild,
    rollupOptions: isSsrBuild ? { output: { entryFileNames: "[name].mjs" } } : undefined,
  },
  // Font packages are plain CSS; let Vite process them instead of Node.
  ssr: { noExternal: [/^@fontsource\//] },
  server: { port: 3000 },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
}));

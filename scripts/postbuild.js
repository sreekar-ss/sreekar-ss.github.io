// GitHub Pages only serves real files, so a visit to /v1 or /v2 would 404.
// Copying the built index.html into build/v1/ and build/v2/ makes both routes
// real pages; the app then picks the version from window.location.pathname.
const fs = require("fs");
const path = require("path");

const build = path.join(__dirname, "..", "build");
const html = fs.readFileSync(path.join(build, "index.html"));

for (const route of ["v1", "v2"]) {
  fs.mkdirSync(path.join(build, route), { recursive: true });
  fs.writeFileSync(path.join(build, route, "index.html"), html);
}
console.log("postbuild: wrote build/v1/index.html and build/v2/index.html");

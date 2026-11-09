// GitHub Pages only serves real files, so routes need real index.html files.
//   build/v1/index.html → copy of the app; it renders the contact sheet design
//   build/v2/index.html → tiny redirect, since the v2 design is now the main site at "/"
const fs = require("fs");
const path = require("path");

const build = path.join(__dirname, "..", "build");
const write = (route, contents) => {
  fs.mkdirSync(path.join(build, route), { recursive: true });
  fs.writeFileSync(path.join(build, route, "index.html"), contents);
};

write("v1", fs.readFileSync(path.join(build, "index.html")));

write(
  "v2",
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="/">
<meta http-equiv="refresh" content="0; url=/">
<script>location.replace("/" + location.search + location.hash);</script>
</head>
<body><a href="/">Continue to the site</a></body>
</html>
`,
);

console.log("postbuild: wrote build/v1/index.html and the build/v2 redirect");

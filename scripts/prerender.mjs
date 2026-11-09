// Runs after both Vite builds (see "build" in package.json).
//
// 1. Writes full HTML for "/" and "/v1" so crawlers, link previews, and AI
//    tools see real content before any JavaScript runs. The client hydrates it.
// 2. Writes build/v2/index.html, a redirect to "/" (v2 became the main site).
// 3. Generates llms.txt, the JSON-LD Person schema, and sitemap.xml from
//    src/site/content.ts, so they can never drift from what the site says.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(root, "build");
const SSR = path.join(root, "build-ssr");
const SITE = "https://sreekar-ss.github.io";

const { render, routes, content } = await import(pathToFileURL(path.join(SSR, "entry-server.mjs")).href);
const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
const manifestPath = path.join(BUILD, ".vite", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const abs = (p) => new URL(p, SITE).href;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const write = (rel, data) => {
  const file = path.join(BUILD, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

// ---------- JSON-LD Person schema ----------
const { person, jobs, schools, projects, papers, headshot, resume } = content;
const current = jobs[0];
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.shortName,
  url: `${SITE}/`,
  image: abs(headshot),
  jobTitle: person.role,
  worksFor: { "@type": "Organization", name: current.org.split(", for ")[0] },
  address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
  alumniOf: schools.map((s) => ({ "@type": "CollegeOrUniversity", name: s.school })),
  sameAs: [person.linkedin, person.github],
  knowsAbout: [...new Set(jobs.flatMap((j) => j.tags).concat(projects.flatMap((p) => p.tags)))],
  subjectOf: papers.map((p) => ({ "@type": "ScholarlyArticle", name: p.title, datePublished: p.year, publisher: "IEEE" })),
};
const jsonLd = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;

// ---------- pages ----------
function cssFor(entryKey) {
  const entry = manifest[entryKey];
  if (!entry) throw new Error(`prerender: ${entryKey} missing from the Vite manifest`);
  const css = new Set(entry.css || []);
  for (const imp of entry.imports || []) for (const c of manifest[imp]?.css || []) css.add(c);
  return { css: [...css], js: entry.file };
}

// Each page is a separate chunk. Link its CSS so the pre-rendered HTML is styled
// before JavaScript runs, preload its JS, and preload the fonts used above the fold
// so text doesn't reflow when they arrive.
const pages = {
  "/": {
    entry: "src/site/CommandPalette.tsx",
    fonts: ["geist-sans-latin-400-normal", "geist-sans-latin-600-normal", "geist-mono-latin-400-normal"],
  },
  "/v1": {
    entry: "src/site/ContactSheet.tsx",
    fonts: ["barlow-condensed-latin-600-normal", "ibm-plex-sans-latin-400-normal", "ibm-plex-mono-latin-400-normal"],
  },
};
const staticFiles = fs.readdirSync(path.join(BUILD, "static"));
const fontFile = (prefix) => {
  const f = staticFiles.find((n) => n.startsWith(prefix + "-") && n.endsWith(".woff2"));
  if (!f) throw new Error(`prerender: no font file for ${prefix}`);
  return `/static/${f}`;
};

function page(route) {
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${esc(routes[route].title)}</title>`);
  const { css, js } = cssFor(pages[route].entry);
  const head = [
    ...pages[route].fonts.map((f) => `<link rel="preload" href="${fontFile(f)}" as="font" type="font/woff2" crossorigin>`),
    ...css.map((c) => `<link rel="stylesheet" href="/${c}">`),
    `<link rel="modulepreload" href="/${js}">`,
    jsonLd,
  ].join("");
  return html.replace("</head>", `${head}</head>`);
}

write("index.html", page("/"));
write("v1/index.html", page("/v1"));

// ---------- /v2 → / ----------
write(
  "v2/index.html",
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${SITE}/">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/">
<script>location.replace("/" + location.search + location.hash);</script>
</head>
<body><a href="/">Continue to the site</a></body>
</html>
`,
);

// ---------- llms.txt (https://llmstxt.org) ----------
const bullet = (s) => `- ${s}`;
const llms = [
  `# ${person.name}`,
  "",
  `> ${person.role} in ${person.location}. ${current.summary}`,
  "",
  "## Links",
  bullet(`[Website](${SITE}/)`),
  bullet(`[Resume (PDF)](${abs(resume)})`),
  bullet(`[LinkedIn](${person.linkedin})`),
  bullet(`[GitHub](${person.github})`),
  bullet(`Email: ${person.email}`),
  "",
  "## Experience",
  ...jobs.flatMap((j) => [
    "",
    `### ${j.title}, ${j.org} (${j.period})`,
    j.location,
    "",
    j.summary,
    "",
    ...j.points.map(bullet),
    "",
    `Skills: ${j.tags.join(", ")}`,
  ]),
  "",
  "## Projects",
  ...projects.flatMap((p) => [
    "",
    `### ${p.title} (${p.when})`,
    p.summary,
    ...(p.points.length ? ["", ...p.points.map(bullet)] : []),
    "",
    `Skills: ${p.tags.join(", ")}`,
    ...(p.link ? [`Link: ${p.link}`] : []),
  ]),
  "",
  "## Publications",
  ...papers.map((p) => bullet(`${p.title}. ${p.authors}. ${p.venue}. Cited ${p.cites} times. ${p.link}`)),
  "",
  "## Education",
  ...schools.map((s) => bullet(`${s.degree}, ${s.school} (${s.period}), GPA ${s.gpa}. ${s.detail}.`)),
  "",
  "## Optional",
  bullet(`[Contact sheet design of this site](${SITE}/v1/): the same content in an earlier design`),
  "",
].join("\n");
write("llms.txt", llms);

// ---------- sitemap.xml ----------
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`,
);

// The manifest and SSR bundle were only needed for this step.
fs.rmSync(path.join(BUILD, ".vite"), { recursive: true, force: true });
fs.rmSync(SSR, { recursive: true, force: true });

console.log("prerender: wrote /, /v1, /v2 redirect, llms.txt, sitemap.xml, JSON-LD");

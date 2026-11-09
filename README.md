# sreekar-ss.github.io

Personal site of Sai Sreekar Siddula: https://sreekar-ss.github.io

| Route | What's there |
|---|---|
| `/` | Main site: a searchable command palette (⌘K, Ctrl+K, or `/`) |
| `/v1/` | Earlier "contact sheet" design, with the same content |
| `/v2/` | Redirects to `/` |

## Editing content

All copy lives in **`src/site/content.ts`**: experience, projects, papers, education, photos, and links. Both designs, `llms.txt`, the JSON-LD Person schema, and the search index read from it, so edit it in one place.

- Photos: web-sized copies in `src/images/web/`
- Resume: `src/resume/Sai-Sreekar-Siddula-Resume.pdf`
- Link preview image: `public/og-image.png` (1200×630)

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm test` | Unit tests (Vitest) |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Production build into `build/` (see below) |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Manual deploy to GitHub Pages (normally automatic) |

## How the build works

1. `vite build` bundles the app into `build/`.
2. `vite build --ssr src/entry-server.tsx` bundles a server version into `build-ssr/`.
3. `scripts/prerender.mjs` uses it to:
   - write full HTML for `/` and `/v1`, so search engines, link previews, and AI tools see real content before JavaScript runs (React then hydrates it)
   - write `/v2/index.html` as a redirect to `/`
   - generate `llms.txt`, the JSON-LD Person schema, and `sitemap.xml` from `content.ts`

## Deploying

Merging to `master` deploys automatically: `.github/workflows/deploy.yml` type-checks, tests, builds, and publishes `build/` to the `gh-pages` branch. Pull requests run the same checks without deploying.

## Analytics

Privacy-friendly [GoatCounter](https://sreekar-ss.goatcounter.com): no cookies, no consent banner. Page views plus named events (resume downloads, contact clicks, outbound links, and searches that match site content). See `src/site/analytics.ts`.

import React, { useEffect, useMemo, useRef, useState } from "react";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import s from "./CommandPalette.module.css";
import {
  headshotSmall,
  jobs,
  papers,
  person,
  photos,
  projects,
  resume,
  resumeFileName,
  schools,
  totalCitations,
  Photo,
  Shot,
} from "./content";
import { usePageChrome } from "./usePageChrome";
import { trackLink, trackSearch } from "./analytics";

type Item = {
  id: string;
  group: string;
  label: string;
  hint: string;
  kicker: string;
  title: string;
  meta?: string;
  big?: string;
  bigLabel?: string;
  summary: string;
  points: string[];
  tags: string[];
  images?: Photo[];
  shots?: Shot[];
  href?: string;
  source?: string;
  hrefLabel?: string;
  download?: boolean;
  words: string;
};

function buildCatalog(): Item[] {
  const items: Item[] = [];
  jobs.forEach((j) =>
    items.push({
      id: j.id, group: "Experience", label: j.title, hint: `${j.company} · ${j.years}`,
      kicker: `Experience · ${j.period}`, title: j.headline, meta: `${j.org} · ${j.location}`,
      big: j.big, bigLabel: j.bigLabel, summary: j.summary, points: j.points, tags: j.tags,
      words: `${j.org} ${j.title} job work experience ${j.tags.join(" ")} ${j.summary} ${j.points.join(" ")}`,
    }),
  );
  projects.forEach((p) =>
    items.push({
      id: p.id, group: "Projects", label: p.title, hint: `${p.tags[0]} · ${p.when}`,
      kicker: `Project · ${p.context} · ${p.when}`, title: p.title, summary: p.summary, points: p.points, tags: p.tags,
      href: p.link, hrefLabel: p.linkLabel, source: p.source, shots: p.shots, words: `${p.slug} project built ${p.tags.join(" ")} ${p.summary} ${p.points.join(" ")}`,
    }),
  );
  papers.forEach((p) =>
    items.push({
      id: p.id, group: "Publications", label: p.title, hint: `${p.cites} cites`,
      kicker: p.venue, title: p.title, meta: `First author · ${p.authors}`, big: p.cites, bigLabel: "citations",
      summary: p.summary, points: [], tags: ["IoT", "Research"], href: p.link, hrefLabel: "Find on Google Scholar",
      words: "paper papers publication research ieee dam water iot citations scholar",
    }),
  );
  items.push({
    id: "photos", group: "Photography", label: "Browse photography", hint: `${photos.length} photos`,
    kicker: "Off the clock", title: "Photography", summary: "Landscapes, cities, and night skies, mostly around New England.",
    points: [], tags: [], images: photos.slice(0, 6), href: "#photos", hrefLabel: "Open gallery",
    words: "photo photos photography camera pictures gallery hobby " + photos.map((p) => p.title).join(" "),
  });
  schools.forEach((sc) =>
    items.push({
      id: sc.id, group: "Education", label: `${sc.degree.split(",")[0]}, ${sc.school}`, hint: `GPA ${sc.gpa}`,
      kicker: `Education · ${sc.period}`, title: sc.degree, meta: `${sc.school} · ${sc.location}`, big: sc.gpa, bigLabel: "GPA",
      summary: sc.detail + ".", points: [], tags: sc.coursework, words: `education school degree university ${sc.school}`,
    }),
  );
  items.push(
    { id: "resume", group: "Actions", label: "Download resume", hint: "PDF", kicker: "Action", title: "Download resume", summary: "The one-page version of everything here.", points: [], tags: [], href: resume, hrefLabel: "Download PDF", download: true, words: "resume cv download pdf hire" },
    { id: "email", group: "Actions", label: "Send an email", hint: person.email, kicker: "Action", title: "Get in touch", summary: "The fastest way to reach me about a role, a project, or photography.", points: [], tags: [], href: `mailto:${person.email}`, hrefLabel: "Write email", words: "contact email hire reach message touch" },
    { id: "linkedin", group: "Actions", label: "Open LinkedIn", hint: `in/${person.linkedinHandle}`, kicker: "Action", title: "LinkedIn", summary: "History, recommendations, and a way to connect.", points: [], tags: [], href: person.linkedin, hrefLabel: "Open LinkedIn", words: "linkedin connect contact social" },
    { id: "github", group: "Actions", label: "Open GitHub", hint: person.githubHandle, kicker: "Action", title: "GitHub", summary: "Code and experiments that live in public, including the source for this site.", points: [], tags: [], href: person.github, hrefLabel: "Open GitHub", words: "github code source repo open" },
  );
  return items;
}

function search(catalog: Item[], raw: string): Item[] {
  const q = raw.trim().toLowerCase();
  if (!q) return catalog;
  const hay = (x: Item) => `${x.label} ${x.hint} ${x.words} ${x.tags.join(" ")}`.toLowerCase();
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  const found = catalog.filter((x) => hay(x).includes(q) || terms.some((t) => hay(x).includes(t)));
  found.push({
    id: "ask", group: "Ask", label: `Ask: “${raw.trim()}”`, hint: "Email", kicker: "Ask about my work",
    title: "Ask me directly", meta: "An AI answer is on the roadmap",
    summary: "Until then, send the question my way and I’ll answer it myself.",
    points: [], tags: [], href: `mailto:${person.email}?subject=${encodeURIComponent("Question from your site")}&body=${encodeURIComponent(raw.trim())}`,
    hrefLabel: "Email this question", words: "",
  });
  return found;
}

const isExternal = (href: string) => /^https?:/.test(href);

const jobHashes = ["a7f3c21", "4be90d8", "19c2e5a", "0d81f47"];

function Tags({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className={s.tags} aria-label="Tags">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Points({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className={s.points}>
      {items.map((t) => <li key={t}><span aria-hidden="true">+</span><span>{t}</span></li>)}
    </ul>
  );
}

const DEFAULT_PLACEHOLDER = "Search or ask a question";
const EXAMPLES = ["react", "vaccine scheduling", "papers", "photos", "resume"];

/**
 * Types example searches into the placeholder so visitors see the box is
 * searchable. Runs only while the box is empty and unfocused, stops after two
 * rounds on the default text, and never runs for people who prefer reduced motion.
 */
function useTypingPlaceholder(query: string, inputRef: React.RefObject<HTMLInputElement>) {
  const [text, setText] = useState(DEFAULT_PLACEHOLDER);
  useEffect(() => {
    if (query) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const input = inputRef.current;
    if (input && document.activeElement === input) return;
    let timer = 0;
    let stopped = false;
    const stop = () => { stopped = true; window.clearTimeout(timer); setText(DEFAULT_PLACEHOLDER); };
    input?.addEventListener("focus", stop);

    const frames: [string, number][] = [];
    for (let round = 0; round < 2; round++) {
      for (const word of EXAMPLES) {
        const full = `Try “${word}”`;
        for (let i = 5; i <= full.length; i++) frames.push([full.slice(0, i), 70]);
        frames.push([full, 1400]);
      }
    }
    frames.push([DEFAULT_PLACEHOLDER, 0]);

    let i = 0;
    const tick = () => {
      if (stopped || i >= frames.length) return;
      const [value, wait] = frames[i++];
      setText(value);
      timer = window.setTimeout(tick, wait);
    };
    timer = window.setTimeout(tick, 1800);
    return () => { stopped = true; window.clearTimeout(timer); input?.removeEventListener("focus", stop); };
  }, [query, inputRef]);
  return text;
}

export default function CommandPalette() {
  usePageChrome("Sai Sreekar Siddula · Senior Software Engineer", "#15132B");
  const catalog = useMemo(buildCatalog, []);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Pre-rendered HTML says "Ctrl K"; switch to "⌘K" after hydration on Apple devices,
  // so the server and first client render match.
  const [isMac, setIsMac] = useState(false);
  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  const results = useMemo(() => search(catalog, query), [catalog, query]);

  // Count searches that matched real content; the "Ask" row doesn't count as a match.
  useEffect(() => {
    trackSearch(query, results.filter((r) => r.id !== "ask").length);
  }, [query, results]);
  const sel = results.find((x) => x.id === activeId) ?? results[0];
  const groups = useMemo(() => {
    const names: string[] = [];
    results.forEach((x) => { if (!names.includes(x.group)) names.push(x.group); });
    return names.map((name) => ({ name, items: results.filter((x) => x.group === name) }));
  }, [results]);

  // ⌘K / Ctrl+K / "/" jumps to the search box from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /INPUT|TEXTAREA/.test(e.target.tagName);
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the highlighted row visible inside the list when arrow keys move it.
  // This scrolls the list box directly: element.scrollIntoView() would also move
  // the browser's keyboard starting point, so the first Tab would skip the header.
  const arrowMoved = useRef(false);
  useEffect(() => {
    const list = listRef.current;
    if (!sel || !list || !arrowMoved.current) return;
    const el = list.querySelector<HTMLElement>(`[data-id="${sel.id}"]`);
    if (!el) return;
    const box = list.getBoundingClientRect();
    const row = el.getBoundingClientRect();
    if (row.top < box.top) list.scrollTop -= box.top - row.top + 8;
    else if (row.bottom > box.bottom) list.scrollTop += row.bottom - box.bottom + 8;
  }, [sel]);

  // On phones the preview stacks under the list; its details start collapsed.
  const [detailsOpen, setDetailsOpen] = useState(false);
  useEffect(() => setDetailsOpen(false), [sel?.id]);

  const placeholder = useTypingPlaceholder(query, inputRef);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (lightbox !== null && !d.open) d.showModal();
    if (lightbox === null && d.open) d.close();
  }, [lightbox]);

  const open = (item: Item) => {
    if (!item.href) return;
    if (item.href.startsWith("#")) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const a = document.createElement("a");
    a.href = item.href;
    if (item.download) a.download = resumeFileName;
    if (isExternal(item.href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    // This link never joins the page, so the page-wide click listener can't see it.
    trackLink(item.href, item.download);
    a.click();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setQuery(""); setActiveId(null); return; }
    if (e.key === "Enter") { e.preventDefault(); if (sel) open(sel); return; }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    arrowMoved.current = true;
    const at = Math.max(0, results.findIndex((x) => x.id === sel.id));
    const next = results[(at + (e.key === "ArrowDown" ? 1 : -1) + results.length) % results.length];
    setActiveId(next.id);
  };

  const stats = [
    { value: "6+ yrs", label: "shipping React in production" },
    { value: "10,000", label: "stores run code I work on" },
    { value: "69", label: "API failure paths, each one tested" },
    { value: String(totalCitations), label: "citations on two IEEE papers" },
  ];

  const step = (d: number) =>
    setLightbox((i) => (i === null ? null : (i + d + photos.length) % photos.length));

  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <header className={s.header}>
          <a href="#top" className={s.brand}><span className={s.accent}>~/</span>sreekar</a>
          <nav aria-label="Main" className={s.nav}>
            <a href="#log" className={s.navWide}>experience</a>
            <a href="#projects" className={s.navWide}>projects</a>
            <a href="#papers" className={s.navWide}>papers</a>
            <a href="#photos" className={s.navWide}>photos</a>
            <a href="#contact">contact</a>
            <a href={resume} download={resumeFileName}>resume</a>
            <button type="button" className={s.kbdBtn} onClick={() => inputRef.current?.focus()}>
              search <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
          </nav>
        </header>

        <main id="main">
        <section id="top" className={s.hero}>
          <div className={s.who}>
            <img src={headshotSmall} alt="" width={52} height={52} />
            <div>
              <div>{person.name}</div>
              <div className={s.dim}>{person.role} · {person.location}</div>
            </div>
          </div>
          <h1 className={s.h1}>I build the frontends people <span className={s.accent}>rely on all day.</span></h1>
          <p className={s.lede}>
            Six-plus years building large, production React and TypeScript apps. Right now I lead the
            most complex app on CVS Health’s pharmacy platform, used in 10,000 stores. Search for anything
            below, or just scroll.
          </p>
          <div className={s.ctas}>
            <a href={resume} download={resumeFileName} className={s.ctaPrimary}>Download resume</a>
            <a href={`mailto:${person.email}`} className={s.ctaSecondary}>Email me</a>
          </div>
        </section>

        <div className={s.palette}>
          <div className={s.searchRow}>
            <span aria-hidden="true" className={s.prompt}>&gt;</span>
            <label htmlFor="palette-search" className={s.srOnly}>Search Sreekar’s portfolio</label>
            <input
              ref={inputRef}
              id="palette-search"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={sel ? `opt-${sel.id}` : undefined}
              autoComplete="off"
              spellCheck={false}
              placeholder={placeholder}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveId(null); }}
              onKeyDown={onInputKey}
            />
            <span className={s.count} aria-live="polite">
              {query.trim() ? `${results.filter((r) => r.id !== "ask").length} results` : ""}
            </span>
          </div>

          <div className={s.paletteBody}>
            <div ref={listRef} id="palette-list" role="listbox" aria-label="Results" className={s.list}>
              {groups.map((g) => (
                <div key={g.name} role="group" aria-labelledby={`grp-${g.name}`}>
                  <div id={`grp-${g.name}`} className={s.groupName}>{g.name}</div>
                  {g.items.map((item) => {
                    const active = item.id === sel.id;
                    return (
                      <div
                        key={item.id}
                        id={`opt-${item.id}`}
                        data-id={item.id}
                        role="option"
                        aria-selected={active}
                        className={`${s.option} ${active ? s.optionActive : ""}`}
                        onClick={() => setActiveId(item.id)}
                        onDoubleClick={() => open(item)}
                      >
                        <span aria-hidden="true" className={s.caret}>{active ? "›" : ""}</span>
                        <span className={s.optLabel}>{item.label}</span>
                        <span className={s.optHint}>{item.hint}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* tabIndex lets keyboard users scroll the preview when it overflows. */}
            <aside
              aria-label="Preview"
              aria-live="polite"
              tabIndex={0}
              className={s.preview}
              data-collapsed={!detailsOpen && (sel.points.length > 0 || sel.tags.length > 0) ? "true" : undefined}
            >
              <p className={s.kicker}>{sel.kicker}</p>
              <h2 className={s.previewTitle}>{sel.title}</h2>
              {sel.meta && <p className={s.previewMeta}>{sel.meta}</p>}
              {sel.big && (
                <p className={s.big}>{sel.big} <span>{sel.bigLabel}</span></p>
              )}
              <p className={s.previewBody}>{sel.summary}</p>
              {sel.images && (
                <div className={s.thumbs}>
                  {sel.images.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Open ${p.title}`}
                      onClick={() => setLightbox(photos.indexOf(p))}
                    >
                      <img src={p.small} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              {sel.shots && sel.shots.length > 0 && (
                <div className={s.shots}>
                  {sel.shots.slice(0, 3).map((shot) => (
                    <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                  ))}
                </div>
              )}
              {(sel.points.length > 0 || sel.tags.length > 0) && !detailsOpen && (
                <button type="button" className={s.moreBtn} onClick={() => setDetailsOpen(true)}>
                  Show details
                </button>
              )}
              <div className={s.details}>
                <Points items={sel.points} />
                <Tags items={sel.tags} />
              </div>
              {sel.href && (
                <a
                  href={sel.href}
                  className={s.go}
                  {...(sel.download ? { download: resumeFileName } : {})}
                  {...(isExternal(sel.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {sel.hrefLabel} <kbd>↵</kbd>
                </a>
              )}
              {sel.source && (
                <a href={sel.source} target="_blank" rel="noopener noreferrer" className={s.sourceLink}>
                  Source on GitHub ↗
                </a>
              )}
            </aside>
          </div>

          <div className={s.hints} aria-hidden="true">
            <span><kbd>↑ ↓</kbd> move</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>esc</kbd> clear</span>
            <span><kbd>/</kbd> or <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd> search from anywhere</span>
          </div>
        </div>

        <dl className={s.stats}>
          {stats.map((st) => (
            <div key={st.label}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>

        <section id="log" aria-labelledby="log-h" className={s.block}>
          <p className={s.cmd}><span className={s.accent}>$</span> git log --author=sreekar</p>
          <h2 id="log-h" className={s.h2}>Experience</h2>
          <ol className={s.log}>
            {jobs.map((j, i) => (
              <li key={j.id} className={s.commit}>
                <div aria-hidden="true" className={s.rail}>
                  <span className={i === 0 ? s.dotHead : s.dot} />
                  <span className={s.line} />
                </div>
                <div className={s.commitBody}>
                  <p className={s.commitMeta}>
                    <span className={s.hash}>{jobHashes[i]}</span> <span className={s.dim}>{j.period}</span>{" "}
                    {i === 0 && <span className={s.accent}>(HEAD → current)</span>}
                    {i === jobs.length - 1 && <span className={s.accent}>(tag: first-commit)</span>}
                  </p>
                  <h3 className={s.h3}>{j.title} <span className={s.dim}>@ {j.org}</span></h3>
                  <Points items={j.points} />
                  <Tags items={j.tags} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" aria-labelledby="proj-h" className={s.block}>
          <p className={s.cmd}><span className={s.accent}>$</span> ls ~/projects</p>
          <h2 id="proj-h" className={s.h2}>Projects</h2>
          <div className={s.cards}>
            {projects.map((p, i) => {
              const featured = i === 0;
              return (
                <article key={p.id} className={`${s.card} ${featured ? s.cardFeatured : ""}`}>
                  <div className={s.cardTop}>
                    <span className={s.accent}>{p.slug}/</span>
                    <span>{featured ? "featured · " : ""}{p.when}</span>
                  </div>
                  <h3 className={featured ? s.h3Big : s.h3}>{p.title}</h3>
                  <p className={s.cardBody}>{p.summary}</p>
                  {featured && <Points items={p.points} />}
                  <Tags items={p.tags} />
                  <div className={s.cardLinks}>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className={s.textLink}>{p.linkLabel} ↗</a>
                    )}
                    {p.source && (
                      <a href={p.source} target="_blank" rel="noopener noreferrer" className={s.textLink}>Source ↗</a>
                    )}
                  </div>
                </article>
              );
            })}
            <a href={person.github} target="_blank" rel="noopener noreferrer" className={s.cardMore}>
              <span className={s.cardTop}><span className={s.accent}>$ ls ~/projects --all</span></span>
              <span className={s.h3}>More on GitHub</span>
              <span className={s.cardBody}>Experiments, coursework, and the source for this site.</span>
              <span className={s.moreCta}>github.com/{person.githubHandle} ↗</span>
            </a>
          </div>
        </section>

        <section id="papers" aria-labelledby="pap-h" className={s.block}>
          <p className={s.cmd}><span className={s.accent}>$</span> cat papers.bib</p>
          <h2 id="pap-h" className={s.h2}>Publications</h2>
          <div className={s.bibs}>
            {papers.map((p) => (
              <article key={p.id} className={s.bib}>
                <div><span className={s.hash}>@inproceedings</span>{"{"}<span className={s.accent}>{p.key}</span>,</div>
                <div className={s.field}>title = {"{"}<span className={s.bright}>{p.title}</span>{"}"},</div>
                <div className={s.field}>venue = {"{"}{p.venue}{"}"},</div>
                <div className={s.field}>author = {"{"}{p.shortAuthors}{"}"},</div>
                <div className={s.field}>cited_by = <span className={s.cites}>{p.cites}</span>,</div>
                <div className={s.field}>url = {"{"}<a href={p.link} target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>{"}"}</div>
                <div>{"}"}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="photos" aria-labelledby="ph-h" className={s.block}>
          <p className={s.cmd}><span className={s.accent}>$</span> open ~/photos</p>
          <div className={s.photoHead}>
            <h2 id="ph-h" className={s.h2}>When I’m not coding</h2>
            <p className={s.dim}>Landscapes, cities, and night skies, mostly around New England.</p>
          </div>
          <ul className={s.gallery}>
            {photos.map((p, i) => (
              <li key={p.id}>
                <button type="button" onClick={() => setLightbox(i)} aria-label={`Open ${p.title}`}>
                  <img
                    src={p.small}
                    srcSet={p.srcSet}
                    sizes="(min-width: 1000px) 370px, (min-width: 600px) 50vw, 100vw"
                    width={p.width}
                    height={p.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <p className={s.caption}><span className={s.bright}>{p.id}.jpg</span><span>{p.title}</span></p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="ct-h" className={s.contact}>
          <p className={s.cmd}><span className={s.accent}>$</span> whoami --contact</p>
          <h2 id="ct-h" className={s.h2Big}>Let’s build something <span className={s.accent}>worth using.</span></h2>
          <dl className={s.term}>
            <div><dt>email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></div>
            <div><dt>linkedin</dt><dd><a href={person.linkedin} target="_blank" rel="noopener noreferrer">in/{person.linkedinHandle}</a></dd></div>
            <div><dt>github</dt><dd><a href={person.github} target="_blank" rel="noopener noreferrer">{person.githubHandle}</a></dd></div>
            <div><dt>location</dt><dd>{person.location}</dd></div>
            <div><dt>resume</dt><dd><a href={resume} download={resumeFileName}>{resumeFileName}</a></dd></div>
          </dl>
          <p className={s.cursorLine} aria-hidden="true"><span className={s.accent}>$</span> <span className={s.cursor} /></p>
          <p className={s.colophon}>© {new Date().getFullYear()} {person.name} · built with React · press {isMac ? "⌘K" : "Ctrl K"} anywhere</p>
        </section>
        </main>
      </div>

      <dialog
        ref={dialogRef}
        className={s.lightbox}
        aria-label={lightbox !== null ? photos[lightbox].title : "Photo"}
        onClose={() => setLightbox(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {lightbox !== null && (
          <figure>
            <img src={photos[lightbox].src} alt={photos[lightbox].title} />
            <figcaption>
              <span>{photos[lightbox].id}.jpg · {photos[lightbox].title}</span>
              <span className={s.lbControls}>
                <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>←</button>
                <button type="button" aria-label="Next photo" onClick={() => step(1)}>→</button>
                <button type="button" aria-label="Close" onClick={() => setLightbox(null)}>esc</button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </div>
  );
}

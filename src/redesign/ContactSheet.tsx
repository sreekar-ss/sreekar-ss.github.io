import React, { useMemo, useRef, useState } from "react";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/permanent-marker/400.css";
import s from "./ContactSheet.module.css";
import {
  headshot,
  jobs,
  papers,
  person,
  photoById,
  projects,
  resume,
  schools,
  totalCitations,
} from "./content";
import { usePageChrome } from "./usePageChrome";

type Frame = {
  id: string;
  kind: "work" | "photo";
  title: string;
  kicker: string;
  note: string;
  summary?: string;
  points: string[];
  tags: string[];
  // photo frames
  img?: string;
  // work frames
  short?: string;
  tag?: string;
  color?: string;
  big?: string;
  bigLabel?: string;
  link?: string;
  linkLabel?: string;
};

const job = (id: string) => jobs.find((j) => j.id === id)!;
const project = (id: string) => projects.find((p) => p.id === id)!;

function photoFrame(id: string, note = "keeper"): Frame {
  const p = photoById(id);
  return { id, kind: "photo", img: p.src, title: p.title, kicker: "Photograph", note, points: [], tags: [] };
}

function buildFrames(): Frame[] {
  const cvs = job("cvs");
  const ductus = job("ductus");
  const sushi = project("sushi");
  const flood = project("flood");
  const lms = project("lms");
  return [
    {
      id: "cvs", kind: "work", short: "Rebuilding a pharmacy app", tag: "CVS Health", color: "#7A2E25",
      big: cvs.big, bigLabel: cvs.bigLabel, note: "start here", kicker: "Branding Brand · for CVS Health · 2025 → now",
      title: cvs.headline, summary: cvs.summary, points: cvs.points.slice(1), tags: cvs.tags,
    },
    photoFrame("aurora"),
    photoFrame("dawn"),
    {
      id: "ductus", kind: "work", short: "10+ apps, one client", tag: "Ductus", color: "#2B3A36",
      big: ductus.big, bigLabel: ductus.bigLabel, note: "three good years", kicker: "Ductus · 2020 → 2024",
      title: ductus.headline, summary: ductus.summary, points: ductus.points.slice(1), tags: ductus.tags,
    },
    photoFrame("bridge"),
    {
      id: "papers", kind: "work", short: `Dams, sensors, and ${papers[0].cites} citations`, tag: "IEEE · 2018", color: "#2F3442",
      big: String(totalCitations), bigLabel: "citations across two papers", note: "first author", kicker: "IEEE IoT-SIU and IACC · 2018",
      title: "Monitoring dam water levels with IoT",
      summary: "First-author research on collecting real-time water-level data and sending it to a central command center that decides when to open the gates.",
      points: papers.map((p) => `${p.title}, ${p.venue}, cited ${p.cites} times`), tags: ["IoT", "Sensors", "Research"],
    },
    photoFrame("lighthouse"),
    photoFrame("milkyway", "long exposure"),
    {
      id: "sushi", kind: "work", short: "Teaching AI to play Sushi Go", tag: "Northeastern", color: "#3F3350",
      big: "Q", bigLabel: "learning, and minimax", note: "fun one", kicker: `${sushi.context} · ${sushi.when}`,
      title: sushi.title, summary: sushi.summary, points: sushi.points, tags: sushi.tags, link: sushi.link, linkLabel: sushi.linkLabel,
    },
    photoFrame("skyline", "home"),
    {
      id: "flood", kind: "work", short: "Flood control with IoT", tag: "Northeastern", color: "#27404A",
      big: "CoAP", bigLabel: "device → gateway → cloud", note: "hardware!", kicker: `${flood.context} · ${flood.when}`,
      title: flood.title, summary: flood.summary, points: flood.points, tags: flood.tags, link: flood.link, linkLabel: flood.linkLabel,
    },
    photoFrame("fog"),
    photoFrame("train"),
    {
      id: "lms", kind: "work", short: "One LMS, two stacks", tag: "Northeastern", color: "#403A2B",
      big: "×2", bigLabel: "front ends and back ends", note: "full stack", kicker: `${lms.context} · ${lms.when}`,
      title: lms.title, summary: lms.summary, points: lms.points, tags: lms.tags,
    },
    photoFrame("pier"),
    photoFrame("dusk"),
    photoFrame("bikes"),
    photoFrame("flower"),
  ];
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "photo", label: "Photos" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

const edge = (i: number) => String(i + 1).padStart(2, "0") + "A";

function Marker({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 200" preserveAspectRatio="none" className={className}>
      <path
        d="M28 34 C92 2 228 -2 278 30 C306 62 300 150 268 176 C206 204 74 202 26 172 C-4 132 -2 62 40 24"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Tags({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className={s.tags} aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className={s.tag}>{t}</li>
      ))}
    </ul>
  );
}

function Points({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className={s.points}>
      {items.map((t) => (
        <li key={t}><span aria-hidden="true">—</span><span>{t}</span></li>
      ))}
    </ul>
  );
}

export default function ContactSheet() {
  usePageChrome("Sreekar Siddula · Contact sheet", "#141311");
  const allFrames = useMemo(buildFrames, []);
  const [filter, setFilter] = useState<FilterId>("all");
  const [pickedId, setPickedId] = useState("cvs");
  const loupeRef = useRef<HTMLElement>(null);

  // Frame numbers stay tied to the full roll, like real edge print.
  const numbered = useMemo(() => allFrames.map((f, i) => ({ ...f, edge: edge(i) })), [allFrames]);
  const visible = numbered.filter((f) => filter === "all" || f.kind === filter);
  const sel = visible.find((f) => f.id === pickedId) ?? visible[0];
  const at = visible.indexOf(sel);

  const pick = (id: string, reveal: boolean) => {
    setPickedId(id);
    if (!reveal) return;
    const el = loupeRef.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight * 0.75) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const step = (d: number) => pick(visible[(at + d + visible.length) % visible.length].id, false);

  const onSheetKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  const stats = [
    { value: "6+ years", label: "Building for the web" },
    { value: "10,000", label: "Stores run code I work on" },
    { value: String(totalCitations), label: "Citations, two IEEE papers" },
    { value: `${numbered.filter((f) => f.kind === "photo").length} frames`, label: "Of photographs on this roll" },
  ];

  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <header className={s.header}>
          <a href="#top" className={s.brand}>
            {person.name} <span className={s.amber}>/ Roll 26</span>
          </a>
          <nav aria-label="Main" className={s.nav}>
            <a href="#sheet">Sheet</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#papers">Papers</a>
            <a href="#contact">Contact</a>
            <a href={resume} download="Sreekar-Resume.pdf" className={s.navCta}>Resume ↓</a>
          </nav>
        </header>

        <section id="top" className={s.hero}>
          <div className={s.heroText}>
            <p className={s.kicker}>{person.role} · {person.location}</p>
            <h1 className={s.heroTitle}>
              I build software.<br />I photograph<br /><span className={s.amber}>everything else.</span>
            </h1>
            <p className={s.lede}>
              I build user-centric web applications in React, with a focus on frontend architecture,
              accessibility, and mentoring the people around me. Right now I’m helping modernize the
              pharmacy software CVS Health uses in 10,000 stores.
            </p>
            <div className={s.ctas}>
              <a href="#sheet" className={s.btnSolid}>See the contact sheet</a>
              <a href="#contact" className={s.btnLine}>Get in touch</a>
            </div>
          </div>
          <figure className={s.self}>
            <div className={s.selfFrame}>
              <img src={headshot} alt={`${person.shortName} standing on a lawn, smiling`} />
              <figcaption className={s.edgeRow}><span>00A</span><span>Self</span></figcaption>
            </div>
            <Marker className={s.selfMarker} />
            <p className={s.selfNote} aria-hidden="true">that’s me</p>
          </figure>
        </section>

        <dl className={s.stats}>
          {stats.map((st) => (
            <div key={st.label} className={s.stat}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>

        <section id="sheet" aria-labelledby="sheet-h" className={s.sheetSection}>
          <div className={s.sectionHead}>
            <div>
              <h2 id="sheet-h" className={s.h2}>The contact sheet</h2>
              <p className={s.sub}>Work and photographs on one roll. Pick any frame to look closer.</p>
            </div>
            <div role="group" aria-label="Filter frames" className={s.filters}>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  className={s.filter}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.film} onKeyDown={onSheetKey}>
            <div aria-hidden="true" className={s.filmEdge}>
              <span>Kodak-ish 400TX</span>
              <span className={s.hideSm}>Sreekar · 2018 → now</span>
              <span>{visible.length} exp</span>
            </div>
            <ul className={s.grid}>
              {visible.map((f) => {
                const active = f.id === sel.id;
                return (
                  <li key={f.id} className={s.cell}>
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={`Frame ${f.edge}: ${f.title}`}
                      className={`${s.frame} ${active ? s.frameActive : ""}`}
                      style={f.kind === "work" ? { background: f.color } : undefined}
                      onClick={() => pick(f.id, true)}
                    >
                      {f.kind === "photo" ? (
                        <img src={f.img} alt="" loading="lazy" />
                      ) : (
                        <span className={s.workFace}>
                          <span className={s.workTag}>{f.tag}</span>
                          <span className={s.workShort}>{f.short}</span>
                        </span>
                      )}
                    </button>
                    {active && <Marker className={s.frameMarker} />}
                    <div className={s.edgeRow} aria-hidden="true">
                      <span>{f.edge}</span>
                      <span>{f.kind === "work" ? "Work" : "Photo"}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section ref={loupeRef} aria-label="Selected frame" aria-live="polite" className={s.loupe}>
          <div className={s.loupeVisual}>
            <div className={s.loupeFrame}>
              {sel.kind === "photo" ? (
                <img src={sel.img} alt={sel.title} />
              ) : (
                <div className={s.loupeWork} style={{ background: sel.color }}>
                  <span className={s.workTag}>{sel.tag}</span>
                  <span className={s.loupeBig}>{sel.big}</span>
                  <span className={s.workTag}>{sel.bigLabel}</span>
                </div>
              )}
            </div>
            <div className={s.edgeRow} aria-hidden="true">
              <span>Loupe · {sel.edge}</span>
              <span>{at + 1} of {visible.length}</span>
            </div>
          </div>
          <div className={s.loupeText}>
            <p className={s.note} aria-hidden="true">{sel.note}</p>
            <p className={s.meta}>{sel.kicker}</p>
            <h2 className={s.loupeTitle}>{sel.title}</h2>
            {sel.summary && <p className={s.body}>{sel.summary}</p>}
            <Points items={sel.points} />
            <Tags items={sel.tags} />
            {sel.link && (
              <a href={sel.link} target="_blank" rel="noopener noreferrer" className={s.textLink}>
                {sel.linkLabel} ↗
              </a>
            )}
            <div className={s.stepper}>
              <button type="button" aria-label="Previous frame" onClick={() => step(-1)}>←</button>
              <button type="button" aria-label="Next frame" onClick={() => step(1)}>→</button>
            </div>
          </div>
        </section>

        <section id="experience" aria-labelledby="exp-h" className={s.block}>
          <div className={s.sectionHead}>
            <h2 id="exp-h" className={s.h2}>The rolls</h2>
            <p className={s.meta}>Experience · {jobs.length} rolls · 2018 → now</p>
          </div>
          {jobs.map((j, i) => (
            <article key={j.id} className={s.roll}>
              <div className={s.rollWhen}>
                <p className={s.amberMono}>Roll {String(jobs.length - i).padStart(2, "0")}</p>
                <p className={s.rollYears}>{j.years}</p>
                <p className={s.meta}>{j.period}</p>
              </div>
              <div className={s.rollBody}>
                <h3 className={s.h3}>{j.title}</h3>
                <p className={s.muted}>{j.org} · {j.location}</p>
                <Points items={j.points} />
                <Tags items={j.tags} />
              </div>
            </article>
          ))}
        </section>

        <section id="projects" aria-labelledby="proj-h" className={s.block}>
          <div className={s.sectionHead}>
            <h2 id="proj-h" className={s.h2}>Outtakes</h2>
            <p className={s.meta}>Side and school projects</p>
          </div>
          <div className={s.cards}>
            {projects.map((p, i) => (
              <article key={p.id} className={s.card}>
                <div className={s.edgeRow}>
                  <span>OT-{String(i + 1).padStart(2, "0")}</span>
                  <span>{p.when}</span>
                </div>
                <h3 className={s.h3}>{p.title}</h3>
                <p className={s.cardBody}>{p.summary}</p>
                <Tags items={p.tags} />
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={s.textLink}>
                    {p.linkLabel} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="papers" aria-labelledby="pap-h" className={s.block}>
          <div className={s.sectionHead}>
            <h2 id="pap-h" className={s.h2}>In print</h2>
            <p className={s.meta}>IEEE publications · 2018</p>
          </div>
          <div className={s.prints}>
            {papers.map((p) => (
              <article key={p.id} className={s.print}>
                <div className={s.printCites}>
                  <p className={s.printNum}>{p.cites}</p>
                  <p className={s.printLabel}>Citations</p>
                </div>
                <div>
                  <p className={s.printLabel}>{p.venue}</p>
                  <h3 className={s.printTitle}>{p.title}</h3>
                  <p className={s.printBody}>{p.summary}</p>
                  <p className={s.printAuthors}>{p.authors}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="edu-h" className={`${s.block} ${s.edu}`}>
          <h2 id="edu-h" className={s.h2}>Developed at</h2>
          <div className={s.schools}>
            {schools.map((sc) => (
              <div key={sc.id}>
                <p className={s.amberMono}>{sc.period}</p>
                <h3 className={s.h3}>{sc.school}</h3>
                <p>{sc.degree}</p>
                <p className={s.muted}>{sc.detail}</p>
                <p className={s.gpa}>GPA {sc.gpa}</p>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <p className={s.note} aria-hidden="true">open to good conversations</p>
          <h2 className={s.footerTitle}>Next frame?</h2>
          <div className={s.contactGrid}>
            <a href={`mailto:${person.email}`}><span>Email</span>{person.email}</a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span>{person.linkedinHandle} ↗</a>
            <a href={person.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span>{person.githubHandle} ↗</a>
            <a href={resume} download="Sreekar-Resume.pdf"><span>Resume</span>Download PDF ↓</a>
          </div>
          <p className={s.colophon}>© {new Date().getFullYear()} {person.name} · Built in React · Based in {person.location}</p>
        </footer>
      </div>
    </div>
  );
}

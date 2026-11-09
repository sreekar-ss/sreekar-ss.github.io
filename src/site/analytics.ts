// Privacy-friendly analytics with GoatCounter (https://www.goatcounter.com).
// No cookies and no personal data, so no consent banner is needed.
//
// Page views are counted automatically when the script loads. On top of that,
// clicks are sorted into a few named events (see `classify`), and palette
// searches are counted only when they match something on the site; free-text
// questions are never sent.
//
// To turn analytics on, set GOATCOUNTER_CODE to your GoatCounter site code
// (the part before .goatcounter.com). Leave it empty to disable everything.
// GoatCounter ignores localhost on its own, so local development isn't counted.

export const GOATCOUNTER_CODE = "";

type GoatCounter = {
  count: (vars: { path: string; title?: string; event?: boolean }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter & { no_onload?: boolean };
  }
}

type Hit = { path: string; title: string };
const queue: Hit[] = [];

function ready(): GoatCounter | null {
  const gc = window.goatcounter;
  return gc && typeof gc.count === "function" ? gc : null;
}

function flush() {
  const gc = ready();
  if (!gc) return;
  while (queue.length) {
    const hit = queue.shift() as Hit;
    gc.count({ ...hit, event: true });
  }
}

/** Record a named event, such as "resume-download". Safe to call before the script loads. */
export function track(path: string, title = path) {
  if (!GOATCOUNTER_CODE) return;
  queue.push({ path, title });
  flush();
}

/** Turn a clicked link into an event name, or null if it isn't worth counting. */
export function classify(a: HTMLAnchorElement): Hit | null {
  const href = a.getAttribute("href") || "";
  if (a.hasAttribute("download") || /resume/i.test(href)) {
    return { path: "resume-download", title: "Resume download" };
  }
  if (href.startsWith("mailto:")) {
    return { path: "contact/email", title: "Contact: email" };
  }
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin === window.location.origin) return null;
  const host = url.hostname.replace(/^www\./, "");
  if (host === "linkedin.com") return { path: "contact/linkedin", title: "Contact: LinkedIn" };
  if (host === "github.com" && url.pathname.replace(/\/+$/, "") === "/sreekar-ss") {
    return { path: "contact/github", title: "Contact: GitHub profile" };
  }
  if (host === "scholar.google.com") return { path: "out/scholar", title: "Paper: Google Scholar" };
  const path = `out/${host}${url.pathname}`.replace(/\/+$/, "");
  return { path, title: `Outbound: ${host}${url.pathname}`.replace(/\/+$/, "") };
}

/** Count a link's click by its href (for links opened from code, not clicked). */
export function trackLink(href: string, download = false) {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  if (download) a.setAttribute("download", "");
  const hit = classify(a);
  if (hit) track(hit.path, hit.title);
}

let searchTimer: number | undefined;

/**
 * Count a palette search once the visitor stops typing. Only searches that
 * matched real content are sent, lower-cased and capped in length.
 */
export function trackSearch(query: string, matched: number) {
  window.clearTimeout(searchTimer);
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (!GOATCOUNTER_CODE || q.length < 2 || q.length > 40 || matched === 0) return;
  searchTimer = window.setTimeout(() => track(`search/${q}`, `Search: ${q}`), 1500);
}

let started = false;

/** Load GoatCounter and start counting clicks. Call once at startup. */
export function initAnalytics() {
  if (started || !GOATCOUNTER_CODE) return;
  started = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  script.addEventListener("load", flush);
  document.head.appendChild(script);

  // One listener for every link on the page, in both designs.
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const hit = classify(a as HTMLAnchorElement);
      if (hit) track(hit.path, hit.title);
    },
    { capture: true },
  );
}

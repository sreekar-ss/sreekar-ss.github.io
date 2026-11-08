import React, { useState } from "react";
import s from "./VersionSwitcher.module.css";

const LINKS = [
  { href: "/v1/", label: "v1", title: "Contact sheet" },
  { href: "/v2/", label: "v2", title: "Command palette" },
  { href: "/", label: "current", title: "Current site" },
];

/**
 * Small floating control for comparing the redesign candidates.
 * Delete this component (and its two usages in index.tsx) once a version is picked.
 */
export default function VersionSwitcher({ current }: { current: "v1" | "v2" }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <nav aria-label="Design versions" className={s.bar}>
      <span className={s.label}>Preview</span>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          title={l.title}
          aria-current={l.label === current ? "page" : undefined}
          className={s.link}
        >
          {l.label}
        </a>
      ))}
      <button type="button" aria-label="Hide version switcher" className={s.close} onClick={() => setHidden(true)}>
        ×
      </button>
    </nav>
  );
}

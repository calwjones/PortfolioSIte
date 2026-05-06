"use client";

import { useEffect, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "demos", label: "Demos" },
  { id: "contact", label: "Contact" },
];

export function Statusbar() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, window.scrollY / Math.max(1, max)));
      setProgress(pct);
      const y = window.scrollY + 140;
      let current = NAV[0].id;
      for (const l of NAV) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="statusbar" role="navigation" aria-label="Page sections">
      <span>
        <span className="status-dot" aria-hidden="true" />
        Bristol, UK
      </span>
      <div className="progress" aria-hidden="true">
        <i style={{ width: `${progress * 100}%` }} />
      </div>
      <nav className="nav">
        {NAV.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={l.id === active ? "current" : ""}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

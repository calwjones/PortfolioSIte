"use client";

import { useEffect, useRef } from "react";
import { RUNS, type Run } from "@/content/runs";
import { fireToast } from "@/lib/toast";

export function Runs() {
  return (
    <div className="runs">
      {RUNS.map((r) => (
        <RunCard key={r.name} r={r} />
      ))}
    </div>
  );
}

function RunCard({ r }: { r: Run }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow", r.dataGlow);
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [r.dataGlow]);

  const onClick = () => fireToast(r.achievement);

  return (
    <article ref={ref} className="run" onClick={onClick} data-glow={r.dataGlow}>
      <div className="top">
        <span className="rank">
          <span className={`medal${r.medalClass ? " " + r.medalClass : ""}`}>{r.medal}</span>
          {r.rankLabel}
        </span>
        <span>{r.meta}</span>
      </div>
      <div className="name">
        <h3>{r.name}</h3>
        <span className="tag">{r.tag}</span>
      </div>
      <p className="desc">{r.desc}</p>
      <div className="stats">
        <span className={`s ${r.diffClass}`}>
          DIFFICULTY<span className="v">{r.diffStars}</span>
        </span>
        <span className="s">
          HOURS<span className="v accent">{r.hours}</span>
        </span>
        <span className="s">
          {r.stat3Label}<span className="v">{r.stat3Value}</span>
        </span>
      </div>
      <div className="achievements">
        {r.achievements.map((a, i) => (
          <span key={i} className={`ach${a.locked ? " locked" : ""}`}>{a.label}</span>
        ))}
      </div>
      <div className="actions">
        <LinkButton href={r.primary.href} primary>{r.primary.label}</LinkButton>
        <LinkButton href={r.source.href}>{r.source.label}</LinkButton>
      </div>
    </article>
  );
}

function LinkButton({
  href,
  children,
  primary,
}: {
  href?: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const cls = `btn${primary ? " primary" : ""}`;
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        onClick={stop}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={stop}>
      {children}
    </button>
  );
}

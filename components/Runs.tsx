"use client";

import { useEffect, useRef } from "react";
import { RUNS, type Run } from "@/content/runs";

const HERO_SLUG = "gameengine";

export function Runs() {
  const hero = RUNS.find((r) => r.slug === HERO_SLUG);
  const rest = RUNS.filter((r) => r.slug !== HERO_SLUG);
  return (
    <>
      {hero && <HeroRun r={hero} />}
      <div className="runs-list">
        {rest.map((r) => (
          <RunRow key={r.slug} r={r} />
        ))}
      </div>
    </>
  );
}

function openRun(slug: string) {
  history.pushState(null, "", `#run=${slug}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function useGlow<T extends HTMLElement>(glow: string) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow", glow);
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [glow]);
  return ref;
}

function onCardKey(e: React.KeyboardEvent, slug: string) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openRun(slug);
  }
}

function HeroRun({ r }: { r: Run }) {
  const ref = useGlow<HTMLElement>(r.dataGlow);
  const ctaLabel =
    r.primary?.scroll || r.primary?.label?.toLowerCase().includes("play")
      ? "Play demo"
      : "Read case study";
  const accentStyle = {
    ["--card-accent" as string]: `var(${r.accentVar})`,
  } as React.CSSProperties;
  return (
    <article
      ref={ref}
      className="hero-run"
      onClick={() => openRun(r.slug)}
      onKeyDown={(e) => onCardKey(e, r.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Open case study for ${r.name}`}
      data-cursor="inspect"
    >
      <div className="hero-run-media" style={accentStyle} aria-hidden="true">
        <span className="cover-name">{r.name}</span>
        <span className="cover-tag">{r.tag}</span>
      </div>
      <div className="hero-run-meta">
        <div className="hero-run-top">
          <span className="rank-line">
            <span className={`medal${r.medalClass ? " " + r.medalClass : ""}`}>
              {r.medal}
            </span>
            FEATURED · {r.tag}
          </span>
          <span className="tech-line">{r.meta}</span>
        </div>
        <h3 className="hero-run-title">{r.name}</h3>
        <p className="hero-run-desc">{r.desc}</p>
        <div className="hero-run-row">
          <span className="cta-link">
            {ctaLabel} <span className="arr">→</span>
          </span>
          <span className="hero-run-stats">
            {r.diffStars} · {r.hours} hrs · {r.stat3Label} {r.stat3Value}
          </span>
        </div>
      </div>
    </article>
  );
}

function RunRow({ r }: { r: Run }) {
  const ref = useGlow<HTMLElement>(r.dataGlow);
  const isPlay = !!r.primary?.scroll;
  const accentStyle = {
    ["--card-accent" as string]: `var(${r.accentVar})`,
  } as React.CSSProperties;
  return (
    <article
      ref={ref}
      className="run-row"
      onClick={() => openRun(r.slug)}
      onKeyDown={(e) => onCardKey(e, r.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Open case study for ${r.name}`}
      data-cursor="inspect"
    >
      <div className="run-row-img" style={accentStyle} aria-hidden="true">
        <span className="cover-name small">{r.name}</span>
      </div>
      <div className="run-row-meta">
        <div className="run-row-top">
          <span className="rank-line">
            <span className={`medal${r.medalClass ? " " + r.medalClass : ""}`}>
              {r.medal}
            </span>
            {r.rankLabel}
          </span>
          <span className="tech-line">{r.meta}</span>
        </div>
        <h4 className="run-row-title">{r.name}</h4>
        <p className="run-row-desc">{r.desc}</p>
        <span className="cta-link small">
          {isPlay ? "Play demo" : "Case study"}{" "}
          <span className="arr">{isPlay ? "↓" : "→"}</span>
        </span>
      </div>
    </article>
  );
}

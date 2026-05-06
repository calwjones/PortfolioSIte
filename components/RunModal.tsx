"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RUNS, type Run } from "@/content/runs";

function slugFromHash(hash: string): string | null {
  const match = /#run=([a-z0-9-]+)/i.exec(hash);
  return match ? match[1] : null;
}

export function RunModal() {
  const [run, setRun] = useState<Run | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setRun(null);
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const sync = () => {
      const slug = slugFromHash(window.location.hash);
      if (!slug) {
        setRun(null);
        return;
      }
      const match = RUNS.find((r) => r.slug === slug);
      setRun(match ?? null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!run) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      closeBtnRef.current?.focus();
      scrollRef.current?.scrollTo({ top: 0 });
    }, 0);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [run, close]);

  if (!run) return null;

  const accentColor = `var(${run.accentVar})`;
  const cs = run.caseStudy;

  return (
    <div
      className="run-modal-backdrop"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-modal-title"
    >
      <div
        className="run-modal"
        style={{ ["--run-accent" as string]: accentColor } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="run-modal-close"
          onClick={close}
          aria-label="Close log entry"
          data-cursor="close"
        >
          ×
        </button>

        <header className="run-modal-head">
          <div className="meta-row">
            <span className="rank">{run.rankLabel}</span>
            <span className="meta">{run.meta}</span>
          </div>
          <h2 id="run-modal-title">{run.name}</h2>
          <div className="tag">{run.tag}</div>
          {cs?.pitch && <p className="pitch">{cs.pitch}</p>}
          {cs && cs.stack.length > 0 && (
            <div className="stack">
              {cs.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="run-modal-body" ref={scrollRef} tabIndex={-1}>
          {cs?.sections.map((sec) => (
            <section key={sec.heading} className="section">
              <h3>
                <span className="bracket">[</span> {sec.heading} <span className="bracket">]</span>
              </h3>
              {sec.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="run-modal-foot">
          {run.primary?.href && (
            <a
              className="cta primary"
              href={run.primary.href}
              target={run.primary.href.startsWith("http") ? "_blank" : undefined}
              rel={run.primary.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {run.primary.label}
            </a>
          )}
          {run.source.href && (
            <a
              className="cta"
              href={run.source.href}
              target="_blank"
              rel="noreferrer"
            >
              {run.source.label}
            </a>
          )}
          <Link
            className="cta"
            href={`/runs/${run.slug}`}
            onClick={close}
            scroll={true}
          >
            VIEW AS PAGE →
          </Link>
          <button className="cta close-inline" onClick={close}>
            ‹ BACK TO PORTFOLIO
          </button>
        </footer>
      </div>
    </div>
  );
}

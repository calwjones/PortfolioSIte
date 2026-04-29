import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RUNS } from "@/content/runs";

export function generateStaticParams() {
  return RUNS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const run = RUNS.find((r) => r.slug === params.slug);
  if (!run) return {};
  const title = `${run.name} · ${run.tag}`;
  const description = run.caseStudy?.pitch ?? run.desc;
  return {
    title,
    description,
    alternates: { canonical: `/runs/${run.slug}` },
    openGraph: {
      title,
      description,
      url: `/runs/${run.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RunPage({ params }: { params: { slug: string } }) {
  const run = RUNS.find((r) => r.slug === params.slug);
  if (!run) notFound();

  const cs = run.caseStudy;
  const accent = `var(${run.accentVar})`;

  return (
    <div className="wrap">
      <Link href="/" className="run-page-back" data-cursor="external">
        ‹ BACK TO PORTFOLIO
      </Link>

      <article
        className="run-page"
        style={{ ["--run-accent" as string]: accent } as React.CSSProperties}
      >
        <header className="run-page-head">
          <div className="meta-row">
            <span className="rank">
              <span className={`medal${run.medalClass ? " " + run.medalClass : ""}`}>
                {run.medal}
              </span>
              {run.rankLabel}
            </span>
            <span className="meta">{run.meta}</span>
          </div>
          <h1>{run.name}</h1>
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

        <div className="run-page-body">
          {cs?.sections.map((sec) => (
            <section key={sec.heading} className="section">
              <h2>
                <span className="bracket">[</span> {sec.heading}{" "}
                <span className="bracket">]</span>
              </h2>
              {sec.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="run-page-foot">
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
          <Link href="/" className="cta close-inline">
            ‹ BACK TO PORTFOLIO
          </Link>
        </footer>
      </article>
    </div>
  );
}

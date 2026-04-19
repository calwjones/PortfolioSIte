export function SectionHead({ title, right }: { title: string; right: string }) {
  return (
    <div className="section-head">
      <h2>
        <span className="bracket">[</span> {title} <span className="bracket">]</span>
      </h2>
      <div className="right">{right}</div>
    </div>
  );
}

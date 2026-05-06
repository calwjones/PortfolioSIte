export function SectionHead({
  id,
  title,
  right,
}: {
  id?: string;
  title: string;
  right: string;
}) {
  return (
    <div id={id} className="section-head">
      <h2>
        <span className="bracket">[</span> {title} <span className="bracket">]</span>
      </h2>
      <div className="right">{right}</div>
    </div>
  );
}

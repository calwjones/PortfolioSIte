"use client";

import { useAge } from "@/hooks/useAge";

export function CharacterCard() {
  const age = useAge();
  return (
    <article className="character">
      <div className="char-avatar">
        <div>
          <div className="frame">
            <span className="corner">LV {age}</span>
            <span className="glyph">C</span>
          </div>
          <div className="handle">
            callum<span className="at">.jones</span>
          </div>
          <div className="class">Final-year CS · UWE Bristol</div>
        </div>
      </div>
      <div className="char-stats">
        <p className="quote">
          Final-year CS student at <em>UWE Bristol</em>. Just shipped <em>GameEngine</em> —
          my final-year project and dissertation. Modules finish May 2026, graduating July
          — open to CS graduate roles across the UK, remote or on-site.
        </p>
        <div className="stat-grid">
          <StatBar label="FRONTEND" v={0.88} value={88} />
          <StatBar label="BACKEND" v={0.85} value={85} cls="mana" />
          <StatBar label="TOOLING" v={0.76} value={76} cls="focus" />
          <StatBar label="GRAPHICS" v={0.72} value={72} cls="xp" />
          <StatBar label="SYSTEMS" v={0.65} value={65} />
          <StatBar label="DATABASES" v={0.62} value={62} cls="mana" />
        </div>
        <div className="char-loadout">
          <span className="chip eq">TypeScript</span>
          <span className="chip eq">React</span>
          <span className="chip eq">Next.js</span>
          <span className="chip eq">Node.js</span>
          <span className="chip eq">C++</span>
          <span className="chip">Python</span>
          <span className="chip">JavaScript</span>
          <span className="chip">Express</span>
          <span className="chip">Socket.IO</span>
          <span className="chip">Prisma</span>
          <span className="chip">PostgreSQL</span>
          <span className="chip">SQLite</span>
          <span className="chip">Docker</span>
          <span className="chip">CMake</span>
          <span className="chip">HTML Canvas</span>
          <span className="chip">Git</span>
        </div>
      </div>
    </article>
  );
}

function StatBar({
  label,
  v,
  value,
  cls,
  color,
}: {
  label: string;
  v: number;
  value: number;
  cls?: "focus" | "mana" | "xp";
  color?: string;
}) {
  const style: React.CSSProperties = { ["--v" as string]: v };
  if (color) style.background = color;
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <span className="bar">
        <span className={`fill${cls ? " " + cls : ""}`} style={style} />
      </span>
      <span className="val">{value}</span>
    </div>
  );
}

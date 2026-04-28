"use client";

import Image from "next/image";
import { useAge } from "@/hooks/useAge";
import { MAX_YEARS, SKILLS } from "@/content/skills";

export function CharacterCard() {
  const age = useAge();
  return (
    <article className="character">
      <div className="char-avatar">
        <div>
          <div className="frame">
            <span className="corner">LV {age}</span>
            <Image
              className="photo"
              src="/avatar.jpg"
              alt="Callum Jones"
              width={800}
              height={600}
              sizes="(max-width: 760px) 100vw, 280px"
              priority
            />
          </div>
          <div className="handle">
            callum<span className="at">.jones</span>
          </div>
          <div className="class">Final-year CS · UWE Bristol</div>
        </div>
      </div>
      <div className="char-stats">
        <p className="quote">
          Final-year CS student at <em>UWE Bristol</em>. Just shipped <em>GameEngine</em>,
          my dissertation project. Modules finish May 2026, graduating July. Open to CS
          graduate roles across the UK, remote or on-site.
        </p>
        <div className="stat-grid">
          {SKILLS.map((s) => (
            <StatBar
              key={s.label}
              label={s.label}
              years={s.years}
              v={Math.min(1, s.years / MAX_YEARS)}
              cls={s.cls}
            />
          ))}
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
  years,
  v,
  cls,
}: {
  label: string;
  years: number;
  v: number;
  cls?: "focus" | "mana" | "xp";
}) {
  const style: React.CSSProperties = { ["--v" as string]: v };
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <span className="bar">
        <span className={`fill${cls ? " " + cls : ""}`} style={style} />
      </span>
      <span className="val">{years}y</span>
    </div>
  );
}

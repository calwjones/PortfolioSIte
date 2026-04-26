"use client";

import { useEffect, useState } from "react";
import { useAge } from "@/hooks/useAge";
import { useSessionTime } from "@/hooks/useSessionTime";
import { useAchievements } from "@/hooks/useAchievements";
import { INVENTORY } from "@/content/inventory";
import { RUNS } from "@/content/runs";
import { pad2 } from "@/lib/format";

const EQUIPPED = INVENTORY.filter((i) => !i.empty).length;

export function Hud() {
  const [clock, setClock] = useState("BRISTOL");
  const age = useAge();
  const { h, m } = useSessionTime();
  const { unlocked, total } = useAchievements();

  useEffect(() => {
    const tick = () => {
      const t = new Date();
      setClock(`BRISTOL ${pad2(t.getHours())}:${pad2(t.getMinutes())}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const playtime = `${pad2(h)}:${pad2(m)}`;

  return (
    <div className="hud">
      <div className="slot">
        <span className="lbl">LVL</span>
        <span className="val">{pad2(age)}</span>
      </div>
      <div className="slot">
        <span className="lbl">Play</span>
        <span className="val" style={{ color: "var(--health)" }}>{playtime}</span>
      </div>
      <div className="slot">
        <span className="lbl">Runs</span>
        <span className="val" style={{ color: "var(--accent)" }}>{pad2(RUNS.length)}</span>
      </div>
      <div className="slot">
        <span className="lbl">Tech</span>
        <span className="val" style={{ color: "var(--xp)" }}>{pad2(EQUIPPED)}</span>
      </div>
      <div
        className="slot ach-slot"
        title={`Achievements unlocked (type 'achievements' in CMD to list)`}
      >
        <span className="lbl" aria-hidden="true">★</span>
        <span className="val">
          {pad2(unlocked.size)}/{pad2(total)}
        </span>
      </div>
      <div className="spacer" />
      <button
        type="button"
        className="hud-cmd"
        onClick={() => window.dispatchEvent(new CustomEvent("sav:terminal:toggle"))}
        aria-label="Open command line"
        title="Open command line (shortcut: /)"
      >
        <span className="lbl">▸</span>
        <span className="val">CMD</span>
        <span className="kbd">/</span>
      </button>
      <div className="slot">
        <span className="save-dot" />
        <span className="lbl">Auto-saving</span>
      </div>
      <div className="slot">
        <span className="lbl">Zone</span>
        <span className="val">{clock}</span>
      </div>
    </div>
  );
}

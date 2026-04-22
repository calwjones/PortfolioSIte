"use client";

import { useEffect, useState } from "react";
import { useAge } from "@/hooks/useAge";
import { useSessionTime } from "@/hooks/useSessionTime";
import { INVENTORY } from "@/content/inventory";
import { RUNS } from "@/content/runs";

const EQUIPPED = INVENTORY.filter((i) => !i.empty).length;

export function Hud() {
  const [clock, setClock] = useState("BRISTOL");
  const age = useAge();
  const { h, m } = useSessionTime();

  useEffect(() => {
    const tick = () => {
      const t = new Date();
      const hh = String(t.getHours()).padStart(2, "0");
      const mm = String(t.getMinutes()).padStart(2, "0");
      setClock(`BRISTOL ${hh}:${mm}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const playtime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  return (
    <div className="hud">
      <div className="slot">
        <span className="lbl">LVL</span>
        <span className="val">{String(age).padStart(2, "0")}</span>
      </div>
      <div className="slot">
        <span className="lbl">Play</span>
        <span className="val" style={{ color: "var(--health)" }}>{playtime}</span>
      </div>
      <div className="slot">
        <span className="lbl">Runs</span>
        <span className="val" style={{ color: "var(--accent)" }}>{String(RUNS.length).padStart(2, "0")}</span>
      </div>
      <div className="slot">
        <span className="lbl">Tech</span>
        <span className="val" style={{ color: "var(--xp)" }}>{String(EQUIPPED).padStart(2, "0")}</span>
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

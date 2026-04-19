"use client";

import { useEffect, useState } from "react";
import { useAge } from "@/hooks/useAge";

export function Hud() {
  const [clock, setClock] = useState("BRISTOL");
  const age = useAge();

  useEffect(() => {
    const tick = () => {
      const t = new Date();
      const h = String(t.getHours()).padStart(2, "0");
      const m = String(t.getMinutes()).padStart(2, "0");
      setClock(`BRISTOL ${h}:${m}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hud">
      <div className="slot">
        <span className="lbl">HP</span>
        <span className="val" style={{ color: "var(--health)" }}>087/100</span>
      </div>
      <div className="slot">
        <span className="lbl">MP</span>
        <span className="val" style={{ color: "var(--mana)" }}>042/050</span>
      </div>
      <div className="slot">
        <span className="lbl">LVL</span>
        <span className="val">{String(age).padStart(2, "0")}</span>
      </div>
      <div className="slot">
        <span className="lbl">XP</span>
        <span className="val" style={{ color: "var(--xp)" }}>14,820</span>
      </div>
      <div className="spacer" />
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

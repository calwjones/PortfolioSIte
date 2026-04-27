"use client";

import { useEffect, useState } from "react";
import { useSessionTime } from "@/hooks/useSessionTime";
import { RUNS } from "@/content/runs";
import { pad2 } from "@/lib/format";

const FIRST_VISIT_KEY = "sav:first-visit";

function formatShort(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }).toUpperCase();
}

export function TitleBlock() {
  const { h, m } = useSessionTime();
  const playtime = `${pad2(h)}h ${pad2(m)}m`;
  const [firstBoot, setFirstBoot] = useState("just now");

  useEffect(() => {
    let stored = localStorage.getItem(FIRST_VISIT_KEY);
    if (!stored) {
      stored = new Date().toISOString();
      try {
        localStorage.setItem(FIRST_VISIT_KEY, stored);
      } catch {
        // ignore — private mode
      }
    }
    const d = new Date(stored);
    setFirstBoot(formatShort(d));
  }, []);

  return (
    <div className="title-block">
      <div>
        <div className="kicker">Save slot 01 · Resumed</div>
        <h2>
          CALLUM JONES<span className="blink">_</span>
        </h2>
      </div>
      <div className="meta">
        <div className="row">
          <span className="lbl">Session </span>
          <span className="val">{playtime}</span>
        </div>
        <div className="row">
          <span className="lbl">Runs </span>
          <span className="val">{pad2(RUNS.length)} shipped</span>
        </div>
        <div className="row">
          <span className="lbl">First boot </span>
          <span className="val">{firstBoot}</span>
        </div>
      </div>
    </div>
  );
}

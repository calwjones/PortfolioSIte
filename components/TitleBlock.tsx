"use client";

import { useSessionTime } from "@/hooks/useSessionTime";
import { RUNS } from "@/content/runs";

export function TitleBlock() {
  const { h, m } = useSessionTime();
  const playtime = `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;

  return (
    <div className="title-block">
      <div>
        <div className="kicker">Save slot 01 · Resumed</div>
        <h1>
          CALLUM JONES<span className="blink">_</span>
        </h1>
      </div>
      <div className="meta">
        <div className="row">
          <span className="lbl">Session </span>
          <span className="val">{playtime}</span>
        </div>
        <div className="row">
          <span className="lbl">Runs </span>
          <span className="val">{String(RUNS.length).padStart(2, "0")} shipped</span>
        </div>
        <div className="row">
          <span className="lbl">Last save </span>
          <span className="val">just now</span>
        </div>
      </div>
    </div>
  );
}

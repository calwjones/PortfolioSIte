"use client";

import { useSessionTime } from "@/hooks/useSessionTime";
import { RUNS } from "@/content/runs";
import { pad2 } from "@/lib/format";

export function TitleBlock() {
  const { h, m } = useSessionTime();
  const playtime = `${pad2(h)}h ${pad2(m)}m`;

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
          <span className="val">{pad2(RUNS.length)} shipped</span>
        </div>
        <div className="row">
          <span className="lbl">Last save </span>
          <span className="val">just now</span>
        </div>
      </div>
    </div>
  );
}

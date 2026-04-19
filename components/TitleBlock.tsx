"use client";

import { useEffect, useState } from "react";

export function TitleBlock() {
  const [minutes, setMinutes] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => setMinutes((m) => m + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(minutes).padStart(2, "0");

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
          <span className="lbl">Playtime </span>
          <span className="val">0046h {mm}m</span>
        </div>
        <div className="row">
          <span className="lbl">Saves </span>
          <span className="val">04 runs · 12 drafts</span>
        </div>
        <div className="row">
          <span className="lbl">Last save </span>
          <span className="val">just now</span>
        </div>
      </div>
    </div>
  );
}

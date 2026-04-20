"use client";

import { useEffect, useState } from "react";

/** Real time since the current tab was opened, ticked every second. */
export function useSessionTime(): { h: number; m: number; s: number; ms: number } {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const id = window.setInterval(() => {
      setMs(performance.now() - t0);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h, m, s, ms };
}

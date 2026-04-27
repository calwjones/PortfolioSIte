"use client";

import { useEffect, useState } from "react";

/**
 * Real time since the current tab was opened. Ticks once per minute by default;
 * pass { precise: true } to tick once per second (for components that show :SS).
 */
export function useSessionTime(opts?: { precise?: boolean }): {
  h: number;
  m: number;
  s: number;
  ms: number;
} {
  const precise = opts?.precise ?? false;
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const tick = () => setMs(performance.now() - t0);
    tick();
    const id = window.setInterval(tick, precise ? 1000 : 60000);
    return () => window.clearInterval(id);
  }, [precise]);
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h, m, s, ms };
}

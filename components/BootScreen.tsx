"use client";

import { useEffect, useState } from "react";
import { fireToast } from "@/lib/toast";

const LINES = [
  "Loading save slot 01...",
  "Loading profile...",
  "Mounting projects (04 runs)...",
  "Loading inventory (18 items)...",
  "Connecting — Bristol, UK...",
  "Ready.",
];

export function BootScreen() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sav:booted")) {
      setRemoved(true);
      return;
    }
    setMounted(true);
    sessionStorage.setItem("sav:booted", "1");
    const t1 = window.setTimeout(() => setHidden(true), 1400);
    const t2 = window.setTimeout(() => {
      setRemoved(true);
      fireToast("First Visit");
    }, 2000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (removed || !mounted) return null;

  return (
    <div className={`boot${hidden ? " hidden" : ""}`}>
      <h2>CALLUM.SAV</h2>
      <div className="bar">
        <div className="bar-fill" />
      </div>
      <div className="lines">
        {LINES.map((l, i) => (
          <div key={i} className="l" style={{ animationDelay: `${i * 0.15}s` }}>
            » {l}
          </div>
        ))}
      </div>
    </div>
  );
}

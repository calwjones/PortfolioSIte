"use client";

import { useEffect, useRef, useState } from "react";

export function Toast() {
  const [name, setName] = useState("First Visit");
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setName(detail);
      setShow(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setShow(false), 2800);
    };
    window.addEventListener("sav:toast", onToast as EventListener);
    return () => window.removeEventListener("sav:toast", onToast as EventListener);
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      <div className="t-label">Achievement Unlocked</div>
      <div className="t-name">{name}</div>
    </div>
  );
}

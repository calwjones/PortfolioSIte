"use client";

import { useEffect, useRef, useState } from "react";

type CursorState =
  | "default"
  | "inspect"
  | "play"
  | "external"
  | "contact"
  | "close"
  | "pin";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // only enable on devices with a real hover-capable pointer
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.32;
      y += (ty - y) * 0.32;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const el = e.target as HTMLElement | null;
      const match = el?.closest<HTMLElement>("[data-cursor]");
      const next = (match?.dataset.cursor as CursorState) || "default";
      setState((prev) => (prev === next ? prev : next));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => {
      if (ref.current) ref.current.classList.add("pressed");
    };
    const onUp = () => {
      if (ref.current) ref.current.classList.remove("pressed");
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.body.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className={`custom-cursor state-${state}${visible ? " visible" : ""}`}
      aria-hidden="true"
    >
      <div className="ring" />
      <div className="label">{labelFor(state)}</div>
    </div>
  );
}

function labelFor(s: CursorState): string {
  switch (s) {
    case "inspect":
      return "INSPECT";
    case "play":
      return "▶ PLAY";
    case "external":
      return "↗ OPEN";
    case "contact":
      return "✉ MAIL";
    case "close":
      return "× CLOSE";
    case "pin":
      return "FAST TRAVEL";
    default:
      return "";
  }
}

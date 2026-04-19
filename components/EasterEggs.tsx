"use client";

import { useEffect } from "react";
import { fireToast } from "@/lib/toast";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const NAME_TARGET = "callum";

export function EasterEggs() {
  useEffect(() => {
    let kIdx = 0;
    let typeBuf = "";

    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[kIdx];
      if (e.key.toLowerCase() === expected.toLowerCase() || e.key === expected) {
        kIdx++;
        if (kIdx === KONAMI.length) {
          kIdx = 0;
          fireToast("God Mode Enabled");
          document.documentElement.style.setProperty("--accent", "#5fd693");
          document.documentElement.style.setProperty("--accent-2", "#ffcc3b");
        }
      } else {
        kIdx = 0;
      }

      if (e.key.length === 1) {
        typeBuf = (typeBuf + e.key.toLowerCase()).slice(-NAME_TARGET.length);
        if (typeBuf === NAME_TARGET) {
          fireToast("Contact Unlocked");
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!reduced) {
            document.body.style.transition = "filter 1s";
            document.body.style.filter = "hue-rotate(180deg)";
            window.setTimeout(() => {
              document.body.style.filter = "";
            }, 2500);
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}

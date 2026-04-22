"use client";

import { useEffect, useState } from "react";
import { ACHIEVEMENTS, getUnlocked } from "@/lib/achievements";

export function useAchievements() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => setUnlocked(getUnlocked());
    sync();
    window.addEventListener("sav:ach:update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sav:ach:update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { unlocked, total: ACHIEVEMENTS.length, all: ACHIEVEMENTS };
}

"use client";

import { useEffect } from "react";
import { unlock } from "@/lib/achievements";

// Mounts the intersection observers that unlock scroll-based achievements.
// Renders nothing; must live inside the page tree.
export function AchievementWatchers() {
  useEffect(() => {
    const footer = document.querySelector(".savefooter");
    const worldmap = document.querySelector(".worldmap");
    if (!footer || !worldmap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === footer) unlock("scroll-further");
          if (entry.target === worldmap) unlock("quest-giver");
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(footer);
    observer.observe(worldmap);
    return () => observer.disconnect();
  }, []);

  return null;
}

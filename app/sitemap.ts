import type { MetadataRoute } from "next";
import { RUNS } from "@/content/runs";

const BASE = "https://calwjones.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...RUNS.map((r) => ({
      url: `${BASE}/runs/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

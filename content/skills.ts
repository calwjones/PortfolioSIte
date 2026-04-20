// Years active across projects. Update as skills evolve.
export type Skill = {
  label: string;
  years: number;
  cls?: "focus" | "mana" | "xp";
};

// Bar fills are scaled against MAX_YEARS so they stay sensible
// even when new categories with less experience are added.
export const MAX_YEARS = 3;

export const SKILLS: Skill[] = [
  { label: "FRONTEND", years: 2 },
  { label: "BACKEND", years: 2, cls: "mana" },
  { label: "TOOLING", years: 3, cls: "focus" },
  { label: "GRAPHICS", years: 1, cls: "xp" },
  { label: "SYSTEMS", years: 1 },
  { label: "DATABASES", years: 2, cls: "mana" },
];

export type Run = {
  dataGlow: string;
  achievement: string;
  medal: string;
  medalClass?: "silver" | "bronze" | "progress";
  rankLabel: string;
  meta: string;
  name: string;
  tag: string;
  desc: string;
  diffClass: "diff-easy" | "diff-medium" | "diff-hard";
  diffStars: string;
  hours: string;
  stat3Label: string;
  stat3Value: string;
  achievements: { label: string; locked?: boolean }[];
  primary: { label: string; href?: string };
  source: { label: string; href?: string };
};

export const RUNS: Run[] = [
  {
    dataGlow: "rgba(255,91,31,0.18)",
    achievement: "First Ship",
    medal: "S",
    rankLabel: "RANK S · LIVE",
    meta: "2026 · TS · NEXT.JS · POSTGRES · DOCKER",
    name: "Matchsticked",
    tag: "MAIN QUEST · DEPLOYED",
    desc: "Group movie-picking app. Real-time swipe-to-match sessions over Socket.IO, solo roulette, discover mode. Next.js client + Express/Prisma/Postgres server, Dockerised, deployed at matchsticked.com.",
    diffClass: "diff-hard",
    diffStars: "★★★★☆",
    hours: "180+",
    stat3Label: "STACK",
    stat3Value: "FULL",
    achievements: [
      { label: "Realtime" },
      { label: "Prisma Tamer" },
      { label: "Dockerised" },
      { label: "Actually Used" },
      { label: "100 users", locked: true },
    ],
    primary: { label: "▶ VIEW LIVE", href: "https://matchsticked.com" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/MoviePicker" },
  },
  {
    dataGlow: "rgba(255,204,59,0.18)",
    achievement: "Built From Scratch",
    medal: "S",
    rankLabel: "RANK S · FINAL YEAR",
    meta: "2026 · C++ · CMAKE",
    name: "GameEngine",
    tag: "DISSERTATION PROJECT · FROM SCRATCH",
    desc: "Final-year university project — and the subject of my dissertation. A game engine written in C++ from scratch; my deepest dive into systems code yet. Taught me where abstractions leak and where they hold.",
    diffClass: "diff-hard",
    diffStars: "★★★★★",
    hours: "200+",
    stat3Label: "LOC",
    stat3Value: "~10k",
    achievements: [
      { label: "Systems Code" },
      { label: "CMake Wrangler" },
      { label: "Memory Safe-ish" },
      { label: "Debug Wizard" },
      { label: "Ship with docs", locked: true },
    ],
    primary: { label: "▶ VIEW LOG", href: "https://github.com/calwjones/GameEngine" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/GameEngine" },
  },
  {
    dataGlow: "rgba(107,91,255,0.2)",
    achievement: "Canvas Wrangler",
    medal: "A",
    rankLabel: "RANK A · SHIPPED",
    meta: "2026 · VANILLA JS · EXPRESS · SQLITE",
    name: "Sand Tetris",
    tag: "PLAYABLE · ARCADE",
    desc: "Tetris with classic and sand-physics modes. 16 vanilla-JS modules, Uint8Array grain grid, 8-connected flood-fill clears, Express/SQLite leaderboard. Demo playing below — built from my repo.",
    diffClass: "diff-medium",
    diffStars: "★★★☆☆",
    hours: "40+",
    stat3Label: "GRAINS/F",
    stat3Value: "~3.2k",
    achievements: [
      { label: "Sand Physics" },
      { label: "Flood Fill" },
      { label: "Trig LUT" },
      { label: "Leaderboard" },
      { label: "Mobile", locked: true },
    ],
    primary: { label: "▶ PLAY DEMO ↓" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Tetris" },
  },
  {
    dataGlow: "rgba(95,214,147,0.18)",
    achievement: "Shipped & Forgot",
    medal: "C",
    medalClass: "bronze",
    rankLabel: "RANK C · SHIPPED",
    meta: "2026 · PYTHON · TKINTER",
    name: "Calculator",
    tag: "SIDE QUEST · DESKTOP APP",
    desc: "Desktop calculator with simple and scientific modes, keyboard control, history. Shunting-yard + RPN under the hood — no unsafe evaluation. Most-used app I've shipped.",
    diffClass: "diff-easy",
    diffStars: "★★☆☆☆",
    hours: "10",
    stat3Label: "MODES",
    stat3Value: "02",
    achievements: [
      { label: "First GUI" },
      { label: "RPN" },
      { label: "Actually Useful" },
      { label: "Unit tests", locked: true },
    ],
    primary: { label: "▶ VIEW LOG", href: "https://github.com/calwjones/Calculator" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Calculator" },
  },
];

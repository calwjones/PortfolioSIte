export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  pitch: string;
  stack: string[];
  sections: CaseStudySection[];
};

export type Run = {
  slug: string;
  accentVar: "--accent" | "--accent-2" | "--xp" | "--health";
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
  caseStudy?: CaseStudy;
};

const PLACEHOLDER_CASE_STUDY: CaseStudy = {
  pitch: "Full log entry pending — I'm writing this one up properly soon.",
  stack: [],
  sections: [
    {
      heading: "MISSION LOG · INCOMPLETE",
      body: [
        "This entry hasn't been written up yet. Hit the source link to read the code in the meantime — the repo README has a short overview.",
        "If you're a recruiter reading this and want the fuller story, the best path is to email me and I'll walk you through it.",
      ],
    },
  ],
};

export const RUNS: Run[] = [
  {
    slug: "matchsticked",
    accentVar: "--accent",
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
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "gameengine",
    accentVar: "--xp",
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
    caseStudy: {
      pitch:
        "A game engine written from scratch in C++ — final-year dissertation at UWE Bristol. Around 10k lines, 200+ hours, no tutorial to hide behind.",
      stack: ["C++", "CMake", "OpenGL", "GLFW"],
      sections: [
        {
          heading: "MISSION",
          body: [
            "Build a small 2D game engine in C++ from scratch, for my final-year dissertation. The brief wasn't to compete with Unity or Godot — it was to understand what they're actually doing under the hood by reconstructing a stripped-down version myself.",
            "By the end: roughly 10k lines of hand-written C++, a fixed-timestep main loop, an entity-component scene system, an OpenGL renderer, and a small playable demo that exercises every subsystem end-to-end.",
          ],
        },
        {
          heading: "PROBLEM",
          body: [
            "Every engine tutorial I'd followed before this abstracted the hard parts away — graphics contexts, memory layouts, how a pressed key actually ends up moving a sprite. I wanted the dissertation to force me to confront each of those layers personally. If I couldn't explain how input gets from GLFW to a script, the mark wouldn't be deserved.",
            "Choosing C++ was pragmatic. It's the language of every engine I care about and my degree had leaned heavily on higher-level languages up to that point. This was the project I'd use to build the systems vocabulary I was missing.",
          ],
        },
        {
          heading: "APPROACH",
          body: [
            "The engine is built around a classic fixed-timestep game loop, an entity-component pattern for scene objects, and a modest OpenGL renderer via GLFW. Modules are compiled separately with CMake so I can iterate on individual subsystems without rebuilding the whole tree.",
            "At its core: the main loop ticks update(dt) then render() across registered systems in order. An Entity is an ID with a bag of components — transform, sprite, collider, script — looked up from contiguous storage. Input events are captured at the window layer, translated to engine-agnostic Action enums, and dispatched to whichever scripts subscribed.",
            "I kept the scope deliberately tight. No physics beyond AABB collision, no audio, no editor. Just enough skeleton for a small demo that proves every system works.",
          ],
        },
        {
          heading: "WHAT BROKE",
          body: [
            "Memory was the honest answer. The first month of work was littered with dangling pointers from my habit of writing TypeScript, where the GC forgives you. Moving to unique_ptr and RAII aggressively once I understood them cut the bug volume more than any specific fix.",
            "CMake was the other villain. Getting a multi-module project to build cleanly across different machines cost days I hadn't budgeted for. In hindsight I'd have started from a known-good cross-platform template instead of rolling my own.",
            "The third surprise was how much time rendering 'basic' quads took. I'd underestimated the cost of getting OpenGL state right — shader compilation, VAOs, texture binding. Game logic turned out to be the cheap part.",
          ],
        },
        {
          heading: "WHAT I LEARNED",
          body: [
            "Abstractions leak in specific, predictable ways — and reading other people's engine code with a debugger attached teaches more than any book chapter. Reconstructing a system from first principles is the real deliverable, even if the result never ships.",
            "Next time: smaller scope, earlier playable prototype, and test scaffolding from day one instead of bolted on at month three.",
          ],
        },
      ],
    },
  },
  {
    slug: "tetris",
    accentVar: "--accent-2",
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
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
  {
    slug: "calculator",
    accentVar: "--health",
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
    caseStudy: PLACEHOLDER_CASE_STUDY,
  },
];

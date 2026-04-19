export type Quest = { label: string; reward: string; done?: boolean };

export const QUESTS: Quest[] = [
  { label: "Finish final-year modules", reward: "MAY 2026" },
  { label: "Graduate — BSc Computer Science, UWE Bristol", reward: "JUL 2026" },
  { label: "Land first CS graduate role", reward: "OPEN TO OFFERS" },
  { label: "Matchsticked — post-launch iteration", reward: "LIVE · ONGOING" },
  { label: "Ship the next side project", reward: "ONGOING" },
  { label: "Final-year project + dissertation shipped — GameEngine", reward: "DONE · 2026", done: true },
];

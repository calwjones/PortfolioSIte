export type Quest = {
  label: string;
  reward: string;
  done?: boolean;
  /** ISO date — quest auto-flips to done after this date. */
  doneAfter?: string;
};

export const QUESTS: Quest[] = [
  { label: "Finish final-year modules", reward: "MAY 2026", doneAfter: "2026-05-31" },
  { label: "Graduate: BSc Computer Science, UWE Bristol", reward: "JUL 2026", doneAfter: "2026-07-31" },
  { label: "Land first CS graduate role", reward: "OPEN TO OFFERS" },
  { label: "Matchsticked: post-launch iteration", reward: "LIVE · ONGOING" },
  { label: "Ship the next side project", reward: "ONGOING" },
  { label: "Final-year project + dissertation shipped: GameEngine", reward: "DONE · 2026", done: true },
];

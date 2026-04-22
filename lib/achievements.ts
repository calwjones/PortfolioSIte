import { fireToast } from "./toast";

export type Achievement = {
  id: string;
  name: string;
  hint: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-visit",    name: "First Visit",       hint: "boot the save file" },
  { id: "scroll-further", name: "Scroll Further",    hint: "reach the footer" },
  { id: "quest-giver",    name: "Quest Giver",       hint: "find the contact zone" },
  { id: "log-opened",     name: "Log Entry Opened",  hint: "open any run" },
  { id: "completionist",  name: "Completionist",     hint: "open every run log" },
  { id: "sand-artist",    name: "Sand Artist",       hint: "20+ in Sand Tetris" },
  { id: "snake-charmer",  name: "Snake Charmer",     hint: "100+ in Snake" },
  { id: "cli-wizard",     name: "CLI Wizard",        hint: "type a command" },
  { id: "cheat-code",     name: "Cheat Code",        hint: "a very old secret" },
  { id: "namedrop",       name: "Namedrop",          hint: "say my name" },
];

const KEY = "sav:achievements";
const RUNS_OPENED_KEY = "sav:runs-opened";
const TOTAL = ACHIEVEMENTS.length;

function readSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // ignore — private mode or quota
  }
}

export function getUnlocked(): Set<string> {
  return readSet(KEY);
}

export function getUnlockedCount(): number {
  return getUnlocked().size;
}

export function getTotal(): number {
  return TOTAL;
}

export function unlock(id: string) {
  if (typeof window === "undefined") return;
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return;
  const set = getUnlocked();
  if (set.has(id)) return;
  set.add(id);
  writeSet(KEY, set);
  fireToast(ach.name);
  window.dispatchEvent(new CustomEvent("sav:ach:update"));
}

export function markRunOpened(slug: string) {
  if (typeof window === "undefined") return;
  const set = readSet(RUNS_OPENED_KEY);
  set.add(slug);
  writeSet(RUNS_OPENED_KEY, set);
  return set;
}

export function getRunsOpened(): Set<string> {
  return readSet(RUNS_OPENED_KEY);
}

"use client";

import { useEffect, useRef, useState } from "react";
import { RUNS } from "@/content/runs";
import { useSessionTime } from "@/hooks/useSessionTime";
import { ACHIEVEMENTS, getUnlocked, unlock } from "@/lib/achievements";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const COMMANDS: { usage: string; desc: string }[] = [
  { usage: "help", desc: "list commands" },
  { usage: "runs", desc: "list run slugs" },
  { usage: "open <slug>", desc: "open a run log" },
  { usage: "play <tetris|snake>", desc: "scroll to arcade" },
  { usage: "stats", desc: "session + totals" },
  { usage: "achievements", desc: "unlocked so far" },
  { usage: "contact", desc: "jump to contact" },
  { usage: "cv", desc: "open CV (PDF)" },
  { usage: "whoami", desc: "one-line bio" },
  { usage: "clear", desc: "clear output" },
  { usage: "close", desc: "close terminal" },
];

const WELCOME: Line[] = [
  { kind: "out", text: "CALLUM.SAV — COMMAND LINE v1.0" },
  { kind: "out", text: "type 'help' for commands, or use the legend on the right." },
  { kind: "out", text: "" },
];

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const { h, m, s } = useSessionTime();

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const isEditable =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable;
      if (e.key === "/" && !isEditable) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("sav:terminal:toggle", onToggle);
    window.addEventListener("sav:terminal:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("sav:terminal:toggle", onToggle);
      window.removeEventListener("sav:terminal:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const push = (l: Line | Line[]) =>
    setLines((prev) => prev.concat(Array.isArray(l) ? l : [l]));

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [nameRaw, ...args] = cmd.split(/\s+/);
    const name = nameRaw.toLowerCase();
    push({ kind: "cmd", text: `> ${cmd}` });

    switch (name) {
      case "help":
        push(
          COMMANDS.map((c) => ({
            kind: "out" as const,
            text: `  ${c.usage.padEnd(22)}${c.desc}`,
          }))
        );
        break;

      case "runs":
      case "list":
        push(
          RUNS.map((r) => ({
            kind: "out" as const,
            text: `  ${r.slug.padEnd(14)}${r.name}`,
          }))
        );
        break;

      case "open": {
        const slug = (args[0] || "").toLowerCase();
        if (!slug) {
          push({ kind: "err", text: "usage: open <slug>  (try 'runs' for the list)" });
          break;
        }
        const match = RUNS.find((r) => r.slug === slug);
        if (!match) {
          push({ kind: "err", text: `run '${slug}' not found. try 'runs'.` });
          break;
        }
        push({ kind: "out", text: `opening ${match.name}...` });
        window.location.hash = `run=${slug}`;
        break;
      }

      case "play": {
        const which = (args[0] || "").toLowerCase();
        const el = document.querySelector(".arcade");
        if (!el) {
          push({ kind: "err", text: "arcade not found" });
          break;
        }
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (which === "tetris") push({ kind: "out", text: "click the left cabinet to start Sand Tetris." });
        else if (which === "snake") push({ kind: "out", text: "click the right cabinet to start Snake." });
        else push({ kind: "out", text: "scrolling to arcade. use 'play tetris' or 'play snake'." });
        break;
      }

      case "stats": {
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        const ss = String(s).padStart(2, "0");
        const got = getUnlocked().size;
        push([
          { kind: "out", text: `  session       : ${hh}:${mm}:${ss}` },
          { kind: "out", text: `  runs          : ${RUNS.length} shipped` },
          { kind: "out", text: `  achievements  : ${got}/${ACHIEVEMENTS.length}` },
          { kind: "out", text: `  zone          : Bristol, UK` },
        ]);
        break;
      }

      case "achievements":
      case "ach": {
        const got = getUnlocked();
        push({ kind: "out", text: `  ${got.size}/${ACHIEVEMENTS.length} unlocked` });
        push(
          ACHIEVEMENTS.map((a) => ({
            kind: "out" as const,
            text: `  ${got.has(a.id) ? "[✓]" : "[ ]"} ${a.name.padEnd(22)}${got.has(a.id) ? "" : a.hint}`,
          }))
        );
        break;
      }

      case "contact":
        push({ kind: "out", text: "jumping to contact..." });
        document.querySelector(".worldmap")?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "cv":
        push({ kind: "out", text: "opening CV (PDF)..." });
        window.open("/Callum_Jones_CV.pdf", "_blank", "noopener,noreferrer");
        break;

      case "whoami":
        push([
          { kind: "out", text: "  callum jones — final-year CS student, UWE Bristol." },
          { kind: "out", text: "  open to graduate roles · Bristol / remote." },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "close":
      case "exit":
      case "q":
        setOpen(false);
        break;

      default:
        push({ kind: "err", text: `command not found: '${name}'. try 'help'.` });
        return;
    }
    unlock("cli-wizard");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="terminal" role="dialog" aria-label="Command line">
      <div className="terminal-head">
        <span className="title">▸ CALLUM.SAV / CMD</span>
        <span className="hint">press / to toggle · Esc to close</span>
        <button
          className="terminal-close"
          onClick={() => setOpen(false)}
          aria-label="Close terminal"
        >
          ×
        </button>
      </div>
      <div className="terminal-body">
        <div className="terminal-output" ref={outputRef}>
          {lines.map((l, i) => (
            <div key={i} className={`line ${l.kind}`}>
              {l.text || " "}
            </div>
          ))}
          <form className="line input" onSubmit={onSubmit}>
            <span className="prompt">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Command input"
            />
          </form>
        </div>
        <aside className="terminal-legend" aria-label="Available commands">
          <div className="legend-title">COMMANDS</div>
          <ul>
            {COMMANDS.map((c) => (
              <li key={c.usage}>
                <code>{c.usage}</code>
                <span>{c.desc}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

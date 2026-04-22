"use client";

import { useEffect, useRef, useState } from "react";
import { unlock } from "@/lib/achievements";

export function Snake() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const [overlayHidden, setOverlayHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frameEl = frameRef.current;
    if (!canvas || !frameEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const CELL = 8;
    const COLS = W / CELL;
    const ROWS = H / CELL;
    const BG = "#041008";
    const DARK = "#0a2015";
    const MID = "#3aff8f";
    const DIM = "#1c7a3e";
    const BRIGHT = "#baffd0";

    let snake: [number, number][] = [];
    let dir: [number, number] = [1, 0];
    let nextDir: [number, number] = [1, 0];
    let food: [number, number] = [0, 0];
    let scoreLocal = 0;
    let best = 0;
    try {
      best = parseInt(localStorage.getItem("snakeBest") || "0", 10) || 0;
    } catch {
      // private mode / blocked storage — fall back to in-memory
    }
    let running = false;
    let paused = false;
    let gameOver = false;
    let tickMs = 140;
    let lastTick = 0;
    let rafId = 0;

    const placeFood = () => {
      while (true) {
        const f: [number, number] = [
          Math.floor(Math.random() * COLS),
          Math.floor(Math.random() * ROWS),
        ];
        if (!snake.some((s) => s[0] === f[0] && s[1] === f[1])) {
          food = f;
          return;
        }
      }
    };

    const reset = () => {
      snake = [
        [10, 12],
        [9, 12],
        [8, 12],
      ];
      dir = [1, 0];
      nextDir = [1, 0];
      placeFood();
      scoreLocal = 0;
      tickMs = 140;
      lastTick = 0;
      gameOver = false;
      paused = false;
      setScore(Math.max(scoreLocal, best));
    };

    const drawCell = (x: number, y: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    };

    const render = () => {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = DARK;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 1, 1);
        }
      }
      const pulse = Math.floor(performance.now() / 180) % 2 === 0;
      drawCell(food[0], food[1], pulse ? BRIGHT : MID);
      snake.forEach((s, i) => drawCell(s[0], s[1], i === 0 ? BRIGHT : MID));
      if (gameOver) {
        ctx.fillStyle = "rgba(4,16,8,0.85)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = MID;
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 8);
        ctx.fillText("SCORE " + String(scoreLocal).padStart(4, "0"), W / 2, H / 2 + 10);
        ctx.font = "8px monospace";
        ctx.fillStyle = DIM;
        ctx.fillText("CLICK TO RETRY", W / 2, H / 2 + 28);
      }
      if (paused && !gameOver) {
        ctx.fillStyle = "rgba(4,16,8,0.7)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = MID;
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", W / 2, H / 2);
      }
    };

    const step = (ts: number) => {
      if (!running) return;
      if (!paused && !gameOver && ts - lastTick > tickMs) {
        lastTick = ts;
        if (!(nextDir[0] === -dir[0] && nextDir[1] === -dir[1])) dir = nextDir;
        const head: [number, number] = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
        if (
          head[0] < 0 ||
          head[0] >= COLS ||
          head[1] < 0 ||
          head[1] >= ROWS ||
          snake.some((s) => s[0] === head[0] && s[1] === head[1])
        ) {
          gameOver = true;
          running = false;
        } else {
          snake.unshift(head);
          if (head[0] === food[0] && head[1] === food[1]) {
            scoreLocal += 10;
            placeFood();
            tickMs = Math.max(70, tickMs - 2);
            if (scoreLocal >= 100) unlock("snake-charmer");
          } else {
            snake.pop();
          }
          setScore(Math.max(scoreLocal, best));
        }
        if (gameOver && scoreLocal > best) {
          best = scoreLocal;
          try {
            localStorage.setItem("snakeBest", String(best));
          } catch {
            // ignore — score just won't persist
          }
          setScore(best);
        }
      }
      render();
      rafId = requestAnimationFrame(step);
    };

    reset();
    render();

    const start = () => {
      if (gameOver) reset();
      if (!running) {
        running = true;
        setOverlayHidden(true);
        frameEl.focus();
        lastTick = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };
    const onClick = () => start();
    // scoped to frame so arrow keys don't leak into sand tetris
    const onKey = (e: KeyboardEvent) => {
      if (!running && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        start();
        return;
      }
      if (!running) return;
      const k = e.key;
      if (k === "ArrowLeft") { e.preventDefault(); nextDir = [-1, 0]; }
      else if (k === "ArrowRight") { e.preventDefault(); nextDir = [1, 0]; }
      else if (k === "ArrowUp") { e.preventDefault(); nextDir = [0, -1]; }
      else if (k === "ArrowDown") { e.preventDefault(); nextDir = [0, 1]; }
      else if (k.toLowerCase() === "p") paused = !paused;
    };

    frameEl.addEventListener("click", onClick);
    frameEl.addEventListener("keydown", onKey);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      frameEl.removeEventListener("click", onClick);
      frameEl.removeEventListener("keydown", onKey);
    };
  }, []);

  const scoreDisplay = String(score).padStart(4, "0");

  return (
    <div className="minigame">
      <div
        className="frame phosphor"
        ref={frameRef}
        role="button"
        tabIndex={0}
        aria-label="Start Snake"
      >
        <canvas ref={canvasRef} width={160} height={200} />
        <div className="scanline" />
        <div className={`overlay${overlayHidden ? " hidden" : ""}`}>
          SNAKE.EXE
          <div className="sm">click or press Enter</div>
        </div>
      </div>
      <div className="info">
        <div className="kicker phosphor">Snake · green phosphor</div>
        <h3>SNAKE.EXE</h3>
        <p>
          Classic snake through a green-phosphor CRT. Eat pellets, grow, don't bite your
          tail. Best score persists across visits.
        </p>
        <div className="controls-row">
          <span className="k">
            <span className="key">←</span>
            <span className="key">→</span>
            <span className="key">↑</span>
            <span className="key">↓</span>Move
          </span>
          <span className="k">
            <span className="key">P</span>Pause
          </span>
          <span className="score">{scoreDisplay}</span>
        </div>
      </div>
    </div>
  );
}

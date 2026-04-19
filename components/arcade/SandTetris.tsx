"use client";

import { useEffect, useRef, useState } from "react";
import {
  SAND_COLORS,
  SAND_COLOR_HEX,
  SAND_PIECES,
  SAND_PIECE_NAMES,
} from "@/content/sand";

export function SandTetris() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frameEl = frameRef.current;
    if (!canvas || !frameEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // real constants scaled to the minigame frame:
    // 10×16 tetris cells × 4 grain scale = 40×64 sand grid (aspect 1:1.6)
    const COLS = 10;
    const ROWS = 16;
    const GRAIN_SCALE = 4;
    const SAND_COLS = COLS * GRAIN_SCALE;
    const SAND_ROWS = ROWS * GRAIN_SCALE;
    const W = SAND_COLS;
    const H = SAND_ROWS;
    canvas.width = W;
    canvas.height = H;
    ctx.imageSmoothingEnabled = false;

    const MOMENTUM_FRAMES = 10;
    const sandGrid: Uint8Array[] = Array.from({ length: SAND_ROWS }, () =>
      new Uint8Array(SAND_COLS)
    );
    const momentumGrid: Uint8Array[] = Array.from({ length: SAND_ROWS }, () =>
      new Uint8Array(SAND_COLS)
    );

    const bag: string[] = [];
    const refillBag = () => {
      bag.push(...SAND_PIECE_NAMES);
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    };
    const nextFromBag = () => {
      if (bag.length < 5) refillBag();
      const name = bag.pop()!;
      const base = SAND_PIECES[name].map((row) => [...row]);
      const c = SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)];
      for (let y = 0; y < base.length; y++) {
        for (let x = 0; x < base[y].length; x++) {
          if (base[y][x] !== 0) base[y][x] = c;
        }
      }
      return base;
    };
    const rotate = (m: number[][]) => {
      const rows = m.length;
      const cols = m[0].length;
      const out: number[][] = [];
      for (let c = 0; c < cols; c++) {
        const row: number[] = [];
        for (let r = rows - 1; r >= 0; r--) row.push(m[r][c]);
        out.push(row);
      }
      return out;
    };

    // collision: allow a small overlap so piece can sink into the pile
    const collidesSand = (matrix: number[][], px: number, py: number, tol = 2) => {
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          if (!matrix[y][x]) continue;
          const cellX = px + x;
          const cellY = py + y;
          if (cellX < 0 || cellX >= COLS || cellY >= ROWS) return true;
          if (cellY < 0) continue;
          const sx = cellX * GRAIN_SCALE;
          const sy = cellY * GRAIN_SCALE;
          let overlap = 0;
          for (let ry = 0; ry < GRAIN_SCALE; ry++) {
            for (let rx = 0; rx < GRAIN_SCALE; rx++) {
              if (sandGrid[sy + ry][sx + rx] !== 0) overlap++;
            }
          }
          if (overlap > tol) return true;
        }
      }
      return false;
    };

    const addMomentum = (gx: number, gy: number) => {
      if (gy >= 0 && gy < SAND_ROWS && gx >= 0 && gx < SAND_COLS) {
        momentumGrid[gy][gx] = MOMENTUM_FRAMES;
      }
    };

    const bulkMergeSand = (matrix: number[][], px: number, py: number) => {
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          const color = matrix[y][x];
          if (!color) continue;
          const sx = (px + x) * GRAIN_SCALE;
          const sy = (py + y) * GRAIN_SCALE;
          for (let ry = 0; ry < GRAIN_SCALE; ry++) {
            for (let rx = 0; rx < GRAIN_SCALE; rx++) {
              const gy = sy + ry;
              const gx = sx + rx;
              if (
                gy >= 0 &&
                gy < SAND_ROWS &&
                gx >= 0 &&
                gx < SAND_COLS &&
                sandGrid[gy][gx] === 0
              ) {
                sandGrid[gy][gx] = color;
                addMomentum(gx, gy);
              }
            }
          }
        }
      }
    };

    const updateSand = () => {
      for (let x = 0; x < SAND_COLS; x++) {
        for (let y = SAND_ROWS - 2; y >= 0; y--) {
          const color = sandGrid[y][x];
          if (!color) continue;
          const hasMomentum = momentumGrid[y][x] > 0;

          if (sandGrid[y + 1][x] === 0) {
            sandGrid[y + 1][x] = color;
            sandGrid[y][x] = 0;
            momentumGrid[y + 1][x] = momentumGrid[y][x];
            momentumGrid[y][x] = 0;
            continue;
          }
          if (!hasMomentum) continue;

          const canLeft = x > 0 && sandGrid[y + 1][x - 1] === 0;
          const canRight = x < SAND_COLS - 1 && sandGrid[y + 1][x + 1] === 0;
          if (!canLeft && !canRight) {
            momentumGrid[y][x]--;
            continue;
          }
          const dir =
            canLeft && canRight ? (Math.random() < 0.5 ? -1 : 1) : canLeft ? -1 : 1;
          sandGrid[y + 1][x + dir] = color;
          sandGrid[y][x] = 0;
          momentumGrid[y + 1][x + dir] = momentumGrid[y][x] - 1;
          momentumGrid[y][x] = 0;
        }
      }
    };

    // 8-connected BFS from left edge; clear any colour that reaches the right edge
    const checkSandClears = () => {
      const visited = new Uint8Array(SAND_ROWS * SAND_COLS);
      let clearedCount = 0;
      for (const color of SAND_COLORS) {
        const queue: number[] = [];
        for (let y = 0; y < SAND_ROWS; y++) {
          const seed = y * SAND_COLS;
          if (sandGrid[y][0] === color && !visited[seed]) {
            visited[seed] = 1;
            queue.push(seed);
          }
        }
        const component: number[] = [];
        let maxX = -1;
        let head = 0;
        while (head < queue.length) {
          const idx = queue[head++];
          const cx = idx % SAND_COLS;
          const cy = (idx / SAND_COLS) | 0;
          component.push(idx);
          if (cx > maxX) maxX = cx;
          const offsets: [number, number][] = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ];
          for (const [dx, dy] of offsets) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || nx >= SAND_COLS || ny < 0 || ny >= SAND_ROWS) continue;
            const nIdx = ny * SAND_COLS + nx;
            if (!visited[nIdx] && sandGrid[ny][nx] === color) {
              visited[nIdx] = 1;
              queue.push(nIdx);
            }
          }
        }
        if (maxX === SAND_COLS - 1) {
          for (const idx of component) {
            sandGrid[(idx / SAND_COLS) | 0][idx % SAND_COLS] = 0;
            clearedCount++;
          }
        }
      }
      if (clearedCount) {
        scoreRef.current += Math.max(5, Math.floor(clearedCount / 5));
        setScore(scoreRef.current);
        // settle after clearing
        for (let i = 0; i < 10; i++) updateSand();
      }
    };

    type Piece = { matrix: number[][]; x: number; y: number };
    let piece: Piece | null = null;
    let running = false;
    let gameOver = false;
    let rafId = 0;
    let lastDrop = 0;
    let lastSand = 0;
    let lastClearCheck = 0;

    const endGame = () => {
      gameOver = true;
      running = false;
      setGameOverFlag(true);
      setOverlayHidden(false);
    };

    const spawn = () => {
      const matrix = nextFromBag();
      piece = {
        matrix,
        x: Math.floor((COLS - matrix[0].length) / 2),
        y: -matrix.length,
      };
      if (collidesSand(piece.matrix, piece.x, Math.max(0, piece.y))) {
        endGame();
      }
    };

    const render = () => {
      const img = ctx.createImageData(W, H);
      for (let y = 0; y < SAND_ROWS; y++) {
        for (let x = 0; x < SAND_COLS; x++) {
          const off = (y * W + x) * 4;
          const c = sandGrid[y][x];
          if (c) {
            const hex = SAND_COLOR_HEX[c];
            img.data[off] = parseInt(hex.slice(1, 3), 16);
            img.data[off + 1] = parseInt(hex.slice(3, 5), 16);
            img.data[off + 2] = parseInt(hex.slice(5, 7), 16);
            img.data[off + 3] = 255;
          } else {
            img.data[off] = 5;
            img.data[off + 1] = 8;
            img.data[off + 2] = 16;
            img.data[off + 3] = 255;
          }
        }
      }
      if (piece) {
        for (let y = 0; y < piece.matrix.length; y++) {
          for (let x = 0; x < piece.matrix[y].length; x++) {
            const c = piece.matrix[y][x];
            if (!c) continue;
            const hex = SAND_COLOR_HEX[c];
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const sx = (piece.x + x) * GRAIN_SCALE;
            const sy = (piece.y + y) * GRAIN_SCALE;
            for (let ry = 0; ry < GRAIN_SCALE; ry++) {
              for (let rx = 0; rx < GRAIN_SCALE; rx++) {
                const gx = sx + rx;
                const gy = sy + ry;
                if (gx < 0 || gx >= W || gy < 0 || gy >= H) continue;
                const off = (gy * W + gx) * 4;
                img.data[off] = r;
                img.data[off + 1] = g;
                img.data[off + 2] = b;
                img.data[off + 3] = 255;
              }
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (!piece) spawn();

      if (piece && ts - lastDrop > 260) {
        lastDrop = ts;
        if (!collidesSand(piece.matrix, piece.x, piece.y + 1)) {
          piece.y += 1;
        } else {
          if (piece.y < 0) {
            endGame();
          } else {
            bulkMergeSand(piece.matrix, piece.x, piece.y);
            piece = null;
          }
        }
      }
      if (ts - lastSand > 30) {
        lastSand = ts;
        updateSand();
      }
      if (ts - lastClearCheck > 400) {
        lastClearCheck = ts;
        checkSandClears();
      }
      render();
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (gameOver) {
        for (let y = 0; y < SAND_ROWS; y++) {
          sandGrid[y].fill(0);
          momentumGrid[y].fill(0);
        }
        scoreRef.current = 0;
        setScore(0);
        piece = null;
        gameOver = false;
        setGameOverFlag(false);
      }
      if (!running) {
        running = true;
        setOverlayHidden(true);
        frameEl.focus();
        rafId = requestAnimationFrame(step);
      }
    };

    const onClick = () => start();
    // scoped to frame so arrow keys don't leak into the snake minigame
    const onKey = (e: KeyboardEvent) => {
      if (!running && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        start();
        return;
      }
      if (!running || !piece) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!collidesSand(piece.matrix, piece.x - 1, piece.y)) piece.x -= 1;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!collidesSand(piece.matrix, piece.x + 1, piece.y)) piece.x += 1;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!collidesSand(piece.matrix, piece.x, piece.y + 1)) piece.y += 1;
      } else if (e.key.toLowerCase() === "z" || e.key === "ArrowUp") {
        e.preventDefault();
        const rotated = rotate(piece.matrix);
        if (!collidesSand(rotated, piece.x, piece.y)) piece.matrix = rotated;
      }
    };

    frameEl.addEventListener("click", onClick);
    frameEl.addEventListener("keydown", onKey);
    render();

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
        className="frame"
        ref={frameRef}
        role="button"
        tabIndex={0}
        aria-label="Start Sand Tetris"
      >
        <canvas ref={canvasRef} />
        <div className="scanline" />
        <div className={`overlay${overlayHidden ? " hidden" : ""}`}>
          {gameOverFlag ? "GAME OVER" : "SAND.TETRIS"}
          <div className="sm">
            {gameOverFlag ? `score ${String(score).padStart(4, "0")} · click to retry` : "click or press Enter"}
          </div>
        </div>
      </div>
      <div className="info">
        <div className="kicker">Sand Tetris · from my repo</div>
        <h3>SAND.TETRIS</h3>
        <p>
          Pieces crumble into coloured sand on lock. Momentum-based grain spread,
          8-connected BFS clears when a colour bridges left-to-right. Same mechanics
          as the real game — ported from my vanilla-JS build.
        </p>
        <div className="controls-row">
          <span className="k">
            <span className="key">←</span>
            <span className="key">→</span>Move
          </span>
          <span className="k">
            <span className="key">↓</span>Drop
          </span>
          <span className="k">
            <span className="key">Z</span>Rotate
          </span>
          <span className="score">{scoreDisplay}</span>
        </div>
      </div>
    </div>
  );
}

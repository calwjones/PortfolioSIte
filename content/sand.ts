// palette + piece definitions ported from calwjones/Tetris constants.js
export const SAND_PIECES: Record<string, number[][]> = {
  T: [[0, 1, 0], [1, 1, 1]],
  O: [[2, 2], [2, 2]],
  L: [[0, 0, 3], [3, 3, 3]],
  J: [[4, 0, 0], [4, 4, 4]],
  I: [[5, 5, 5, 5]],
  S: [[0, 6, 6], [6, 6, 0]],
  Z: [[7, 7, 0], [0, 7, 7]],
};

export const SAND_PIECE_NAMES = Object.keys(SAND_PIECES);

export const SAND_COLOR_HEX: Record<number, string> = {
  1: "#a855f7",
  2: "#eab308",
  3: "#f97316",
  4: "#3b82f6",
  5: "#06b6d4",
  6: "#22c55e",
  7: "#ef4444",
};

// only 4 colours are used so paths can actually connect left→right
export const SAND_COLORS = [1, 2, 5, 7];

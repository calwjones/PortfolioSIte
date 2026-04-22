// 16×16 pixel-art portrait. Edit SPRITE / COLORS to tweak the character.
const SPRITE = [
  "................",
  "....HHHHHHHH....",
  "...HHHHHHHHHH...",
  "..HHHHHHHHHHHH..",
  "..HHssssssssHH..",
  "..HsssEssEsssH..",
  "..ssssssssssss..",
  "..ssssssssssss..",
  "..sssmmmmmmsss..",
  "..ssssssssssss..",
  "...ssssssssss...",
  "....ssssssss....",
  "..bbbbbbbbbbbb..",
  ".BbbbbbbbbbbbbB.",
  ".BbbbbbbbbbbbbB.",
  ".BB.BB....BB.BB.",
];

const COLORS: Record<string, string> = {
  H: "#2a1a0a", // hair
  s: "#ffb87a", // skin
  E: "#0a0d14", // eyes
  m: "#ff5b1f", // mouth
  b: "#ff5b1f", // body
  B: "#c03c0f", // body shadow
};

export function PixelAvatar() {
  return (
    <svg
      className="pixel-avatar"
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {SPRITE.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const fill = COLORS[ch];
          if (!fill) return null;
          const isEye = ch === "E";
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={fill}
              className={isEye ? "eye" : undefined}
            />
          );
        })
      )}
    </svg>
  );
}

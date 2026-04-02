import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Callum Jones — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#0a0d14",
          backgroundImage:
            "radial-gradient(ellipse at 50% 20%, rgba(107,91,255,0.25), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(255,91,31,0.28), transparent 50%)",
          color: "#e8ecf5",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#ff5b1f",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ff5b1f",
              boxShadow: "0 0 10px #ff5b1f",
            }}
          />
          <span>CALLUM.SAV / v3</span>
        </div>
        <div
          style={{
            fontSize: 168,
            fontWeight: 700,
            lineHeight: 0.86,
            marginTop: 32,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>CALLUM</span>
          <span style={{ display: "flex" }}>
            <span>JONES</span>
            <span style={{ color: "#ff5b1f" }}>_</span>
          </span>
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8a94a8",
            marginTop: 40,
          }}
        >
          Final-year CS · UWE Bristol · Graduating Jul 2026
        </div>
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#555d70",
            marginTop: 16,
          }}
        >
          Open to graduate roles · UK
        </div>
      </div>
    ),
    { ...size }
  );
}

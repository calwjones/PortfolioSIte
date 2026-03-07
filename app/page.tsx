"use client";

import { useEffect, useRef, useState } from "react";

type InvItem = {
  g: string;
  name: string;
  rare?: "legend" | "rare";
  empty?: boolean;
  q?: string;
};

const INVENTORY: InvItem[] = [
  { g: "Ts", name: "TypeScript", rare: "legend" },
  { g: "C++", name: "C++", rare: "legend" },
  { g: "Py", name: "Python", rare: "rare" },
  { g: "Js", name: "JavaScript", rare: "rare" },
  { g: "R", name: "React", rare: "rare" },
  { g: "Nx", name: "Next.js", rare: "rare" },
  { g: "No", name: "Node.js" },
  { g: "Io", name: "Socket.IO" },
  { g: "Pr", name: "Prisma" },
  { g: "Pg", name: "PostgreSQL" },
  { g: "Tw", name: "Tailwind" },
  { g: "Cm", name: "CMake" },
  { g: "Dk", name: "Docker" },
  { g: "Ex", name: "Express" },
  { g: "Tk", name: "Tkinter" },
  { g: "Cv", name: "HTML Canvas" },
  { g: "Sq", name: "SQLite" },
  { g: "Git", name: "Git" },
  { g: "?", name: "Rust (locked)", empty: true, q: "Soon" },
  { g: "?", name: "Go (locked)", empty: true, q: "Soon" },
  { g: "?", name: "GLSL (locked)", empty: true, q: "Soon" },
  { g: "?", name: "Vulkan (locked)", empty: true, q: "Soon" },
  { g: "?", name: "Empty slot", empty: true },
  { g: "?", name: "Empty slot", empty: true },
];

type Run = {
  dataGlow: string;
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
};

const RUNS: Run[] = [
  {
    dataGlow: "rgba(255,91,31,0.18)",
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
  },
  {
    dataGlow: "rgba(255,204,59,0.18)",
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
  },
  {
    dataGlow: "rgba(107,91,255,0.2)",
    medal: "A",
    rankLabel: "RANK A · SHIPPED",
    meta: "2026 · VANILLA JS · EXPRESS · SQLITE",
    name: "Sand Tetris",
    tag: "PLAYABLE · ARCADE",
    desc: "Tetris with classic and sand-physics modes. 16 vanilla-JS modules, Uint8Array grain grid, 8-connected flood-fill clears, Express/SQLite leaderboard.",
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
    primary: { label: "▶ SOURCE", href: "https://github.com/calwjones/Tetris" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Tetris" },
  },
  {
    dataGlow: "rgba(95,214,147,0.18)",
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
  },
];

export default function Page() {
  return (
    <>
      <Hero />
      <Hud />
      <div className="wrap">
        <TitleBlock />
        <CharacterCard />
        <SectionHead title="COMPLETED RUNS" right={`0${RUNS.length} / 0${RUNS.length} · Hover for glow`} />
        <Runs />
        <SectionHead title="INVENTORY · TECH" right="Hover for name · 18 equipped · 06 locked" />
        <Inventory />
      </div>
    </>
  );
}

/* ---------- Hero (WebGL plasma + CRT) ---------- */
function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sysTime, setSysTime] = useState("—:—:—");
  const [crtOn, setCrtOn] = useState(true);
  const crtRef = useRef(1);

  useEffect(() => {
    crtRef.current = crtOn ? 1 : 0;
  }, [crtOn]);

  useEffect(() => {
    const up = () => {
      const d = new Date();
      setSysTime(d.toLocaleTimeString("en-GB", { hour12: false }) + " GMT");
    };
    up();
    const id = window.setInterval(up, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vs = `
      attribute vec2 p;
      void main(){ gl_Position = vec4(p, 0.0, 1.0); }
    `;
    const fs = `
      precision highp float;
      uniform vec2  uRes;
      uniform float uTime;
      uniform vec2  uMouse;
      uniform float uMouseAmt;
      uniform float uCRT;
      vec3 mod289(vec3 x){return x - floor(x*(1./289.))*289.;}
      vec2 mod289(vec2 x){return x - floor(x*(1./289.))*289.;}
      vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
        vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0., i1.y, 1.))
                + i.x + vec3(0., i1.x, 1.));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
        m = m*m; m = m*m;
        vec3 x = 2. * fract(p * C.www) - 1.;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130. * dot(m, g);
      }
      vec2 barrel(vec2 uv, float k){
        vec2 c = uv - 0.5;
        float r2 = dot(c, c);
        c *= 1.0 + k * r2;
        return c + 0.5;
      }
      vec3 signal(vec2 uv){
        vec2 m = uMouse;
        vec2 d = uv - m;
        float dist = length(d);
        float pull = smoothstep(0.5, 0.0, dist) * uMouseAmt;
        uv += normalize(d + 0.0001) * -pull * 0.12;
        float t = uTime * 0.12;
        float n1 = snoise(uv * 2.3 + vec2(t, -t*0.7));
        float n2 = snoise(uv * 4.6 + vec2(-t*0.4, t*1.1));
        float n3 = snoise(uv * 1.1 + vec2(t*0.2, t*0.3));
        float f = n1 * 0.55 + n2 * 0.3 + n3 * 0.55;
        f = f * 0.5 + 0.5;
        vec3 ember  = vec3(1.0, 0.357, 0.122);
        vec3 indigo = vec3(0.42, 0.357, 1.0);
        vec3 col = mix(indigo * 0.55, ember * 0.95, smoothstep(0.35, 0.75, f));
        vec3 base = vec3(0.039, 0.051, 0.078);
        col = mix(base, col, smoothstep(0.25, 0.8, f) * 0.9 + 0.1);
        float hot = smoothstep(0.78, 0.95, f);
        col += vec3(1.0, 0.5, 0.2) * hot * 1.2;
        return col;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        float bAmt = mix(0.0, 0.12, uCRT);
        vec2 buv = barrel(uv, bAmt);
        if (buv.x < 0. || buv.x > 1. || buv.y < 0. || buv.y > 1.) {
          gl_FragColor = vec4(0., 0., 0., 1.); return;
        }
        float ca = mix(0.0, 0.0035, uCRT);
        vec3 col;
        col.r = signal(buv + vec2(ca, 0.)).r;
        col.g = signal(buv).g;
        col.b = signal(buv - vec2(ca, 0.)).b;
        float sl = 0.5 + 0.5 * sin(buv.y * uRes.y * 3.14159 * 1.0);
        col *= mix(1.0, 0.82 + 0.18 * sl, uCRT);
        float grain = fract(sin(dot(buv*vec2(uTime, 1.), vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * 0.04 * uCRT;
        float vig = smoothstep(0.9, 0.4, length(uv - 0.5));
        col *= mix(1.0, vig, uCRT * 0.7);
        col *= 1.0 - 0.015 * sin(uTime * 60.0) * uCRT;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseAmt = gl.getUniformLocation(prog, "uMouseAmt");
    const uCRT = gl.getUniformLocation(prog, "uCRT");

    let mouseX = 0.5,
      mouseY = 0.5,
      tMouseX = 0.5,
      tMouseY = 0.5,
      mouseAmt = 0;
    let crtNow = 1;
    let rafId = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tMouseX = (e.clientX - r.left) / r.width;
      tMouseY = 1.0 - (e.clientY - r.top) / r.height;
      mouseAmt = 1;
    };
    const onLeave = () => {
      mouseAmt = 0;
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    const t0 = performance.now();
    const frame = () => {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      mouseX += (tMouseX - mouseX) * 0.08;
      mouseY += (tMouseY - mouseY) * 0.08;
      const target = crtRef.current;
      crtNow += (target - crtNow) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uMouseAmt, mouseAmt);
      gl.uniform1f(uCRT, crtNow);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <canvas ref={canvasRef} />
      <div className="content">
        <div className="top">
          <div className="brand">
            <span className="dot" />
            CALLUM.SAV / v3
          </div>
          <div className="sys">
            SIGNAL NTSC · 60HZ<br />
            BRISTOL · 51.45°N 2.59°W<br />
            {sysTime}
          </div>
        </div>
        <div className="hero-mid">
          <h1 className="hero-title">
            CALLUM
            <br />
            JONES<span className="u">_</span>
          </h1>
          <p className="sub">
            Final-year CS student · UWE Bristol · graduating July 2026 · open to CS roles
          </p>
        </div>
        <div className="bottom">
          <span className="hint">move cursor to warp the signal</span>
          <button
            className={`toggle${crtOn ? " on" : ""}`}
            onClick={() => setCrtOn((v) => !v)}
          >
            CRT: {crtOn ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- HUD ---------- */
function Hud() {
  const [clock, setClock] = useState("BRISTOL");
  const [age] = useState(() => {
    const now = new Date();
    const bd = new Date(2004, 5, 21);
    let a = now.getFullYear() - bd.getFullYear();
    const m = now.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) a--;
    return a;
  });

  useEffect(() => {
    const tick = () => {
      const t = new Date();
      const h = String(t.getHours()).padStart(2, "0");
      const m = String(t.getMinutes()).padStart(2, "0");
      setClock(`BRISTOL ${h}:${m}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hud">
      <div className="slot">
        <span className="lbl">HP</span>
        <span className="val" style={{ color: "var(--health)" }}>087/100</span>
      </div>
      <div className="slot">
        <span className="lbl">MP</span>
        <span className="val" style={{ color: "var(--mana)" }}>042/050</span>
      </div>
      <div className="slot">
        <span className="lbl">LVL</span>
        <span className="val">{String(age).padStart(2, "0")}</span>
      </div>
      <div className="slot">
        <span className="lbl">XP</span>
        <span className="val" style={{ color: "var(--xp)" }}>14,820</span>
      </div>
      <div className="spacer" />
      <div className="slot">
        <span className="save-dot" />
        <span className="lbl">Auto-saving</span>
      </div>
      <div className="slot">
        <span className="lbl">Zone</span>
        <span className="val">{clock}</span>
      </div>
    </div>
  );
}

/* ---------- Title ---------- */
function TitleBlock() {
  const [minutes, setMinutes] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => setMinutes((m) => m + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(minutes).padStart(2, "0");

  return (
    <div className="title-block">
      <div>
        <div className="kicker">Save slot 01 · Resumed</div>
        <h1>
          CALLUM JONES<span className="blink">_</span>
        </h1>
      </div>
      <div className="meta">
        <div className="row">
          <span className="lbl">Playtime </span>
          <span className="val">0046h {mm}m</span>
        </div>
        <div className="row">
          <span className="lbl">Saves </span>
          <span className="val">04 runs · 12 drafts</span>
        </div>
        <div className="row">
          <span className="lbl">Last save </span>
          <span className="val">just now</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Character card ---------- */
function CharacterCard() {
  const [age] = useState(() => {
    const now = new Date();
    const bd = new Date(2004, 5, 21);
    let a = now.getFullYear() - bd.getFullYear();
    const m = now.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < bd.getDate())) a--;
    return a;
  });
  return (
    <article className="character">
      <div className="char-avatar">
        <div>
          <div className="frame">
            <span className="corner">LV {age}</span>
            <span className="glyph">C</span>
          </div>
          <div className="handle">
            callum<span className="at">.jones</span>
          </div>
          <div className="class">Final-year CS · UWE Bristol</div>
        </div>
      </div>
      <div className="char-stats">
        <p className="quote">
          Final-year CS student at <em>UWE Bristol</em>. Modules finish May 2026,
          graduating July — open to CS graduate roles across the UK, remote or on-site.
        </p>
        <div className="stat-grid">
          <StatBar label="FRONTEND" v={0.88} value={88} />
          <StatBar label="BACKEND" v={0.85} value={85} cls="mana" />
          <StatBar label="TOOLING" v={0.76} value={76} cls="focus" />
          <StatBar label="GRAPHICS" v={0.72} value={72} cls="xp" />
          <StatBar label="SYSTEMS" v={0.65} value={65} />
          <StatBar label="DATABASES" v={0.62} value={62} cls="mana" />
        </div>
        <div className="char-loadout">
          <span className="chip eq">TypeScript</span>
          <span className="chip eq">React</span>
          <span className="chip eq">Next.js</span>
          <span className="chip eq">Node.js</span>
          <span className="chip eq">C++</span>
          <span className="chip">Python</span>
          <span className="chip">JavaScript</span>
          <span className="chip">Express</span>
          <span className="chip">Socket.IO</span>
          <span className="chip">Prisma</span>
          <span className="chip">PostgreSQL</span>
          <span className="chip">SQLite</span>
          <span className="chip">Docker</span>
          <span className="chip">CMake</span>
          <span className="chip">HTML Canvas</span>
          <span className="chip">Git</span>
        </div>
      </div>
    </article>
  );
}

function StatBar({
  label,
  v,
  value,
  cls,
  color,
}: {
  label: string;
  v: number;
  value: number;
  cls?: "focus" | "mana" | "xp";
  color?: string;
}) {
  const style: React.CSSProperties = { ["--v" as string]: v };
  if (color) style.background = color;
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <span className="bar">
        <span className={`fill${cls ? " " + cls : ""}`} style={style} />
      </span>
      <span className="val">{value}</span>
    </div>
  );
}

/* ---------- Section head ---------- */
function SectionHead({ title, right }: { title: string; right: string }) {
  return (
    <div className="section-head">
      <h2>
        <span className="bracket">[</span> {title} <span className="bracket">]</span>
      </h2>
      <div className="right">{right}</div>
    </div>
  );
}

/* ---------- Runs ---------- */
function Runs() {
  return (
    <div className="runs">
      {RUNS.map((r) => (
        <RunCard key={r.name} r={r} />
      ))}
    </div>
  );
}

function RunCard({ r }: { r: Run }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow", r.dataGlow);
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [r.dataGlow]);

  return (
    <article ref={ref} className="run" data-glow={r.dataGlow}>
      <div className="top">
        <span className="rank">
          <span className={`medal${r.medalClass ? " " + r.medalClass : ""}`}>{r.medal}</span>
          {r.rankLabel}
        </span>
        <span>{r.meta}</span>
      </div>
      <div className="name">
        <h3>{r.name}</h3>
        <span className="tag">{r.tag}</span>
      </div>
      <p className="desc">{r.desc}</p>
      <div className="stats">
        <span className={`s ${r.diffClass}`}>
          DIFFICULTY<span className="v">{r.diffStars}</span>
        </span>
        <span className="s">
          HOURS<span className="v accent">{r.hours}</span>
        </span>
        <span className="s">
          {r.stat3Label}<span className="v">{r.stat3Value}</span>
        </span>
      </div>
      <div className="achievements">
        {r.achievements.map((a, i) => (
          <span key={i} className={`ach${a.locked ? " locked" : ""}`}>{a.label}</span>
        ))}
      </div>
      <div className="actions">
        <LinkButton href={r.primary.href} primary>{r.primary.label}</LinkButton>
        <LinkButton href={r.source.href}>{r.source.label}</LinkButton>
      </div>
    </article>
  );
}

function LinkButton({
  href,
  children,
  primary,
}: {
  href?: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const cls = `btn${primary ? " primary" : ""}`;
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        onClick={stop}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={stop}>
      {children}
    </button>
  );
}

/* ---------- Inventory ---------- */
function Inventory() {
  return (
    <div className="inventory">
      <div className="inv-grid">
        {INVENTORY.map((i, idx) => (
          <div
            key={idx}
            className={`slot-box${i.empty ? " empty" : ""}${i.rare ? " " + i.rare : ""}`}
          >
            {i.g}
            <span className="qty">{i.q || (i.empty ? "—" : "×1")}</span>
            <span className="tip">{i.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

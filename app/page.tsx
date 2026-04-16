"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

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

type Quest = { label: string; reward: string; done?: boolean };
const QUESTS: Quest[] = [
  { label: "Finish final-year modules", reward: "MAY 2026" },
  { label: "Graduate — BSc Computer Science, UWE Bristol", reward: "JUL 2026" },
  { label: "Land first CS graduate role", reward: "OPEN TO OFFERS" },
  { label: "Matchsticked — post-launch iteration", reward: "LIVE · ONGOING" },
  { label: "Ship the next side project", reward: "ONGOING" },
  { label: "Final-year project + dissertation shipped — GameEngine", reward: "DONE · 2026", done: true },
];

type Run = {
  dataGlow: string;
  achievement: string;
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
    achievement: "First Ship",
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
    achievement: "Built From Scratch",
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
    achievement: "Canvas Wrangler",
    medal: "A",
    rankLabel: "RANK A · SHIPPED",
    meta: "2026 · VANILLA JS · EXPRESS · SQLITE",
    name: "Sand Tetris",
    tag: "PLAYABLE · ARCADE",
    desc: "Tetris with classic and sand-physics modes. 16 vanilla-JS modules, Uint8Array grain grid, 8-connected flood-fill clears, Express/SQLite leaderboard. Demo playing below — built from my repo.",
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
    primary: { label: "▶ PLAY DEMO ↓" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Tetris" },
  },
  {
    dataGlow: "rgba(95,214,147,0.18)",
    achievement: "Shipped & Forgot",
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
      <BootScreen />
      <Hero />
      <Hud />
      <div className="wrap">
        <TitleBlock />
        <CharacterCard />
        <SectionHead title="COMPLETED RUNS" right={`0${RUNS.length} / 0${RUNS.length} · Hover for glow · Click to inspect`} />
        <Runs />
        <SectionHead title="ARCADE · PLAYABLE" right="Click screen to start · Arrow keys" />
        <Arcade />
        <SectionHead title="INVENTORY · TECH" right="Hover for name · 18 equipped · 06 locked" />
        <Inventory />
        <SectionHead title="QUEST LOG · NOW" right="03 active · 03 completed this week" />
        <QuestLog />
        <SectionHead title="WORLD MAP · CONTACT" right="Teleport → message" />
        <WorldMap />
        <footer className="savefooter">
          <span>© 2026 Callum Jones · SAVE FILE 001</span>
          <span>Built with Next.js · shaders in WebGL · sand physics from my Tetris repo</span>
        </footer>
      </div>
      <Toast />
      <EasterEggs />
    </>
  );
}

/* ---------- Toast ---------- */
function Toast() {
  const [name, setName] = useState("First Visit");
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setName(detail);
      setShow(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setShow(false), 2800);
    };
    window.addEventListener("sav:toast", onToast as EventListener);
    return () => window.removeEventListener("sav:toast", onToast as EventListener);
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      <div className="t-label">Achievement Unlocked</div>
      <div className="t-name">{name}</div>
    </div>
  );
}

function fireToast(name: string) {
  window.dispatchEvent(new CustomEvent("sav:toast", { detail: name }));
}

/* ---------- Boot screen ---------- */
function BootScreen() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sav:booted")) {
      setRemoved(true);
      return;
    }
    setMounted(true);
    sessionStorage.setItem("sav:booted", "1");
    const t1 = window.setTimeout(() => setHidden(true), 1400);
    const t2 = window.setTimeout(() => {
      setRemoved(true);
      fireToast("First Visit");
    }, 2000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (removed || !mounted) return null;

  const lines = [
    "Loading save slot 01...",
    "Loading profile...",
    "Mounting projects (04 runs)...",
    "Loading inventory (18 items)...",
    "Connecting — Bristol, UK...",
    "Ready.",
  ];

  return (
    <div className={`boot${hidden ? " hidden" : ""}`}>
      <h2>CALLUM.SAV</h2>
      <div className="bar">
        <div className="bar-fill" />
      </div>
      <div className="lines">
        {lines.map((l, i) => (
          <div key={i} className="l" style={{ animationDelay: `${i * 0.15}s` }}>
            » {l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Easter eggs ---------- */
function EasterEggs() {
  useEffect(() => {
    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let kIdx = 0;
    let typeBuf = "";
    const target = "callum";

    const onKey = (e: KeyboardEvent) => {
      const expected = konami[kIdx];
      if (e.key.toLowerCase() === expected.toLowerCase() || e.key === expected) {
        kIdx++;
        if (kIdx === konami.length) {
          kIdx = 0;
          fireToast("God Mode Enabled");
          document.documentElement.style.setProperty("--accent", "#5fd693");
          document.documentElement.style.setProperty("--accent-2", "#ffcc3b");
        }
      } else {
        kIdx = 0;
      }

      if (e.key.length === 1) {
        typeBuf = (typeBuf + e.key.toLowerCase()).slice(-target.length);
        if (typeBuf === target) {
          fireToast("Contact Unlocked");
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!reduced) {
            document.body.style.transition = "filter 1s";
            document.body.style.filter = "hue-rotate(180deg)";
            window.setTimeout(() => {
              document.body.style.filter = "";
            }, 2500);
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}

/* ---------- Hero (WebGL plasma + CRT) ---------- */
function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sysTime, setSysTime] = useState("—:—:—");
  const [crtOn, setCrtOn] = useState(true);
  const crtRef = useRef(1);
  const reduced = usePrefersReducedMotion();

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
    if (reduced) return;
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

    // pause shader when tab is hidden — saves battery + GPU
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <section className="hero" ref={sectionRef}>
      {reduced ? <div className="hero-static-bg" /> : <canvas ref={canvasRef} />}
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
          <span className="hint">
            {reduced ? "motion reduced · static signal" : "move cursor to warp the signal"}
          </span>
          {!reduced && (
            <button
              className={`toggle${crtOn ? " on" : ""}`}
              onClick={() => setCrtOn((v) => !v)}
            >
              CRT: {crtOn ? "ON" : "OFF"}
            </button>
          )}
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
          Final-year CS student at <em>UWE Bristol</em>. Just shipped <em>GameEngine</em> —
          my final-year project and dissertation. Modules finish May 2026, graduating July
          — open to CS graduate roles across the UK, remote or on-site.
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

  const onClick = () => fireToast(r.achievement);

  return (
    <article ref={ref} className="run" onClick={onClick} data-glow={r.dataGlow}>
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

/* ---------- Arcade (Sand Tetris + Snake) ---------- */
function Arcade() {
  return (
    <div className="arcade">
      <SandTetris />
      <Snake />
    </div>
  );
}

/* ---------- Sand Tetris (ported from calwjones/Tetris sand mode) ---------- */
// palette pulled from calwjones/Tetris constants.js
const SAND_PIECES: Record<string, number[][]> = {
  T: [[0, 1, 0], [1, 1, 1]],
  O: [[2, 2], [2, 2]],
  L: [[0, 0, 3], [3, 3, 3]],
  J: [[4, 0, 0], [4, 4, 4]],
  I: [[5, 5, 5, 5]],
  S: [[0, 6, 6], [6, 6, 0]],
  Z: [[7, 7, 0], [0, 7, 7]],
};
const SAND_PIECE_NAMES = Object.keys(SAND_PIECES);
const SAND_COLOR_HEX: Record<number, string> = {
  1: "#a855f7",
  2: "#eab308",
  3: "#f97316",
  4: "#3b82f6",
  5: "#06b6d4",
  6: "#22c55e",
  7: "#ef4444",
};
// only 4 colours in sand mode so paths can actually connect
const SAND_COLORS = [1, 2, 5, 7];

function SandTetris() {
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
    let momentumGrid: Uint8Array[] = Array.from({ length: SAND_ROWS }, () =>
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

/* ---------- Snake (green phosphor) ---------- */
function Snake() {
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

/* ---------- Quest log ---------- */
function QuestLog() {
  return (
    <div className="questlog">
      {QUESTS.map((q, i) => (
        <div key={i} className={`quest ${q.done ? "done" : "active"}`}>
          <span className="box" />
          <span className="label">{q.label}</span>
          <span className="reward">{q.reward}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- World map ---------- */
function WorldMap() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="worldmap">
      <div>
        <div className="callout">
          Respawn<br />
          in your <em>inbox</em>.
        </div>
        <p className="sub">
          Open to CS graduate roles across the UK — remote or on-site. Based in Bristol;
          happy to relocate for the right role.
        </p>
        <div className="buttons">
          <a className="big-btn primary" href="mailto:calwjones12@gmail.com">
            calwjones12@gmail.com <span className="arr">→</span>
          </a>
          <a
            className="big-btn"
            href="https://www.linkedin.com/in/callum-jones-a252b3389/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="https://github.com/calwjones"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="https://matchsticked.com"
            target="_blank"
            rel="noreferrer"
          >
            Matchsticked <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="/Callum_Jones_CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download CV <span className="arr">⤓</span>
          </a>
        </div>
      </div>
      <div className="map-frame">
        <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" stroke="#1a2030" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#g)" />
          <path
            d="M 140 60 Q 170 55, 180 70 Q 195 80, 190 110 Q 205 120, 200 140 Q 215 160, 200 190 Q 195 220, 160 230 Q 140 235, 130 215 Q 115 200, 125 175 Q 110 160, 120 140 Q 105 120, 120 100 Q 125 80, 140 60 Z"
            fill="#141a28"
            stroke="#2a3448"
            strokeWidth="1"
          />
          <path
            d="M 60 140 Q 75 130, 90 150 Q 95 170, 80 180 Q 65 175, 60 160 Z"
            fill="#141a28"
            stroke="#2a3448"
            strokeWidth="1"
          />
          <circle cx="150" cy="170" r="3" fill="#ff5b1f" />
          <circle cx="150" cy="170" r="8" fill="none" stroke="#ff5b1f" strokeWidth="1" opacity="0.6">
            {!reduced && (
              <>
                <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </>
            )}
          </circle>
          <text x="158" y="165" fill="#ff5b1f" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">
            BRISTOL
          </text>
          <text x="20" y="290" fill="#4a4a48" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">
            UWE BRISTOL · GRAD JUL 2026
          </text>
          <text x="240" y="290" fill="#4a4a48" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2">
            ZONE: UK · OPEN TO ROLES
          </text>
        </svg>
      </div>
    </div>
  );
}

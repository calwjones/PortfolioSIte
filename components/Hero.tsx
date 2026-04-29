"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sysTime, setSysTime] = useState("—:—:—");
  const [crtOn, setCrtOn] = useState(true);
  const [glFailed, setGlFailed] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const crtRef = useRef(1);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
      setGlFailed(true);
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
    // touch: warp on tap (pointerdown) and during drag (pointermove fires while finger is down).
    // page still scrolls — warp follows finger as it moves through viewport coords, then fades.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") onMove(e);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") mouseAmt = 0;
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointercancel", onUp);

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

    // pause shader when tab is hidden or hero is scrolled off-screen
    let tabVisible = !document.hidden;
    let inView = true;
    const sync = () => {
      const next = tabVisible && inView;
      if (next && !running) {
        running = true;
        rafId = requestAnimationFrame(frame);
      } else if (!next && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };
    const onVis = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(section);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <section className="hero" ref={sectionRef}>
      {reduced || glFailed ? (
        <div className="hero-static-bg" />
      ) : (
        <canvas ref={canvasRef} />
      )}
      <div className="content">
        <div className="top">
          <div className="brand">
            <span className="dot" />
            CALLUM JONES — PORTFOLIO
          </div>
          <div className="sys">
            SIGNAL PAL · 50HZ<br />
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
          <div className="hero-actions">
            <a
              className="hero-cta primary"
              href="/Callum_Jones_CV.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="external"
            >
              DOWNLOAD CV <span className="arr">⤓</span>
            </a>
            <a
              className="hero-cta"
              href="https://matchsticked.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="external"
            >
              SEE MATCHSTICKED <span className="arr">↗</span>
            </a>
          </div>
        </div>
        <div className="bottom">
          <span className="hint">
            {reduced || glFailed
              ? "static signal"
              : coarse
                ? "tap or drag to warp the signal"
                : "move cursor to warp the signal"}
          </span>
          {!reduced && !glFailed && (
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

"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function WorldMap() {
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
          <a
            className="big-btn primary"
            href="mailto:calwjones12@gmail.com"
            data-cursor="contact"
          >
            calwjones12@gmail.com <span className="arr">→</span>
          </a>
          <a
            className="big-btn"
            href="https://www.linkedin.com/in/callum-jones-a252b3389/"
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
          >
            LinkedIn <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="https://github.com/calwjones"
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
          >
            GitHub <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="https://matchsticked.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
          >
            Matchsticked <span className="arr">↗</span>
          </a>
          <a
            className="big-btn"
            href="/Callum_Jones_CV.pdf"
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
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

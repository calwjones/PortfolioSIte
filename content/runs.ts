export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  pitch: string;
  stack: string[];
  sections: CaseStudySection[];
};

export type Run = {
  slug: string;
  accentVar: "--accent" | "--accent-2" | "--xp" | "--health";
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
  caseStudy?: CaseStudy;
  mapPin?: { x: number; y: number; label?: string; anchor?: "start" | "end" };
};

const MATCHSTICKED_CASE_STUDY: CaseStudy = {
  pitch:
    "Group movie-picking app. Two phones in a room, two thumbs swiping, a match modal when both people land on the same film. Live at matchsticked.com.",
  stack: [
    "TypeScript",
    "Next.js",
    "Express",
    "Socket.IO",
    "Prisma",
    "PostgreSQL",
    "Docker",
  ],
  sections: [
    {
      heading: "MISSION",
      body: ["Stop arguing with my girlfriend about what to watch."],
    },
    {
      heading: "PROBLEM",
      body: [
        "We had the same fight every Friday. We'd both open Netflix, scroll past the same shows we'd already considered and rejected, and end up watching nothing — the 'I don't mind, you choose' loop. I'd built terminal apps before, and I figured a movie picker was a reasonable next exercise: TMDb has an open API, Python has a cmd module, and the worst case was we'd have a slightly more interesting argument.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "The first version was a Python script. You ran it in two terminals, it pulled from TMDb, and it cross-referenced two yes-lists. It worked exactly once before I realised nobody is going to open a terminal on a Friday night.",
        "So I rebuilt it. Properly. Next.js front-end, Express + Socket.IO back-end, Prisma against Postgres, with a Letterboxd CSV import for the people who already have a few hundred films logged. Two phones in the same room, two thumbs swiping at once, a match modal when both people land on the same film. A solo 'roulette' mode for when you're alone and indecisive. A discover mode for when you've exhausted your watchlist. The whole thing runs in Docker locally and in production — docker-compose for dev, a separate prod compose file for the deployed instance at matchsticked.com.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "Socket.IO. Repeatedly. The naive 'broadcast every swipe to the room' version worked fine on localhost and fell apart the moment two people were on different networks with different latencies. Reconnects would drop swipes. The room state would desync — one phone thought you'd matched on a film the other phone hadn't seen yet. I rewrote the session model twice before settling on a server-authoritative approach where the server holds the canonical session state and the clients are dumb consumers that re-sync on reconnect rather than trying to replay events.",
        "The Letterboxd import was harder than I expected. Their CSV export is human-readable, not machine-clean — the title column contains films like The Lord of the Rings: The Fellowship of the Ring (2001), sometimes with the year, sometimes without, sometimes with weird unicode in the title. I ended up doing a fuzzy match against TMDb with a confidence threshold and a manual review step for the ambiguous cases.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "Real-time multi-user is its own discipline. The interesting bugs aren't in the happy path — they're in reconnects, partial network failures, two clients sending the same event with different timestamps. Server-authoritative is almost always the right call; client-authoritative feels faster to build and is slower to debug.",
        "Also: a project with one real user (me) is a hobby. A project with two real users (me and someone who'll text me when it breaks) is a product. The bug reports got better the second I had to ship to someone whose Friday night it would ruin.",
      ],
    },
  ],
};

const TETRIS_CASE_STUDY: CaseStudy = {
  pitch:
    "Tetris where the pieces don't stay pieces. Tetrominoes lock, dissolve into coloured grains, pile up under gravity, and clear when a colour bridges left-to-right. Vanilla-JS canvas, Express + SQLite leaderboard.",
  stack: ["JavaScript", "HTML Canvas", "Express", "SQLite"],
  sections: [
    {
      heading: "MISSION",
      body: ["Make a Tetris where the pieces don't stay pieces."],
    },
    {
      heading: "PROBLEM",
      body: [
        "I'd seen sand-physics Tetris around — pieces that disintegrate into individual grains the moment they land, gravity-spreading into piles, line clears that don't really work because there are no lines anymore. The concept is fun. The execution is where it lives or dies. I wanted to build my own version partly because I thought it'd look good and partly because the physics and rendering problems were genuinely unfamiliar territory for me.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "HTML5 Canvas, vanilla JS, no framework. Each piece spawns as a tetromino on a coarse grid. The moment it locks in, it dissolves into ~64 individual coloured grains — a fine grid 4× the resolution of the spawn grid. Grains fall under gravity, spread sideways into empty cells, and pile up the way you'd expect.",
        "The clear rule was the part that took the longest to figure out. Row clears don't work because the board doesn't have rows in any meaningful sense. The version I shipped does a flood fill from the left wall: if a connected region of same-coloured grains touches both the left wall and the right wall, that region clears. So you're not making lines, you're making colour bridges. Sometimes you set up a clear and a stray grain breaks the chain at the last moment. Sometimes a piece you didn't plan around completes a clear three rows below where you placed it.",
        "There's also an Express + SQLite backend for separate per-mode leaderboards, with the basic anti-cheating you'd expect on a public submission endpoint. Small, but it makes the game feel finished.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "Performance. The first version did the obvious thing: an array of grain objects, each with {x, y, vx, vy, colour}, simulated and drawn every frame. At ~3,000 grains it was sitting at 25fps and getting worse. The hot loop was calling Date.now() once per grain per frame, recomputing the same trig values for the spread direction, and going through the JS engine's hidden-class machinery thousands of times because the grain objects weren't shape-stable.",
        "Three things fixed it. Typed arrays for the grain data — the grains became cache-friendly contiguous memory rather than scattered object allocations. A trig lookup table because the spread directions are quantised to a small number of angles anyway. And one Date.now() call per frame, hoisted out of the loop. That last one was the most embarrassing fix because it was obvious in hindsight. I'd put the timestamp inside the simulation loop without thinking, and at 3,200 grains × 60fps that's almost 200,000 calls per second to a syscall-ish function. Pulled it out, ate dinner, came back to a smooth 60fps.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "Profile before you optimise. I'd spent half a day trying to make the spread algorithm cleverer when the actual problem was a function call I hadn't noticed putting in a hot loop. Chrome's performance tab told me in about thirty seconds.",
        "Also: data layout matters more than algorithmic cleverness for this kind of work. The shift from 'array of grain objects' to 'parallel arrays of primitives' was the single biggest win, and it didn't change the algorithm at all.",
      ],
    },
  ],
};

const CALCULATOR_CASE_STUDY: CaseStudy = {
  pitch:
    "Desktop calculator with simple and scientific modes, keyboard control, expression history. Shunting-yard parser into RPN — no eval against user input.",
  stack: ["Python", "Tkinter"],
  sections: [
    {
      heading: "MISSION",
      body: ["Build a first project I wouldn't be embarrassed by."],
    },
    {
      heading: "PROBLEM",
      body: [
        "I wanted to build a calculator. The honest reason was that it's a normal first project and I wanted to see if I could do it properly. The dishonest version is that I started with the assumption I'd write eval(expression) and call it a day, and then I realised that was both a security issue (don't eval() user input) and not really building anything.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "Python with Tkinter for the UI. Simple mode for the basics, scientific mode for the rest. Two modes, one expression engine. The expression engine is where the actual project lives.",
        "I didn't know how to parse expressions going in. I researched it, found Dijkstra's Shunting Yard algorithm, read through it twice, and realised it was actually not that complicated — tokens go through a stack and get reordered into Reverse Polish Notation, then a second pass evaluates the RPN. Operator precedence falls out for free. Parentheses too.",
        "The architecture is MVC. The view is Tkinter widgets. The model is the expression parser and evaluator. The controller wires button presses to expression edits and pipes the result back into the display. Three files, no dependencies beyond the standard library.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "Less than I expected, honestly. The Shunting Yard implementation worked first try once I had the tokeniser right. The tokeniser was where the bugs lived — handling unary minus vs binary minus (-3 vs 5 - 3) was where I spent most of the debugging time. That edge case alone took longer than the parser itself.",
        "The other thing that broke was my assumption that Tkinter would do what I expected. It mostly does, but its keyboard handling is its own world, and getting = and Enter to both submit the expression while not interfering with text input took more reading of the Tkinter docs than I'd budgeted for.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "A 'simple' project has a real engineering exercise hiding in it if you let it. Writing a parser is the kind of thing you'd skip past in a tutorial — eval() is right there — but writing one yourself is how you actually understand operator precedence, recursive descent, the difference between syntax and semantics. None of which I needed for a calculator. All of which I needed for everything I built afterwards.",
        "Also: I now refuse to write eval() against user input, ever. Worth the project on its own.",
      ],
    },
  ],
};

export const RUNS: Run[] = [
  {
    slug: "matchsticked",
    accentVar: "--accent",
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
    caseStudy: MATCHSTICKED_CASE_STUDY,
    mapPin: { x: 295, y: 80 },
  },
  {
    slug: "gameengine",
    accentVar: "--xp",
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
    mapPin: { x: 340, y: 170, anchor: "end" },
    caseStudy: {
      pitch:
        "A game engine written from scratch in C++ — final-year dissertation at UWE Bristol. Around 10k lines, 200+ hours, no tutorial to hide behind.",
      stack: ["C++", "CMake", "OpenGL", "GLFW"],
      sections: [
        {
          heading: "MISSION",
          body: [
            "Build a small 2D game engine in C++ from scratch, for my final-year dissertation. The brief wasn't to compete with Unity or Godot — it was to understand what they're actually doing under the hood by reconstructing a stripped-down version myself.",
            "By the end: roughly 10k lines of hand-written C++, a fixed-timestep main loop, an entity-component scene system, an OpenGL renderer, and a small playable demo that exercises every subsystem end-to-end.",
          ],
        },
        {
          heading: "PROBLEM",
          body: [
            "Every engine tutorial I'd followed before this abstracted the hard parts away — graphics contexts, memory layouts, how a pressed key actually ends up moving a sprite. I wanted the dissertation to force me to confront each of those layers personally. If I couldn't explain how input gets from GLFW to a script, the mark wouldn't be deserved.",
            "Choosing C++ was pragmatic. It's the language of every engine I care about and my degree had leaned heavily on higher-level languages up to that point. This was the project I'd use to build the systems vocabulary I was missing.",
          ],
        },
        {
          heading: "APPROACH",
          body: [
            "The engine is built around a classic fixed-timestep game loop, an entity-component pattern for scene objects, and a modest OpenGL renderer via GLFW. Modules are compiled separately with CMake so I can iterate on individual subsystems without rebuilding the whole tree.",
            "At its core: the main loop ticks update(dt) then render() across registered systems in order. An Entity is an ID with a bag of components — transform, sprite, collider, script — looked up from contiguous storage. Input events are captured at the window layer, translated to engine-agnostic Action enums, and dispatched to whichever scripts subscribed.",
            "I kept the scope deliberately tight. No physics beyond AABB collision, no audio, no editor. Just enough skeleton for a small demo that proves every system works.",
          ],
        },
        {
          heading: "WHAT BROKE",
          body: [
            "Memory was the honest answer. The first month of work was littered with dangling pointers from my habit of writing TypeScript, where the GC forgives you. Moving to unique_ptr and RAII aggressively once I understood them cut the bug volume more than any specific fix.",
            "CMake was the other villain. Getting a multi-module project to build cleanly across different machines cost days I hadn't budgeted for. In hindsight I'd have started from a known-good cross-platform template instead of rolling my own.",
            "The third surprise was how much time rendering 'basic' quads took. I'd underestimated the cost of getting OpenGL state right — shader compilation, VAOs, texture binding. Game logic turned out to be the cheap part.",
          ],
        },
        {
          heading: "WHAT I LEARNED",
          body: [
            "Abstractions leak in specific, predictable ways — and reading other people's engine code with a debugger attached teaches more than any book chapter. Reconstructing a system from first principles is the real deliverable, even if the result never ships.",
            "Next time: smaller scope, earlier playable prototype, and test scaffolding from day one instead of bolted on at month three.",
          ],
        },
      ],
    },
  },
  {
    slug: "tetris",
    accentVar: "--accent-2",
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
    caseStudy: TETRIS_CASE_STUDY,
    mapPin: { x: 245, y: 250, label: "SAND.TETRIS" },
  },
  {
    slug: "calculator",
    accentVar: "--health",
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
    caseStudy: CALCULATOR_CASE_STUDY,
    mapPin: { x: 40, y: 260 },
  },
];

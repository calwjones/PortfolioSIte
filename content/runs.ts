export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  pitch: string;
  stack: string[];
  sections: CaseStudySection[];
};

export type RunAction = { label: string; href?: string; scroll?: string };

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
  primary?: RunAction;
  source: RunAction;
  caseStudy?: CaseStudy;
  mapPin?: { x: number; y: number; label?: string; anchor?: "start" | "end" };
  /** Use a wider modal/page with the screenshot at the top (for projects with landscape UIs that don't fit a side column). */
  wideModal?: boolean;
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
      body: [
        "A real-time group film picker. Two people in the same room swipe through the same queue on their phones, and the app surfaces a match the moment both have said yes to the same film.",
      ],
    },
    {
      heading: "PROBLEM",
      body: [
        "Recommendations weren't the problem. Those exist already. The gap was that two people deciding together don't have a shared interface for it, so they take turns scrolling the same Netflix page they've both already rejected.",
        "What I wanted was an interaction that does the picking work itself, instead of one person advocating for a film. If both phones are swiping at once and the only thing either person sees is a match modal, neither has to argue their case. That dictates the shape of the system: a real-time session tracking what both clients have voted on, a queue kept in sync across both, and a way to seed that queue from each person's actual taste so you're not picking from popular-on-Netflix again.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "The first prototype was a Python script. Two terminals, TMDb pulls, swipe input from both, intersection at the end. It validated the matching logic, but a terminal UX didn't actually fit the situation the project was for: two people in a room, each on their phone.",
        "The version I shipped is a Next.js client with an Express + Socket.IO server, Prisma over Postgres for persistence. Each session is a server-side room that holds canonical state. Clients emit swipes, the server resolves matches and emits the match notification back. Letterboxd CSV import seeds the queue from films you've already logged, which mattered more than I expected: recommendations get uninteresting fast if they keep surfacing things you've already had an opinion on. Solo roulette mode covers the single-user case, discover mode covers the case where you've exhausted both watchlists. The whole stack is containerised with separate dev and prod compose files. The prod one runs at matchsticked.com.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "The first session-sync implementation broadcast every swipe to every client in the room. It worked locally, but broke as soon as clients were on different networks with different latencies. Reconnects dropped events. Room state could disagree across clients, with one phone registering a match before the other had even seen the film. I rewrote the protocol twice before the third design felt right.",
        "The third design was server-authoritative. The server holds the canonical session state. Clients send swipes but don't trust their own state. On reconnect they re-sync from the server rather than replaying anything queued locally. It needed more upfront design than broadcast, but the failure modes that were impossible to debug in broadcast disappeared, because there's only one source of truth and both clients can ask it the same question.",
        "The Letterboxd import was the other long tail. The CSV is human-readable, so it isn't machine-clean. Year suffixes are sometimes there and sometimes aren't. Special characters appear inconsistently. The same film can show up under two different titles depending on which release you logged. The import pipeline ended up being a fuzzy match against TMDb with a confidence threshold, and anything below the threshold gets routed to a manual review step before it's persisted.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "Most of the bugs I fixed in production weren't in the matching logic. That worked from the prototype onwards. They were in reconnections, in event ordering between clients on different networks, and in partial-connectivity edge cases. Designing the protocol assuming the network was reliable cost me a month of fixing the consequences. Server-authoritative state took more upfront design but was easier to reason about once running, and I'd reach for it again before defaulting to broadcast.",
        "Designing for two real users instead of testing alone surfaced a different set of problems. Someone else using the project and texting you when it breaks holds you to a higher 'working' standard than testing it yourself ever does.",
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
      body: [
        "A Tetris variant where pieces stop being pieces the moment they lock. Each tetromino dissolves into individual coloured grains that fall and pile under gravity, and clears happen when a colour bridges left-to-right rather than when a row fills.",
      ],
    },
    {
      heading: "PROBLEM",
      body: [
        "Sand-physics Tetris exists in a few places already. The hard parts are the simulation itself: making the per-grain physics feel right, and finding a clear mechanic that's satisfying once row clears stop being available.",
        "I wanted to build my own version partly because it's visually obvious when it's working, and partly because the rendering and physics work was unfamiliar territory. Most of my projects up to that point had been more on the application side.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "HTML5 Canvas, vanilla JavaScript, no framework. A piece spawns as a normal tetromino on a coarse grid. The moment it locks, each filled cell of that piece becomes roughly 64 grains on a finer grid at 4× the spawn resolution. From there the simulation is per-grain: each tick, every grain tries to fall straight down, and if the cell below is occupied it tries diagonally. Settled grains stay put.",
        "Clears needed thinking through. Row clears don't apply because the board doesn't really have rows in any structured sense. The shipped mechanic runs an 8-connected flood fill from the left wall: if a connected region of same-coloured grains reaches both walls, the whole region clears. The player is building colour bridges instead of lines. That changes the game in two ways. Setups can fail at the last moment when one misplaced grain breaks the chain, and unintended clears happen when a piece you placed for one reason completes a region three rows below where you put it. The second one is more fun than I expected.",
        "The Express + SQLite leaderboard backend is small. Per-mode scoring with submission validation and basic rate-limiting on the public endpoint.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "Performance was the main issue. The first version stored each grain as a JavaScript object with x, y, vx, vy, and colour fields, and ran a per-grain update over the whole array each frame. At around 3,000 grains it sat at 25fps and got worse as more pieces locked.",
        "The fix was three things, each one significant.",
        "The grain data moved to typed arrays: parallel arrays of primitives instead of an array of objects. That removed the cost of scattered heap allocations and made the simulation pass cache-friendly.",
        "The spread-direction calculation moved to a precomputed lookup table. Spread angles are quantised to a small set of values rather than continuous, so there's no reason to compute them at runtime.",
        "The biggest single fix was a Date.now() call I'd put inside the per-grain inner loop without thinking about it. At 3,200 grains × 60fps that's almost 200,000 calls per second to a function that isn't free. Hoisting it to one call per frame removed it from the hot path entirely. After those three changes the game holds 60fps comfortably with the sand pile fully built up.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "I spent half a day looking for a smarter spread algorithm before opening DevTools. The actual problem was a function call I'd added without measuring it. Chrome's performance panel found it in seconds. I keep coming back to that on later projects: assume nothing about the hot path, measure it.",
        "Memory layout also mattered more than algorithmic cleverness here. Switching from array-of-objects to parallel arrays of primitives was the largest single performance gain on the project, and the algorithm didn't change at all.",
      ],
    },
  ],
};

const CALCULATOR_CASE_STUDY: CaseStudy = {
  pitch:
    "Desktop calculator with simple and scientific modes, keyboard control, expression history. Shunting-yard parser into RPN. No unsafe evaluation of user input.",
  stack: ["Python", "Tkinter"],
  sections: [
    {
      heading: "MISSION",
      body: [
        "A desktop calculator with simple and scientific modes, full keyboard control, and a hand-built expression parser instead of a language eval.",
      ],
    },
    {
      heading: "PROBLEM",
      body: [
        "On the surface a calculator is a small UI project. The actual work is in evaluating an arithmetic expression correctly under operator precedence and parenthesisation rules. The path of least resistance is to call the language's interpreter on the input string, but that's unsafe on user input in any real context, and it skips the part of the project worth doing. So: build the parser by hand.",
      ],
    },
    {
      heading: "APPROACH",
      body: [
        "Python with Tkinter for the UI. Two modes (simple and scientific) share a single expression engine.",
        "The engine is structured MVC. The model contains the tokeniser, a Shunting-yard parser that converts infix to Reverse Polish Notation, and an RPN evaluator. The view is composed of Tkinter widgets. The controller wires button presses and key bindings to expression edits and pipes evaluation results back to the display.",
        "Operator precedence and parenthesisation are handled by Shunting-yard's existing rules, which kept the parser implementation small. Three source files, standard library only, no third-party dependencies.",
      ],
    },
    {
      heading: "WHAT BROKE",
      body: [
        "The Shunting-yard implementation worked correctly on first run once the tokeniser was complete. The bugs lived almost entirely in the tokeniser, specifically in distinguishing unary minus (-3) from binary minus (5 - 3). The disambiguation rule depends on the previous token, and producing a complete rule set for every legal input position took longer than the parser logic on the other side of it.",
        "Tkinter's keyboard handling was the other surprise. Binding both = and Enter to expression submission while not interfering with text input within the entry widget required more careful event-propagation work than the docs suggest, and I ended up reading the source for some of the binding behaviour to figure out why certain cases were swallowing the event.",
      ],
    },
    {
      heading: "WHAT I LEARNED",
      body: [
        "Writing the expression parser by hand was the most useful part of the project for me. Operator precedence, recursive descent, the line between syntax and semantics: none of that was strictly required for a calculator, but those techniques carried over to later projects more than the calculator itself did.",
        "The other takeaway: running arbitrary user input through a language interpreter isn't a workable approach for a real application. Running input directly is convenient. The risk is bigger than the convenience. Writing one parser by hand changed how I think about that trade.",
      ],
    },
  ],
};

export const RUNS: Run[] = [
  {
    slug: "matchsticked",
    accentVar: "--accent",
    dataGlow: "rgba(255,91,31,0.18)",
    achievement: "Live in production",
    medal: "S",
    rankLabel: "LIVE · 2026",
    meta: "2026 · TS · NEXT.JS · POSTGRES · DOCKER",
    name: "Matchsticked",
    tag: "WEB APP · DEPLOYED",
    desc: "Group movie-picking app. Real-time swipe-to-match sessions over Socket.IO, solo roulette, discover mode. Next.js client + Express/Prisma/Postgres server, Dockerised, deployed at matchsticked.com.",
    diffClass: "diff-hard",
    diffStars: "★★★★☆",
    hours: "180+",
    stat3Label: "STACK",
    stat3Value: "FULL",
    achievements: [
      { label: "Real-time sync" },
      { label: "Prisma + Postgres" },
      { label: "Dockerised" },
      { label: "Live in production" },
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
    achievement: "Built from scratch",
    medal: "S",
    rankLabel: "DISSERTATION · 2026",
    meta: "2026 · C++ · CMAKE",
    name: "GameEngine",
    tag: "FINAL-YEAR DISSERTATION",
    desc: "Final-year dissertation. A 2D platformer engine and visual editor in C++17. Three-layer architecture, fixed-timestep physics, spatial-grid collision, ImGui editor with undo/redo and JSON level files.",
    diffClass: "diff-hard",
    diffStars: "★★★★★",
    hours: "200+",
    stat3Label: "LOC",
    stat3Value: "~7k",
    achievements: [
      { label: "C++17 from scratch" },
      { label: "Cross-platform CMake" },
      { label: "Spatial-grid collision" },
      { label: "ImGui level editor" },
      { label: "Dissertation" },
    ],
    primary: { label: "⤓ DISSERTATION", href: "/GameEngine_Dissertation.pdf" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/GameEngine" },
    mapPin: { x: 340, y: 170, anchor: "end" },
    wideModal: true,
    caseStudy: {
      pitch:
        "Final-year dissertation. A 2D platformer engine and visual level editor in C++17. Three layers (Game, Engine, Editor) with strictly downward dependencies, so the engine has no idea the editor exists. SFML for windowing, Dear ImGui for the editor, RapidJSON for level files. Cross-platform CMake build for macOS and Windows.",
      stack: ["C++17", "CMake", "SFML", "Dear ImGui", "RapidJSON"],
      sections: [
        {
          heading: "MISSION",
          body: [
            "A 2D platformer engine and visual level editor in C++17, written from scratch as my final-year dissertation.",
          ],
        },
        {
          heading: "PROBLEM",
          body: [
            "My degree had leaned heavily on higher-level languages. I wanted the dissertation to push me into systems work the taught modules hadn't covered: manual memory management, fixed-timestep simulation, immediate-mode GUI architecture, the parts of an engine any tutorial usually abstracts away.",
            "More specifically: I wanted to be able to point at any line in the engine and explain what it does. Engine tutorials I'd worked through always hid the bits I cared about. Input handling buried in an event abstraction. Physics inside a library call. Level loading as a function that just returns a Scene. Those abstractions are fine for the projects they're in. They were exactly the layers I wanted to write myself.",
          ],
        },
        {
          heading: "APPROACH",
          body: [
            "The architecture is three layers with strictly downward dependencies. The Engine is a static library: game loop, entity manager, physics, collision, input, audio, rendering. The Editor is an ImGui application that links against the engine. The Game layer is the set of entity subclasses (Player, patrol Enemy, flying Enemy, shooting Enemy, Collectible, Projectile). The engine has no idea the editor exists; you can delete the editor target and the engine and game still build and run. I checked that's actually true rather than just asserting it, by removing the editor source files at one point during development and rebuilding cleanly.",
            "The game loop is a fixed-timestep accumulator at 60Hz with a 0.25s ceiling. Each frame, real elapsed time is added to an accumulator, and physics steps execute at exactly 1/60th of a second until the accumulator drains. The ceiling prevents the spiral of death where a single lag spike triggers runaway catch-up. The editor's play mode uses the same accumulator loop as standalone execution, so playtesting and shipped behaviour are identical. That eliminates a whole category of bugs I'd otherwise be debugging.",
            "Physics is Euler integration with exponential friction (velocity *= exp(-friction * dt)), which is frame-rate independent and never overshoots zero. Ground friction is 10× air friction, which gives tight ground control and floaty jumps, and that's mostly a feel decision rather than a correctness one. Gravity caps at 800 px/s.",
            "Collision is AABB with min-penetration-axis resolution. I started with brute-force pairwise checks because they're easy to verify, and I wanted to validate the resolution logic before adding complexity around it. The structured test plan caught frame spikes around 150 entities, which was the trigger to add a uniform 128×128 px spatial grid. Each entity registers in the cells it overlaps and pairwise tests only run between entities sharing a cell. After the change the engine held 60Hz at 300+ entities, which was beyond what the levels actually needed but useful as headroom.",
            "The editor is the part I spent the most time on. ImGui via ImGui-SFML. The game view is rendered into an sf::RenderTexture and ImGui draws it as an image, with an invisible button widget on top to capture clicks for selection and drag. Pan, zoom from 0.25× to 4×, grid snap, multi-select. Undo/redo follows the command pattern, with CompoundCommand wrapping batch operations like multi-entity drag so a single Ctrl+Z reverts the whole thing rather than each component move. Levels round-trip through JSON via RapidJSON; each entity subclass serialises its own type-specific properties through a generic key-value map, which means adding a new entity type doesn't require changes to the schema or the loader.",
          ],
        },
        {
          heading: "WHAT BROKE",
          body: [
            "Undo/redo was the system that taught me the most about C++ memory lifetimes. Commands hold pointers to entities. That's fine while everything is alive. But if a separate code path frees those entities (loading a new level, for example) the command history becomes a list of dangling pointers and the next undo crashes the editor.",
            "The fix was twofold. Clear command history before clearing entities, so there's never a window where the history references freed memory. And give the entity manager a detachEntity() method that hands ownership to the command rather than deleting, so undoing an entity deletion can restore the original object rather than reconstructing one. That meant auditing every code path that touches entity lifetime: opening a level, closing a level, clearing the scene, deleting from the scene panel, the play/stop snapshot system. Unique IDs would have avoided the whole class of problem and that's the change I'd reach for in a future version.",
            "The structured test plan caught five real bugs I would not have found by playing the engine. Five flying enemies bobbed in sync because they shared a sine phase, which I fixed with per-entity 1.2 rad offsets. Multi-entity drag created individual MoveCommands instead of one CompoundCommand, so undoing a 5-entity drag took five Ctrl+Z. Terminal velocity wasn't capped, so falling players accelerated forever. Malformed JSON crashed the loader instead of falling back to defaults. The dirty flag wasn't set by undo/redo, so you could close the window without the unsaved-changes prompt firing.",
            "Memory took the first month. JavaScript and Python had been my main languages before this, and both let the garbage collector handle most of it for you. Once I actually understood what unique_ptr and RAII were enforcing, switching to them dropped the bug rate faster than any single fix did.",
          ],
        },
        {
          heading: "WHAT I LEARNED",
          body: [
            "Once the editor existed, I built more game in a weekend than I had in the previous month writing levels by hand in code. Next time I build something with a similar shape I'd build the editor first and the engine around it.",
            "Halfway through I refactored entity creation into a centralised EntityFactory with each subclass registering itself. Before, the editor checked type strings in a dozen places, and adding a new entity type meant editing all of them. After, new entity types didn't touch editor code. The factory wasn't in the original design and probably should have been. Now when I'm making the same change in three different files, I take that as a hint to refactor.",
            "The structured test plan was more useful than I expected. Writing it at the end caught the bugs above, but if I'd written it before implementation started, the tests could have driven design decisions instead of just validating them afterwards.",
          ],
        },
      ],
    },
  },
  {
    slug: "tetris",
    accentVar: "--accent-2",
    dataGlow: "rgba(107,91,255,0.2)",
    achievement: "Canvas + sand physics",
    medal: "A",
    rankLabel: "SHIPPED · 2024",
    meta: "2024 · VANILLA JS · EXPRESS · SQLITE",
    name: "Sand Tetris",
    tag: "BROWSER GAME · PLAYABLE BELOW",
    desc: "Tetris with classic and sand-physics modes. Vanilla JS, Uint8Array grain grid, 8-connected flood-fill clears, Express/SQLite leaderboard. Demo playing below.",
    diffClass: "diff-medium",
    diffStars: "★★★☆☆",
    hours: "40+",
    stat3Label: "GRAINS/F",
    stat3Value: "~3.2k",
    achievements: [
      { label: "Per-grain sand physics" },
      { label: "Flood-fill clears" },
      { label: "Express + SQLite leaderboard" },
      { label: "60fps at 3.2k grains" },
      { label: "Mobile controls", locked: true },
    ],
    primary: { label: "▶ PLAY DEMO ↓", scroll: ".arcade" },
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Tetris" },
    caseStudy: TETRIS_CASE_STUDY,
    mapPin: { x: 245, y: 250, label: "SAND.TETRIS" },
  },
  {
    slug: "calculator",
    accentVar: "--health",
    dataGlow: "rgba(95,214,147,0.18)",
    achievement: "Daily-use app",
    medal: "C",
    medalClass: "bronze",
    rankLabel: "SHIPPED · 2024",
    meta: "2024 · PYTHON · TKINTER",
    name: "Calculator",
    tag: "DESKTOP APP",
    desc: "Desktop calculator with simple and scientific modes, full keyboard control, expression history. Hand-written shunting-yard parser into RPN, so user input is parsed directly rather than passed to an interpreter.",
    diffClass: "diff-easy",
    diffStars: "★★☆☆☆",
    hours: "10",
    stat3Label: "MODES",
    stat3Value: "02",
    achievements: [
      { label: "Shunting-yard parser" },
      { label: "RPN evaluator" },
      { label: "Keyboard control" },
      { label: "Unit tests", locked: true },
    ],
    source: { label: "⤓ SOURCE", href: "https://github.com/calwjones/Calculator" },
    caseStudy: CALCULATOR_CASE_STUDY,
    mapPin: { x: 40, y: 260 },
  },
];

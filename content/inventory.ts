export type InvItem = {
  g: string;
  name: string;
  rare?: "legend" | "rare";
  empty?: boolean;
  q?: string;
};

export const INVENTORY: InvItem[] = [
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

export const INVENTORY_EQUIPPED = INVENTORY.filter((i) => !i.empty).length;
export const INVENTORY_LOCKED = INVENTORY.filter((i) => i.empty).length;

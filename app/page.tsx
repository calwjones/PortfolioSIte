import { CharacterCard } from "@/components/CharacterCard";
import { EasterEggs } from "@/components/EasterEggs";
import { Hero } from "@/components/Hero";
import { Hud } from "@/components/Hud";
import { Inventory } from "@/components/Inventory";
import { QuestLog } from "@/components/QuestLog";
import { RunModal } from "@/components/RunModal";
import { Runs } from "@/components/Runs";
import { SectionHead } from "@/components/SectionHead";
import { Terminal } from "@/components/Terminal";
import { AchievementWatchers } from "@/components/AchievementWatchers";
import { CustomCursor } from "@/components/CustomCursor";
import { TitleBlock } from "@/components/TitleBlock";
import { Toast } from "@/components/Toast";
import { WorldMap } from "@/components/WorldMap";
import { Arcade } from "@/components/arcade/Arcade";
import { INVENTORY_EQUIPPED, INVENTORY_LOCKED } from "@/content/inventory";
import { QUESTS } from "@/content/quests";
import { RUNS } from "@/content/runs";
import { pad2 } from "@/lib/format";

const ACTIVE_QUESTS = QUESTS.filter((q) => !q.done).length;
const DONE_QUESTS = QUESTS.filter((q) => q.done).length;

export default function Page() {
  return (
    <>
      <Hero />
      <Hud />
      <div className="wrap">
        <TitleBlock />
        <CharacterCard />
        <SectionHead
          title="COMPLETED RUNS"
          right={`${pad2(RUNS.length)} / ${pad2(RUNS.length)} · Click to inspect`}
        />
        <Runs />
        <SectionHead title="ARCADE · PLAYABLE" right="Tap or click to start · Arrow keys" />
        <Arcade />
        <SectionHead
          title="INVENTORY · TECH"
          right={`${pad2(INVENTORY_EQUIPPED)} equipped · ${pad2(INVENTORY_LOCKED)} locked`}
        />
        <Inventory />
        <SectionHead
          title="QUEST LOG · NOW"
          right={`${pad2(ACTIVE_QUESTS)} active · ${pad2(DONE_QUESTS)} completed`}
        />
        <QuestLog />
        <SectionHead title="WORLD MAP · CONTACT" right="Teleport → message" />
        <WorldMap />
        <footer className="savefooter">
          <span>© 2026 Callum Jones · SAVE FILE 001</span>
          <span>Built with Next.js · shaders in WebGL · sand physics from my Tetris repo</span>
        </footer>
      </div>
      <Toast />
      <RunModal />
      <Terminal />
      <EasterEggs />
      <AchievementWatchers />
      <CustomCursor />
    </>
  );
}

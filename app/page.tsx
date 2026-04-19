import { BootScreen } from "@/components/BootScreen";
import { CharacterCard } from "@/components/CharacterCard";
import { EasterEggs } from "@/components/EasterEggs";
import { Hero } from "@/components/Hero";
import { Hud } from "@/components/Hud";
import { Inventory } from "@/components/Inventory";
import { QuestLog } from "@/components/QuestLog";
import { Runs } from "@/components/Runs";
import { SectionHead } from "@/components/SectionHead";
import { TitleBlock } from "@/components/TitleBlock";
import { Toast } from "@/components/Toast";
import { WorldMap } from "@/components/WorldMap";
import { Arcade } from "@/components/arcade/Arcade";
import { RUNS } from "@/content/runs";

export default function Page() {
  return (
    <>
      <BootScreen />
      <Hero />
      <Hud />
      <div className="wrap">
        <TitleBlock />
        <CharacterCard />
        <SectionHead
          title="COMPLETED RUNS"
          right={`0${RUNS.length} / 0${RUNS.length} · Hover for glow · Click to inspect`}
        />
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

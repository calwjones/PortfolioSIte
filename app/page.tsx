import { EasterEggs } from "@/components/EasterEggs";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { NowStrip } from "@/components/NowStrip";
import { QuestLog } from "@/components/QuestLog";
import { RunModal } from "@/components/RunModal";
import { Runs } from "@/components/Runs";
import { SectionHead } from "@/components/SectionHead";
import { Statusbar } from "@/components/Statusbar";
import { Terminal } from "@/components/Terminal";
import { CustomCursor } from "@/components/CustomCursor";
import { Toast } from "@/components/Toast";
import { WorldMap } from "@/components/WorldMap";
import { Arcade } from "@/components/arcade/Arcade";
import { QUESTS } from "@/content/quests";
import { RUNS } from "@/content/runs";
import { pad2 } from "@/lib/format";

const ACTIVE_QUESTS = QUESTS.filter((q) => !q.done).length;
const DONE_QUESTS = QUESTS.filter((q) => q.done).length;

export default function Page() {
  return (
    <>
      <Hero />
      <Statusbar />
      <div className="wrap">
        <Intro />
        <SectionHead
          id="work"
          title="SELECTED WORK"
          right={`${pad2(RUNS.length)} projects · click any card for the full case study`}
        />
        <Runs />
        <NowStrip />
        <SectionHead
          id="demos"
          title="PLAYABLE DEMOS"
          right="Tap or click to start · Arrow keys"
        />
        <Arcade />
        <SectionHead
          title="WORKING ON"
          right={`${pad2(ACTIVE_QUESTS)} active · ${pad2(DONE_QUESTS)} done`}
        />
        <QuestLog />
        <SectionHead id="contact" title="CONTACT" right="Email · LinkedIn · GitHub · CV" />
        <WorldMap />
        <footer className="savefooter">
          <span>© 2026 Callum Jones · Bristol, UK</span>
          <span>Built with Next.js, TypeScript and WebGL</span>
        </footer>
      </div>
      <Toast />
      <RunModal />
      <Terminal />
      <EasterEggs />
      <CustomCursor />
    </>
  );
}

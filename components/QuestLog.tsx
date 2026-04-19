import { QUESTS } from "@/content/quests";

export function QuestLog() {
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

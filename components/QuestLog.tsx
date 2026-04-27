"use client";

import { useEffect, useState } from "react";
import { QUESTS } from "@/content/quests";

export function QuestLog() {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
  }, []);

  return (
    <div className="questlog">
      {QUESTS.map((q, i) => {
        const done =
          q.done || (q.doneAfter ? now >= new Date(q.doneAfter).getTime() : false);
        return (
          <div key={i} className={`quest ${done ? "done" : "active"}`}>
            <span className="box" />
            <span className="label">{q.label}</span>
            <span className="reward">{q.reward}</span>
          </div>
        );
      })}
    </div>
  );
}

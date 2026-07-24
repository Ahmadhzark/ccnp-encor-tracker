// "Today's Plan" = the current program week's topics and labs, layered with the
// user's completion state. Pure derivation over curriculum + progress so it
// stays cheap to memoize (mirrors lib/stats / lib/analytics).

import { LABS, TOPICS } from "../data/curriculum";
import type { ProgressData } from "../store/types";
import { currentWeek } from "./time";

export interface PlanItem {
  id: string;
  kind: "topic" | "lab";
  name: string;
  minutes: number;
  done: boolean;
}

/** Format a minute count as "45m", "1h", or "1h 30m". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** This week's plan items, incomplete first. `limit` caps the visible list. */
export function todaysPlan(p: ProgressData, limit = 4): PlanItem[] {
  const cw = currentWeek();

  const topics: PlanItem[] = TOPICS.filter((t) => t.week === cw).map((t) => ({
    id: t.id,
    kind: "topic",
    name: t.name,
    minutes: Math.round(t.hours * 60),
    done: !!p.topics[t.id]?.done,
  }));

  const labs: PlanItem[] = LABS.filter((l) => l.week === cw).map((l) => ({
    id: l.id,
    kind: "lab",
    name: l.name,
    minutes: l.minutes,
    done: p.labs[l.id]?.status === "done",
  }));

  // Interleave topics and labs, then float unfinished work to the top so the
  // next thing to do is always first. Stable sort keeps the reading order.
  const all = [...topics, ...labs];
  all.sort((a, b) => Number(a.done) - Number(b.done));
  return all.slice(0, limit);
}

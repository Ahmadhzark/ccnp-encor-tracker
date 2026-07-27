// Achievements = derived milestones. No extra persistence: each is a threshold
// over the same stats the rest of the app already computes, so they unlock
// automatically and can never drift out of sync with real progress.

import type { IconName } from "../components/Icon";
import type { Analytics } from "./analytics";
import type { Stats } from "./stats";

export interface Milestone {
  id: string;
  group: string;
  icon: IconName;
  label: string;
  current: number;
  target: number;
  unit: string;
  unlocked: boolean;
}

interface Tier {
  group: string;
  icon: IconName;
  unit: string;
  current: number;
  tiers: { target: number; label: string }[];
}

export function computeMilestones(stats: Stats, analytics: Analytics): Milestone[] {
  const specs: Tier[] = [
    {
      group: "Overall progress", icon: "target", unit: "%", current: stats.overall,
      tiers: [
        { target: 25, label: "Quarter way" },
        { target: 50, label: "Halfway there" },
        { target: 75, label: "Home stretch" },
        { target: 100, label: "Blueprint complete" },
      ],
    },
    {
      group: "Topics", icon: "topics", unit: "", current: stats.topicsDone,
      tiers: [
        { target: 10, label: "First 10 topics" },
        { target: 25, label: "25 topics down" },
        { target: 48, label: "Every topic done" },
      ],
    },
    {
      group: "Labs", icon: "labs", unit: "", current: stats.labsDone,
      tiers: [
        { target: 15, label: "First 15 labs" },
        { target: 75, label: "Halfway through the labs" },
        { target: 150, label: "All 150 labs done" },
      ],
    },
    {
      group: "Study hours", icon: "clock", unit: "h", current: analytics.totalHours,
      tiers: [
        { target: 30, label: "30 hours in" },
        { target: 90, label: "90 hours logged" },
        { target: 180, label: "Halfway to 360" },
        { target: 360, label: "Full 360 hours" },
      ],
    },
    {
      group: "Streak", icon: "flame", unit: "d", current: stats.streak.best,
      tiers: [
        { target: 3, label: "3-day streak" },
        { target: 7, label: "One week straight" },
        { target: 14, label: "Two weeks straight" },
        { target: 30, label: "30-day streak" },
      ],
    },
  ];

  const out: Milestone[] = [];
  for (const s of specs) {
    for (const t of s.tiers) {
      out.push({
        id: `${s.group}-${t.target}`,
        group: s.group,
        icon: s.icon,
        label: t.label,
        current: s.current,
        target: t.target,
        unit: s.unit,
        unlocked: s.current >= t.target,
      });
    }
  }
  return out;
}

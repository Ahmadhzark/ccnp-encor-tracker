import { useMemo } from "react";
import { computeAnalytics } from "../lib/analytics";
import type { Analytics } from "../lib/analytics";
import { useProgress } from "./useProgress";

export function useAnalytics(): Analytics {
  const topics = useProgress((s) => s.topics);
  const labs = useProgress((s) => s.labs);
  const sessions = useProgress((s) => s.sessions);
  const startDate = useProgress((s) => s.settings.startDate);
  const examDate = useProgress((s) => s.settings.examDate);
  // Depend on the dates so the memo refreshes when the plan window changes;
  // computeAnalytics itself reads them via the synced runtime plan.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => computeAnalytics({ topics, labs, sessions }), [topics, labs, sessions, startDate, examDate]);
}

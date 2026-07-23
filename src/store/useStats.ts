import { useMemo } from "react";
import { computeStats } from "../lib/stats";
import type { Stats } from "../lib/stats";
import { useProgress } from "./useProgress";

/// Live derived stats. Recomputes only when a progress slice actually changes.
export function useStats(): Stats {
  const topics = useProgress((s) => s.topics);
  const labs = useProgress((s) => s.labs);
  const sessions = useProgress((s) => s.sessions);
  // Dates feed the runtime plan (already synced by the store); depend on them so
  // pace/schedule/countdown recompute when the study window changes.
  const startDate = useProgress((s) => s.settings.startDate);
  const examDate = useProgress((s) => s.settings.examDate);
  // startDate/examDate aren't read directly here — computeStats reads them via the
  // synced runtime plan — but we depend on them so the memo refreshes on change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => computeStats({ topics, labs, sessions }), [topics, labs, sessions, startDate, examDate]);
}

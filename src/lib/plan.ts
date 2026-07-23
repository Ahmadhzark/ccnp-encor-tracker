// Runtime study-plan window. Defaults to the curriculum constants but is kept in
// sync with user settings (see store/useProgress). Everything date-derived —
// time.ts, lib/stats, lib/analytics — reads the active dates from here so the
// whole schedule shifts atomically when the user changes their start/exam date.

import { buildWeeks, EXAM, START } from "../data/curriculum";
import type { Week } from "../data/types";

export const DEFAULT_START = START;
export const DEFAULT_EXAM = EXAM;

interface Plan {
  start: string;
  exam: string;
  weeks: Week[];
}

export const plan: Plan = {
  start: DEFAULT_START,
  exam: DEFAULT_EXAM,
  weeks: buildWeeks(DEFAULT_START, DEFAULT_EXAM),
};

/** Point the active plan at a new window. Empty/invalid values fall back to the
 *  curriculum defaults. Cheap no-op when nothing actually changed. */
export function setPlan(start?: string | null, exam?: string | null): void {
  const s = isISODate(start) ? start! : DEFAULT_START;
  const e = isISODate(exam) ? exam! : DEFAULT_EXAM;
  if (s === plan.start && e === plan.exam) return;
  plan.start = s;
  plan.exam = e;
  plan.weeks = buildWeeks(s, e);
}

function isISODate(v: string | null | undefined): boolean {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
}

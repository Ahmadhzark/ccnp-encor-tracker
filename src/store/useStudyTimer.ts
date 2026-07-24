import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// A lightweight stopwatch for study sessions. Persisted to localStorage so a
// running session keeps counting across reloads/navigation. On finish, the
// elapsed time is handed to the progress store as logged hours.

interface StudyTimerStore {
  startedAt: number | null; // epoch ms of the current run, or null when paused
  accumulatedMs: number;    // time banked from previous runs this session
  started: boolean;         // true once a session exists (running or paused)
  start: () => void;
  pause: () => void;
  reset: () => void;
  /** Elapsed ms right now (pure read; call inside a ticking render to animate). */
  elapsed: () => number;
}

export const useStudyTimer = create<StudyTimerStore>()(
  persist(
    (set, get) => ({
      startedAt: null,
      accumulatedMs: 0,
      started: false,

      start: () => set((s) => (s.startedAt ? s : { startedAt: Date.now(), started: true })),

      pause: () =>
        set((s) =>
          s.startedAt
            ? { accumulatedMs: s.accumulatedMs + (Date.now() - s.startedAt), startedAt: null }
            : s,
        ),

      reset: () => set({ startedAt: null, accumulatedMs: 0, started: false }),

      elapsed: () => {
        const s = get();
        return s.accumulatedMs + (s.startedAt ? Date.now() - s.startedAt : 0);
      },
    }),
    {
      name: "encor.timer",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ startedAt: s.startedAt, accumulatedMs: s.accumulatedMs, started: s.started }),
    },
  ),
);

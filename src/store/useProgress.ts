import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";
import { idbDel, idbGet, idbSet } from "../lib/db";
import { setPlan } from "../lib/plan";
import { todayISO } from "../lib/time";
import type { FileRef, LabProgress, LabStatus, ProgressData, Settings, TopicTag } from "./types";

// Async storage adapter so the whole progress slice persists to IndexedDB.
const idbStorage: StateStorage = {
  getItem: (name) => idbGet(name),
  setItem: (name, value) => idbSet(name, value),
  removeItem: (name) => idbDel(name),
};

interface ProgressStore extends ProgressData {
  settings: Settings;
  setWeeklyTarget: (hours: number) => void;
  setName: (name: string) => void;
  setStartDate: (iso: string | null) => void;
  setExamDate: (iso: string | null) => void;
  toggleTopic: (id: string) => void;
  setConfidence: (id: string, value: number | null) => void;
  setTopicNotes: (id: string, notes: string) => void;
  setTopicTag: (id: string, tag: TopicTag | null) => void;
  toggleBookmark: (id: string) => void;
  bumpRevision: (id: string) => void;
  setLabStatus: (id: string, status: LabStatus) => void;
  updateLab: (id: string, patch: Partial<LabProgress>) => void;
  addLabAttachment: (id: string, ref: FileRef) => void;
  removeLabAttachment: (id: string, refId: string) => void;
  logSession: (hours: number, note?: string, date?: string) => void;
  removeSession: (date: string) => void;
  resetAll: () => void;
}

const EMPTY: ProgressData = { topics: {}, labs: {}, sessions: {} };

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      ...EMPTY,
      settings: { weeklyHoursTarget: 15 },

      setWeeklyTarget: (hours) =>
        set((s) => ({ settings: { ...s.settings, weeklyHoursTarget: Math.max(1, Math.min(60, Math.round(hours))) } })),

      setName: (name) =>
        set((s) => ({ settings: { ...s.settings, name: name.trim() || undefined } })),

      setStartDate: (iso) =>
        set((s) => ({ settings: { ...s.settings, startDate: iso || undefined } })),

      setExamDate: (iso) =>
        set((s) => ({ settings: { ...s.settings, examDate: iso || undefined } })),

      toggleTopic: (id) =>
        set((s) => {
          const cur = s.topics[id] ?? {};
          const done = !cur.done;
          return {
            topics: {
              ...s.topics,
              [id]: { ...cur, done, doneAt: done ? cur.doneAt ?? todayISO() : null, lastStudied: todayISO() },
            },
          };
        }),

      setConfidence: (id, value) =>
        set((s) => ({ topics: { ...s.topics, [id]: { ...s.topics[id], confidence: value } } })),

      setTopicNotes: (id, notes) =>
        set((s) => ({ topics: { ...s.topics, [id]: { ...s.topics[id], notes } } })),

      setTopicTag: (id, tag) =>
        set((s) => ({ topics: { ...s.topics, [id]: { ...s.topics[id], tag } } })),

      toggleBookmark: (id) =>
        set((s) => ({ topics: { ...s.topics, [id]: { ...s.topics[id], bookmarked: !s.topics[id]?.bookmarked } } })),

      bumpRevision: (id) =>
        set((s) => ({
          topics: { ...s.topics, [id]: { ...s.topics[id], revisions: (s.topics[id]?.revisions ?? 0) + 1, lastStudied: todayISO() } },
        })),

      setLabStatus: (id, status) =>
        set((s) => ({
          labs: { ...s.labs, [id]: { ...s.labs[id], status, doneAt: status === "done" ? s.labs[id]?.doneAt ?? todayISO() : null } },
        })),

      updateLab: (id, patch) =>
        set((s) => ({ labs: { ...s.labs, [id]: { ...s.labs[id], ...patch } } })),

      addLabAttachment: (id, ref) =>
        set((s) => ({
          labs: { ...s.labs, [id]: { ...s.labs[id], attachments: [...(s.labs[id]?.attachments ?? []), ref] } },
        })),

      removeLabAttachment: (id, refId) =>
        set((s) => ({
          labs: { ...s.labs, [id]: { ...s.labs[id], attachments: (s.labs[id]?.attachments ?? []).filter((a) => a.id !== refId) } },
        })),

      logSession: (hours, note, date = todayISO()) =>
        set((s) => {
          const prev = s.sessions[date];
          // Additive within a day: three 1h sessions read as 3h.
          const total = Math.round(((prev?.hours ?? 0) + hours) * 100) / 100;
          return { sessions: { ...s.sessions, [date]: { date, hours: total, note: note ?? prev?.note } } };
        }),

      removeSession: (date) =>
        set((s) => {
          const next = { ...s.sessions };
          delete next[date];
          return { sessions: next };
        }),

      resetAll: () => set({ ...EMPTY }),
    }),
    {
      name: "encor.progress",
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => ({ topics: s.topics, labs: s.labs, sessions: s.sessions, settings: s.settings }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // Point the runtime schedule at the user's saved dates as soon as they load.
        setPlan(state.settings.startDate, state.settings.examDate);
        const empty =
          !Object.keys(state.topics).length &&
          !Object.keys(state.labs).length &&
          !Object.keys(state.sessions).length;
        if (empty) {
          const legacy = readLegacyConsole();
          if (legacy) useProgress.setState(legacy);
        }
      },
    },
  ),
);

// Keep the runtime study-plan window in lockstep with settings. The guard inside
// setPlan makes this a no-op for the many non-date updates, and because the
// listener runs synchronously on set(), date-derived memos read fresh dates on
// their next recompute.
setPlan(useProgress.getState().settings.startDate, useProgress.getState().settings.examDate);
useProgress.subscribe((s) => setPlan(s.settings.startDate, s.settings.examDate));

// One-time import from the original static console, which shares this origin's
// localStorage. Keeps a user's existing ticks/hours when they move to the app.
function readLegacyConsole(): ProgressData | null {
  try {
    const raw = localStorage.getItem("ccnp-encor-console-v1");
    if (!raw) return null;
    const p = JSON.parse(raw) as {
      topics?: Record<string, { done?: boolean; date?: string | null; conf?: string | number }>;
      labs?: Record<string, boolean>;
      log?: Record<string, number>;
    };
    const data: ProgressData = { topics: {}, labs: {}, sessions: {} };
    for (const [id, t] of Object.entries(p.topics ?? {})) {
      const conf = t.conf === "" || t.conf == null ? null : Number(t.conf);
      data.topics[id] = { done: !!t.done, doneAt: t.date ?? null, confidence: Number.isFinite(conf) ? conf : null };
    }
    for (const [id, done] of Object.entries(p.labs ?? {})) {
      if (done) data.labs[id] = { status: "done", doneAt: null };
    }
    for (const [date, hours] of Object.entries(p.log ?? {})) {
      if (hours > 0) data.sessions[date] = { date, hours };
    }
    return data;
  } catch {
    return null;
  }
}

/// True once the store has finished rehydrating from IndexedDB — gate initial
/// UI on this so we never flash 0% before real data loads.
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => useProgress.persist.hasHydrated());
  useEffect(() => {
    const unsub = useProgress.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useProgress.persist.hasHydrated());
    return unsub;
  }, []);
  return hydrated;
}

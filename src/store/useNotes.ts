import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Free-form user notes, newest first. Persisted to localStorage — independent of
// study progress (which lives in IndexedDB) so notes are easy to export/clear.

export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

interface NotesStore {
  notes: Note[];
  add: () => string; // creates a blank note at the top, returns its id
  update: (id: string, patch: Partial<Pick<Note, "title" | "body">>) => void;
  remove: (id: string) => void;
  insert: (note: Note) => void; // re-insert (used for undo), preserving order by updatedAt
}

function uid(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `n_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useNotes = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      add: () => {
        const now = new Date().toISOString();
        const note: Note = { id: uid(), title: "", body: "", createdAt: now, updatedAt: now };
        set((s) => ({ notes: [note, ...s.notes] }));
        return note.id;
      },

      update: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n)),
        })),

      remove: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      insert: (note) =>
        set((s) => ({
          notes: [note, ...s.notes.filter((n) => n.id !== note.id)].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
        })),
    }),
    {
      name: "encor.notes",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Compact relative time, e.g. "just now", "5m ago", "3h ago", "Jul 24". */
export function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = new Date(then);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

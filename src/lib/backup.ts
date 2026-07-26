// Full-account export/import. Progress lives in IndexedDB and notes/theme in
// localStorage; this gathers everything into one portable JSON file so a user
// can back up or move devices. Reading from the live stores avoids async DB reads.

import { useNotes } from "../store/useNotes";
import type { Note } from "../store/useNotes";
import { useProgress } from "../store/useProgress";
import type { ProgressData, Settings } from "../store/types";

const APP_TAG = "ccnp-encor-tracker";

export interface Backup {
  app: string;
  version: number;
  exportedAt: string;
  progress: ProgressData & { settings: Settings };
  notes: Note[];
  theme: string;
}

export function exportData(): string {
  const p = useProgress.getState();
  const backup: Backup = {
    app: APP_TAG,
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: { topics: p.topics, labs: p.labs, sessions: p.sessions, settings: p.settings },
    notes: useNotes.getState().notes,
    theme: (typeof localStorage !== "undefined" && localStorage.getItem("encor.theme")) || "copper",
  };
  return JSON.stringify(backup, null, 2);
}

export interface ImportResult {
  topics: number;
  labs: number;
  sessions: number;
  notes: number;
  theme: string;
}

/** Restore from a backup string. Throws with a friendly message on bad input. */
export function importData(text: string): ImportResult {
  let d: Partial<Backup>;
  try {
    d = JSON.parse(text);
  } catch {
    throw new Error("That file isn't valid JSON.");
  }
  if (!d || d.app !== APP_TAG || !d.progress) {
    throw new Error("That doesn't look like a CCNP tracker backup.");
  }

  const prog = d.progress;
  useProgress.setState({
    topics: prog.topics ?? {},
    labs: prog.labs ?? {},
    sessions: prog.sessions ?? {},
    settings: { ...useProgress.getState().settings, ...(prog.settings ?? {}) },
  });

  const notes = Array.isArray(d.notes) ? d.notes : [];
  useNotes.setState({ notes });

  const theme = typeof d.theme === "string" ? d.theme : "copper";
  try { localStorage.setItem("encor.theme", theme); } catch { /* storage blocked */ }

  return {
    topics: Object.keys(prog.topics ?? {}).length,
    labs: Object.keys(prog.labs ?? {}).length,
    sessions: Object.keys(prog.sessions ?? {}).length,
    notes: notes.length,
    theme,
  };
}

/** Trigger a browser download of the current backup. */
export function downloadBackup(): void {
  const blob = new Blob([exportData()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ccnp-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

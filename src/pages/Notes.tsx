import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "../components";
import { relativeTime, useNotes } from "../store/useNotes";
import type { Note } from "../store/useNotes";
import { toast } from "../store/useToast";
import pageStyles from "./pages.module.css";
import styles from "./Notes.module.css";

export function Notes() {
  const notes = useNotes((s) => s.notes);
  const add = useNotes((s) => s.add);
  const update = useNotes((s) => s.update);
  const remove = useNotes((s) => s.remove);
  const insert = useNotes((s) => s.insert);

  const [focusId, setFocusId] = useState<string | null>(null);

  const newNote = () => {
    const id = add();
    setFocusId(id);
    toast("New note added");
  };

  const del = (note: Note) => {
    remove(note.id);
    toast("Note deleted", { action: { label: "Undo", onClick: () => insert(note) } });
  };

  return (
    <div className={pageStyles.page}>
      <div className={styles.head}>
        <div className={pageStyles.pageHead}>
          <h1>Notes</h1>
          <p>Your own scratchpad — jot summaries, gotchas and reminders. Saved automatically on this device.</p>
        </div>
        <Button variant="primary" size="lg" onClick={newNote} className={styles.newBtn}>
          <Icon name="plus" size={18} strokeWidth={2.25} /> New note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}><Icon name="book" size={26} /></span>
          <div className={styles.emptyTitle}>No notes yet</div>
          <p>Capture a quick summary of a topic, a command you keep forgetting, or an exam trap.</p>
          <Button variant="primary" onClick={newNote}><Icon name="plus" size={16} strokeWidth={2.25} /> Create your first note</Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {notes.map((n) => (
            <NoteCard
              key={n.id}
              note={n}
              autoFocus={n.id === focusId}
              onChange={(patch) => update(n.id, patch)}
              onDelete={() => del(n)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NoteCard({
  note,
  autoFocus,
  onChange,
  onDelete,
}: {
  note: Note;
  autoFocus: boolean;
  onChange: (patch: Partial<Pick<Note, "title" | "body">>) => void;
  onDelete: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea to fit its content.
  const grow = () => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };
  useEffect(grow, []);
  useEffect(() => {
    if (autoFocus) titleRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className={styles.card}>
      <input
        ref={titleRef}
        className={styles.title}
        placeholder="Title"
        value={note.title}
        maxLength={120}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <textarea
        ref={bodyRef}
        className={styles.body}
        placeholder="Start typing…"
        value={note.body}
        rows={3}
        onChange={(e) => {
          onChange({ body: e.target.value });
          grow();
        }}
      />
      <div className={styles.foot}>
        <span className={styles.time}>{relativeTime(note.updatedAt)}</span>
        <button className={styles.del} onClick={onDelete} aria-label="Delete note" title="Delete note">
          <Icon name="trash" size={16} />
        </button>
      </div>
    </div>
  );
}

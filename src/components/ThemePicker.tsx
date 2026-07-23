import clsx from "clsx";
import { THEMES, useTheme } from "../theme/ThemeProvider";
import { Icon } from "./Icon";
import styles from "./ThemePicker.module.css";

interface ThemePickerProps {
  /** Compact swatch-only row (topbar). Default shows labels (settings). */
  compact?: boolean;
}

export function ThemePicker({ compact }: ThemePickerProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={clsx(styles.grid, compact && styles.compact)} role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          role="radio"
          aria-checked={t.value === theme}
          aria-label={t.label}
          title={t.label}
          className={clsx(styles.tile, t.value === theme && styles.active)}
          onClick={() => setTheme(t.value)}
        >
          <span
            className={styles.swatch}
            style={{
              background: t.bg,
              // preview: a surface card sitting on the ground, plus an accent chip
              "--sf": t.surface,
              "--ac": t.accent,
            } as React.CSSProperties}
          >
            <span className={styles.swSurface} />
            <span className={styles.swAccent} />
            <span className={styles.check}>
              <Icon name="check" size={15} strokeWidth={3} />
            </span>
          </span>
          {!compact && <span className={styles.name}>{t.label}</span>}
        </button>
      ))}
    </div>
  );
}

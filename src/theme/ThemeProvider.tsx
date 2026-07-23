import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "copper" | "midnight" | "ocean" | "meadow";

const KEY = "encor.theme"; // kept in sync with the pre-paint script in index.html

/** The four shippable themes, in picker order. `scheme` drives native controls;
 *  `bg`/`accent` are preview swatch colours (must mirror tokens.css). */
export const THEMES: {
  value: Theme;
  label: string;
  scheme: "light" | "dark";
  bg: string;
  surface: string;
  accent: string;
}[] = [
  { value: "copper", label: "Copper", scheme: "light", bg: "#f6f7f9", surface: "#ffffff", accent: "#a8623a" },
  { value: "midnight", label: "Midnight", scheme: "dark", bg: "#0c1015", surface: "#1b222c", accent: "#ce8352" },
  { value: "ocean", label: "Ocean", scheme: "dark", bg: "#08131f", surface: "#15293b", accent: "#33b4d6" },
  { value: "meadow", label: "Meadow", scheme: "light", bg: "#f1f6f1", surface: "#ffffff", accent: "#1f8f5f" },
];

const THEME_SET = new Set<Theme>(THEMES.map((t) => t.value));

/** Map any stored value (including the legacy system/light/dark prefs and old
 *  accents) onto a current theme id. Kept in sync with index.html. */
export function normalizeTheme(raw: string | null): Theme {
  if (raw && THEME_SET.has(raw as Theme)) return raw as Theme;
  if (raw === "dark") return "midnight";
  return "copper"; // "light", "system", null, or anything unknown
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    normalizeTheme(typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null),
  );

  // Apply the theme to <html>, remember it, and keep the browser UI colour in step.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* storage blocked */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const brand = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
      if (brand) meta.setAttribute("content", brand);
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

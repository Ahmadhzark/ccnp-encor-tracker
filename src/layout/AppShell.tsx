import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/Icon";
import { Toaster } from "../components/Toaster";
import { daysLeft } from "../lib/time";
import { useProgress } from "../store/useProgress";
import styles from "./AppShell.module.css";

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
}

// Full primary nav — shown in the desktop sidebar.
const NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: "dashboard" },
  { to: "/topics", label: "Topics", icon: "topics" },
  { to: "/labs", label: "Labs", icon: "labs" },
  { to: "/notes", label: "Notes", icon: "book" },
  { to: "/flashcards", label: "Flashcards", icon: "cards" },
  { to: "/log", label: "Log", icon: "clock" },
  { to: "/analytics", label: "Analytics", icon: "analytics" },
  { to: "/goals", label: "Goals", icon: "target" },
];

// Mobile bottom bar: same set minus Goals (still in the sidebar) so the six
// tabs stay comfortable while Notes gets a spot.
const TABS: NavItem[] = [
  { to: "/", label: "Dashboard", icon: "dashboard" },
  { to: "/topics", label: "Topics", icon: "topics" },
  { to: "/labs", label: "Labs", icon: "labs" },
  { to: "/notes", label: "Notes", icon: "book" },
  { to: "/log", label: "Log", icon: "clock" },
  { to: "/analytics", label: "Analytics", icon: "analytics" },
];

const TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/topics": "Topics",
  "/labs": "Labs",
  "/notes": "Notes",
  "/flashcards": "Flashcards",
  "/log": "Log",
  "/analytics": "Analytics",
  "/goals": "Goals",
  "/settings": "Settings",
  "/about": "About",
};

export function AppShell() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "ENCOR";
  // Subscribe to the exam date so the countdown re-renders when it's changed in
  // Settings; daysLeft() itself reads the synced runtime plan.
  useProgress((s) => s.settings.examDate);
  const days = daysLeft();

  return (
    <div className={styles.shell}>
      <div className={styles.brandCell}>
        <div className={styles.mark}>
          <Icon name="analytics" size={17} strokeWidth={2.25} />
        </div>
        <div className={styles.brandText}>
          <b>ENCOR</b>
          <span>350-401</span>
        </div>
      </div>

      <header className={styles.topbar}>
        <div className={styles.pageTitle}>{title}</div>
        <div className={styles.spacer} />
        <NavLink
          to="/settings"
          className={({ isActive }) => clsx(styles.iconLink, isActive && styles.iconLinkActive)}
          title="Settings"
          aria-label="Settings"
        >
          <Icon name="settings" size={18} />
        </NavLink>
        <div className={styles.countdown}>
          <b>{days}</b>
          <span>days to exam</span>
        </div>
      </header>

      <nav className={styles.nav} aria-label="Primary">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => clsx(styles.navLink, isActive && styles.navActive)}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </NavLink>
        ))}
        <div className={styles.navSpacer} />
        <NavLink to="/about" className={({ isActive }) => clsx(styles.navLink, isActive && styles.navActive)}>
          <Icon name="info" size={18} />
          About
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => clsx(styles.navLink, isActive && styles.navActive)}>
          <Icon name="settings" size={18} />
          Settings
        </NavLink>
        <div className={styles.navFoot}>Certflow · CCNP ENCOR · v1.0.0</div>
      </nav>

      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>

      <nav className={styles.tabbar} aria-label="Primary">
        {TABS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => clsx(styles.tab, isActive && styles.tabActive)}
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/log" className={styles.fab} title="Log study time" aria-label="Log study time">
        <Icon name="plus" size={24} strokeWidth={2.5} />
      </NavLink>

      <Toaster />
    </div>
  );
}

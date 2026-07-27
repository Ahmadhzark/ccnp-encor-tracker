import { Icon } from "../components";
import type { IconName } from "../components/Icon";
import pageStyles from "./pages.module.css";
import styles from "./About.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME: your links and your other trackers live here. Swap the placeholder
// URLs (#) for the real ones and add/remove entries as you like.
// ─────────────────────────────────────────────────────────────────────────────

interface LinkItem { label: string; handle: string; href: string; icon: IconName; color: string; }

const LINKS: LinkItem[] = [
  { label: "GitHub", handle: "@certlow-0", href: "https://github.com/certlow-0", icon: "github", color: "#8b5cf6" },
  { label: "Email", handle: "usecertflow@gmail.com", href: "mailto:usecertflow@gmail.com", icon: "mail", color: "#22c55e" },
  { label: "Website", handle: "add your site", href: "#", icon: "link", color: "#3b82f6" },
];

interface Tracker { name: string; blurb: string; href: string; status: "live" | "current" | "soon"; }

const TRACKERS: Tracker[] = [
  { name: "CCNP ENCOR 350-401", blurb: "This app — a full 24-week program tracker with labs, analytics and goals.", href: "https://ahmadhzark.github.io/ccnp-encor-tracker/", status: "current" },
  { name: "AWS Solutions Architect (SAA)", blurb: "Associate-level study planner and hands-on lab tracker.", href: "#", status: "soon" },
  { name: "CCNA 200-301", blurb: "Foundations tracker for the Cisco CCNA path.", href: "#", status: "soon" },
];

const STATUS_LABEL: Record<Tracker["status"], string> = { live: "Live", current: "You're here", soon: "Coming soon" };

export function About() {
  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.pageHead}>
        <h1>About</h1>
        <p>Who's behind this tracker, where to reach us, and the other study trackers from Certflow.</p>
      </div>

      {/* brand / intro */}
      <section className={styles.hero}>
        <span className={styles.mark}><Icon name="analytics" size={26} strokeWidth={2.25} /></span>
        <div className={styles.heroText}>
          <span className={styles.brandEyebrow}>Certflow</span>
          <h2>CCNP ENCOR Tracker</h2>
          <p>
            A focused, offline-first study companion for the Cisco CCNP ENCOR 350-401 exam — built to keep your
            topics, labs, study hours and momentum in one place. Made by <b>Certflow</b>, study tools for people
            chasing certifications.
          </p>
          <span className={styles.version}>Version 1.0.0</span>
        </div>
      </section>

      {/* links */}
      <section className={styles.block}>
        <div className={styles.blockTitle}>Connect with us</div>
        <div className={styles.linkGrid}>
          {LINKS.map((l) => {
            const disabled = l.href === "#";
            return (
              <a
                key={l.label}
                className={`${styles.linkCard} ${disabled ? styles.disabled : ""}`}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                style={{ "--c": l.color } as React.CSSProperties}
                aria-disabled={disabled}
                onClick={(e) => disabled && e.preventDefault()}
              >
                <span className={styles.linkChip}><Icon name={l.icon} size={20} /></span>
                <span className={styles.linkText}>
                  <b>{l.label}</b>
                  <span>{l.handle}</span>
                </span>
                <Icon name="chevronRight" size={18} className={styles.linkArrow} />
              </a>
            );
          })}
        </div>
      </section>

      {/* other trackers */}
      <section className={styles.block}>
        <div className={styles.blockTitle}>More trackers from Certflow</div>
        <div className={styles.trackerList}>
          {TRACKERS.map((t) => {
            const disabled = t.href === "#" || t.status === "current";
            return (
              <a
                key={t.name}
                className={`${styles.trackerCard} ${disabled ? styles.disabled : ""}`}
                href={disabled ? undefined : t.href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => disabled && e.preventDefault()}
              >
                <div className={styles.trackerMain}>
                  <div className={styles.trackerTop}>
                    <b>{t.name}</b>
                    <span className={`${styles.badge} ${styles["s_" + t.status]}`}>{STATUS_LABEL[t.status]}</span>
                  </div>
                  <p>{t.blurb}</p>
                </div>
                {!disabled && <Icon name="external" size={18} className={styles.trackerArrow} />}
              </a>
            );
          })}
        </div>
      </section>

      <div className={styles.madeWith}>
        Made with <Icon name="heart" size={14} className={styles.heart} /> by Certflow · © {new Date().getFullYear()}
      </div>
    </div>
  );
}

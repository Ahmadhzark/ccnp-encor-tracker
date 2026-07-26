import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CountUp } from "../components/CountUp";
import { GradientRing } from "../components/GradientRing";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/Icon";
import { PROGRAM_WEEKS, TOPICS, TOTAL_HOURS, TOTAL_LABS, TOTAL_TOPICS, prettyLong } from "../data/curriculum";
import { plan } from "../lib/plan";
import { formatDuration, todaysPlan } from "../lib/today";
import { currentWeek, daysLeft, todayISO } from "../lib/time";
import { useProgress } from "../store/useProgress";
import { useStats } from "../store/useStats";
import { useStudyTimer } from "../store/useStudyTimer";
import { toast } from "../store/useToast";
import styles from "./Dashboard.module.css";

function greeting(): string {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function clock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
}

// Mon-first weekday dots for the current calendar week.
function weekDots(sessions: Record<string, { hours: number }>, today: string) {
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  const now = new Date(today + "T00:00:00Z");
  const dow = (now.getUTCDay() + 6) % 7; // 0 = Monday
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - dow);
  return labels.map((label, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    const iso = d.toISOString().slice(0, 10);
    return { label, done: (sessions[iso]?.hours ?? 0) > 0, future: iso > today, isToday: iso === today };
  });
}

export function Dashboard() {
  const nav = useNavigate();
  const stats = useStats();
  const name = useProgress((s) => s.settings.name);
  const topics = useProgress((s) => s.topics);
  const labs = useProgress((s) => s.labs);
  const sessions = useProgress((s) => s.sessions);
  const toggleTopic = useProgress((s) => s.toggleTopic);
  const setLabStatus = useProgress((s) => s.setLabStatus);
  const logSession = useProgress((s) => s.logSession);

  const plan3 = useMemo(() => todaysPlan({ topics, labs, sessions }, 3), [topics, labs, sessions]);
  const dots = useMemo(() => weekDots(sessions, todayISO()), [sessions]);

  // ---- study session timer ----
  const startedAt = useStudyTimer((s) => s.startedAt);
  const accumulatedMs = useStudyTimer((s) => s.accumulatedMs);
  const started = useStudyTimer((s) => s.started);
  const start = useStudyTimer((s) => s.start);
  const pause = useStudyTimer((s) => s.pause);
  const reset = useStudyTimer((s) => s.reset);
  const running = startedAt != null;

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [running]);
  const elapsedMs = accumulatedMs + (startedAt ? now - startedAt : 0);

  const finish = () => {
    const ms = accumulatedMs + (startedAt ? Date.now() - startedAt : 0);
    reset();
    const mins = ms / 60000;
    if (mins >= 1) {
      logSession(Math.round((ms / 3600000) * 100) / 100, "Study session");
      toast(`Logged ${formatDuration(Math.round(mins))} of study`);
    } else {
      toast("Session discarded — under a minute.");
    }
  };

  const left = daysLeft();
  const hh = Math.floor(stats.hoursDone);
  const mm = Math.round((stats.hoursDone - hh) * 60);

  const quick: { label: string; icon: IconName; color: string; onClick: () => void }[] = [
    { label: "Notes", icon: "book", color: "#22c55e", onClick: () => nav("/notes") },
    { label: "Flashcards", icon: "cards", color: "#8b5cf6", onClick: () => nav("/flashcards") },
    { label: "Log time", icon: "clock", color: "#f59e0b", onClick: () => nav("/log") },
    { label: "Analytics", icon: "analytics", color: "#3b82f6", onClick: () => nav("/analytics") },
  ];

  // Weak areas to review: weak-tagged first, then lowest confidence (≤ 2).
  const review = useMemo(() => {
    return TOPICS.map((t) => ({ t, pr: topics[t.id] }))
      .filter(({ pr }) => pr?.tag === "weak" || (pr?.confidence != null && pr.confidence <= 2))
      .sort((a, b) => {
        const aw = a.pr?.tag === "weak" ? 0 : 1;
        const bw = b.pr?.tag === "weak" ? 0 : 1;
        if (aw !== bw) return aw - bw;
        return (a.pr?.confidence ?? 5) - (b.pr?.confidence ?? 5);
      })
      .slice(0, 3)
      .map(({ t }) => t);
  }, [topics]);

  const noSessionToday = stats.hoursToday === 0 && !running;

  return (
    <div className={styles.page}>
      {/* greeting */}
      <header className={styles.greet}>
        <div className={styles.greetText}>
          <h1>
            {greeting()}
            {name ? <>, <span className={styles.name}>{name}</span></> : null}
          </h1>
          <p>Stay consistent, see the results.</p>
        </div>
        <button className={styles.bell} aria-label="Notifications" onClick={() => toast("You're all caught up.")}>
          <Icon name="bell" size={20} />
        </button>
      </header>

      {/* streak-protection nudge */}
      {noSessionToday && (
        <button className={styles.nudge} onClick={start}>
          <span className={styles.nudgeIcon}><Icon name="flame" size={18} /></span>
          <span className={styles.nudgeText}>
            {stats.streak.current > 0
              ? <>Keep your <b>{stats.streak.current}-day</b> streak alive — start a study session today.</>
              : <>Log some study today to start a streak.</>}
          </span>
          <Icon name="play" size={16} className={styles.nudgeArrow} />
        </button>
      )}

      {/* exam countdown */}
      <div className={styles.examCard}>
        <span className={styles.calChip}><Icon name="calendar" size={20} /></span>
        <div className={styles.examText}>
          <span className={styles.examLabel}>Exam date</span>
          <b className={styles.examDate}>{prettyLong(plan.exam)}</b>
        </div>
        <div className={styles.dPill}>
          <b>D-<CountUp value={left} /></b>
          <span>days left</span>
        </div>
      </div>

      {/* overall progress */}
      <section className={styles.panel}>
        <div className={styles.overall}>
          <div className={styles.ringCol}>
            <GradientRing value={stats.overall} size={168} stroke={13}>
              <div className={styles.ringVal}><CountUp value={stats.overall} /><small>%</small></div>
              <div className={styles.ringSub}>Completed</div>
            </GradientRing>
          </div>
          <ul className={styles.statList}>
            <StatRow icon="book" color="#8b5cf6" label="Topics completed" value={`${stats.topicsDone} / ${TOTAL_TOPICS}`} />
            <StatRow icon="labs" color="#22c55e" label="Labs completed" value={`${stats.labsDone} / ${TOTAL_LABS}`} />
            <StatRow icon="clock" color="#f59e0b" label="Study hours" value={mm > 0 ? `${hh}h ${mm}m` : `${hh}h`} last />
          </ul>
        </div>
        <Link to="/analytics" className={styles.viewBtn}>
          <Icon name="analytics" size={17} />
          <span>View progress</span>
          <Icon name="chevronRight" size={17} className={styles.viewChevron} />
        </Link>
      </section>

      {/* pace & projection */}
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.panelTitle}><span className={styles.headIcon}><Icon name="target" size={17} /></span> Pace</span>
          <span className={`${styles.paceBadge} ${styles["pace_" + stats.pace.level]}`}>
            {stats.pace.level === "ok" ? "On track" : stats.pace.level === "warn" ? "Behind pace" : "At risk"}
          </span>
        </div>
        <p className={styles.paceMsg}>
          {stats.pace.hoursLeft === 0 ? (
            <>All {TOTAL_HOURS}h logged — the program is complete.</>
          ) : stats.pace.perWeekActual === 0 ? (
            <>No hours logged yet. Aim for about <b>{stats.pace.perWeekNeeded}h/week</b> to reach {TOTAL_HOURS}h by exam day.</>
          ) : stats.pace.level === "ok" ? (
            <>At <b>{stats.pace.perWeekActual}h/week</b> you'll finish on time. Hold the line.</>
          ) : (
            <>You're logging <b>{stats.pace.perWeekActual}h/week</b> — lift to <b>{stats.pace.perWeekNeeded}h/week</b> to land before exam day.</>
          )}
        </p>
        <div className={styles.paceStats}>
          <div className={styles.paceStat}><b>{stats.pace.perWeekActual}h</b><span>this week's pace</span></div>
          <div className={styles.paceStat}><b>{stats.pace.perWeekNeeded}h</b><span>needed / week</span></div>
          <div className={styles.paceStat}><b>{stats.pace.hoursLeft}h</b><span>hours to go</span></div>
        </div>
      </section>

      {/* today's plan */}
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.panelTitle}>
            <span className={styles.headIcon}><Icon name="calendar" size={17} /></span> Today's plan
          </span>
          <Link to="/topics" className={styles.viewAll}>View all</Link>
        </div>
        <div className={styles.planList}>
          {plan3.length === 0 && (
            <div className={styles.planEmpty}>Nothing scheduled for week {currentWeek()}. Enjoy the breather.</div>
          )}
          {plan3.map((it) => {
            const to = it.kind === "topic" ? "/topics" : "/labs";
            return (
              <div key={`${it.kind}-${it.id}`} className={styles.planItem}>
                <button
                  className={`${styles.checkBtn} ${it.done ? styles.checked : ""}`}
                  aria-label={it.done ? `Mark ${it.name} not done` : `Mark ${it.name} done`}
                  onClick={() => (it.kind === "topic" ? toggleTopic(it.id) : setLabStatus(it.id, it.done ? "todo" : "done"))}
                >
                  {it.done && <Icon name="check" size={15} strokeWidth={3} />}
                </button>
                <Link to={to} className={styles.planMain}>
                  <span className={`${styles.planName} ${it.done ? styles.planDone : ""}`}>{it.name}</span>
                  <span className={`${styles.tag} ${it.kind === "lab" ? styles.tagLab : styles.tagTopic}`}>
                    {it.kind === "topic" ? "Topic" : "Lab"}
                  </span>
                </Link>
                <span className={styles.planTime}>{formatDuration(it.minutes)}</span>
                <Link to={to} className={styles.planChevron} aria-label={`Open ${it.name}`}>
                  <Icon name="chevronRight" size={18} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* study session control */}
        {!started ? (
          <button className={styles.sessionCta} onClick={start}>
            <span className={styles.playCircle}><Icon name="play" size={18} /></span>
            Start study session
          </button>
        ) : (
          <div className={styles.sessionLive}>
            <div className={styles.sessionClock}>
              <span className={styles.liveDot} data-running={running} />
              <span className="mono">{clock(elapsedMs)}</span>
            </div>
            <div className={styles.sessionCtrls}>
              <button className={styles.sBtn} onClick={running ? pause : start} aria-label={running ? "Pause" : "Resume"}>
                <Icon name={running ? "pause" : "play"} size={18} />
              </button>
              <button className={`${styles.sBtn} ${styles.sFinish}`} onClick={finish}>
                <Icon name="stop" size={16} /> Finish
              </button>
            </div>
          </div>
        )}
      </section>

      {/* weak areas to review */}
      {review.length > 0 && (
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}><span className={styles.headIcon}><Icon name="sparkle" size={17} /></span> Review these</span>
            <Link to="/flashcards" className={styles.viewAll}>Practice</Link>
          </div>
          <div className={styles.reviewList}>
            {review.map((t) => (
              <Link key={t.id} to="/topics" className={styles.reviewItem}>
                <span className={styles.reviewDot} />
                <span className={styles.reviewName}>{t.name}</span>
                <span className={styles.reviewTag}>{topics[t.id]?.tag === "weak" ? "Weak" : `Conf ${topics[t.id]?.confidence}`}</span>
                <Icon name="chevronRight" size={18} className={styles.planChevron} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* streak + quick actions */}
      <div className={styles.bottomRow}>
        <section className={styles.panel}>
          <div className={styles.panelTitle}><Icon name="flame" size={17} className={styles.flameIcon} /> Study streak</div>
          <div className={styles.streakBody}>
            <div className={styles.streakNums}>
              <div className={styles.streakBig}><CountUp value={stats.streak.current} /><small> days</small></div>
              <div className={styles.streakBest}>Best: {stats.streak.best} days</div>
            </div>
            <GradientRing
              value={stats.streak.best || stats.streak.current ? (stats.streak.current / Math.max(stats.streak.best, stats.streak.current, 1)) * 100 : 0}
              size={78}
              stroke={8}
            >
              <Icon name="flame" size={24} className={styles.flameIcon} />
            </GradientRing>
          </div>
          <div className={styles.dots}>
            {dots.map((d, i) => (
              <div key={i} className={styles.dotCol}>
                <span className={styles.dotLabel}>{d.label}</span>
                <span className={`${styles.dot} ${d.done ? styles.dotDone : ""} ${d.isToday ? styles.dotToday : ""}`}>
                  {d.done && <Icon name="check" size={12} strokeWidth={3} />}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelTitle}>Quick actions</div>
          <div className={styles.quickGrid}>
            {quick.map((q) => (
              <button
                key={q.label}
                className={styles.quickTile}
                onClick={q.onClick}
                style={{ "--c": q.color } as React.CSSProperties}
              >
                <span className={styles.quickChip}><Icon name={q.icon} size={20} /></span>
                <span className={styles.quickLabel}>{q.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.footNote}>Week {currentWeek()} of {PROGRAM_WEEKS} · {left} days to exam</div>
    </div>
  );
}

function StatRow({
  icon,
  color,
  label,
  value,
  last,
}: {
  icon: IconName;
  color: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <li className={`${styles.statRow} ${last ? styles.statLast : ""}`}>
      <span className={styles.statChip} style={{ "--c": color } as React.CSSProperties}><Icon name={icon} size={18} /></span>
      <span className={styles.statLabel}>{label}</span>
      <b className={styles.statValue} style={{ color }}>{value}</b>
    </li>
  );
}

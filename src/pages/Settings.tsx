import { useMemo, useState } from "react";
import { Badge, Button, Card, CardBody, CardHeader, Icon, ThemePicker } from "../components";
import { PROGRAM_WEEKS, prettyLong } from "../data/curriculum";
import { DEFAULT_EXAM, DEFAULT_START } from "../lib/plan";
import { daysLeft } from "../lib/time";
import { useProgress } from "../store/useProgress";
import { toast } from "../store/useToast";
import pageStyles from "./pages.module.css";
import styles from "./Settings.module.css";

export function Settings() {
  const startDate = useProgress((s) => s.settings.startDate);
  const examDate = useProgress((s) => s.settings.examDate);
  const setStartDate = useProgress((s) => s.setStartDate);
  const setExamDate = useProgress((s) => s.setExamDate);
  const resetAll = useProgress((s) => s.resetAll);

  const start = startDate ?? DEFAULT_START;
  const exam = examDate ?? DEFAULT_EXAM;
  const isCustom = startDate != null || examDate != null;
  const validRange = Date.parse(exam) > Date.parse(start);

  const left = daysLeft();
  const rangeLabel = useMemo(
    () => `${prettyLong(start)} → ${prettyLong(exam)}`,
    [start, exam],
  );

  const [confirming, setConfirming] = useState(false);

  const onReset = () => {
    resetAll();
    setConfirming(false);
    toast("Progress reset — your topics, labs and hours are cleared.");
  };

  const resetDates = () => {
    setStartDate(null);
    setExamDate(null);
    toast("Study dates restored to the default plan.");
  };

  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.pageHead}>
        <h1>Settings</h1>
        <p>Make the tracker yours — pick a look, set your study window, and manage your data.</p>
      </div>

      {/* ---- Appearance ---- */}
      <Card>
        <CardHeader title="Theme" action={<span className="eyebrow">whole-app palette</span>} />
        <CardBody className={styles.body}>
          <div className={styles.fieldText}>
            <div className={styles.fieldHint}>
              Pick a look — each theme recolours the entire app, from backgrounds and cards
              to text, highlights and charts.
            </div>
          </div>
          <ThemePicker />
        </CardBody>
      </Card>

      {/* ---- Study plan ---- */}
      <Card>
        <CardHeader
          title="Study plan"
          action={<Badge tone={validRange ? "brand" : "bad"} dot>{PROGRAM_WEEKS}-week program</Badge>}
        />
        <CardBody className={styles.body}>
          <div className={styles.dates}>
            <label className={styles.dateField}>
              <span className={styles.fieldLabel}>
                <Icon name="calendar" size={15} /> Start date
              </span>
              <input
                type="date"
                className={styles.dateInput}
                value={start}
                max={exam}
                onChange={(e) => setStartDate(e.target.value || null)}
              />
              <span className={styles.fieldHint}>Week 1 begins here.</span>
            </label>
            <label className={styles.dateField}>
              <span className={styles.fieldLabel}>
                <Icon name="target" size={15} /> Exam date
              </span>
              <input
                type="date"
                className={styles.dateInput}
                value={exam}
                min={start}
                onChange={(e) => setExamDate(e.target.value || null)}
              />
              <span className={styles.fieldHint}>The finish line and countdown target.</span>
            </label>
          </div>

          {validRange ? (
            <div className={styles.summary}>
              <Icon name="sparkle" size={16} />
              <span>
                <b>{rangeLabel}</b> — {left} {left === 1 ? "day" : "days"} to exam.
                {isCustom ? " Custom plan." : " Default plan."}
              </span>
            </div>
          ) : (
            <div className={`${styles.summary} ${styles.warnSummary}`}>
              <Icon name="close" size={16} />
              <span>Exam date must fall after your start date — pick a later exam date to fix the schedule.</span>
            </div>
          )}

          {isCustom && (
            <div>
              <Button size="sm" variant="ghost" onClick={resetDates}>
                <Icon name="reset" size={15} /> Reset to default dates
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* ---- Data ---- */}
      <Card>
        <CardHeader title="Your data" action={<span className="eyebrow">stored on this device</span>} />
        <CardBody className={styles.body}>
          <div className={styles.field}>
            <div className={styles.fieldText}>
              <div className={styles.fieldLabel}>Reset progress</div>
              <div className={styles.fieldHint}>
                Permanently clears every completed topic, lab status and logged hour. Your theme
                and study dates are kept. This can’t be undone.
              </div>
            </div>
            {confirming ? (
              <div className={styles.confirm}>
                <Button size="sm" variant="danger" onClick={onReset}>
                  <Icon name="trash" size={15} /> Yes, erase it
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="danger" onClick={() => setConfirming(true)}>
                <Icon name="trash" size={15} /> Reset progress
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

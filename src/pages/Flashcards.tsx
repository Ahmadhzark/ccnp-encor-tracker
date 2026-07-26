import { useMemo, useState } from "react";
import { Icon } from "../components";
import { DOMAINS, TOPICS } from "../data/curriculum";
import { useProgress } from "../store/useProgress";
import pageStyles from "./pages.module.css";
import styles from "./Flashcards.module.css";

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Flashcards() {
  const topicProgress = useProgress((s) => s.topics);
  const [domain, setDomain] = useState<string>("all");
  const [order, setOrder] = useState<number[] | null>(null); // indices into the filtered deck when shuffled
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    const base = domain === "all" ? TOPICS : TOPICS.filter((t) => t.domainId === domain);
    return order ? order.map((idx) => base[idx]).filter(Boolean) : base;
  }, [domain, order]);

  const card = deck[i];
  const domainName = DOMAINS.find((d) => d.id === card?.domainId)?.name ?? "";

  const go = (delta: number) => {
    setFlipped(false);
    setI((prev) => (deck.length ? (prev + delta + deck.length) % deck.length : 0));
  };
  const pick = (d: string) => {
    setDomain(d);
    setOrder(null);
    setI(0);
    setFlipped(false);
  };
  const shuffle = () => {
    const base = domain === "all" ? TOPICS : TOPICS.filter((t) => t.domainId === domain);
    setOrder(shuffled(base.map((_, idx) => idx)));
    setI(0);
    setFlipped(false);
  };

  const chips = [{ id: "all", name: "All" }, ...DOMAINS.map((d) => ({ id: d.id, name: `${d.id.split(".")[0]} · ${d.name}` }))];

  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.pageHead}>
        <h1>Flashcards</h1>
        <p>Quick-fire the exam angle for every topic. Tap a card to flip; shuffle to test yourself cold.</p>
      </div>

      <div className={styles.chips}>
        {chips.map((c) => (
          <button
            key={c.id}
            className={`${styles.chip} ${domain === c.id ? styles.chipOn : ""}`}
            onClick={() => pick(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {card ? (
        <>
          <div className={styles.stage}>
            <button
              className={`${styles.card} ${flipped ? styles.flipped : ""}`}
              onClick={() => setFlipped((f) => !f)}
              aria-label="Flip card"
            >
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.badges}>
                  <span className={styles.dBadge}>{domainName}</span>
                  {topicProgress[card.id]?.done && <span className={styles.done}><Icon name="check" size={13} strokeWidth={3} /> Done</span>}
                </div>
                <div className={styles.termId}>{card.id}</div>
                <div className={styles.term}>{card.name}</div>
                <div className={styles.hint}>Tap to reveal the exam angle</div>
              </div>
              <div className={`${styles.face} ${styles.back}`}>
                <div className={styles.answerLabel}>Exam angle</div>
                <div className={styles.answer}>{card.blurb}</div>
                <div className={styles.meta}>{card.hours}h · Week {card.week}</div>
              </div>
            </button>
          </div>

          <div className={styles.controls}>
            <button className={styles.ctrl} onClick={() => go(-1)} aria-label="Previous">
              <Icon name="chevronRight" size={22} className={styles.flip} />
            </button>
            <div className={styles.counter}>
              <b>{i + 1}</b> / {deck.length}
            </div>
            <button className={styles.ctrl} onClick={() => go(1)} aria-label="Next">
              <Icon name="chevronRight" size={22} />
            </button>
            <button className={`${styles.ctrl} ${styles.shuffle}`} onClick={shuffle} aria-label="Shuffle" title="Shuffle">
              <Icon name="sort" size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className={styles.empty}>No cards in this domain.</div>
      )}
    </div>
  );
}

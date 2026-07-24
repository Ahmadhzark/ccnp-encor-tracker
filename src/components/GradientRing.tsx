import { useId } from "react";
import type { ReactNode } from "react";
import { useCountUp } from "./CountUp";
import styles from "./GradientRing.module.css";

interface GradientRingProps {
  value: number; // 0..100
  size?: number;
  stroke?: number;
  children?: ReactNode; // center content
}

/** Progress ring painted with the theme's signature 3-stop gradient. The arc
 *  animates to `value`; pass center content (percentage, flame, etc.) as
 *  children. */
export function GradientRing({ value, size = 176, stroke = 14, children }: GradientRingProps) {
  const gid = "grad" + useId().replace(/:/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const animated = useCountUp(clamped); // tween the arc for a premium fill
  const offset = c * (1 - animated / 100);

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <svg className={styles.svg} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--grad-1)" />
            <stop offset="0.5" stopColor="var(--grad-2)" />
            <stop offset="1" stopColor="var(--grad-3)" />
          </linearGradient>
        </defs>
        <circle className={styles.track} cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className={styles.fill}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          stroke={`url(#${gid})`}
        />
      </svg>
      <div className={styles.center}>{children}</div>
    </div>
  );
}

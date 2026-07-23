import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Eased number that animates from its previous value to `target`. First mount
 *  counts up from zero; later changes tween from wherever it was. Honors
 *  prefers-reduced-motion by snapping straight to the value. */
export function useCountUp(target: number, duration = 750): number {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReduced() || duration <= 0) {
      fromRef.current = target;
      setVal(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
}

/** Renders a single animated number. Wrap only the numeric part of a stat. */
export function CountUp({ value, decimals = 0, duration }: CountUpProps) {
  const v = useCountUp(value, duration);
  return <>{v.toFixed(decimals)}</>;
}

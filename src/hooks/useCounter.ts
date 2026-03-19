"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 → target over duration ms.
 * Starts when triggerOnce and inView become true.
 *
 * @example
 * const displayed = useCounter(80, inView, 1200)
 * // Renders: 0 → 80 over 1.2s when scrolled into view
 */
export function useCounter(
  target: number,
  inView: boolean,
  duration = 1200,
  decimals = 0
): string {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);

  return decimals > 0 ? count.toFixed(decimals) : String(Math.round(count));
}
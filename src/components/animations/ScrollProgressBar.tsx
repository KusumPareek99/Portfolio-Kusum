"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const VIOLET = "#8B5CF6";
const CYAN   = "#22D3EE";

/**
 * ScrollProgressBar
 * -----------------
 * A 2px gradient line at the very top of the viewport that
 * fills as the user scrolls. Spring-smoothed, respects
 * reduced-motion.
 */
export default function ScrollProgressBar() {
  const [raw, setRaw]   = useState(0);
  const spring = useSpring(0, { stiffness: 160, damping: 28 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onScroll() {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const pct      = total > 0 ? scrolled / total : 0;
      if (reduced) {
        setRaw(pct);
      } else {
        spring.set(pct);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spring]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        height: 2,
        zIndex: 9000,
        background: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
        boxShadow: `0 0 8px ${VIOLET}88`,
        transformOrigin: "left",
        scaleX: spring,
        width: "100%",
      }}
    />
  );
}
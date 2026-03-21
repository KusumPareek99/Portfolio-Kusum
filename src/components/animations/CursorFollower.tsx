"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CYAN   = "#22D3EE";
const VIOLET = "#8B5CF6";

export default function CursorFollower() {
  const outerX    = useMotionValue(-500);
  const outerY    = useMotionValue(-500);
  const innerX    = useMotionValue(-500);
  const innerY    = useMotionValue(-500);
  const outerSize = useMotionValue(22);
  const dotSize   = useMotionValue(8);
  const opacity   = useMotionValue(0);

  const x  = useSpring(outerX, { stiffness: 200, damping: 30 });
  const y  = useSpring(outerY, { stiffness: 200, damping: 30 });
  const ix = useSpring(innerX, { stiffness: 900, damping: 45 });
  const iy = useSpring(innerY, { stiffness: 900, damping: 45 });

  // ALL hooks called unconditionally — no early return before this
  useEffect(() => {
    const existing = document.getElementById("kp-no-cursor");
    if (!existing) {
      const s = document.createElement("style");
      s.id = "kp-no-cursor";
      s.textContent = "html,html *,html *::before,html *::after{cursor:none!important}";
      document.head.appendChild(s);
    }

    let moved = false;

    function onMove(e: MouseEvent) {
      if (!moved) {
        moved = true;
        outerX.jump(e.clientX);
        outerY.jump(e.clientY);
        innerX.jump(e.clientX);
        innerY.jump(e.clientY);
        opacity.set(0.9);
      } else {
        outerX.set(e.clientX);
        outerY.set(e.clientY);
        innerX.set(e.clientX);
        innerY.set(e.clientY);
      }
    }

    function onOver(e: MouseEvent) {
      const t = e.target as Element;
      const isLink = !!t.closest("a,button,[role='button'],[data-cursor-link]");
      outerSize.set(isLink ? 38 : 22);
      dotSize.set(isLink ? 5 : 8);
    }

    function onOut()   { outerSize.set(22); dotSize.set(8); }
    function onLeave() { opacity.set(0); }
    function onEnter() { if (moved) opacity.set(0.9); }

    window.addEventListener("mousemove",    onMove,  { passive: true });
    window.addEventListener("mouseover",    onOver,  { passive: true });
    window.addEventListener("mouseout",     onOut,   { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.getElementById("kp-no-cursor")?.remove();
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseover",    onOver);
      window.removeEventListener("mouseout",     onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          x, y,
          translateX: "-50%", translateY: "-50%",
          width: outerSize, height: outerSize,
          borderRadius: "50%",
          background: "rgba(139,92,246,0.12)",
          border: "1.5px solid rgba(139,92,246,0.45)",
          pointerEvents: "none",
          zIndex: 2147483645,
          opacity,
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          x: ix, y: iy,
          translateX: "-50%", translateY: "-50%",
          width: dotSize, height: dotSize,
          borderRadius: "50%",
          background: CYAN,
          pointerEvents: "none",
          zIndex: 2147483646,
          opacity,
          boxShadow: `0 0 10px ${CYAN}BB`,
        }}
      />
    </>
  );
}

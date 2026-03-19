"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VIOLET = "#8B5CF6";
const CYAN   = "#22D3EE";

export default function CursorFollower() {
  const [visible,      setVisible] = useState(false);
  const [hoveringLink, setHovL]    = useState(false);
  const [hoveringCard, setHovC]    = useState(false);
  // Start as false — detect touch after mount
  const [isTouch,      setIsTouch] = useState(false);
  const didInit = useRef(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x  = useSpring(rawX, { stiffness: 220, damping: 32 });
  const y  = useSpring(rawY, { stiffness: 220, damping: 32 });
  const ix = useSpring(rawX, { stiffness: 600, damping: 40 });
  const iy = useSpring(rawY, { stiffness: 600, damping: 40 });

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const touch   = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (touch || reduced) {
      setIsTouch(true);
      return;
    }

    // Force cursor:none on html and every element — belt-and-suspenders
    // because some browsers apply UA cursor styles with high specificity
    const style = document.createElement("style");
    style.id = "cursor-none-override";
    style.textContent = `
      *, *::before, *::after,
      html, body, a, button, input, textarea, select, [role="button"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      ix.set(e.clientX);
      iy.set(e.clientY);
      setVisible(true);
    }

    function onOver(e: MouseEvent) {
      const t = e.target as Element;
      const isLink = !!t.closest("a,button,[role='button'],[data-cursor-link]");
      const isCard = !!t.closest("[data-cursor-card]");
      setHovL(isLink);
      setHovC(isCard && !isLink);
    }

    function onOut() { setHovL(false); setHovC(false); }
    function onLeave() { setVisible(false); }

    window.addEventListener("mousemove",    onMove,  { passive: true });
    window.addEventListener("mouseover",    onOver,  { passive: true });
    window.addEventListener("mouseout",     onOut,   { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.getElementById("cursor-none-override")?.remove();
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseover",    onOver);
      window.removeEventListener("mouseout",     onOut);
      document.removeEventListener("mouseleave", onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  const outerSize   = hoveringLink ? 36 : hoveringCard ? 28 : 18;
  const outerColor  = hoveringLink ? "transparent" : `rgba(139,92,246,${hoveringCard ? 0.12 : 0.08})`;
  const outerBorder = hoveringLink ? `1.5px solid ${VIOLET}` : "none";

  return (
    <>
      <motion.div aria-hidden="true" style={{
        position:"fixed", left:0, top:0, x, y,
        translateX:"-50%", translateY:"-50%",
        width:outerSize, height:outerSize, borderRadius:"50%",
        background:outerColor, border:outerBorder,
        pointerEvents:"none", zIndex:100000,
        opacity: visible ? 1 : 0,
        transition:"width 0.2s ease,height 0.2s ease,background 0.2s ease,border 0.2s ease",
      }}/>
      <motion.div aria-hidden="true" style={{
        position:"fixed", left:0, top:0, x:ix, y:iy,
        translateX:"-50%", translateY:"-50%",
        width: hoveringLink ? 4 : 6, height: hoveringLink ? 4 : 6,
        borderRadius:"50%", background: hoveringLink ? VIOLET : CYAN,
        pointerEvents:"none", zIndex:100001,
        opacity: visible ? (hoveringLink ? 0.9 : 0.6) : 0,
        boxShadow:`0 0 8px ${hoveringLink ? VIOLET : CYAN}88`,
        transition:"width 0.15s ease,height 0.15s ease,background 0.2s ease",
      }}/>
    </>
  );
}

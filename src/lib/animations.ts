import type { Variants, Transition } from "framer-motion";

// ─── SHARED TRANSITIONS ───────────────────────────────────────────────────

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const easeSilk: Transition = {
  duration: 0.6,
  ease: [0.25, 0.4, 0.25, 1],
};

export const easeFast: Transition = {
  duration: 0.3,
  ease: [0.25, 0.4, 0.25, 1],
};

// ─── FADE VARIANTS ────────────────────────────────────────────────────────

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: easeSilk },
};

/** Fade up — most common scroll reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: easeSilk },
};

/** Fade down — used for navbar, dropdowns */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: easeSilk },
};

/** Fade left (slide in from right) */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: easeSilk },
};

/** Fade right (slide in from left) — timeline cards */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: easeSilk },
};

// ─── SCALE VARIANTS ───────────────────────────────────────────────────────

/** Scale in from center — badges, chips */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: springSmooth },
};

/** Pop — bouncy entrance for icons/dots */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: springSnappy },
};

// ─── CONTAINER STAGGER VARIANTS ───────────────────────────────────────────

/**
 * Wraps a list of children and staggers their animations.
 * Pair with fadeUp/scaleIn etc. on the children.
 *
 * @example
 * <motion.ul variants={staggerContainer} initial="hidden" whileInView="show">
 *   {items.map(i => <motion.li variants={fadeUp} key={i.id} />)}
 * </motion.ul>
 */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

/** Fast stagger for dense grids (skills, certs) */
export const staggerFast = staggerContainer(0.04, 0.05);

/** Normal stagger for cards */
export const staggerNormal = staggerContainer(0.08, 0.1);

/** Slow stagger for hero eyebrow → name → subtitle sequence */
export const staggerSlow = staggerContainer(0.14, 0.2);

// ─── HERO-SPECIFIC VARIANTS ───────────────────────────────────────────────

export const heroEyebrow: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const heroName: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, delay: 0.15 },
  },
};

// ─── CARD HOVER ───────────────────────────────────────────────────────────

/** Attach to whileHover on project/experience cards */
export const cardHover = {
  y: -6,
  transition: springSnappy,
};

/** Subtle lift for smaller elements */
export const liftHover = {
  y: -3,
  transition: springSnappy,
};

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── TIMELINE DRAW ────────────────────────────────────────────────────────

/** For SVG path / pseudo-element timeline line reveal */
export const timelineReveal: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.4, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ─── TAB SWITCH (AnimatePresence) ─────────────────────────────────────────

export const tabEnter: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: easeFast },
};

export const tabExit: Variants = {
  show: { opacity: 0, x: -20, transition: easeFast },
};

// ─── VIEWPORT DEFAULTS ───────────────────────────────────────────────────

/**
 * Default whileInView viewport config.
 * once: true — only animate on first entry (performance).
 * amount: 0.2 — trigger when 20% is visible.
 */
export const defaultViewport = { once: true, amount: 0.2 } as const;
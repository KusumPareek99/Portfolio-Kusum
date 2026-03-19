"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

/* ─── Intersection helper ─────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref    = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ═════════════════════════════════════════
   CHARACTER REVEAL
   Splits text into chars and staggers them
═════════════════════════════════════════ */
interface CharRevealProps {
  text:        string;
  className?:  string;
  style?:      React.CSSProperties;
  delay?:      number;
  stagger?:    number;
  duration?:   number;
  tag?:        "h1"|"h2"|"h3"|"h4"|"p"|"span"|"div";
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: "0.4em", rotateX: -30 },
  show: (i: number) => ({
    opacity: 1, y: "0em", rotateX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

/**
 * CharReveal
 * ----------
 * Splits text into individual characters and reveals them
 * with a staggered scroll-triggered animation.
 */
export function CharReveal({
  text,
  className,
  style,
  delay   = 0,
  stagger = 0.025,
  duration = 0.5,
  tag     = "div",
}: CharRevealProps) {
  const { ref, inView } = useInView(0.15);
  const Tag = motion[tag] as typeof motion.div;

  return (
    <Tag
      ref={ref as any}
      aria-label={text}
      style={{ ...style, perspective: 400 }}
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={{
            hidden: { opacity: 0, y: "0.35em" },
            show: {
              opacity: 1, y: "0em",
              transition: { duration, ease: [0.25, 0.4, 0.25, 1] },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ═════════════════════════════════════════
   WORD REVEAL
   Splits text into words and staggers them
═════════════════════════════════════════ */
interface WordRevealProps {
  text:       string;
  className?: string;
  style?:     React.CSSProperties;
  delay?:     number;
  stagger?:   number;
  tag?:       "h1"|"h2"|"h3"|"h4"|"p"|"span"|"div";
  highlight?: string; // word to color with gradient
}

/**
 * WordReveal
 * ----------
 * Splits text into words and staggers them upward on scroll.
 * Optionally highlights one word with the violet→cyan gradient.
 */
export function WordReveal({
  text,
  className,
  style,
  delay   = 0,
  stagger = 0.08,
  tag     = "div",
  highlight,
}: WordRevealProps) {
  const { ref, inView } = useInView(0.1);
  const Tag = motion[tag] as typeof motion.div;
  const words = text.split(" ");

  return (
    <Tag
      ref={ref as any}
      aria-label={text}
      style={{ ...style, overflow: "hidden" }}
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%", opacity: 1,
                transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
              },
            }}
            style={{
              display: "inline-block",
              ...(word.replace(/[^a-zA-Z]/g, "") === highlight
                ? {
                    background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : {}),
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ═════════════════════════════════════════
   TYPEWRITER
   Classic typing effect with cursor
═════════════════════════════════════════ */
interface TypewriterProps {
  phrases:       string[];
  typingSpeed?:  number;  // ms per char
  deleteSpeed?:  number;
  pauseMs?:      number;  // pause after full phrase
  className?:    string;
  style?:        React.CSSProperties;
  cursorColor?:  string;
}

/**
 * Typewriter
 * ----------
 * Cycles through phrases with a typing + deleting animation.
 * Useful for the hero "I'm a ___" rotating role display.
 */
export function Typewriter({
  phrases,
  typingSpeed  = 70,
  deleteSpeed  = 38,
  pauseMs      = 2200,
  className,
  style,
  cursorColor  = "#8B5CF6",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase]         = useState<"typing"|"pausing"|"deleting">("typing");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          typingSpeed,
        );
      } else {
        timer = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 100);
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deleteSpeed,
        );
      } else {
        setPhraseIdx(i => (i + 1) % phrases.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, phraseIdx, phrases, typingSpeed, deleteSpeed, pauseMs]);

  return (
    <span className={className} style={style}>
      {displayed}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "steps(1)" }}
        style={{ color: cursorColor, marginLeft: 1 }}
      >
        |
      </motion.span>
    </span>
  );
}

/* ═════════════════════════════════════════
   GRADIENT TEXT (animated)
═════════════════════════════════════════ */
interface AnimatedGradientTextProps {
  children:   ReactNode;
  className?: string;
  style?:     React.CSSProperties;
  speed?:     number; // animation duration in seconds
}

/**
 * AnimatedGradientText
 * --------------------
 * Text with a slow-moving violet→cyan→violet gradient shimmer.
 */
export function AnimatedGradientText({
  children,
  className,
  style,
  speed = 4,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={className}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{
        ...style,
        backgroundImage: "linear-gradient(135deg, #8B5CF6, #22D3EE, #8B5CF6, #22D3EE)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </motion.span>
  );
}
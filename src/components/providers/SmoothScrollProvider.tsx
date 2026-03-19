"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const rafRef   = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;

    import("lenis").then((mod) => {
      if (cancelled) return;
      const Lenis = mod.default;
      if (typeof Lenis !== "function") return;

      const lenis = new Lenis({
        duration:        1.15,
        easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation:     "vertical" as const,
        smoothWheel:     true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", () => {
        window.dispatchEvent(new Event("scroll"));
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    }).catch((e) => console.warn("Lenis failed:", e));

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
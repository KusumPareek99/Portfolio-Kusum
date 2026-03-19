"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * SmoothScrollProvider
 * --------------------
 * Wraps the page in Lenis smooth scroll.
 *
 * CRITICAL: Do NOT add a "scroll" event listener inside lenis.on("scroll", ...)
 * that calls window.dispatchEvent(new Event("scroll")).
 * That creates an infinite loop:
 *   Lenis scroll → dispatches native scroll → Lenis detects scroll → repeat
 * → Maximum call stack size exceeded
 */
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
        smoothWheel:     true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
        // ← NO scroll listener here — see note above
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);

    }).catch((e) => console.warn("[SmoothScrollProvider] Lenis failed:", e));

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

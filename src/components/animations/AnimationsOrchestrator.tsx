"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProgressBar from "./ScrollProgressBar";

// Dynamic imports with loading fallbacks — prevents webpack factory crash
// when the chunk hasn't loaded yet during initial hydration
const PageLoader = dynamic(
  () => import("./PageLoader").then(mod => ({ default: mod.default })),
  { ssr: false }
);

const AnimatedBackground = dynamic(
  () => import("./AnimatedBackground").then(mod => ({ default: mod.default })),
  { ssr: false }
);

const CursorFollower = dynamic(
  () => import("./CursorFollower").then(mod => ({ default: mod.default })),
  { ssr: false }
);

const LOADER_SEEN_KEY   = "kp_loader_seen";
const LOADER_TIMEOUT_MS = 4000;

export default function AnimationsOrchestrator() {
  const [mounted,      setMounted]      = useState(false);
  const [showLoader,   setShowLoader]   = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    setMounted(true);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    try {
      const seen = sessionStorage.getItem(LOADER_SEEN_KEY);
      if (!seen) {
        setShowLoader(true);
        document.body.style.overflow = "hidden";
        timeoutId = setTimeout(forceComplete, LOADER_TIMEOUT_MS);
      } else {
        setContentReady(true);
      }
    } catch {
      setContentReady(true);
    }

    return () => { if (timeoutId) clearTimeout(timeoutId); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function forceComplete() {
    try { sessionStorage.setItem(LOADER_SEEN_KEY, "1"); } catch {}
    document.body.style.overflow = "";
    setShowLoader(false);
    setContentReady(true);
  }
if (!mounted) return null;

return (
  <>
    {mounted && <CursorFollower />}
    {showLoader && <PageLoader onComplete={forceComplete} />}
    {contentReady && (
      <>
        <AnimatedBackground />
        <ScrollProgressBar />
      </>
    )}
  </>
);
}

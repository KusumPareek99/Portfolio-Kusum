"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProgressBar from "./ScrollProgressBar";

// All animation components are client-only (ssr: false)
const PageLoader         = dynamic(() => import("./PageLoader"),         { ssr: false });
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { ssr: false });
const CursorFollower     = dynamic(() => import("./CursorFollower"),     { ssr: false });

const LOADER_SEEN_KEY   = "kp_loader_seen";
const LOADER_TIMEOUT_MS = 4000;

export default function AnimationsOrchestrator() {
  const [mounted,      setMounted]      = useState(false);
  const [showLoader,   setShowLoader]   = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Mark as mounted — this is when client-only components can render
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
      // sessionStorage unavailable (private browsing) — skip loader
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

  // Nothing renders on server — avoids all hydration mismatches
  if (!mounted) return null;

  return (
    <>
      {/* CursorFollower: always mounts on client, never blocked by loader */}
      <CursorFollower />

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

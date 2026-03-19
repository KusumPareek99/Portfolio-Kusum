"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProgressBar from "./ScrollProgressBar";

const PageLoader = dynamic(() => import("./PageLoader"), { ssr: false });
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
});
const CursorFollower = dynamic(() => import("./CursorFollower"), {
  ssr: false,
});

const LOADER_SEEN_KEY = "kp_loader_seen";

// Safety timeout — if loader hasn't completed in 4s, force-dismiss it
// This prevents a stuck loader from blocking the cursor and page forever
const LOADER_TIMEOUT_MS = 4000;

export default function AnimationsOrchestrator() {
  const [showLoader, setShowLoader] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    try {
      const seen = sessionStorage.getItem(LOADER_SEEN_KEY);

      if (!seen) {
        setShowLoader(true);
        document.body.style.overflow = "hidden";

        // Safety net: auto-dismiss after LOADER_TIMEOUT_MS
        // so a crashed PageLoader can never freeze the page
        timeoutId = setTimeout(() => {
          forceComplete();
        }, LOADER_TIMEOUT_MS);
      } else {
        // Already seen — mount cursor + background immediately, no loader
        setContentReady(true);
      }
    } catch {
      // sessionStorage unavailable (private browsing on some browsers)
      // Skip loader entirely, go straight to content
      setContentReady(true);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function forceComplete() {
    try {
      sessionStorage.setItem(LOADER_SEEN_KEY, "1");
    } catch {}
    document.body.style.overflow = "";
    setShowLoader(false);
    setContentReady(true);
  }

  function handleLoaderComplete() {
    forceComplete();
  }

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}

      {/* CursorFollower mounts as soon as content is ready — NOT gated behind loader */}
      {contentReady && (
        <>
          <AnimatedBackground />
          <ScrollProgressBar />
          <CursorFollower />
        </>
      )}
    </>
  );
}

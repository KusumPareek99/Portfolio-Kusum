"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Portfolio Error]", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh", background: "#050508",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Syne', sans-serif",
      textAlign: "center", padding: "24px",
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F0F0FF", marginBottom: 12 }}>
        Something went wrong
      </h2>
      <p style={{
        fontFamily: "'Epilogue', sans-serif",
        fontSize: 15, color: "#8888B0", marginBottom: 36, maxWidth: 380,
      }}>
        An unexpected error occurred. Try refreshing or go back to the home page.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "12px 24px", borderRadius: 12,
            background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
            color: "#fff", border: "none", cursor: "pointer",
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
          }}
        >
          Try Again
        </button>
        <Link href="/" style={{
          padding: "12px 24px", borderRadius: 12,
          background: "transparent",
          border: "1px solid #1A1A2E",
          color: "#8888B0", textDecoration: "none",
          fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14,
        }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

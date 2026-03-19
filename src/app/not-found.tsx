import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#8B5CF6",
          marginBottom: 16,
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: 999,
          padding: "4px 14px",
        }}
      >
        ERROR 404
      </div>

      <h1
        style={{
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 800,
          color: "#F0F0FF",
          margin: "0 0 8px",
          background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>

      <p
        style={{
          fontSize: 18,
          color: "#8888B0",
          fontFamily: "'Epilogue', sans-serif",
          marginBottom: 40,
          maxWidth: 420,
          lineHeight: 1.6,
        }}
      >
        This page doesn&apos;t exist. Maybe you were looking for a project or
        section?
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "13px 28px",
          borderRadius: 14,
          background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "'Syne', sans-serif",
        }}
      >
        ← Back to Portfolio
      </Link>
    </div>
  );
}

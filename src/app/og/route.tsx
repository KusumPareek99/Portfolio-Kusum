import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#050508",
        padding: "64px 72px",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #8B5CF6, #22D3EE)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -60,
          top: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: 16,
          background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
          marginBottom: 32,
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        KP
      </div>

      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: "#F0F0FF",
          lineHeight: 1.05,
          marginBottom: 16,
          letterSpacing: "-1px",
        }}
      >
        Kusum Pareek
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: 999,
          padding: "8px 18px",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#10B981",
          }}
        />
        <span style={{ fontSize: 18, color: "#A78BFA", fontWeight: 600 }}>
          Software Development Engineer · Open to Work
        </span>
      </div>

      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 44 }}
      >
        {["Node.js", "React", "Python", "Azure", "TypeScript", "MongoDB"].map(
          (t) => (
            <div
              key={t}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#8888B0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "6px 14px",
              }}
            >
              {t}
            </div>
          ),
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          color: "#4A4A70",
          fontSize: 15,
        }}
      >
        <span>📍 Pune, India</span>
        <span>🎓 MCA · 9.36 CGPA · Gold Medalist</span>
        <span>kusumpareek.dev</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

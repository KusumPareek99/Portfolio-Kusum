/** @type {import('next').NextConfig} */

// CJS syntax required — do NOT convert to ESM (export default)
// Bundle analyzer: only runs during explicit `npm run analyze`, never during `npm run dev`
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true" && process.env.NODE_ENV !== "development",
  openAnalyzer: process.env.ANALYZE === "true",
});

const nextConfig = {
  // ─── Compiler ──────────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ─── Images ────────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes:  [640, 750, 828, 1080, 1200, 1920],
    imageSizes:   [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "holopin.me" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  // ─── Experimental ──────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },

  // ─── Security headers ──────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control",  value: "on"                            },
          { key: "X-Frame-Options",         value: "DENY"                          },
          { key: "X-Content-Type-Options",  value: "nosniff"                       },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin"},
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()"},
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // ─── Misc ──────────────────────────────────────────────────────────────
  poweredByHeader: false,
  compress:        true,
  reactStrictMode: true,
  trailingSlash:   false,
};

module.exports = withBundleAnalyzer(nextConfig);

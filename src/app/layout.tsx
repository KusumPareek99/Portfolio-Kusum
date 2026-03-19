import type { Metadata, Viewport } from "next";
import { Syne, Epilogue, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

// ✅ FIX: No curly braces — these are DEFAULT exports
import SmoothScrollProvider   from "@/components/providers/SmoothScrollProvider";
import AnimationsOrchestrator from "@/components/animations/AnimationsOrchestrator";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
  preload: true,
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || "https://kusumpareek.dev";
const SITE_NAME = "Kusum Pareek — Software Development Engineer";
const DESCRIPTION =
  "Results-driven Software Development Engineer specialising in Node.js, React, Python and Azure Cloud. Gold Medallist, BCA. Building scalable backend systems and full-stack applications from Pune, India.";

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 5,
  themeColor: "#050508", colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | Kusum Pareek" },
  description: DESCRIPTION,
  keywords: [
    "Kusum Pareek","Software Developer","Full Stack Engineer",
    "Node.js Developer","React Developer","Python Developer",
    "Azure Cloud","Backend Engineer","Portfolio","Pune","India",
    "SDE","MCA Gold Medal","ERP Developer","REST API","MongoDB","MySQL",
  ],
  authors:   [{ name: "Kusum Pareek", url: "https://github.com/KusumPareek99" }],
  creator:   "Kusum Pareek",
  publisher: "Kusum Pareek",
  category:  "Technology",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL,
    siteName: "Kusum Pareek Portfolio",
    title: SITE_NAME, description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630,
               alt: "Kusum Pareek — Software Development Engineer", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image", title: SITE_NAME, description: DESCRIPTION,
    creator: "@kusumpareek", images: [`${SITE_URL}/og-image.png`],
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true,
      "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-96.png",  type: "image/png", sizes: "96x96"   },
      { url: "/icon-180.png",  type: "image/png", sizes: "180x180"   },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
};

const personSchema = {
  "@context": "https://schema.org", "@type": "Person",
  name: "Kusum Pareek", url: SITE_URL,
  email: "kusumpareek7620@gmail.com",
  jobTitle: "Software Development Engineer",
  description: DESCRIPTION,
  image: `${SITE_URL}/og-image.png`,
  sameAs: ["https://github.com/KusumPareek99","https://linkedin.com/in/kusumpareek"],
  address: { "@type": "PostalAddress", addressLocality: "Pune",
             addressRegion: "Maharashtra", addressCountry: "IN" },
  alumniOf: [
    { "@type": "CollegeOrUniversity",
      name: "Dr. D.Y. Patil Institute of Management & Research", award: "MCA — 9.36 CGPA" },
    { "@type": "CollegeOrUniversity",
      name: "Lachoo Memorial College", award: "BCA — 90.29% — Gold Medalist" },
  ],
  knowsAbout: ["Node.js","React","Python","Azure","MongoDB",
               "Express.js","REST APIs","Full Stack Development","CI/CD","TypeScript","SQL","Flask"],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite",
  name: "Kusum Pareek Portfolio", url: SITE_URL, description: DESCRIPTION,
  author: { "@type": "Person", name: "Kusum Pareek" }, inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${epilogue.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Cursor: hide native cursor before JS loads — no flash */}
        <style dangerouslySetInnerHTML={{ __html: "*, *::before, *::after { cursor: none !important; }" }} />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect"   href="https://fonts.googleapis.com" />
        <link rel="preconnect"   href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body
        className="bg-bg-base text-text-primary font-body antialiased overflow-x-hidden"
      >
        <div className="noise-overlay" aria-hidden="true" />
        <AnimationsOrchestrator />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Skills       from "@/components/sections/Skills";
import Experience   from "@/components/sections/Experience";
import Projects     from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact      from "@/components/sections/Contact";

// ─── Page-level metadata override ─────────────────────────────────────────
export const metadata: Metadata = {
  title:       "Kusum Pareek — Software Development Engineer",
  description: "Full-stack SDE portfolio showcasing ERP systems, AI projects, and cloud-native applications built with Node.js, React, Python and Azure.",
  alternates:  { canonical: "/" },
};

// ─── Skeleton fallback ─────────────────────────────────────────────────────
function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #050508 0%, #0D0D14 100%)",
      }}
    />
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Hero loads eagerly — it is the LCP element */}
        <Hero />

        {/* All sections below the fold are wrapped in Suspense
            so they can be code-split / streamed in future */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
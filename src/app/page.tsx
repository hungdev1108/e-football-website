"use client";

import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { LoaderIcon } from "lucide-react";

// Lazy load các components không cần thiết ngay lập tức
const CategoriesSection = lazy(() =>
  import("@/components/home/CategoriesSection").then((module) => ({
    default: module.CategoriesSection,
  }))
);

const FeaturedAccountsSection = lazy(() =>
  import("@/components/home/FeaturedAccountsSection").then((module) => ({
    default: module.FeaturedAccountsSection,
  }))
);

const NewsSection = lazy(() =>
  import("@/components/home/NewsSection").then((module) => ({
    default: module.NewsSection,
  }))
);

const FeaturesSection = lazy(() =>
  import("@/components/home/FeaturesSection").then((module) => ({
    default: module.FeaturesSection,
  }))
);

const FooterSection = lazy(() =>
  import("@/components/home/FooterSection").then((module) => ({
    default: module.FooterSection,
  }))
);

// Loading component để hiển thị khi lazy load
const SectionSkeleton = () => (
  <div className="flex items-center justify-center h-64">
    <LoaderIcon className="w-8 h-8 animate-spin" />
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header - Load ngay lập tức */}
      <Header />

      {/* Hero Section - Load ngay lập tức */}
      <HeroSection />

      {/* Lazy load các sections khác */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedAccountsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NewsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}

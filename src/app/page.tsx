"use client";

import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { SloganSection } from "@/components/home/SloganSection";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { Skeleton } from "@/components/ui/skeleton";

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

const SectionSkeleton = () => (
  <div className="container mx-auto px-4 lg:px-6 py-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-2xl" />
      ))}
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Header - Load ngay lập tức */}
      <Header />

      {/* Hero Section - Load ngay lập tức */}
      <HeroSection />

      {/* Slogan Section - Load ngay lập tức */}
      <SloganSection />

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

      {/* Chat Widget - Fixed position */}
      <ChatWidget />
    </div>
  );
}

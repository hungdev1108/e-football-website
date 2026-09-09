"use client";

import { memo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import "./hero-slider.css";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  className?: string;
}

const bannerImages = [
  { src: "/banner-efootball.jpg", alt: "eFootball Banner" },
  { src: "/banner-ban-anh.png", alt: "Bán ảnh eFootball Banner" },
  { src: "/Banner_coin-new.jpg", alt: "Coin Banner" },
];

export const HeroSection = memo(function HeroSection({
  className,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isClient]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden py-6 md:pt-10 md:pb-14 ${
        className || ""
      }`}
    >
      <div className="container relative z-10 mx-auto px-4 lg:px-6">
        <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
          {/* TEXT SIDE */}
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span>Dịch vụ eFootball uy tín</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              <span className="neon-text-tri">Thu mua bán ảnh eFootball</span>
              <br />
              <span className="text-foreground">đẳng cấp hàng đầu</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:mx-0 md:text-base">
              Khám phá dịch vụ thu mua bán ảnh eFootball chất lượng, bảo mật tuyệt đối, giao
              dịch tức thì. Chọn ngay hình ảnh đẹp nhất của bạn.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Button variant="neon" size="lg" asChild>
                <Link href="/accounts">
                  Mua ngay
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link href="/news">Xem tin tức</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground md:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Bảo mật 100%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Online 24/7
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                10,000+ khách hàng
              </span>
            </div>
          </div>

          {/* SLIDER SIDE — CSS-only slider, no hydration issues */}
          <div className="relative w-full">
            {/* Neon halo phía sau */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[32px] opacity-50 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(168,85,247,0.5) 50%, rgba(244,114,182,0.4))",
              }}
            />

            <div className="hero-slider relative overflow-hidden rounded-2xl">
              {/* Slides container */}
              <div
                className="hero-slides-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                {bannerImages.map((banner, index) => (
                  <div key={index} className="hero-slide-item">
                    <div className="hero-slide-inner">
                      <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={index === 0}
                        quality={85}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              {bannerImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              <div className="hero-dots">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`cursor-pointer hero-dot ${currentSlide === index ? "hero-dot-active" : ""}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

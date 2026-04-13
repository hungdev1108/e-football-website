"use client";

import { memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/effects/TiltCard";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/effects/ScrollReveal";

interface CategoriesSectionProps {
  className?: string;
}

const categories = [
  {
    emoji: "💸",
    title: "2trxx - 4trxx",
    tags: ["🎯 Phổ biến", "⚡ Nhanh"],
    description:
      "Tài khoản chất lượng, giá hợp lý cho người mới bắt đầu hoặc muốn trải nghiệm. Đội hình cơ bản với các cầu thủ ổn định.",
    href: "/accounts?minPrice=2000000&maxPrice=4000000",
    glow: "from-[rgb(var(--neon-emerald))] to-[rgb(var(--neon-cyan))]",
    accent: "text-[rgb(var(--neon-emerald))]",
  },
  {
    emoji: "🏆",
    title: "4trxx - 6trxx",
    tags: ["🔥 Hot", "💎 Chất lượng"],
    description:
      "Tài khoản mạnh, nhiều chỉ số cao, phù hợp cho game thủ muốn nâng cấp trải nghiệm. Đội hình cân bằng với nhiều lựa chọn.",
    href: "/accounts?minPrice=4000000&maxPrice=6000000",
    glow: "from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))]",
    accent: "text-[rgb(var(--neon-violet))]",
  },
  {
    emoji: "👑",
    title: "6trxx - 10trxx",
    tags: ["👑 VIP", "🚀 Đỉnh cao"],
    description:
      "Tài khoản VIP, chỉ số cực cao, đội hình khủng dành cho game thủ đỉnh cao. Sở hữu những cầu thủ huyền thoại.",
    href: "/accounts?minPrice=6000000&maxPrice=10000000",
    glow: "from-[rgb(var(--neon-pink))] to-[rgb(var(--neon-violet))]",
    accent: "text-[rgb(var(--neon-pink))]",
  },
];

export const CategoriesSection = memo(function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  return (
    <section
      className={`relative py-10 md:py-20 ${className || ""}`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <ScrollReveal className="mb-8 text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            💰 Categories
          </div>
          <h3 className="py-2 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            <span className="neon-text-tri">Tài khoản theo khoảng giá</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Khám phá các loại tài khoản game đa dạng với mức giá phù hợp cho mọi
            nhu cầu
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <StaggerItem key={i}>
              <TiltCard className="group relative h-full rounded-2xl" intensity={6}>
                <Link
                  href={cat.href}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 md:p-8 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_rgb(var(--neon-violet)/0.5)]"
                >
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${cat.glow} opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45`}
                  />

                  <div className="relative z-10 flex h-full flex-col text-center">
                    <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110 md:text-6xl">
                      {cat.emoji}
                    </div>
                    <h4
                      className={`mb-3 text-xl font-bold text-foreground transition-colors md:text-2xl ${cat.accent.replace("text-", "group-hover:text-")}`}
                    >
                      {cat.title}
                    </h4>
                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                      {cat.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {cat.description}
                    </p>
                    <div
                      className={`mx-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${cat.glow} px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(var(--neon-violet)/0.7)] transition-transform duration-300 group-hover:scale-105`}
                    >
                      <span>Xem tài khoản</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
});

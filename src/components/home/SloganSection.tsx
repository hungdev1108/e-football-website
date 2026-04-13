"use client";

import { memo } from "react";
import { Shield, Star, DollarSign } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

interface SloganSectionProps {
  className?: string;
}

const slogans = [
  {
    icon: Shield,
    title: "UY TÍN",
    description: "Cam kết chất lượng dịch vụ đáng tin cậy",
    glow: "from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))]",
    iconColor: "text-[rgb(var(--neon-cyan))]",
  },
  {
    icon: Star,
    title: "CHẤT LƯỢNG",
    description: "Sản phẩm và dịch vụ đạt tiêu chuẩn cao",
    glow: "from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))]",
    iconColor: "text-[rgb(var(--neon-violet))]",
  },
  {
    icon: DollarSign,
    title: "GIÁ RẺ",
    description: "Giá cả hợp lý, phù hợp mọi túi tiền",
    glow: "from-[rgb(var(--neon-emerald))] to-[rgb(var(--neon-cyan))]",
    iconColor: "text-[rgb(var(--neon-emerald))]",
  },
];

export const SloganSection = memo(function SloganSection({
  className,
}: SloganSectionProps) {
  return (
    <section className={`relative w-full py-6 md:py-10 ${className || ""}`}>
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        <StaggerContainer className="grid grid-cols-3 gap-3 md:gap-6">
          {slogans.map((slogan, index) => {
            const Icon = slogan.icon;
            return (
              <StaggerItem key={index}>
                <div className="group relative overflow-hidden rounded-xl md:rounded-2xl glass p-3 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(var(--neon-violet)/0.5)]">
                  <div
                    className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${slogan.glow} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                  />
                  <div className="relative z-10 text-center">
                    <div
                      className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/40 backdrop-blur md:mb-5 md:h-16 md:w-16 ${slogan.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5 md:h-8 md:w-8" strokeWidth={2.2} />
                    </div>
                    <h3 className="text-xs font-bold tracking-wide text-foreground md:text-2xl md:mb-2">
                      {slogan.title}
                    </h3>
                    <p className="hidden text-sm leading-relaxed text-muted-foreground md:block">
                      {slogan.description}
                    </p>
                    <div
                      className={`mx-auto mt-4 hidden h-[2px] w-12 origin-center scale-x-0 rounded-full bg-gradient-to-r ${slogan.glow} transition-transform duration-300 group-hover:scale-x-100 md:block`}
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
});

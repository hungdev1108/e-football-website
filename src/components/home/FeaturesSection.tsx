"use client";

import { memo } from "react";
import { Shield, Zap, Users } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/effects/ScrollReveal";

interface FeaturesSectionProps {
  className?: string;
}

const features = [
  {
    icon: Shield,
    title: "Bảo mật tuyệt đối",
    desc: "Cam kết bảo mật thông tin khách hàng 100%. Giao dịch được kiểm tra kỹ lưỡng và an toàn tuyệt đối.",
    tone: "text-[rgb(var(--neon-emerald))]",
    glow: "from-[rgb(var(--neon-emerald))] to-[rgb(var(--neon-cyan))]",
  },
  {
    icon: Zap,
    title: "Giao dịch tức thì",
    desc: "Giao dịch ngay lập tức sau khi thanh toán thành công. Hỗ trợ 24/7 mọi lúc mọi nơi.",
    tone: "text-[rgb(var(--neon-violet))]",
    glow: "from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))]",
  },
  {
    icon: Users,
    title: "Cộng đồng lớn",
    desc: "Hơn 10,000 game thủ tin tưởng và sử dụng dịch vụ của chúng tôi mỗi tháng.",
    tone: "text-[rgb(var(--neon-cyan))]",
    glow: "from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))]",
  },
];

export const FeaturesSection = memo(function FeaturesSection({
  className,
}: FeaturesSectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-12 md:py-24 ${className || ""}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-60">
        <div
          className="absolute left-1/4 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--neon-violet) / 0.35), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--neon-cyan) / 0.3), transparent 65%)",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 lg:px-6">
        <ScrollReveal className="mb-10 text-center md:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            ✨ Why us
          </div>
          <h3 className="py-2 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            <span className="neon-text-tri">Tại sao chọn chúng tôi?</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Khám phá những ưu điểm vượt trội khi sử dụng dịch vụ của EFOOTBALL
            Store
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={i}>
                <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgb(var(--neon-violet)/0.55)]">
                  <div
                    className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${f.glow} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
                  />
                  <div className="relative z-10 flex h-full flex-col items-center text-center">
                    <div
                      className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-background/40 backdrop-blur ${f.tone} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-8 w-8" strokeWidth={2} />
                    </div>
                    <h4 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
                      {f.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {f.desc}
                    </p>
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

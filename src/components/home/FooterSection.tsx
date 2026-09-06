"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterSectionProps {
  className?: string;
}

const payments = [
  { src: "/momo.png", alt: "Momo" },
  { src: "/mbbank.png", alt: "MB Bank" },
  { src: "/vietcombank.png", alt: "Vietcombank" },
  { src: "/paypal.png", alt: "PayPal" },
  { src: "/visa.png", alt: "Visa" },
];

const quickLinks = [
  { href: "/", icon: "🏠", label: "Trang chủ" },
  { href: "/accounts", icon: "🎮", label: "Ảnh eFootball" },
  { href: "/news", icon: "📰", label: "Tin tức" },
  { href: "/contact", icon: "📧", label: "Liên hệ" },
];

const accountLinks = [
  { href: "/auth/login", icon: "🔑", label: "Đăng nhập" },
  { href: "/auth/register", icon: "📝", label: "Đăng ký" },
  { href: "/contact", icon: "❓", label: "Câu hỏi thường gặp" },
];

export const FooterSection = memo(function FooterSection({
  className,
}: FooterSectionProps) {
  return (
    <footer
      className={`relative mt-10 overflow-hidden border-t border-border/60 ${className || ""}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--neon-violet)/0.6)] to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div
          className="absolute left-1/4 top-10 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--neon-violet) / 0.25), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--neon-cyan) / 0.2), transparent 65%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-14 lg:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))] shadow-[0_0_25px_rgb(var(--neon-violet)/0.55)]">
                <span className="text-2xl font-bold text-white">⚽</span>
              </div>
              <div>
                <h4 className="neon-text-tri text-2xl font-black tracking-tight">
                  EFOOTBALL
                </h4>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Premium Store
                </p>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              Nền tảng thu mua bán ảnh eFootball uy tín và chất lượng nhất Việt
              Nam. Cam kết mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[rgb(var(--neon-emerald))]" />
              <span className="text-xs text-muted-foreground">Online 24/7</span>
            </div>
          </div>

          <div>
            <h5 className="mb-5 text-base font-bold text-foreground">
              Liên kết nhanh
            </h5>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-base">{l.icon}</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-base font-bold text-foreground">Tài khoản</h5>
            <ul className="space-y-3 text-sm">
              {accountLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-base">{l.icon}</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="inline-flex items-center gap-3 text-muted-foreground/70">
                <span className="text-base">🔒</span>
                <span>Bảo mật & quyền riêng tư</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-base font-bold text-foreground">Liên hệ</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-base">📧</span>
                <div>
                  <div className="font-medium text-foreground">
                    support@efootball-store.com
                  </div>
                  <div className="text-xs">Email hỗ trợ 24/7</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-base">📱</span>
                <div>
                  <div className="font-medium text-foreground">0395860670</div>
                  <div className="text-xs">Hotline - Zalo</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-base">🏦</span>
                <div>
                  <div className="font-medium text-foreground">
                    196666196666
                  </div>
                  <div className="text-xs">TRAN DINH HIEP - MB BANK</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-base">🕒</span>
                <div>
                  <div className="font-medium text-foreground">
                    8:00 - 22:00 hàng ngày
                  </div>
                  <div className="text-xs">Thời gian hỗ trợ</div>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <h6 className="mb-3 text-sm font-bold text-foreground">
                Thanh toán
              </h6>
              <div className="flex flex-wrap gap-2">
                {payments.map((p) => (
                  <div
                    key={p.alt}
                    className="flex h-9 w-14 items-center justify-center rounded-lg border border-border/60 bg-background/60 p-1 backdrop-blur transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_-5px_rgb(var(--neon-violet)/0.6)]"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={40}
                      height={28}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>&copy; 2025 EFOOTBALL Store. Made with ❤️ in Vietnam</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Chính sách bảo mật
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Điều khoản sử dụng
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Đổi trả
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

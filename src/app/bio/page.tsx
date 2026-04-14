import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa6";
import {
  FaFacebookF,
  FaUsers,
  FaShoppingBag,
  FaCoins,
  FaNewspaper,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Hiệp Trần — eFootball",
  description:
    "Cộng đồng eFootball Mobile · Mua bán tài khoản · Cập nhật tin tức · Liên hệ hỗ trợ",
  openGraph: {
    title: "Hiệp Trần — eFootball",
    description:
      "Cộng đồng eFootball Mobile · Mua bán tài khoản · Cập nhật tin tức",
    images: ["/efootball-logo.png"],
  },
  robots: { index: true, follow: true },
};

interface BioLink {
  label: string;
  sub?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  external?: boolean;
}

const links: BioLink[] = [
  {
    label: "Shop tài khoản eFootball",
    sub: "hieptranefootball.com",
    href: "https://hieptranefootball.com",
    icon: FaShoppingBag,
    iconBg: "from-cyan-400 to-violet-500",
    external: true,
  },
  {
    label: "Facebook cá nhân",
    sub: "Hiệp Trần",
    href: "https://www.facebook.com/tran.hiep.229430",
    icon: FaFacebookF,
    iconBg: "from-[#1877F2] to-[#0b5fcc]",
    external: true,
  },
  {
    label: "Cộng đồng eFootball Mobile",
    sub: "Group Facebook",
    href: "https://www.facebook.com/share/g/1RJ5ECkK5d/?mibextid=wwXIfr",
    icon: FaUsers,
    iconBg: "from-violet-500 to-fuchsia-500",
    external: true,
  },
  {
    label: "Page Club Efootball Mobile",
    sub: "Cập nhật tin tức",
    href: "https://www.facebook.com/people/Club-Efootball-Mobile/61575516823726/",
    icon: FaNewspaper,
    iconBg: "from-pink-500 to-rose-500",
    external: true,
  },
  {
    label: "Nạp coin uy tín",
    sub: "Liên hệ Hiệp Trần",
    href: "https://www.facebook.com/tran.hiep.229430",
    icon: FaCoins,
    iconBg: "from-amber-400 to-orange-500",
    external: true,
  },
  {
    label: "TikTok",
    sub: "@emlaaai123",
    href: "https://www.tiktok.com/@emlaaai123",
    icon: FaTiktok,
    iconBg: "from-zinc-800 via-zinc-900 to-black",
    external: true,
  },
  {
    label: "Zalo / Hotline",
    sub: "0395 860 670",
    href: "https://zalo.me/0395860670",
    icon: SiZalo,
    iconBg: "from-[#0068FF] to-[#004cc7]",
    external: true,
  },
];

export default function BioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0e1a] text-white">
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.35),transparent)] blur-3xl" />
        <div className="absolute -bottom-1/3 left-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(34_211_238/0.25),transparent)] blur-3xl" />
        <div className="absolute -bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(244_114_182/0.25),transparent)] blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 py-10 sm:py-14">
        {/* Avatar */}
        <div className="relative mb-5">
          <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 blur-md opacity-70" />
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white/30 bg-[#0a0e1a] shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <Image
              src="/efootball-logo.png"
              alt="Hiệp Trần"
              width={112}
              height={112}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a0e1a] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Name + bio */}
        <h1 className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-2xl font-black tracking-tight text-transparent">
          Hiệp Trần
        </h1>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
          eFootball Mobile · Content Creator
        </p>
        <p className="mt-3 max-w-[260px] text-center text-sm text-white/75">
          Cộng đồng game · Mua bán tài khoản · Cập nhật tin tức eFootball Mobile
        </p>

        {/* Quick stats badges */}
        <div className="mt-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Online
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold text-violet-300">
            ⚡ Uy tín
          </span>
        </div>

        {/* Banking QR */}
        <div className="mt-7 w-full">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                QR chuyển khoản
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                VietQR · Napas 247
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 opacity-60 blur" />
                <div className="relative rounded-2xl bg-white p-2.5">
                  <Image
                    src="/qr-banking.png"
                    alt="QR chuyển khoản VietQR"
                    width={220}
                    height={220}
                    className="block h-[220px] w-[220px] object-contain"
                    priority
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] leading-tight text-white/60">
                Mở app ngân hàng · Quét QR để chuyển khoản nhanh
              </p>
            </div>
          </div>
        </div>

        {/* Links list */}
        <nav className="mt-6 flex w-full flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.iconBg} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <div className="relative min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    {link.label}
                  </div>
                  {link.sub && (
                    <div className="truncate text-[11px] text-white/55">
                      {link.sub}
                    </div>
                  )}
                </div>

                <svg
                  className="relative h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-2 text-center text-[11px] text-white/40">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            ← Vào shop chính
          </Link>
          <span>© {new Date().getFullYear()} hieptranefootball.com</span>
        </div>
      </div>
    </main>
  );
}

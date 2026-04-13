"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Search, LoaderIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MusicToggle } from "@/components/audio/MusicToggle";
import { SeasonalToggle } from "@/components/effects/SeasonalToggle";

interface LogoInfo {
  url: string;
  alt: string;
}

const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Tài khoản game", href: "/accounts" },
  { name: "Tin tức", href: "/news" },
  { name: "Liên hệ", href: "/contact" },
];

export const Header = memo(function Header() {
  const logofit = {
    url: "/efootball-logo.png",
    alt: "eFootball Logo",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--neon-violet)/0.5)] to-transparent" />
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <LogoSection logoInfo={logofit} loadingLogo={false} />

          <DesktopNavigation />

          <div className="flex items-center gap-1.5 md:gap-2">
            <CommandKButton />

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:inline-flex rounded-full border border-border/50 bg-background/40 backdrop-blur"
            >
              <Link href="/accounts" aria-label="Tìm kiếm">
                <Search className="h-[1.05rem] w-[1.05rem]" />
              </Link>
            </Button>

            <MusicToggle className="hidden sm:block" />
            <SeasonalToggle className="hidden sm:inline-flex" />
            <ThemeToggle />

            <DesktopUserMenu />
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
});

const LogoSection = memo(function LogoSection({
  logoInfo,
  loadingLogo,
}: {
  logoInfo: LogoInfo | undefined;
  loadingLogo: boolean;
}) {
  return (
    <Link href="/" className="group flex items-center space-x-3">
      {loadingLogo ? (
        <div className="flex h-8 w-8 items-center justify-center">
          <LoaderIcon className="h-5 w-5 animate-spin" />
        </div>
      ) : logoInfo ? (
        <div className="relative">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgb(var(--neon-cyan)/0.5)] to-[rgb(var(--neon-violet)/0.5)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          <Image
            src={logoInfo.url}
            alt={logoInfo.alt}
            width={40}
            height={40}
            className="relative h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))]">
          <span className="text-lg font-bold text-white">⚽</span>
        </div>
      )}
      <div>
        <span className="neon-text-tri text-xl font-black tracking-tight">
          EFOOTBALL
        </span>
        <div className="-mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Premium Store
        </div>
      </div>
    </Link>
  );
});

const DesktopNavigation = memo(function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="group relative text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
        >
          {item.name}
          <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))] transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      ))}
    </nav>
  );
});

const CommandKButton = memo(function CommandKButton() {
  const dispatchCmdK = () => {
    if (typeof document === "undefined") return;
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      }),
    );
  };
  return (
    <button
      type="button"
      onClick={dispatchCmdK}
      aria-label="Mở command palette"
      className="hidden lg:inline-flex h-9 items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-accent/40 hover:text-foreground"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Tìm nhanh…</span>
      <kbd className="rounded border border-border/60 bg-muted px-1.5 py-[1px] font-mono text-[10px] text-muted-foreground">
        Ctrl K
      </kbd>
    </button>
  );
});

const DesktopUserMenu = memo(function DesktopUserMenu() {
  return (
    <div className="hidden md:flex items-center gap-2 pl-1">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Đăng nhập
        </Link>
      </Button>
      <Button variant="neon" size="sm" asChild>
        <Link href="/auth/register" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Đăng ký
        </Link>
      </Button>
    </div>
  );
});

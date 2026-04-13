"use client";

import { useState, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Menu,
  LogIn,
  UserPlus,
  Home,
  Gamepad2,
  Newspaper,
  Phone,
} from "lucide-react";
import { MusicSidebarRow } from "@/components/audio/MusicToggle";

// Types
interface LogoInfo {
  url: string;
  alt: string;
}

interface SidebarProps {
  className?: string;
}

// Navigation items with icons
const navigationItems = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Tài khoản game", href: "/accounts", icon: Gamepad2 },
  { name: "Tin tức", href: "/news", icon: Newspaper },
  { name: "Liên hệ", href: "/contact", icon: Phone },
];

export const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Memoize callback functions
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const openMenu = useCallback(() => setIsOpen(true), []);

  const logoInfo: LogoInfo = {
    url: "/efootball-logo.png",
    alt: "eFootball Logo",
  };

  return (
    <>
      {/* Mobile Menu Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={openMenu}
        className={`md:hidden ${className || ""}`}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Mở menu</span>
      </Button>

      {/* Sidebar Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-[280px] sm:w-[320px] p-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border [&>button]:text-white [&>button]:hover:text-white/80 [&>button]:border-0 [&>button]:ring-0 [&>button]:outline-0"
        >
          <VisuallyHidden>
            <SheetTitle>Menu điều hướng</SheetTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[rgb(var(--neon-violet)/0.85)] via-[rgb(var(--neon-cyan)/0.7)] to-[rgb(var(--neon-pink)/0.7)] p-6 text-white">
            <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" style={{background:"radial-gradient(600px 200px at 20% 0%, rgba(255,255,255,0.4), transparent 60%)"}} />
            <div className="mb-4">
              <Link
                href="/"
                className="flex items-center space-x-3"
                onClick={closeMenu}
              >
                <Image
                  src={logoInfo.url}
                  alt={logoInfo.alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-black">EFOOTBALL</span>
              </Link>
            </div>

            <p className="relative text-sm text-white/85">
              Nền tảng mua bán tài khoản eFootball uy tín
            </p>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <nav className="p-4">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-sidebar-foreground/80 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={closeMenu}
                    >
                      <IconComponent className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[rgb(var(--neon-violet))]" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Music controls */}
            <div className="border-t border-sidebar-border p-4">
              <MusicSidebarRow />
            </div>

            {/* Auth Section */}
            <div className="border-t border-sidebar-border p-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link href="/auth/login" onClick={closeMenu}>
                    <LogIn className="h-4 w-4" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button variant="neon" className="w-full justify-start gap-3" asChild>
                  <Link href="/auth/register" onClick={closeMenu}>
                    <UserPlus className="h-4 w-4" />
                    Đăng ký
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-sidebar-border p-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-sidebar-foreground">
                  Liên hệ hỗ trợ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--neon-emerald)/0.15)]">
                      <span>📱</span>
                    </div>
                    <div>
                      <div className="font-medium text-sidebar-foreground">Zalo</div>
                      <div className="text-xs">0395860670</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--neon-cyan)/0.18)]">
                      <span>⏰</span>
                    </div>
                    <div>
                      <div className="font-medium text-sidebar-foreground">Giờ hoạt động</div>
                      <div className="text-xs">8:00 - 22:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="border-t border-sidebar-border p-4">
              <Badge
                variant="secondary"
                className="w-full justify-center bg-[rgb(var(--neon-emerald)/0.12)] text-[rgb(var(--neon-emerald))] border border-[rgb(var(--neon-emerald)/0.3)]"
              >
                <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[rgb(var(--neon-emerald))]" />
                Đang hoạt động
              </Badge>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
});

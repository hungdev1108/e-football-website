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
          className="w-[280px] sm:w-[320px] p-0 bg-white [&>button]:text-white [&>button]:hover:text-white/80 [&>button]:border-0 [&>button]:ring-0 [&>button]:outline-0"
        >
          <VisuallyHidden>
            <SheetTitle>Menu điều hướng</SheetTitle>
          </VisuallyHidden>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
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

            <p className="text-sm text-blue-100">
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
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                      onClick={closeMenu}
                    >
                      <IconComponent className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Auth Section */}
            <div className="border-t border-slate-200 p-4">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-blue-50 hover:text-blue-600"
                  asChild
                >
                  <Link href="/auth/login" onClick={closeMenu}>
                    <LogIn className="h-4 w-4" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  asChild
                >
                  <Link href="/auth/register" onClick={closeMenu}>
                    <UserPlus className="h-4 w-4" />
                    Đăng ký
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-slate-200 p-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">
                  Liên hệ hỗ trợ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">📱</span>
                    </div>
                    <div>
                      <div className="font-medium">Zalo</div>
                      <div className="text-xs">0395860670</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">⏰</span>
                    </div>
                    <div>
                      <div className="font-medium">Giờ hoạt động</div>
                      <div className="text-xs">8:00 - 22:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="border-t border-slate-200 p-4">
              <Badge
                variant="secondary"
                className="w-full justify-center bg-green-50 text-green-700 border-green-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Đang hoạt động
              </Badge>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
});

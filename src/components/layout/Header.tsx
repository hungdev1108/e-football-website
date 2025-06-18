"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Search, LoaderIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
// import { useLogo } from "@/hooks/useSystem";

// Types
interface LogoInfo {
  url: string;
  alt: string;
}

// Memoize navigation items to avoid recreation
const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Tài khoản game", href: "/accounts" },
  { name: "Tin tức", href: "/news" },
  { name: "Liên hệ", href: "/contact" },
];

export const Header = memo(function Header() {
  // const { data: logoData, isLoading: loadingLogo } = useLogo();

  // const logoInfo = logoData?.data;

  const logofit = {
    url: "/efootball-logo.png",
    alt: "eFootball Logo",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <LogoSection logoInfo={logofit} loadingLogo={false} />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <Link href="/accounts">
                <Search className="h-4 w-4" />
                <span className="sr-only">Tìm kiếm</span>
              </Link>
            </Button>

            {/* User Menu - Desktop */}
            <DesktopUserMenu />

            {/* Mobile Sidebar */}
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
});

// Memoized sub-components
const LogoSection = memo(function LogoSection({
  logoInfo,
  loadingLogo,
}: {
  logoInfo: LogoInfo | undefined;
  loadingLogo: boolean;
}) {
  return (
    <Link href="/" className="flex items-center space-x-3">
      {loadingLogo ? (
        <div className="w-8 h-8 flex items-center justify-center">
          <LoaderIcon className="w-5 h-5 animate-spin" />
        </div>
      ) : logoInfo ? (
        <Image
          src={logoInfo.url}
          alt={logoInfo.alt}
          width={40}
          height={40}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">⚽</span>
        </div>
      )}
      <div>
        <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          EFOOTBALL
        </span>
        <div className="text-xs text-slate-500 font-medium -mt-1">
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
          className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors relative group"
        >
          {item.name}
          <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform" />
        </Link>
      ))}
    </nav>
  );
});

const DesktopUserMenu = memo(function DesktopUserMenu() {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Đăng nhập
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/register" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Đăng ký
        </Link>
      </Button>
    </div>
  );
});

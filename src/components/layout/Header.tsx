"use client";

import { useState, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus, Search, LoaderIcon } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { data: logoData, isLoading: loadingLogo } = useLogo();

  // Memoize callback functions
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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

            {/* Mobile Menu */}
            <MobileMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              logoInfo={logofit}
              closeMenu={closeMenu}
            />
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

const MobileMenu = memo(function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  logoInfo,
  closeMenu,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  logoInfo: LogoInfo | undefined;
  closeMenu: () => void;
}) {
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Mở menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href="/" className="flex items-center space-x-3">
              {logoInfo ? (
                <Image
                  src={logoInfo.url}
                  alt={logoInfo.alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚽</span>
                </div>
              )}
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EFOOTBALL
              </span>
            </Link>
          </SheetTitle>
          <SheetDescription>
            Nền tảng mua bán tài khoản eFootball uy tín
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {/* Navigation Links */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t pt-4">
            {/* Auth Buttons */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/auth/login" onClick={closeMenu}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/auth/register" onClick={closeMenu}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Đăng ký
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-700">
                Liên hệ hỗ trợ
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Zalo: 0395860670</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>Online 8:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="border-t pt-4">
            <Badge variant="secondary" className="w-full justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Đang hoạt động
            </Badge>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

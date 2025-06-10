"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useLogo } from "@/hooks/useSystem";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: logoData, isLoading: loadingLogo } = useLogo();

  const logoInfo = logoData?.data;

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Tài khoản game", href: "/accounts" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {loadingLogo ? (
              <div className="w-8 h-8 flex items-center justify-center">
                <LoaderIcon className="w-5 h-5 animate-spin" />
              </div>
            ) : logoInfo ? (
              <img
                src={logoInfo.url}
                alt={logoInfo.alt}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
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

            {/* Mobile Menu */}
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
                        <img
                          src={logoInfo.url}
                          alt={logoInfo.alt}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            ⚽
                          </span>
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
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t pt-4">
                    {/* Auth Buttons */}
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/auth/login"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Đăng nhập
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild>
                        <Link
                          href="/auth/register"
                          onClick={() => setIsMenuOpen(false)}
                        >
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
                    <Badge
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Đang hoạt động
                    </Badge>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t px-4 py-3">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/accounts">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm tài khoản...
          </Link>
        </Button>
      </div>
    </header>
  );
}

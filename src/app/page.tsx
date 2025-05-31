"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Shield,
  Zap,
  Users,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const vipAccounts = [
    {
      id: 1,
      title: "Tài khoản VIP Messi",
      price: "15,000,000",
      rating: 95,
      players: 35,
      image: "/images/acc1.jpg",
      category: "Huyền thoại",
      discount: 10,
    },
    {
      id: 2,
      title: "Tài khoản VIP Ronaldo",
      price: "14,500,000",
      rating: 94,
      players: 33,
      image: "/images/acc2.jpg",
      category: "Huyền thoại",
      discount: 15,
    },
    {
      id: 3,
      title: "Tài khoản VIP Neymar",
      price: "12,000,000",
      rating: 91,
      players: 30,
      image: "/images/acc3.jpg",
      category: "Premium",
      discount: 8,
    },
    {
      id: 4,
      title: "Tài khoản VIP Mbappe",
      price: "13,500,000",
      rating: 92,
      players: 32,
      image: "/images/acc4.jpg",
      category: "Premium",
      discount: 12,
    },
    {
      id: 5,
      title: "Tài khoản VIP Haaland",
      price: "11,800,000",
      rating: 90,
      players: 29,
      image: "/images/acc5.jpg",
      category: "Premium",
      discount: 5,
    },
    {
      id: 6,
      title: "Tài khoản VIP Benzema",
      price: "10,500,000",
      rating: 89,
      players: 28,
      image: "/images/acc6.jpg",
      category: "Cao cấp",
      discount: 20,
    },
  ];

  const categories = [
    {
      name: "Starter",
      count: 245,
      price: "100K - 500K",
      gradient: "from-emerald-400 to-emerald-600",
      icon: "🌱",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      name: "Trung cấp",
      count: 186,
      price: "500K - 1M",
      gradient: "from-blue-400 to-blue-600",
      icon: "⚽",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      name: "Cao cấp",
      count: 127,
      price: "1M - 5M",
      gradient: "from-purple-400 to-purple-600",
      icon: "🏆",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      name: "Premium",
      count: 89,
      price: "5M - 10M",
      gradient: "from-amber-400 to-orange-500",
      icon: "👑",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      name: "Huyền thoại",
      count: 45,
      price: "10M+",
      gradient: "from-red-400 to-pink-600",
      icon: "🔥",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
  ];

  const hotNews = [
    {
      id: 1,
      title: "EFOOTBALL 2025 ra mắt với nhiều tính năng mới",
      excerpt:
        "Konami công bố phiên bản mới với graphics được cải thiện và gameplay mượt mà hơn...",
      date: "2024-01-15",
      image: "/images/news1.jpg",
      category: "Cập nhật",
      readTime: "3 phút đọc",
    },
    {
      id: 2,
      title: "Messi trở thành POTW với rating 98",
      excerpt:
        "Lionel Messi được nâng cấp lên rating 98 trong sự kiện Player of the Week này...",
      date: "2024-01-14",
      image: "/images/news2.jpg",
      category: "Sự kiện",
      readTime: "2 phút đọc",
    },
    {
      id: 3,
      title: "Tips chơi EFOOTBALL hiệu quả cho người mới",
      excerpt:
        "Hướng dẫn chi tiết cách chơi EFOOTBALL từ cơ bản đến nâng cao cho game thủ mới...",
      date: "2024-01-13",
      image: "/images/news3.jpg",
      category: "Hướng dẫn",
      readTime: "5 phút đọc",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">⚽</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EFOOTBALL
                </h1>
                <p className="text-xs font-medium text-slate-500 -mt-1">
                  Premium Store
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="relative text-blue-600 font-semibold py-2"
              >
                Trang chủ
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </Link>
              <Link
                href="/accounts"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:scale-105"
              >
                Tài khoản game
              </Link>
              <Link
                href="/news"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:scale-105"
              >
                Tin tức
              </Link>
              <Link
                href="/cart"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:scale-105"
              >
                Giỏ hàng
              </Link>
              <Link
                href="/profile"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:scale-105"
              >
                Hồ sơ
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                className="font-medium hover:bg-slate-100 transition-all duration-300"
                asChild
              >
                <Link href="/auth/login">Đăng nhập</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/auth/register">Đăng ký</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="text-slate-600" />
              ) : (
                <Menu size={24} className="text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md py-6">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-blue-600 font-semibold px-4 py-2 rounded-lg bg-blue-50"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/accounts"
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  Tài khoản game
                </Link>
                <Link
                  href="/news"
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  Tin tức
                </Link>
                <Link
                  href="/cart"
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  Giỏ hàng
                </Link>
                <Link
                  href="/profile"
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  Hồ sơ
                </Link>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/auth/login">Đăng nhập</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    asChild
                  >
                    <Link href="/auth/register">Đăng ký</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Banner */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-6 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <TrendingUp className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">
                Trending #1 eFootball Store Việt Nam
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Tài khoản{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                EFOOTBALL
              </span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-300">
                chất lượng cao
              </span>
            </h2>

            <p className="text-lg md:text-xl mb-8 text-slate-200 leading-relaxed max-w-2xl">
              Hàng nghìn tài khoản game với{" "}
              <span className="text-yellow-400 font-semibold">rating cao</span>,
              cầu thủ star, formation mạnh. Giao dịch an toàn, uy tín,
              <span className="text-green-400 font-semibold">
                {" "}
                giao hàng tức thì
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/accounts" className="flex items-center">
                  Khám phá ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 hover:bg-white hover:text-slate-900 font-semibold text-lg px-8 py-4 backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/news">Xem tin tức</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 px-4 lg:px-6 bg-white border-b border-slate-200">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-2">
                <div className="flex">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400"
                      size={24}
                    />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm tài khoản theo cầu thủ, rating, giá cả..."
                      className="pl-16 pr-6 py-6 text-lg border-0 focus:ring-0 bg-transparent placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-lg px-8 py-6 shadow-lg transition-all duration-300 hover:scale-105">
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {[
                "Messi",
                "Ronaldo",
                "Rating 90+",
                "Dưới 5M",
                "Premium",
                "Huyền thoại",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm font-medium rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIP Accounts Section */}
      <section className="py-16 px-4 lg:px-6 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 flex items-center">
                Tài khoản VIP
                <span className="ml-3 text-2xl">⭐</span>
              </h3>
              <p className="text-lg text-slate-600 font-medium">
                Những tài khoản chất lượng cao nhất của chúng tôi
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex items-center group hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              asChild
            >
              <Link href="/accounts?category=vip">
                Xem tất cả
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {vipAccounts.map((account) => (
              <Card
                key={account.id}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border-0 shadow-lg hover:-translate-y-2 overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative h-56 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="flex items-center justify-center h-full text-white text-8xl">
                      ⚽
                    </div>

                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1">
                      {account.category}
                    </Badge>

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{account.discount}%
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-xl flex items-center gap-2">
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-bold">{account.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-4 group-hover:text-blue-600 transition-colors font-bold">
                    {account.title}
                  </CardTitle>

                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                      <Users size={16} />
                      <span className="font-medium">
                        {account.players} cầu thủ
                      </span>
                    </span>
                    <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                      <Shield size={16} />
                      <span className="font-medium">Bảo hành 30 ngày</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-blue-600">
                        {account.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500 ml-1">VND</span>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Mua ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/accounts?category=vip">Xem tất cả VIP</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 lg:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Tài khoản theo phân loại
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Chọn tài khoản phù hợp với ngân sách của bạn. Mỗi phân loại đều
              được kiểm duyệt kỹ lưỡng về chất lượng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group hover:shadow-xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:-translate-y-2 overflow-hidden"
              >
                <CardHeader className="text-center pb-4 relative">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${category.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors font-bold">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-slate-500">
                    {category.price}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pt-0">
                  <div className={`${category.bgColor} rounded-2xl p-4 mb-4`}>
                    <div
                      className={`text-3xl font-black ${category.textColor} mb-1`}
                    >
                      {category.count}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      tài khoản có sẵn
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300 font-semibold"
                  >
                    Xem ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hot News Section */}
      <section className="py-16 px-4 lg:px-6 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 flex items-center">
                Tin tức hot
                <span className="ml-3 text-2xl">🔥</span>
              </h3>
              <p className="text-lg text-slate-600 font-medium">
                Cập nhật những thông tin mới nhất về EFOOTBALL
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex items-center group hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              asChild
            >
              <Link href="/news">
                Xem tất cả
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotNews.map((news) => (
              <Card
                key={news.id}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border-0 shadow-lg hover:-translate-y-2 overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative h-52 bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-200 overflow-hidden">
                    <div className="flex items-center justify-center h-full text-slate-400 text-6xl">
                      📰
                    </div>
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold">
                      {news.category}
                    </Badge>
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm">
                      <Clock size={14} />
                      {news.readTime}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="text-sm text-slate-500 mb-3 font-medium">
                    {news.date}
                  </div>
                  <CardTitle className="text-xl mb-4 group-hover:text-blue-600 transition-colors font-bold leading-tight line-clamp-2">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                    {news.excerpt}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300 font-semibold flex items-center justify-center"
                  >
                    Đọc thêm
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/news">Xem tất cả tin tức</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">⚽</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black">EFOOTBALL</h4>
                  <p className="text-sm text-slate-400 font-medium">
                    Premium Store
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Chuyên bán tài khoản game EFOOTBALL chất lượng cao, uy tín hàng
                đầu Việt Nam. Hơn 10,000+ khách hàng tin tưởng.
              </p>
              <div className="flex items-center space-x-3 bg-slate-800 rounded-xl p-4">
                <Zap className="text-yellow-400" size={24} />
                <div>
                  <div className="font-bold text-yellow-400">
                    Giao hàng tức thì
                  </div>
                  <div className="text-sm text-slate-400">
                    24/7 hỗ trợ khách hàng
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h5 className="font-bold mb-6 text-xl">Liên kết nhanh</h5>
              <ul className="space-y-4 text-slate-300">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">🏠</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Trang chủ
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accounts"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">🎮</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Tài khoản game
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">📰</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Tin tức
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">🛒</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Giỏ hàng
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h5 className="font-bold mb-6 text-xl">Tài khoản</h5>
              <ul className="space-y-4 text-slate-300">
                <li>
                  <Link
                    href="/auth/login"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">🔑</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Đăng nhập
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">📝</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Đăng ký
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">👤</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Hồ sơ của tôi
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500 flex items-center">
                    <span className="mr-3 text-lg">🔒</span>
                    Bảo mật & quyền riêng tư
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-bold mb-6 text-xl">Liên hệ</h5>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center">
                  <span className="mr-3 text-lg">📧</span>
                  <div>
                    <div className="font-medium">
                      support@efootball-store.com
                    </div>
                    <div className="text-sm text-slate-400">
                      Email hỗ trợ 24/7
                    </div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-lg">📱</span>
                  <div>
                    <div className="font-medium">+84 xxx xxx xxx</div>
                    <div className="text-sm text-slate-400">
                      Hotline bán hàng
                    </div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-lg">💬</span>
                  <div>
                    <div className="font-medium">Facebook/Zalo</div>
                    <div className="text-sm text-slate-400">Chat trực tiếp</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-lg">🕒</span>
                  <div>
                    <div className="font-medium">8:00 - 22:00 hàng ngày</div>
                    <div className="text-sm text-slate-400">
                      Thời gian hỗ trợ
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <h6 className="font-bold mb-4">Phương thức thanh toán</h6>
                <div className="flex space-x-3">
                  <div className="w-10 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    💳
                  </div>
                  <div className="w-10 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    🏧
                  </div>
                  <div className="w-10 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    💰
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                &copy; 2025 EFOOTBALL Store. All rights reserved. Made with ❤️
                in Vietnam
              </p>
              <div className="flex space-x-8 text-sm text-slate-400">
                <span className="hover:text-white cursor-pointer transition-colors">
                  Chính sách bảo mật
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Điều khoản sử dụng
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Chính sách đổi trả
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

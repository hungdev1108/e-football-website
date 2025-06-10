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
import {
  Star,
  Shield,
  Zap,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  LoaderIcon,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useFeaturedAccounts, useCategories } from "@/hooks/useAccounts";
import { useFeaturedNews } from "@/hooks/useNews";
import { useBanners } from "@/hooks/useSystem";
import { ApiGameAccount, ApiCategory, ApiNews, ApiBanner } from "@/types";

export default function HomePage() {
  const { data: featuredAccountsData, isLoading: loadingAccounts } =
    useFeaturedAccounts(6);
  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();
  const { data: featuredNewsData, isLoading: loadingNews } = useFeaturedNews(3);
  const { data: bannersData, isLoading: loadingBanners } = useBanners();

  const featuredAccounts = featuredAccountsData?.data || [];
  const categories = categoriesData?.data || [];
  const hotNews = featuredNewsData?.data || [];
  const banners =
    bannersData?.data?.filter((banner: ApiBanner) => banner.isActive) || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "steam":
        return "💻";
      case "mobile":
        return "📱";
      case "ps4":
      case "ps5":
        return "🎮";
      case "xbox":
        return "🎮";
      default:
        return "🎮";
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case "steam":
        return "Steam PC";
      case "mobile":
        return "Mobile";
      case "ps4":
        return "PlayStation 4";
      case "ps5":
        return "PlayStation 5";
      case "xbox":
        return "Xbox";
      default:
        return platform;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <Header />

      {/* Banner */}
      <section className="relative h-[650px] md:h-[700px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <TrendingUp className="w-5 h-5 mr-3 text-yellow-400" />
                <span className="text-base font-bold">
                  UY TÍN - CHẤT LƯỢNG - GIÁ RẺ
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  SHOP ACC EFOOTBALL
                </span>
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-300 mt-4 block">
                  MUA BÁN ACC - NẠP COIN
                </span>
              </h2>

              <div className="space-y-4 text-lg md:text-xl leading-relaxed">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 font-bold">
                    UY TÍN - CHẤT LƯỢNG - GIÁ RẺ
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-bold">
                    Số điện thoại - Zalo: 0395860670
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-300 font-bold">
                    Số tài khoản ngân hàng: 196666196666
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                  <span className="text-orange-300 font-bold">
                    TRAN DINH HIEP - MB BANK
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-10 py-5 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/accounts" className="flex items-center">
                    Khám phá ngay
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg px-10 py-5 hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/contact">Liên hệ ngay</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Display banners if available */}
            <div className="hidden lg:block">
              {loadingBanners ? (
                <div className="flex items-center justify-center h-96">
                  <LoaderIcon className="w-8 h-8 animate-spin text-white" />
                </div>
              ) : banners.length > 0 ? (
                <div className="relative">
                  <img
                    src={banners[0].image}
                    alt={banners[0].title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-white font-bold text-lg">
                      {banners[0].title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">⚽</div>
                      <div className="text-xl font-bold">eFootball Store</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Danh mục tài khoản
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Khám phá các loại tài khoản game đa dạng với mức giá phù hợp cho
              mọi nhu cầu của bạn
            </p>
          </div>

          {loadingCategories ? (
            <div className="flex items-center justify-center h-64">
              <LoaderIcon className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {categories.map((category: ApiCategory) => (
                <Link
                  key={category._id}
                  href={`/accounts?category=${category._id}`}
                >
                  <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {category.icon || "🎮"}
                      </div>
                      <h4 className="font-bold text-xl mb-3 text-slate-800">
                        {category.name}
                      </h4>
                      {category.description && (
                        <p className="text-sm text-slate-600 mb-4">
                          {category.description}
                        </p>
                      )}
                      {category.accountCount !== undefined && (
                        <div className="text-xs text-slate-500">
                          {category.accountCount} tài khoản
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Accounts Section */}
      <section className="py-20 px-4 lg:px-6 bg-gradient-to-br from-slate-100/50 to-blue-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Tài khoản nổi bật
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Những tài khoản game chất lượng cao được chọn lọc kỹ càng
            </p>
          </div>

          {loadingAccounts ? (
            <div className="flex items-center justify-center h-64">
              <LoaderIcon className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAccounts.map((account: ApiGameAccount) => (
                <Link key={account._id} href={`/accounts/${account._id}`}>
                  <Card className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          account.images[0]?.url || "/api/placeholder/300/200"
                        }
                        alt={account.images[0]?.alt || account.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-slate-700"
                        >
                          {getPlatformIcon(account.accountDetails.platform)}{" "}
                          {getPlatformLabel(account.accountDetails.platform)}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-blue-600">
                          {account.accountCode}
                        </Badge>
                      </div>
                      {account.status === "sold" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge
                            variant="destructive"
                            className="text-lg px-4 py-2"
                          >
                            ĐÃ BÁN
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {account.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {account.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {account.collectiveStrength}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            Level {account.accountDetails.level}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPrice(account.price)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {account.seller.username}
                          </div>
                          <div className="text-xs text-gray-500">
                            {account.views} lượt xem
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 group-hover:bg-blue-700 transition-colors"
                        disabled={account.status !== "available"}
                      >
                        {account.status === "available"
                          ? "Xem chi tiết"
                          : "Không khả dụng"}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 text-lg px-8 py-6"
              asChild
            >
              <Link href="/accounts">
                Xem tất cả tài khoản
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Tin tức hot
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cập nhật những thông tin mới nhất về eFootball và cộng đồng game
              thủ
            </p>
          </div>

          {loadingNews ? (
            <div className="flex items-center justify-center h-64">
              <LoaderIcon className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotNews.map((news: ApiNews) => (
                <Link key={news._id} href={`/news/${news._id}`}>
                  <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={news.featuredImage.url}
                        alt={news.featuredImage.alt}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-600">Hot</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {news.publishedAt
                            ? formatDate(news.publishedAt)
                            : formatDate(news.createdAt)}
                        </span>
                        <span>•</span>
                        <span>{news.views} lượt xem</span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-slate-600 line-clamp-3 mb-4">
                        {news.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                          Tác giả:{" "}
                          {news.author.fullName || news.author.username}
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 text-lg px-8 py-6"
              asChild
            >
              <Link href="/news">
                Xem tất cả tin tức
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:px-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Tại sao chọn chúng tôi?
            </h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi cam kết mang đến cho bạn trải nghiệm mua bán tài khoản
              game tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Shield className="w-16 h-16 mx-auto mb-6 text-green-400" />
                <h4 className="text-2xl font-bold mb-4">An toàn & Uy tín</h4>
                <p className="text-blue-100 leading-relaxed">
                  Tất cả tài khoản đều được kiểm tra kỹ lưỡng trước khi bán. Bảo
                  hành 30 ngày cho mọi giao dịch.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                <h4 className="text-2xl font-bold mb-4">Giao hàng nhanh</h4>
                <p className="text-blue-100 leading-relaxed">
                  Nhận tài khoản ngay lập tức sau khi thanh toán thành công. Hỗ
                  trợ 24/7 mọi lúc mọi nơi.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-6 text-blue-400" />
                <h4 className="text-2xl font-bold mb-4">Cộng đồng lớn</h4>
                <p className="text-blue-100 leading-relaxed">
                  Hơn 10,000 game thủ tin tưởng và sử dụng dịch vụ của chúng tôi
                  mỗi tháng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">⚽</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    EFOOTBALL
                  </h4>
                  <p className="text-sm text-slate-400">Premium Store</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Nền tảng mua bán tài khoản eFootball uy tín và chất lượng nhất
                Việt Nam. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho
                game thủ.
              </p>
              <div className="flex items-center space-x-4 text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online 24/7</span>
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
                    href="/contact"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">📧</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Liên hệ
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
                    href="/contact"
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-3 text-lg">❓</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Câu hỏi thường gặp
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
                    <div className="font-medium">0395860670</div>
                    <div className="text-sm text-slate-400">
                      Hotline bán hàng - Zalo
                    </div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-lg">💬</span>
                  <div>
                    <div className="font-medium">Zalo: 0395860670</div>
                    <div className="text-sm text-slate-400">Chat trực tiếp</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-lg">🏦</span>
                  <div>
                    <div className="font-medium">196666196666</div>
                    <div className="text-sm text-slate-400">
                      TRAN DINH HIEP - MB BANK
                    </div>
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

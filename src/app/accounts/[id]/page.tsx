"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDetail, CardContentDetail } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Calendar,
  ShoppingCart,
  Heart,
  Share2,
  LoaderIcon,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Coins,
  Trophy,
  Gamepad2,
  Shield,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAccount } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import PurchaseModal from "@/components/ui/PurchaseModal";
import "@/styles/purchase-button.css";

// Enhanced Image Carousel Component
const ImageCarousel = ({
  images,
  title,
}: {
  images: { url: string; alt?: string }[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "Escape") setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen, currentIndex]);

  // Auto-slide effect
  useEffect(() => {
    if (images.length > 1 && !isFullscreen) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isFullscreen, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
        <div className="text-gray-400">No images available</div>
      </div>
    );
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-black group">
        <div
          ref={carouselRef}
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={
                getImageUrl(images[currentIndex]?.url) ||
                getPlaceholderUrl(800, 600)
              }
              alt={images[currentIndex]?.alt || title}
              fill
              className="object-contain transition-all duration-500 ease-out"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
            />

            {/* Gradient overlay for better control visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Navigation arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </Button>
            </>
          )}

          {/* Fullscreen button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail dots - Mobile optimized */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Only show on larger screens */}
      {images.length > 1 && (
        <div className="hidden md:flex mt-4 space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-blue-500 scale-105 shadow-lg"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={getImageUrl(image.url)}
                alt={image.alt || `Image ${index + 1}`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={
                getImageUrl(images[currentIndex]?.url) ||
                getPlaceholderUrl(1200, 800)
              }
              alt={images[currentIndex]?.alt || title}
              fill
              className="object-contain"
              priority
            />

            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
              onClick={toggleFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Counter in fullscreen */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default function AccountDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const params = useParams();
  const accountId = params.id as string;

  const { data: accountData, isLoading } = useAccount(accountId);
  const account = accountData?.data as ApiGameAccount;

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatPrice = (price: number) => {
    if (price === -1) {
      return "📞 Liên hệ";
    }

    const priceStr = price.toString();
    if (priceStr.length <= 3) {
      return `${price} đ`;
    }

    const firstDigit = priceStr[0];
    const remainingStr = priceStr.slice(1);

    let pattern = "";
    for (let i = 0; i < remainingStr.length; i++) {
      if (i > 0 && (remainingStr.length - i) % 3 === 0) {
        pattern += ".";
      }
      pattern += "x";
    }

    return `${firstDigit}${pattern} đ`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Không xác định";
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Không xác định";
    }
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

  const handlePurchase = () => {
    if (account.status !== "available") {
      toast.error("Tài khoản này không còn khả dụng!");
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: account.title,
        text: account.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link đã được copy vào clipboard!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <LoaderIcon className="w-12 h-12 animate-spin mx-auto text-blue-500" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">
              Đang tải thông tin tài khoản...
            </p>
            <p className="text-sm text-gray-500">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-8xl">😞</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Không tìm thấy tài khoản
            </h2>
            <p className="text-gray-600 mb-6">
              Tài khoản bạn đang tìm không tồn tại hoặc đã bị xóa.
            </p>
          </div>
          <Link href="/accounts">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách tài khoản
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/accounts">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-xl px-3 py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </Button>
            </Link>

            {isScrolled && (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block">
                  <h3 className="font-semibold text-gray-800 truncate max-w-xs">
                    {account.title}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={handleLike}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section with Image Carousel */}
        <div className="space-y-4">
          <ImageCarousel images={account.images || []} title={account.title} />

          {/* Title and Quick Info - Enhanced Mobile/Desktop */}
          <div className="space-y-6">
            {/* Main Title Section */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-normal md:leading-relaxed">
                  {account.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-600">
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-500 flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap">
                      {formatDate(account?.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full">
                    <Eye className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap">
                      {account.views.toLocaleString()} lượt xem
                    </span>
                  </div>
                </div>

                {/* Platform and Status Badges - Enhanced Responsive */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-center justify-center space-x-2 bg-white border-2 border-blue-200 text-gray-700 px-3 py-3 rounded-xl shadow-sm min-h-[48px]">
                    <span className="text-base flex-shrink-0">
                      {getPlatformIcon(
                        account.accountDetails?.platform || "mobile"
                      )}
                    </span>
                    <span className="font-medium text-xs md:text-base text-center">
                      {getPlatformLabel(
                        account.accountDetails?.platform || "mobile"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 bg-white border-2 border-purple-200 text-gray-700 px-3 py-3 rounded-xl shadow-sm min-h-[48px]">
                    <span className="text-sm flex-shrink-0">🏷️</span>
                    <span className="font-medium text-xs md:text-base text-center">
                      {account.accountCode}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-xl shadow-sm font-medium text-xs md:text-base min-h-[48px] bg-white text-gray-700 ${
                      account.status === "available"
                        ? "border-2 border-green-200"
                        : "border-2 border-red-200"
                    }`}
                  >
                    <span className="text-sm flex-shrink-0">
                      {account.status === "available" ? "✅" : "❌"}
                    </span>
                    <span className="text-center">
                      {account.status === "available" ? "Có sẵn" : "Đã bán"}
                    </span>
                  </div>

                  {account.featured ? (
                    <div className="flex items-center justify-center space-x-2 bg-white border-2 border-orange-200 text-gray-700 px-3 py-3 rounded-xl shadow-sm min-h-[48px]">
                      <span className="text-sm flex-shrink-0">⭐</span>
                      <span className="font-medium text-xs md:text-base text-center">
                        Nổi bật
                      </span>
                    </div>
                  ) : (
                    <div className="hidden lg:block"></div>
                  )}
                </div>

                <div className="lg:hidden order-1">
            <CardDetail className="">
              <CardContentDetail className="">
                <div className="text-center space-y-4">
                  {/* Enhanced Action Buttons - Mobile */}
                  <div className="space-y-3 pt-2">
                    <div className="relative">
                      {account.status === "available" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                      )}
                      <Button
                        className={`relative w-full h-14 text-xl font-black rounded-2xl shadow-2xl transform transition-all duration-500 border-2 ${
                          account.status === "available"
                            ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 hover:from-red-600 hover:via-pink-600 hover:to-orange-600 text-white border-red-300 hover:scale-110 hover:shadow-3xl hover:shadow-red-500/50 animate-pulse"
                            : "bg-gray-400 cursor-not-allowed text-white border-gray-300"
                        }`}
                        onClick={handlePurchase}
                        disabled={account.status !== "available"}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <div className="relative">
                            <ShoppingCart className="h-6 w-6 animate-bounce" />
                            {account.status === "available" && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                            )}
                          </div>
                          <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                            {account.status === "available"
                              ? "🔥 MUA NGAY - GIẢM SỐC! 🔥"
                              : "❌ Không khả dụng"}
                          </span>
                        </div>
                        {account.status === "available" && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform translate-x-full animate-shine"></div>
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={`h-10 rounded-xl border-2 hover:bg-red-50 transition-all duration-300 ${
                          isLiked
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-red-400"
                        }`}
                        onClick={handleLike}
                      >
                        <Heart
                          className={`h-4 w-4 mr-1 ${
                            isLiked ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="font-semibold text-sm">
                          {isLiked ? "Đã thích" : "Yêu thích"}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-10 rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="font-semibold text-sm">Chia sẻ</span>
                      </Button>
                    </div>
                  </div>

                  {/* Price Display - Mobile Optimized */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                      <div
                        className={`text-3xl md:text-4xl font-black ${
                          account.price === -1
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse"
                            : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                        }`}
                      >
                        {formatPrice(account.price)}
                      </div>
                      <p className="text-base md:text-lg text-gray-600 mt-1 font-medium">
                        {account.price === -1
                          ? "Liên hệ để biết giá"
                          : "Giá bán"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContentDetail>
            </CardDetail>
          </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Mobile: Purchase Section First - Only visible on mobile */}
          

          {/* Left Column - Account Details */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Enhanced Price Section - Desktop Only */}
            <Card className="hidden lg:block overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="text-center space-y-6">
                  {/* Price Display */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                      <div
                        className={`text-4xl md:text-6xl lg:text-7xl font-black ${
                          account.price === -1
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse"
                            : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                        }`}
                      >
                        {formatPrice(account.price)}
                      </div>
                      <p className="text-lg md:text-xl text-gray-600 mt-2 font-medium">
                        {account.price === -1
                          ? "Liên hệ để biết giá"
                          : "Giá bán"}
                      </p>
                    </div>
                  </div>

                  

                  {/* Enhanced Action Buttons - Desktop */}
                  <div className="space-y-4 pt-4">
                    <div className="relative">
                      {account.status === "available" && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                          <div className="absolute -inset-2 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 rounded-3xl blur-2xl opacity-50 animate-pulse delay-300"></div>
                        </>
                      )}
                      <Button
                        className={`relative w-full h-16 md:h-20 text-xl md:text-2xl font-black rounded-2xl shadow-2xl transform transition-all duration-500 border-3 overflow-hidden ${
                          account.status === "available"
                            ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 hover:from-red-600 hover:via-pink-600 hover:to-orange-600 text-white border-red-300 hover:scale-110 hover:shadow-4xl hover:shadow-red-500/60 animate-pulse"
                            : "bg-gray-400 cursor-not-allowed text-white border-gray-300"
                        }`}
                        onClick={handlePurchase}
                        disabled={account.status !== "available"}
                      >
                        <div className="flex items-center justify-center space-x-4">
                          <div className="relative">
                            <ShoppingCart className="h-8 w-8 animate-bounce" />
                            {account.status === "available" && (
                              <>
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                              </>
                            )}
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent font-black">
                              {account.status === "available"
                                ? "🔥 MUA NGAY - GIẢM SỐC! 🔥"
                                : "❌ Không khả dụng"}
                            </span>
                            {account.status === "available" && (
                              <span className="text-yellow-200 text-sm font-semibold animate-pulse">
                                💎 Chỉ còn vài tài khoản cuối! 💎
                              </span>
                            )}
                          </div>
                        </div>
                        {account.status === "available" && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 transform translate-x-full animate-shine"></div>
                            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-500"></div>
                            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className={`flex-1 h-12 md:h-14 rounded-xl border-2 hover:bg-red-50 transition-all duration-300 ${
                          isLiked
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-red-400"
                        }`}
                        onClick={handleLike}
                      >
                        <Heart
                          className={`h-5 w-5 md:h-6 md:w-6 mr-2 ${
                            isLiked ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="font-semibold text-sm md:text-base">
                          {isLiked ? "Đã thích" : "Yêu thích"}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-12 md:h-14 rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                        onClick={handleShare}
                      >
                        <Share2 className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                        <span className="font-semibold text-sm md:text-base">
                          Chia sẻ
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Description */}
            <Card className="bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-100 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl md:text-2xl">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <Gamepad2 className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-800 to-indigo-800 bg-clip-text text-transparent font-bold">
                    Mô tả chi tiết
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-2xl p-4 md:p-6 border border-indigo-200 shadow-md">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                      {account.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Stats Grid */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl md:text-2xl">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                    <Trophy className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent font-bold">
                    Thống kê tài khoản
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 md:p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md">
                        <Star className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">
                          {account.collectiveStrength}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 font-medium">
                          Collective Strength
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 md:p-6 rounded-2xl border-2 border-yellow-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md">
                        <Coins className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">
                          {account.accountDetails?.coins?.toLocaleString() ||
                            "0"}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 font-medium">
                          Coins
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-6 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-md">
                        <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">
                          {account.accountDetails?.gp?.toLocaleString() || "0"}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 font-medium">
                          GP
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-md">
                        <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">
                          {account.views.toLocaleString()}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 font-medium">
                          Lượt xem
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            

            {/* Enhanced Technical Details */}
            <Card className="bg-gradient-to-br from-white to-green-50 border-2 border-green-100 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl md:text-2xl">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <Shield className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-800 to-green-800 bg-clip-text text-transparent font-bold">
                    Chi tiết kỹ thuật
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-3">
                      <label className="text-sm md:text-base font-bold text-green-700 uppercase tracking-wide">
                        Danh mục
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl">
                          <span className="text-xl">🎮</span>
                        </div>
                        <span className="font-bold text-lg md:text-xl text-gray-900">
                          {account.category.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-3">
                      <label className="text-sm md:text-base font-bold text-blue-700 uppercase tracking-wide">
                        Nền tảng
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
                          <span className="text-xl">
                            {getPlatformIcon(
                              account.accountDetails?.platform || "mobile"
                            )}
                          </span>
                        </div>
                        <span className="font-bold text-lg md:text-xl text-gray-900">
                          {getPlatformLabel(
                            account.accountDetails?.platform || "mobile"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start order-3 lg:order-2">
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-800 flex items-center space-x-2 text-lg md:text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold">Liên hệ hỗ trợ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-blue-800 text-base">Zalo</p>
                      <p className="text-blue-600 text-sm md:text-base font-semibold">
                        0395860670
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-blue-800 text-base">
                        Giờ hoạt động
                      </p>
                      <p className="text-blue-600 text-sm md:text-base font-medium">
                        8:00 - 22:00 hàng ngày
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guarantee */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center space-x-2 text-lg md:text-xl">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold">Cam kết bảo đảm</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex-shrink-0"></div>
                      <span className="text-green-700 font-medium text-sm md:text-base">
                        Tài khoản chính chủ 100%
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex-shrink-0"></div>
                      <span className="text-green-700 font-medium text-sm md:text-base">
                        Bảo hành vĩnh viễn
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex-shrink-0"></div>
                      <span className="text-green-700 font-medium text-sm md:text-base">
                        Hỗ trợ 24/7
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex-shrink-0"></div>
                      <span className="text-green-700 font-medium text-sm md:text-base">
                        Hoàn tiền nếu không đúng mô tả
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile: Additional Info */}
              <div className="lg:hidden">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-800 flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold">Tại sao chọn chúng tôi?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-white rounded-xl border border-purple-100">
                        <div className="text-2xl font-black text-purple-600">
                          10K+
                        </div>
                        <div className="text-xs text-purple-700 font-medium">
                          Khách hàng
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-xl border border-purple-100">
                        <div className="text-2xl font-black text-purple-600">
                          99.9%
                        </div>
                        <div className="text-xs text-purple-700 font-medium">
                          Hài lòng
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {account && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          account={account}
        />
      )}
    </div>
  );
}

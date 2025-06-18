"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  Calendar,
  ShoppingCart,
  Heart,
  Share2,
  Gamepad2,
  LoaderIcon,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAccount } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import PurchaseModal from "@/components/ui/PurchaseModal";
import "@/styles/purchase-button.css";

export default function AccountDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const params = useParams();
  const accountId = params.id as string;

  const { data: accountData, isLoading, error } = useAccount(accountId);
  const account = accountData?.data as ApiGameAccount;

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
  
  // Tạo pattern từ phải sang trái theo chuẩn định dạng tiền tệ
  let pattern = '';
  for (let i = 0; i < remainingStr.length; i++) {
    if (i > 0 && (remainingStr.length - i) % 3 === 0) {
      pattern += '.';
    }
    pattern += 'x';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoaderIcon className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Đang tải thông tin tài khoản...</p>
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Không tìm thấy tài khoản</h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Tài khoản bạn đang tìm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/accounts">
            <Button>Quay lại danh sách tài khoản</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <div className="mb-4 md:mb-6">
          <Link href="/accounts">
            <Button variant="ghost" className="flex items-center gap-2 text-sm md:text-base">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <CardImage className="mb-4 md:mb-6">
              <CardContent className="p-0">
                <div className="relative overflow-hidden group">
                  <Image
                    src={
                      account.images[selectedImageIndex]?.url
                        ? getImageUrl(account.images[selectedImageIndex].url)
                        : getPlaceholderUrl(600, 400)
                    }
                    alt={
                      account.images[selectedImageIndex]?.alt || account.title
                    }
                    width={600}
                    height={384}
                    className="w-full h-64 md:h-96 object-cover rounded-t-lg image-scale-smooth"
                    priority
                  />

                  {/* Status Badge */}
                  {account.status === "sold" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="text-lg md:text-2xl px-4 py-2 md:px-6 md:py-3"
                      >
                        ĐÃ BÁN
                      </Badge>
                    </div>
                  )}

                  {/* Platform Badge */}
                  <Badge className="absolute top-2 left-2 md:top-4 md:left-4 text-xs md:text-sm" variant="secondary">
                    <span className="md:hidden">{getPlatformIcon(account.accountDetails?.platform || 'mobile')}</span>
                    <span className="hidden md:inline">
                    {getPlatformIcon(account.accountDetails?.platform || 'mobile')}{" "}
                    {getPlatformLabel(account.accountDetails?.platform || 'mobile')}
                    </span>
                  </Badge>

                  {/* Account Code Badge */}
                  <Badge className="absolute top-2 right-2 md:top-4 md:right-4 text-xs md:text-sm">
                    {account.accountCode}
                  </Badge>

                  {/* Featured Badge */}
                  {account.featured && (
                    <Badge className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-yellow-500 text-xs md:text-sm">
                      ⭐ Nổi bật
                    </Badge>
                  )}
                </div>

                {/* Image Thumbnails */}
                {account.images.length > 1 && (
                  <div className="p-3 md:p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {account.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`group flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={getImageUrl(image.url)}
                            alt={image.alt}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover image-scale-smooth"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </CardImage>

            {/* Account Details Tabs */}
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-lg md:text-xl">Chi tiết tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview" className="text-sm md:text-base">Tổng quan</TabsTrigger>
                    <TabsTrigger value="stats" className="text-sm md:text-base">Thống kê</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm md:text-base">Mô tả chi tiết</h4>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {account.description}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs md:text-sm font-medium text-gray-500">
                          Nền tảng
                        </span>
                        <p className="font-semibold text-sm md:text-base">
                          <span className="md:hidden">{getPlatformIcon(account.accountDetails?.platform || 'mobile')}</span>
                          <span className="hidden md:inline">
                          {getPlatformIcon(account.accountDetails?.platform || 'mobile')}{" "}
                          {getPlatformLabel(account.accountDetails?.platform || 'mobile')}
                          </span>
                        </p>
                      </div>

                      <div>
                        <span className="text-xs md:text-sm font-medium text-gray-500">
                          GP
                        </span>
                        <p className="font-semibold text-sm md:text-base">
                          {account.accountDetails?.gp?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs md:text-sm font-medium text-gray-500">
                          Coins
                        </span>
                        <p className="font-semibold text-sm md:text-base">
                          {account.accountDetails?.coins?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-3 md:p-4 text-center">
                          <Star className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 mx-auto mb-2" />
                          <p className="text-lg md:text-2xl font-bold">
                            {account.collectiveStrength}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            Collective Strength
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-3 md:p-4 text-center">
                          <Eye className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-lg md:text-2xl font-bold">{account.views}</p>
                          <p className="text-xs md:text-sm text-gray-600">Lượt xem</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-3 md:p-4 text-center">
                          <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-lg md:text-2xl font-bold">
                            {account.category.name}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">Danh mục</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Panel */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="line-clamp-2 text-lg md:text-xl">{account.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                  Đăng ngày {formatDate(account?.createdAt)}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 md:space-y-6 px-3 md:px-6">
                {/* Price */}
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                    account.price === -1 
                      ? "text-green-600 animate-pulse" 
                      : "text-blue-600"
                  }`}>
                    {formatPrice(account.price)}
                  </div>
                  <Badge variant="secondary" className="text-xs md:text-sm bg-green-100 text-green-800 font-semibold">
                    🏦 Hỗ trợ trả góp
                  </Badge>
                </div>

                <Separator />

                {/* Key Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">
                      Collective Strength
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-sm md:text-base">
                        {account.collectiveStrength}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Lượt xem</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                      <span className="font-semibold text-sm md:text-base">{account.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Trạng thái</span>
                    <Badge
                      variant={
                        account.status === "available"
                          ? "default"
                          : "destructive"
                      }
                      className="text-xs md:text-sm"
                    >
                      {account.status === "available"
                        ? "Có sẵn"
                        : account.status === "sold"
                        ? "Đã bán"
                        : "Pending"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className={`w-full text-white font-bold shadow-lg relative overflow-hidden text-sm md:text-base ${
                      account.status === "available" 
                        ? "purchase-button" 
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    size="lg"
                    onClick={handlePurchase}
                    disabled={account.status !== "available"}
                  >
                    <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2 relative z-10" />
                    <span className="relative z-10">
                      {account.status === "available"
                        ? "🚀 Mua ngay"
                        : "Không khả dụng"}
                    </span>
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs md:text-sm"
                      onClick={handleLike}
                    >
                      <Heart
                        className={`h-3 w-3 md:h-4 md:w-4 mr-2 ${
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isLiked ? "Đã thích" : "Yêu thích"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs md:text-sm"
                      onClick={handleShare}
                    >
                      <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Chia sẻ
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Guarantee */}
                <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm md:text-base">Bảo đảm</h4>
                  <ul className="text-xs md:text-sm text-green-700 space-y-1">
                    <li>• Tài khoản chính chủ 100%</li>
                    <li>• Bảo hành 30 ngày</li>
                    <li>• Hỗ trợ 24/7</li>
                    <li>• Hoàn tiền nếu không đúng mô tả</li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">
                    Liên hệ hỗ trợ
                  </h4>
                  <div className="text-xs md:text-sm text-blue-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <span>📱</span>
                      <span>Zalo: 0395860670</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>Online 8:00 - 22:00 hàng ngày</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

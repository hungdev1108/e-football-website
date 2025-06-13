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
  Users,
  Calendar,
  ShoppingCart,
  Heart,
  Share2,
  Trophy,
  Gamepad2,
  LoaderIcon,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAccount } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

export default function AccountDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const params = useParams();
  const accountId = params.id as string;

  const { data: accountData, isLoading, error } = useAccount(accountId);
  const account = accountData?.data as ApiGameAccount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
    // TODO: Implement direct purchase when API is ready
    toast.success("Chuyển đến trang thanh toán!");
    // Redirect to payment/checkout page
    // router.push(`/checkout/${account._id}`);
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
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy tài khoản</h2>
          <p className="text-gray-600 mb-4">
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
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/accounts">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <CardImage className="mb-6">
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
                    className="w-full h-96 object-cover rounded-t-lg image-scale-smooth"
                    priority
                  />

                  {/* Status Badge */}
                  {account.status === "sold" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="text-2xl px-6 py-3"
                      >
                        ĐÃ BÁN
                      </Badge>
                    </div>
                  )}

                  {/* Platform Badge */}
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {getPlatformIcon(account.accountDetails.platform)}{" "}
                    {getPlatformLabel(account.accountDetails.platform)}
                  </Badge>

                  {/* Account Code Badge */}
                  <Badge className="absolute top-4 right-4">
                    {account.accountCode}
                  </Badge>

                  {/* Featured Badge */}
                  {account.featured && (
                    <Badge className="absolute bottom-4 left-4 bg-yellow-500">
                      ⭐ Nổi bật
                    </Badge>
                  )}
                </div>

                {/* Image Thumbnails */}
                {account.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {account.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`group flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
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
              <CardHeader>
                <CardTitle>Chi tiết tài khoản</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="stats">Thống kê</TabsTrigger>
                    <TabsTrigger value="seller">Người bán</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Mô tả chi tiết</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {account.description}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Nền tảng
                        </span>
                        <p className="font-semibold">
                          {getPlatformIcon(account.accountDetails.platform)}{" "}
                          {getPlatformLabel(account.accountDetails.platform)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Level
                        </span>
                        <p className="font-semibold">
                          {account.accountDetails.level}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          GP
                        </span>
                        <p className="font-semibold">
                          {account.accountDetails.gp.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Coins
                        </span>
                        <p className="font-semibold">
                          {account.accountDetails.coins.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">
                            {account.collectiveStrength}
                          </p>
                          <p className="text-sm text-gray-600">
                            Collective Strength
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{account.views}</p>
                          <p className="text-sm text-gray-600">Lượt xem</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">
                            {account.accountDetails.level}
                          </p>
                          <p className="text-sm text-gray-600">Level</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <Gamepad2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">
                            {account.category.name}
                          </p>
                          <p className="text-sm text-gray-600">Danh mục</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="seller" className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {account.seller.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {account.seller.fullName || account.seller.username}
                        </h4>
                        <p className="text-gray-600">
                          @{account.seller.username}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="font-semibold mb-2">
                        Thông tin người bán
                      </h5>
                      <p className="text-gray-600">
                        Người bán uy tín với nhiều tài khoản chất lượng. Cam kết
                        giao hàng nhanh chóng và hỗ trợ tận tình.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="line-clamp-2">{account.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Đăng ngày {formatDate(account.createdAt)}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(account.price)}
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    Giá cố định
                  </Badge>
                </div>

                <Separator />

                {/* Key Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Collective Strength
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">
                        {account.collectiveStrength}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Level</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold">
                        {account.accountDetails.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lượt xem</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{account.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trạng thái</span>
                    <Badge
                      variant={
                        account.status === "available"
                          ? "default"
                          : "destructive"
                      }
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
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={account.status !== "available"}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {account.status === "available"
                      ? "Mua ngay"
                      : "Không khả dụng"}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleLike}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isLiked ? "Đã thích" : "Yêu thích"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Guarantee */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Bảo đảm</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Tài khoản chính chủ 100%</li>
                    <li>• Bảo hành 30 ngày</li>
                    <li>• Hỗ trợ 24/7</li>
                    <li>• Hoàn tiền nếu không đúng mô tả</li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Liên hệ hỗ trợ
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
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
    </div>
  );
}

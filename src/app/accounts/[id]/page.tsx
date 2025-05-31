"use client";

import { useState } from "react";
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
  Trophy,
  Users,
  Shield,
  Gamepad2,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Mock account detail data
const mockAccountDetail = {
  id: "1",
  title: "Tài khoản EFOOTBALL Premium - Messi & Ronaldo",
  description:
    "Tài khoản với đội hình khủng, có Messi, Ronaldo và nhiều siêu sao khác. Đã đầu tư hơn 50 triệu VND để xây dựng đội hình hoàn hảo.",
  fullDescription:
    "Đây là tài khoản EFOOTBALL được đầu tư kỹ lưỡng với đội hình siêu khủng. Tài khoản có đầy đủ các cầu thủ legendary như Messi, Ronaldo, Neymar, Mbappé và nhiều siêu sao khác. Tất cả cầu thủ đều đã được nâng cấp tối đa và có chemistry hoàn hảo. Đặc biệt, tài khoản đã unlock được nhiều formation độc quyền và có nhiều kit đặc biệt.",
  price: 2500000,
  originalPrice: 3000000,
  images: [
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
  ],
  platform: "PC",
  rating: 95,
  level: 87,
  players: [
    {
      name: "Lionel Messi",
      position: "RWF",
      rating: 95,
      nationality: "Argentina",
    },
    {
      name: "Cristiano Ronaldo",
      position: "CF",
      rating: 94,
      nationality: "Portugal",
    },
    { name: "Neymar Jr", position: "LWF", rating: 91, nationality: "Brazil" },
    {
      name: "Kylian Mbappé",
      position: "CF",
      rating: 93,
      nationality: "France",
    },
    {
      name: "Kevin De Bruyne",
      position: "AMF",
      rating: 92,
      nationality: "Belgium",
    },
    {
      name: "Virgil van Dijk",
      position: "CB",
      rating: 92,
      nationality: "Netherlands",
    },
  ],
  formation: "4-3-3",
  isAvailable: true,
  seller: {
    username: "ProGamer123",
    rating: 4.8,
    totalSales: 150,
    joinDate: "2023-01-15T00:00:00Z",
    verified: true,
  },
  specifications: [
    { key: "GP (Coins)", value: "150,000", type: "number" },
    { key: "Team Strength", value: "5,200", type: "number" },
    { key: "Manager", value: "Pep Guardiola", type: "text" },
    { key: "Stadium", value: "Camp Nou", type: "text" },
    { key: "Legends", value: "15", type: "number" },
    { key: "Featured Players", value: "8", type: "number" },
    { key: "Special Kits", value: "12", type: "number" },
  ],
  createdAt: "2024-01-15T10:30:00Z",
};

export default function AccountDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const addToCart = () => {
    // TODO: Implement add to cart when API is ready
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích"
    );
  };

  const shareAccount = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Đã copy link tài khoản!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚽</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EFOOTBALL Store
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                href="/accounts"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Tài khoản game
              </Link>
              <Link
                href="/news"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Tin tức
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Giỏ hàng
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Đăng ký</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/accounts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-600">Chi tiết tài khoản</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={mockAccountDetail.images[selectedImage]}
                alt={mockAccountDetail.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Badge className="absolute top-4 right-4" variant="secondary">
                {mockAccountDetail.platform}
              </Badge>
              {mockAccountDetail.originalPrice && (
                <Badge className="absolute top-4 left-4" variant="destructive">
                  GIẢM GIÁ
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {mockAccountDetail.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${mockAccountDetail.title} ${index + 1}`}
                  className={`h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mockAccountDetail.title}
              </h1>
              <p className="text-gray-600 mb-4">
                {mockAccountDetail.description}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">
                    {mockAccountDetail.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-500" />
                  <span>Level {mockAccountDetail.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-green-500" />
                  <span>{mockAccountDetail.formation}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(mockAccountDetail.price)}
                  </div>
                  {mockAccountDetail.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      {formatPrice(mockAccountDetail.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleWishlist}
                    className={
                      isWishlisted ? "text-red-500 border-red-500" : ""
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={shareAccount}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full mb-3" size="lg" onClick={addToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>✓ Giao hàng ngay lập tức</p>
                <p>✓ Bảo hành tài khoản 30 ngày</p>
                <p>✓ Hỗ trợ 24/7</p>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Thông tin người bán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {mockAccountDetail.seller.username}
                      </span>
                      {mockAccountDetail.seller.verified && (
                        <Badge variant="secondary">Đã xác minh</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">
                        {mockAccountDetail.seller.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({mockAccountDetail.seller.totalSales} đánh giá)
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Xem profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <div className="mt-12 space-y-8">
          {/* Account Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Thông số tài khoản</CardTitle>
              <CardDescription>
                Chi tiết về tài khoản game và các thông số quan trọng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mockAccountDetail.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{spec.key}</span>
                    <span className="text-blue-600 font-semibold">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Players List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cầu thủ nổi bật
              </CardTitle>
              <CardDescription>
                Danh sách các cầu thủ quan trọng trong đội hình
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mockAccountDetail.players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.position} • {player.nationality}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {player.rating}
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Mô tả chi tiết</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {mockAccountDetail.fullDescription}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

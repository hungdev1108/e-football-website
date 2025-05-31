"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  Star,
  Calendar,
  Shield,
  Edit3,
  Camera,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Mock user data
const mockUser = {
  id: "user123",
  username: "ProGamer2024",
  email: "progamer@email.com",
  phone: "+84 912 345 678",
  avatar: "/api/placeholder/150/150",
  joinDate: "2023-06-15T00:00:00Z",
  verified: true,
  stats: {
    totalPurchases: 15,
    totalSpent: 25000000,
    rating: 4.8,
    wishlistItems: 12,
  },
};

// Mock purchase history
const mockPurchases = [
  {
    id: "p1",
    title: "Tài khoản EFOOTBALL Premium - Messi & Ronaldo",
    price: 2500000,
    purchaseDate: "2024-01-15T10:30:00Z",
    status: "completed",
    image: "/api/placeholder/100/100",
  },
  {
    id: "p2",
    title: "Tài khoản EFOOTBALL Starter - Real Madrid",
    price: 800000,
    purchaseDate: "2024-01-10T14:20:00Z",
    status: "completed",
    image: "/api/placeholder/100/100",
  },
];

// Mock wishlist
const mockWishlist = [
  {
    id: "w1",
    title: "Tài khoản Barcelona Dream Team",
    price: 3200000,
    image: "/api/placeholder/100/100",
    isAvailable: true,
  },
  {
    id: "w2",
    title: "Tài khoản Liverpool Premier",
    price: 1800000,
    image: "/api/placeholder/100/100",
    isAvailable: false,
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: mockUser.username,
    email: mockUser.email,
    phone: mockUser.phone,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call when ready
    setIsEditing(false);
    toast.success("Đã cập nhật thông tin cá nhân!");
  };

  const removeFromWishlist = (itemId: string) => {
    // TODO: Implement API call when ready
    console.log("Removing item:", itemId);
    toast.success("Đã xóa khỏi danh sách yêu thích!");
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
              <Link href="/profile" className="text-blue-600 font-medium">
                Profile
              </Link>
              <Button variant="outline">Đăng xuất</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={mockUser.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {mockUser.username}
                  </h1>
                  {mockUser.verified && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      Đã xác minh
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-3">
                  Thành viên từ {formatDate(mockUser.joinDate)}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockUser.stats.totalPurchases}
                    </div>
                    <div className="text-sm text-gray-600">Giao dịch</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(mockUser.stats.totalSpent)}
                    </div>
                    <div className="text-sm text-gray-600">Tổng chi tiêu</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-yellow-600">
                        {mockUser.stats.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Đánh giá</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {mockUser.stats.wishlistItems}
                    </div>
                    <div className="text-sm text-gray-600">Yêu thích</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Thông tin
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Lịch sử mua
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Yêu thích
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Cài đặt
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>
                      Quản lý thông tin cá nhân và liên hệ của bạn
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Hủy" : "Chỉnh sửa"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username">Tên người dùng</Label>
                    <Input
                      id="username"
                      value={userInfo.username}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Ngày tham gia
                    </Label>
                    <Input
                      value={formatDate(mockUser.joinDate)}
                      disabled
                      className="mt-2"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase History Tab */}
          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử mua hàng</CardTitle>
                <CardDescription>
                  Xem lại các giao dịch đã thực hiện
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPurchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={purchase.image}
                        alt={purchase.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {purchase.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Mua ngày {formatDate(purchase.purchaseDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          {formatPrice(purchase.price)}
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          {purchase.status === "completed"
                            ? "Hoàn thành"
                            : "Đang xử lý"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách yêu thích</CardTitle>
                <CardDescription>
                  Các tài khoản game bạn quan tâm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <div className="font-bold text-blue-600 mt-1">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.isAvailable ? "secondary" : "destructive"
                          }
                        >
                          {item.isAvailable ? "Có sẵn" : "Hết hàng"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Xóa
                        </Button>
                        {item.isAvailable && (
                          <Link href={`/accounts/${item.id}`}>
                            <Button size="sm">Xem</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt tài khoản</CardTitle>
                  <CardDescription>
                    Quản lý bảo mật và cài đặt tài khoản
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Đổi mật khẩu</h3>
                      <p className="text-sm text-gray-600">
                        Cập nhật mật khẩu để bảo mật tài khoản
                      </p>
                    </div>
                    <Button variant="outline">Đổi mật khẩu</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Xác thực hai bước</h3>
                      <p className="text-sm text-gray-600">
                        Tăng cường bảo mật cho tài khoản
                      </p>
                    </div>
                    <Button variant="outline">Cài đặt</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-600">
                        Xóa tài khoản
                      </h3>
                      <p className="text-sm text-gray-600">
                        Xóa vĩnh viễn tài khoản và dữ liệu
                      </p>
                    </div>
                    <Button variant="destructive">Xóa tài khoản</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

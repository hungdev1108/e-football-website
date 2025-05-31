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
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    accountId: "acc1",
    account: {
      id: "acc1",
      title: "Tài khoản EFOOTBALL Premium - Messi & Ronaldo",
      description:
        "Tài khoản với đội hình khủng, có Messi, Ronaldo và nhiều siêu sao khác",
      price: 2500000,
      originalPrice: 3000000,
      images: ["/api/placeholder/300/200"],
      platform: "PC",
      rating: 95,
      level: 87,
      seller: {
        username: "ProGamer123",
        rating: 4.8,
        totalSales: 150,
      },
    },
    quantity: 1,
    addedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    accountId: "acc2",
    account: {
      id: "acc2",
      title: "Tài khoản EFOOTBALL Starter - Real Madrid",
      description:
        "Tài khoản Real Madrid với đội hình mạnh cho người mới bắt đầu",
      price: 800000,
      images: ["/api/placeholder/300/200"],
      platform: "MOBILE",
      rating: 87,
      level: 65,
      seller: {
        username: "RealMadridFan",
        rating: 4.5,
        totalSales: 89,
      },
    },
    quantity: 1,
    addedAt: "2024-01-10T14:20:00Z",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success("Đã cập nhật số lượng!");
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.account.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // TODO: Implement checkout logic when API is ready
    toast.success("Chuyển đến trang thanh toán!");
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
              <Link href="/cart" className="text-blue-600 font-medium">
                Giỏ hàng
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Đăng nhập</Button>
              <Button>Đăng ký</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/search">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tiếp tục mua sắm
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Giỏ hàng</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {cartItems.length} sản phẩm
          </Badge>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-500 mb-6">
              Hãy khám phá các tài khoản game tuyệt vời của chúng tôi!
            </p>
            <Link href="/search">
              <Button size="lg">Bắt đầu mua sắm</Button>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm trong giỏ hàng</CardTitle>
                  <CardDescription>
                    Xem lại các sản phẩm trước khi thanh toán
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative">
                          <img
                            src="/api/placeholder/150/100"
                            alt={item.account.title}
                            className="w-full md:w-40 h-24 object-cover rounded-lg"
                          />
                          <Badge
                            className="absolute -top-2 -right-2"
                            variant="secondary"
                          >
                            {item.account.platform}
                          </Badge>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg line-clamp-2">
                                {item.account.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                Người bán: {item.account.seller.username}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">
                                  Level {item.account.level}
                                </Badge>
                                <Badge variant="outline">
                                  Rating {item.account.rating}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">
                                Số lượng:
                              </span>
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-600">
                                {formatPrice(
                                  item.account.price * item.quantity
                                )}
                              </div>
                              {item.account.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(
                                    item.account.originalPrice * item.quantity
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Tiến hành thanh toán
                  </Button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>✓ Giao hàng ngay lập tức</p>
                    <p>✓ Bảo hành tài khoản</p>
                    <p>✓ Hỗ trợ 24/7</p>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Mã giảm giá</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button variant="outline">Áp dụng</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

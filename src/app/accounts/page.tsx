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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Grid, List, Star, Users, Trophy } from "lucide-react";

// Mock data for demonstration
const mockAccounts = [
  {
    id: "1",
    title: "Tài khoản EFOOTBALL Premium - Messi & Ronaldo",
    description:
      "Tài khoản với đội hình khủng, có Messi, Ronaldo và nhiều siêu sao khác",
    price: 2500000,
    originalPrice: 3000000,
    images: ["/api/placeholder/300/200"],
    platform: "PC",
    rating: 95,
    level: 87,
    players: ["Messi", "Ronaldo", "Neymar", "Mbappé"],
    formation: "4-3-3",
    isAvailable: true,
    seller: {
      username: "ProGamer123",
      rating: 4.8,
      totalSales: 150,
    },
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Tài khoản EFOOTBALL Starter - Real Madrid",
    description:
      "Tài khoản Real Madrid với đội hình mạnh cho người mới bắt đầu",
    price: 800000,
    images: ["/api/placeholder/300/200"],
    platform: "MOBILE",
    rating: 87,
    level: 65,
    players: ["Benzema", "Modrić", "Vinicius"],
    formation: "4-3-3",
    isAvailable: true,
    seller: {
      username: "RealMadridFan",
      rating: 4.5,
      totalSales: 89,
    },
    createdAt: "2024-01-10T14:20:00Z",
  },
  // Add more mock accounts...
];

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    category: "",
    platform: "",
    priceRange: [0, 10000000] as [number, number],
    ratingRange: [0, 100] as [number, number],
    sortBy: "price",
    sortOrder: "asc" as "asc" | "desc",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search when API is ready
    console.log("Searching for:", searchQuery, filters);
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
              <Link href="/accounts" className="text-blue-600 font-medium">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label>Danh mục</Label>
                  <Select
                    onValueChange={(value: string) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="intermediate">Trung cấp</SelectItem>
                      <SelectItem value="advanced">Cao cấp</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="legendary">Huyền thoại</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform Filter */}
                <div>
                  <Label>Nền tảng</Label>
                  <Select
                    onValueChange={(value: string) =>
                      setFilters((prev) => ({ ...prev, platform: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PC">PC</SelectItem>
                      <SelectItem value="MOBILE">Mobile</SelectItem>
                      <SelectItem value="CONSOLE">Console</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label>Khoảng giá</Label>
                  <div className="mt-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value: number[]) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: value as [number, number],
                        }))
                      }
                      max={10000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Range */}
                <div>
                  <Label>Rating</Label>
                  <div className="mt-2">
                    <Slider
                      value={filters.ratingRange}
                      onValueChange={(value: number[]) =>
                        setFilters((prev) => ({
                          ...prev,
                          ratingRange: value as [number, number],
                        }))
                      }
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{filters.ratingRange[0]}</span>
                      <span>{filters.ratingRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => console.log("Apply filters")}
                >
                  Áp dụng bộ lọc
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm tài khoản game..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit">Tìm kiếm</Button>
                </form>
              </CardContent>
            </Card>

            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Select
                  onValueChange={(value: string) =>
                    setFilters((prev) => ({ ...prev, sortBy: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Giá</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="level">Level</SelectItem>
                    <SelectItem value="createdAt">Mới nhất</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value: string) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortOrder: value as "asc" | "desc",
                    }))
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Thứ tự" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Tăng dần</SelectItem>
                    <SelectItem value="desc">Giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-4">
              Tìm thấy {mockAccounts.length} tài khoản
            </p>

            {/* Account Cards */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {mockAccounts.map((account) => (
                <Card
                  key={account.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/300/200"
                      alt={account.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant="secondary"
                    >
                      {account.platform}
                    </Badge>
                    {account.originalPrice && (
                      <Badge
                        className="absolute top-2 left-2"
                        variant="destructive"
                      >
                        GIẢM GIÁ
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {account.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {account.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{account.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-blue-500" />
                        <span>Level {account.level}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {account.players.slice(0, 3).join(", ")}
                        {account.players.length > 3 && "..."}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(account.price)}
                        </div>
                        {account.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(account.originalPrice)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {account.seller.username}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">
                            {account.seller.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({account.seller.totalSales})
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/accounts/${account.id}`}>
                      <Button className="w-full">Xem chi tiết</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Trước
                </Button>
                <Button>1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Sau</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

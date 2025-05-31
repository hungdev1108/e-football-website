"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Calendar,
  Clock,
  User,
  Search,
  TrendingUp,
  Gamepad2,
} from "lucide-react";

// Mock news data
const mockNews = [
  {
    id: "1",
    title: "EFOOTBALL 2024 - Update mới với 50+ cầu thủ legendary",
    excerpt:
      "Konami vừa ra mắt bản cập nhật lớn nhất năm với hàng loạt cầu thủ huyền thoại mới và nhiều tính năng hấp dẫn.",
    content:
      "Bản update này bao gồm các cầu thủ như Ronaldinho, Kaká, Henry và nhiều legend khác...",
    image: "/api/placeholder/400/250",
    category: "Game Update",
    author: "Admin",
    publishedAt: "2024-01-20T10:00:00Z",
    readTime: "5 phút đọc",
    isHot: true,
    tags: ["efootball", "update", "legendary"],
  },
  {
    id: "2",
    title: "Hướng dẫn xây dựng đội hình 5 sao hiệu quả",
    excerpt:
      "Bí quyết tạo ra đội hình mạnh nhất trong EFOOTBALL với ngân sách hạn chế.",
    content:
      "Để xây dựng đội hình 5 sao, bạn cần chú ý đến chemistry, formation và...",
    image: "/api/placeholder/400/250",
    category: "Hướng dẫn",
    author: "ProGamer",
    publishedAt: "2024-01-18T14:30:00Z",
    readTime: "8 phút đọc",
    isHot: false,
    tags: ["hướng dẫn", "đội hình", "chiến thuật"],
  },
  {
    id: "3",
    title: "Top 10 cầu thủ đáng mua nhất tháng này",
    excerpt:
      "Phân tích chi tiết về những cầu thủ có giá trị đầu tư tốt nhất trong tháng 1/2024.",
    content:
      "Dựa trên phân tích stats và performance, đây là những cầu thủ bạn nên quan tâm...",
    image: "/api/placeholder/400/250",
    category: "Đánh giá",
    author: "GameAnalyst",
    publishedAt: "2024-01-15T09:15:00Z",
    readTime: "6 phút đọc",
    isHot: true,
    tags: ["đánh giá", "cầu thủ", "đầu tư"],
  },
  {
    id: "4",
    title: "Sự kiện Club Selection tuần này có gì hot?",
    excerpt:
      "Tổng hợp các cầu thủ featured đáng chú ý trong sự kiện Club Selection mới nhất.",
    content:
      "Tuần này Konami mang đến những featured player từ Manchester City, PSG...",
    image: "/api/placeholder/400/250",
    category: "Sự kiện",
    author: "EventTracker",
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: "4 phút đọc",
    isHot: false,
    tags: ["sự kiện", "club selection", "featured"],
  },
];

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "game-update", label: "Game Update" },
  { value: "huong-dan", label: "Hướng dẫn" },
  { value: "danh-gia", label: "Đánh giá" },
  { value: "su-kien", label: "Sự kiện" },
  { value: "tin-tuc", label: "Tin tức" },
];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, selectedCategory, sortBy);
  };

  // Filter hot news for featured section
  const hotNews = mockNews.filter((article) => article.isHot);
  const regularNews = mockNews.filter((article) => !article.isHot);

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
              <Link href="/news" className="text-blue-600 font-medium">
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tin tức & Cập nhật
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cập nhật thông tin mới nhất về EFOOTBALL, hướng dẫn chơi game và tin
            tức esports
          </p>
        </div>

        {/* Hot News Section */}
        {hotNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Tin nổi bật</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hotNews.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-4 left-4"
                      variant="destructive"
                    >
                      HOT
                    </Badge>
                    <Badge
                      className="absolute top-4 right-4"
                      variant="secondary"
                    >
                      {article.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Tìm kiếm</Button>
              </form>
            </div>

            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="most-read">Đọc nhiều nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Regular News Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Gamepad2 className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Bài viết mới</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4" variant="secondary">
                    {article.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
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
  );
}

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Filter,
  Search,
  Grid,
  List,
  Star,
  Users,
  Trophy,
  LoaderIcon,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useAccounts, useCategories } from "@/hooks/useAccounts";
import { ApiGameAccount, ApiCategory } from "@/types";

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    platform: "",
    minPrice: 0,
    maxPrice: 10000000,
    sort: "-createdAt",
  });

  // Fetch data using hooks
  const { data: accountsData, isLoading: loadingAccounts } = useAccounts({
    page: currentPage,
    limit: 12,
    ...filters,
    search: searchQuery || undefined,
  });

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();

  const accounts = accountsData?.data?.accounts || [];
  const pagination = accountsData?.data?.pagination;
  const categories = categoriesData?.data || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Trước
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={currentPage === pagination.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Sau
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
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
                  {loadingCategories ? (
                    <div className="flex items-center justify-center h-10">
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <Select
                      value={filters.category}
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả danh mục</SelectItem>
                        {categories.map((category: ApiCategory) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Platform Filter */}
                <div>
                  <Label>Nền tảng</Label>
                  <Select
                    value={filters.platform}
                    onValueChange={(value) =>
                      handleFilterChange("platform", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả nền tảng</SelectItem>
                      <SelectItem value="steam">💻 Steam PC</SelectItem>
                      <SelectItem value="mobile">📱 Mobile</SelectItem>
                      <SelectItem value="ps4">🎮 PlayStation 4</SelectItem>
                      <SelectItem value="ps5">🎮 PlayStation 5</SelectItem>
                      <SelectItem value="xbox">🎮 Xbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <Label>Sắp xếp</Label>
                  <Select
                    value={filters.sort}
                    onValueChange={(value) => handleFilterChange("sort", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-createdAt">Mới nhất</SelectItem>
                      <SelectItem value="createdAt">Cũ nhất</SelectItem>
                      <SelectItem value="price">Giá thấp đến cao</SelectItem>
                      <SelectItem value="-price">Giá cao đến thấp</SelectItem>
                      <SelectItem value="-collectiveStrength">
                        Rating cao nhất
                      </SelectItem>
                      <SelectItem value="-views">Phổ biến nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label>Khoảng giá</Label>
                  <div className="mt-2">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={handlePriceRangeChange}
                      max={10000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{formatPrice(filters.minPrice)}</span>
                      <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setFilters({
                      category: "",
                      platform: "",
                      minPrice: 0,
                      maxPrice: 10000000,
                      sort: "-createdAt",
                    });
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  variant="outline"
                >
                  Xóa bộ lọc
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm tài khoản theo tên, mã code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit">Tìm kiếm</Button>
                </form>
              </CardContent>
            </Card>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {pagination && (
                  <>
                    Hiển thị {accounts.length} trong {pagination.totalItems} tài
                    khoản (Trang {pagination.currentPage}/
                    {pagination.totalPages})
                  </>
                )}
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

            {/* Loading State */}
            {loadingAccounts && (
              <div className="flex items-center justify-center h-64">
                <LoaderIcon className="w-8 h-8 animate-spin" />
                <span className="ml-2">Đang tải tài khoản...</span>
              </div>
            )}

            {/* No Results */}
            {!loadingAccounts && accounts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">
                  Không tìm thấy tài khoản nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      category: "",
                      platform: "",
                      minPrice: 0,
                      maxPrice: 10000000,
                      sort: "-createdAt",
                    });
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Accounts Grid/List */}
            {!loadingAccounts && accounts.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {accounts.map((account: ApiGameAccount) => (
                  <Link key={account._id} href={`/accounts/${account._id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative">
                        <img
                          src={
                            account.images[0]?.url || "/api/placeholder/300/200"
                          }
                          alt={account.images[0]?.alt || account.title}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge
                          className="absolute top-2 left-2"
                          variant="secondary"
                        >
                          {getPlatformIcon(account.accountDetails.platform)}{" "}
                          {getPlatformLabel(account.accountDetails.platform)}
                        </Badge>
                        <Badge className="absolute top-2 right-2">
                          {account.accountCode}
                        </Badge>
                        {account.status === "sold" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                            <Badge
                              variant="destructive"
                              className="text-lg px-4 py-2"
                            >
                              ĐÃ BÁN
                            </Badge>
                          </div>
                        )}
                        {account.featured && (
                          <Badge className="absolute bottom-2 left-2 bg-yellow-500">
                            ⭐ Nổi bật
                          </Badge>
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
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              {account.views} views
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
                              {account.category.name}
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

            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
}

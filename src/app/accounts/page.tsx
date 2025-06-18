"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Filter, Search, Grid, List, Star, LoaderIcon, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useAccounts, useCategories } from "@/hooks/useAccounts";
import { ApiGameAccount, ApiCategory } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    platform: "",
    minPrice: 0,
    maxPrice: 30000000,
    sort: "-createdAt",
  });

  // Fetch data using hooks
  const queryParams = {
    page: currentPage,
    limit: 12,
    ...filters,
    search: searchQuery || undefined,
  };

  console.log("🔍 Query params sent to API:", queryParams);

  const { data: accountsData, isLoading: loadingAccounts } =
    useAccounts(queryParams);

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();

  // Fix data structure - API returns data as array directly
  interface AccountsApiResponse {
    data?: ApiGameAccount[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  }

  interface CategoriesApiResponse {
    data?: ApiCategory[];
  }

  const accounts = (accountsData as AccountsApiResponse)?.data || [];
  const pagination = (accountsData as AccountsApiResponse)?.pagination;
  const categories = (categoriesData as CategoriesApiResponse)?.data || [];

  // Debug logs
  console.log("🔍 accountsData:", accountsData);
  console.log("📊 accounts extracted:", accounts);
  console.log("📄 pagination:", pagination);

  const formatPrice = (price: number) => {
    if (price === -1) {
      return "📞 Liên hệ";
    }

    const priceStr = price.toString();

    // Định dạng số với dấu chấm phân cách mỗi 3 chữ số từ phải sang trái
    const formatted = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Thay thế tất cả chữ số sau chữ số đầu tiên bằng 'x'
    const firstDigit = formatted[0];
    const restFormatted = formatted.slice(1).replace(/\d/g, "x");

    return `${firstDigit}${restFormatted} đ`;
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
    // Convert "all" to empty string for API compatibility
    const processedValue = value === "all" ? "" : value;
    setFilters((prev) => ({ ...prev, [key]: processedValue }));
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

  const clearFilters = () => {
    setFilters({
      category: "",
      platform: "",
      minPrice: 0,
      maxPrice: 30000000,
      sort: "-createdAt",
    });
    setSearchQuery("");
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 3; // Always show 3 pages for consistency
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
      <div className="flex justify-center items-center gap-1 md:gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="text-xs md:text-sm px-2 md:px-3"
        >
          <span className="hidden md:inline">Trước</span>
          <span className="md:hidden">‹</span>
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="text-xs md:text-sm px-2 md:px-3 min-w-[32px] md:min-w-[40px]"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === pagination.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-xs md:text-sm px-2 md:px-3"
        >
          <span className="hidden md:inline">Sau</span>
          <span className="md:hidden">›</span>
        </Button>
      </div>
    );
  };

  const FiltersContent = () => (
    <CardContent className="space-y-6 md:space-y-8">
      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-sm md:text-base font-medium">Danh mục</Label>
        {loadingCategories ? (
          <div className="flex items-center justify-center h-10">
            <LoaderIcon className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
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
      <div className="space-y-3">
        <Label className="text-sm md:text-base font-medium">Nền tảng</Label>
        <Select
          value={filters.platform || "all"}
          onValueChange={(value) => handleFilterChange("platform", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn nền tảng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nền tảng</SelectItem>
            <SelectItem value="steam">💻 Steam PC</SelectItem>
            <SelectItem value="mobile">📱 Mobile</SelectItem>
            <SelectItem value="ps4">🎮 PlayStation 4</SelectItem>
            <SelectItem value="ps5">🎮 PlayStation 5</SelectItem>
            <SelectItem value="xbox">🎮 Xbox</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Filter */}
      <div className="space-y-3">
        <Label className="text-sm md:text-base font-medium">Sắp xếp</Label>
        <Select
          value={filters.sort}
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Mới nhất</SelectItem>
            <SelectItem value="createdAt">Cũ nhất</SelectItem>
            <SelectItem value="price">Giá thấp đến cao</SelectItem>
            <SelectItem value="-price">Giá cao đến thấp</SelectItem>
            <SelectItem value="-collectiveStrength">Rating cao nhất</SelectItem>
            <SelectItem value="-views">Phổ biến nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm md:text-base font-medium">Khoảng giá</Label>
        <div className="space-y-4">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={handlePriceRangeChange}
            max={30000000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-xs md:text-sm text-gray-500">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4" onClick={clearFilters} variant="outline">
        Xóa bộ lọc
      </Button>
    </CardContent>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <FiltersContent />
            </Card>
          </div>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
              <div className="bg-white h-full w-full max-w-sm ml-auto overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Bộ lọc</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Card className="border-0 shadow-none">
                  <FiltersContent />
                </Card>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <Card className="mb-4 md:mb-6">
              <CardContent className="p-3 md:p-4">
                <form onSubmit={handleSearch} className="flex gap-2 md:gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm tài khoản..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm md:text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3 md:px-4 text-sm md:text-base"
                  >
                    <span className="hidden md:inline">Tìm kiếm</span>
                    <Search className="h-4 w-4 md:hidden" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mobile Filter Button & Toolbar */}
            <div className="flex flex-col gap-3 mb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden text-sm px-3 py-2"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
                {pagination && (
                  <div className="text-xs md:text-sm text-gray-600">
                    <span className="hidden md:inline">
                      Hiển thị {accounts.length} trong {pagination.totalItems}{" "}
                      tài khoản
                    </span>
                    <span className="md:hidden text-xs">
                      {accounts.length}/{pagination.totalItems} tài khoản
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end md:gap-4">
                {pagination && (
                  <div className="text-xs text-gray-500 md:hidden">
                    Trang {pagination.currentPage}/{pagination.totalPages}
                  </div>
                )}
                <div className="flex items-center gap-1 md:gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="px-2 md:px-3"
                  >
                    <Grid className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="px-2 md:px-3"
                  >
                    <List className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loadingAccounts && (
              <div className="flex items-center justify-center h-64">
                <LoaderIcon className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
                <span className="ml-2 text-sm md:text-base">
                  Đang tải tài khoản...
                </span>
              </div>
            )}

            {/* No Results */}
            {!loadingAccounts && accounts.length === 0 && (
              <div className="text-center py-12 md:py-16 px-4">
                <div className="text-4xl md:text-6xl mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Không tìm thấy tài khoản nào
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button onClick={clearFilters} size="sm">
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Accounts Grid/List */}
            {!loadingAccounts && accounts.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {accounts.map((account: ApiGameAccount) => (
                  <Link key={account._id} href={`/accounts/${account._id}`}>
                    <Card
                      className={`group cursor-pointer overflow-hidden border-0 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl flex flex-col p-0 ${
                        viewMode === "grid" ? "h-full" : "h-auto"
                      } ${viewMode === "list" ? "mb-2" : ""}`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "md:flex md:w-full" : ""
                        }`}
                      >
                        <div
                          className={`relative ${
                            viewMode === "list"
                              ? "md:w-1/3 md:min-w-0"
                              : "w-full"
                          }`}
                        >
                          <Image
                            src={
                              getImageUrl(account.images[0]?.url) ||
                              getPlaceholderUrl(300, 200)
                            }
                            alt={account.images[0]?.alt || account.title}
                            width={300}
                            height={192}
                            className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                              viewMode === "list"
                                ? "w-full h-32 md:h-40"
                                : "w-full h-32 md:h-48"
                            }`}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Platform badge */}
                          <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <Badge
                              variant="secondary"
                              className="bg-white/95 backdrop-blur-sm text-slate-700 text-xs md:text-sm shadow-md border-0"
                            >
                              <span className="md:hidden">
                                {getPlatformIcon(
                                  account.accountDetails.platform
                                )}
                              </span>
                              <span className="hidden md:inline">
                                {getPlatformIcon(
                                  account.accountDetails.platform
                                )}{" "}
                                {getPlatformLabel(
                                  account.accountDetails.platform
                                )}
                              </span>
                            </Badge>
                          </div>

                          {/* Account code badge */}
                          <div className="absolute top-3 right-3 md:top-4 md:right-4">
                            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs md:text-sm shadow-md border-0">
                              {account.accountCode}
                            </Badge>
                          </div>

                          {/* Sold overlay */}
                          {account.status === "sold" && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                              <Badge
                                variant="destructive"
                                className="text-sm md:text-lg px-3 py-2 md:px-6 md:py-3 bg-red-600 shadow-lg"
                              >
                                ĐÃ BÁN
                              </Badge>
                            </div>
                          )}

                          {/* Featured badge */}
                          {account.featured && (
                            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs md:text-sm shadow-md border-0">
                                ⭐{" "}
                                <span className="hidden md:inline">
                                  Nổi bật
                                </span>
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Content area for list view on desktop */}
                        <div
                          className={`flex flex-col flex-1 ${
                            viewMode === "list" ? "md:w-2/3 md:p-4" : ""
                          }`}
                        >
                          <CardHeader
                            className={`pb-1 pt-3 md:pt-4 ${
                              viewMode === "list"
                                ? "px-3 md:px-0 md:pb-2"
                                : "px-3 md:px-4"
                            }`}
                          >
                            <CardTitle className="text-sm md:text-lg line-clamp-2 text-slate-800 group-hover:text-blue-600 transition-colors duration-300 font-semibold">
                              {account.title}
                            </CardTitle>
                            <CardDescription
                              className={`text-xs md:text-sm text-slate-500 mt-1 leading-relaxed ${
                                viewMode === "list"
                                  ? "block"
                                  : "hidden md:block"
                              }`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxHeight: "2.5rem", // Fallback cho browsers không support line-clamp
                                lineHeight: "1.25rem",
                              }}
                            >
                              {account.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent
                            className={`pt-0 pb-3 md:pb-4 mt-auto ${
                              viewMode === "list"
                                ? "px-3 md:px-0"
                                : "px-3 md:px-4"
                            }`}
                          >
                            {/* Desktop: same row, Mobile: separate rows */}
                            <div className="hidden md:flex items-center justify-between mb-4 md:mb-5">
                              <div className="flex items-center gap-1 md:gap-2 bg-amber-50 px-2 py-1 rounded-lg">
                                <Star className="h-3 w-3 md:h-4 md:w-4 text-amber-500 fill-current" />
                                <span className="text-xs md:text-sm font-semibold text-amber-700">
                                  {account.collectiveStrength}
                                </span>
                              </div>
                              <div className={`text-base md:text-xl font-bold ${
                                account.price === -1 
                                  ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse" 
                                  : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                              }`}>
                                {formatPrice(account.price)}
                              </div>
                            </div>

                            {/* Mobile: separate rows */}
                            <div className="md:hidden space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Star className="h-3 w-3 text-amber-500 fill-current" />
                                <span className="text-xs font-semibold text-amber-700">
                                  {account.collectiveStrength}
                                </span>
                              </div>
                              <div className={`text-sm font-bold ${
                                account.price === -1 
                                  ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse" 
                                  : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                              }`}>
                                {formatPrice(account.price)}
                              </div>
                            </div>

                            <Button
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-sm py-2.5 md:py-3 rounded-xl font-semibold"
                              disabled={account.status !== "available"}
                            >
                              <span className="hidden md:inline">
                                {account.status === "available"
                                  ? "Xem chi tiết"
                                  : "Không khả dụng"}
                              </span>
                              <span className="md:hidden">
                                {account.status === "available"
                                  ? "Xem chi tiết"
                                  : "Hết hàng"}
                              </span>
                            </Button>
                          </CardContent>
                        </div>
                      </div>
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

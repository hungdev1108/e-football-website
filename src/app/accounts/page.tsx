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
import { Filter, Search, Grid, List, Star, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { FooterSection } from "@/components/home/FooterSection";
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
    minPrice: -1,
    maxPrice: 30000000,
    sort: "-createdAt",
  });

  // Fetch data using hooks
  const queryParams = {
    page: currentPage,
    limit: 12,
    ...filters,
    search: searchQuery || undefined,
  };  const { data: accountsData, isLoading: loadingAccounts } =
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

  // Debug logs  const formatPrice = (price: number) => {
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
      minPrice: -1,
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
          <Skeleton className="h-9 w-full rounded-md" />
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
            min={-1}
            max={30000000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
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
    <div className="relative min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-10 lg:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            <span className="neon-text-tri">Ảnh eFootball</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Khám phá và chọn ảnh eFootball phù hợp với bạn
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <Card className="glass sticky top-24 border-border/60">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5 text-[rgb(var(--neon-violet))]" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <FiltersContent />
            </Card>
          </div>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background/70 backdrop-blur-sm">
              <div className="h-full w-full max-w-sm ml-auto overflow-y-auto bg-card text-card-foreground border-l border-border">
                <div className="p-4 border-b border-border flex items-center justify-between">
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
            <Card className="glass mb-4 md:mb-6 border-border/60">
              <CardContent className="p-3 md:p-4">
                <form onSubmit={handleSearch} className="flex gap-2 md:gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm tài khoản..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm md:text-base bg-background/40"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="neon"
                    size="sm"
                    className="px-3 md:px-5 text-sm md:text-base"
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
                  <div className="text-xs md:text-sm text-muted-foreground">
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
                  <div className="text-xs text-muted-foreground md:hidden">
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
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-[340px] w-full rounded-2xl" />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loadingAccounts && accounts.length === 0 && (
              <div className="glass mx-auto max-w-md rounded-2xl py-12 px-6 text-center md:py-16">
                <div className="text-5xl md:text-6xl mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  Không tìm thấy tài khoản nào
                </h3>
                <p className="text-muted-foreground mb-5 text-sm md:text-base">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button onClick={clearFilters} variant="neon" size="sm">
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
                      className={`group glass cursor-pointer overflow-hidden border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(var(--neon-violet)/0.55)] rounded-2xl flex flex-col p-0 ${
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
                            className={`object-cover transition-transform duration-200 group-hover:scale-105 ${
                              viewMode === "list"
                                ? "w-full h-40 md:h-48"
                                : "w-full h-40 md:h-56"
                            }`}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Platform badge */}
                          <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <Badge
                              variant="secondary"
                              className="bg-background/70 backdrop-blur text-foreground text-xs md:text-sm shadow-md border-0"
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
                            <Badge className="bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))] text-white text-xs md:text-sm shadow-[0_0_15px_rgb(var(--neon-violet)/0.6)] border-0">
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
                              <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs md:text-sm shadow-[0_0_15px_rgba(251,191,36,0.6)] border-0">
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
                            className={`pb-1 pt-2 md:pt-3 ${
                              viewMode === "list"
                                ? "px-3 md:px-0 md:pb-2"
                                : "px-3 md:px-4"
                            }`}
                          >
                            <CardTitle
                              className={`text-sm md:text-lg line-clamp-1 text-foreground group-hover:text-[rgb(var(--neon-cyan))] transition-colors duration-200 font-semibold ${
                                viewMode === "grid" ? "h-4 md:h-7" : ""
                              }`}
                            >
                              {account.title}
                            </CardTitle>
                            <CardDescription
                              className={`text-xs md:text-sm text-muted-foreground mt-1 leading-4 md:leading-5 ${
                                viewMode === "list"
                                  ? "line-clamp-2"
                                  : "hidden md:block line-clamp-2 h-8 md:h-10"
                              } overflow-hidden text-ellipsis`}
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
                              <div className="flex items-center gap-1 md:gap-2 rounded-lg border border-border/50 bg-background/40 px-2 py-1 backdrop-blur">
                                <Star className="h-3 w-3 md:h-4 md:w-4 fill-amber-400 text-amber-400" />
                                <span className="text-xs md:text-sm font-semibold text-foreground">
                                  {account.collectiveStrength}
                                </span>
                              </div>
                              <div
                                className={`text-base md:text-xl font-bold neon-text ${
                                  account.price === -1 ? "animate-pulse" : ""
                                }`}
                              >
                                {formatPrice(account.price)}
                              </div>
                            </div>

                            {/* Mobile: separate rows */}
                            <div className="md:hidden space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-semibold text-foreground">
                                  {account.collectiveStrength}
                                </span>
                              </div>
                              <div
                                className={`text-sm font-bold neon-text ${
                                  account.price === -1 ? "animate-pulse" : ""
                                }`}
                              >
                                {formatPrice(account.price)}
                              </div>
                            </div>

                            <Button
                              variant="neon"
                              className="w-full text-sm md:text-sm py-2.5 md:py-3 rounded-xl font-semibold"
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
      <FooterSection />
    </div>
  );
}

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
  CardImage,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  Eye,
  Clock,
  Newspaper,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useNews, useFeaturedNews } from "@/hooks/useNews";
import { ApiNews } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { FooterSection } from "@/components/home/FooterSection";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  // Fetch data using hooks
  const { data: newsData, isLoading: loadingNews } = useNews({
    page: currentPage,
    limit: 10,
    search: searchQuery || undefined,
  });

  const { data: featuredNewsData, isLoading: loadingFeatured } =
    useFeaturedNews(3);

  const news = newsData?.data?.news || [];
  const pagination = newsData?.data?.pagination;
  const featuredNews = featuredNewsData?.data || [];

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return "Vừa xong";
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return formatShortDate(dateString);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
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
    <div className="relative min-h-screen">
      <Header />

      <div className="container mx-auto px-4 lg:px-6 py-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            <Newspaper className="h-3 w-3 text-[rgb(var(--neon-cyan))]" />
            News Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight neon-text-tri">
            Tin tức eFootball
          </h1>
          <p className="mt-3 text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cập nhật những thông tin mới nhất về eFootball, tin tức game, và mẹo
            chơi hữu ích
          </p>
        </div>

        {/* Featured News Section */}
        {!loadingFeatured && featuredNews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500">🔥</span>
              Tin nổi bật
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredNews.map((article: ApiNews, index: number) => (
                <Link key={article._id} href={`/news/${article._id}`}>
                  <CardImage
                    className={`hover:shadow-lg transition-all cursor-pointer group h-full ${
                      index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={
                          article.featuredImage.url
                            ? getImageUrl(article.featuredImage.url)
                            : getPlaceholderUrl(400, 192)
                        }
                        alt={article.featuredImage.alt}
                        width={index === 0 ? 600 : 400}
                        height={index === 0 ? 320 : 192}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          index === 0 ? "h-64 lg:h-80" : "h-48"
                        }`}
                      />
                      <Badge className="absolute top-4 right-4 bg-red-600">
                        Nổi bật
                      </Badge>
                    </div>
                    <CardHeader className={index === 0 ? "pb-2" : "pb-1"}>
                      <CardTitle
                        className={`group-hover:text-[rgb(var(--neon-cyan))] transition-colors line-clamp-2 ${
                          index === 0 ? "text-xl lg:text-2xl" : "text-lg"
                        }`}
                      >
                        {article.title}
                      </CardTitle>
                      {index === 0 && (
                        <CardDescription className="line-clamp-3 text-base">
                          {article.content.substring(0, 200)}...
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {getTimeAgo(
                              article.publishedAt || article.createdAt
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      {/* <div className="text-sm text-muted-foreground mt-2">
                        Tác giả:{" "}
                        {article.author.fullName || article.author.username}
                      </div> */}
                    </CardContent>
                  </CardImage>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="mb-8">
          <Card className="glass border-border/60">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm tin tức..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" variant="neon">Tìm kiếm</Button>
                </form>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* News List Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tất cả tin tức</h2>
            {pagination && (
              <div className="text-sm text-muted-foreground">
                Hiển thị {news.length} trong {pagination.totalItems} bài viết
              </div>
            )}
          </div>

          {/* Loading State */}
          {loadingNews && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-2xl" />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loadingNews && news.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-bold mb-2">
                Không tìm thấy tin tức nào
              </h3>
              <p className="text-muted-foreground mb-4">
                Thử thay đổi từ khóa tìm kiếm
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
              >
                Xóa tìm kiếm
              </Button>
            </div>
          )}

          {/* News Grid */}
          {!loadingNews && news.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article: ApiNews) => (
                <Link key={article._id} href={`/news/${article._id}`}>
                  <Card className="glass border-border/60 hover:shadow-[0_20px_50px_-20px_rgb(var(--neon-violet)/0.5)] hover:-translate-y-1 transition-all cursor-pointer group h-full rounded-2xl p-0 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={
                          article.featuredImage.url
                            ? getImageUrl(article.featuredImage.url)
                            : getPlaceholderUrl(400, 192)
                        }
                        alt={article.featuredImage.alt}
                        width={400}
                        height={192}
                        className="rounded-tl-2xl rounded-tr-2xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500">
                          ⭐ Nổi bật
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-[rgb(var(--neon-cyan))] transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.content.substring(0, 150)}...
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatShortDate(
                              article.publishedAt || article.createdAt
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{article.views} lượt xem</span>
                        </div>
                      </div>

                      {/* <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Tác giả:{" "}
                          {article.author.fullName || article.author.username}
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </div> */}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {renderPagination()}
        </section>
      </div>
      <FooterSection />
    </div>
  );
}

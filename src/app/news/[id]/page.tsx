"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Eye,
  Share2,
  Heart,
  ChevronRight,
  User,
  CalendarDays,
} from "lucide-react";
import { useNewsById, useFeaturedNews } from "@/hooks/useNews";
import { getImageUrl } from "@/utils/imageUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiNews } from "@/types";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: newsData, isLoading, error } = useNewsById(newsId);
  const { data: relatedNewsData } = useFeaturedNews(4);

  const news = newsData?.data;
  const relatedNews = (relatedNewsData?.data || []).filter(
    (item: ApiNews) => item._id !== newsId
  ).slice(0, 4);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.excerpt || news?.content.substring(0, 150),
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link đã được sao chép vào clipboard!");
    }
  };

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Skeleton className="mb-6 h-8 w-32 rounded-xl" />
        <Skeleton className="mb-6 h-72 w-full rounded-2xl md:h-[420px]" />
        <Skeleton className="mb-3 h-10 w-3/4 rounded" />
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </div>
    );
  }

  /* ─── Not found ─── */
  if (error || !news) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="mb-4 text-7xl">📰</div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Không tìm thấy bài viết
          </h1>
          <p className="mb-6 text-muted-foreground">
            Bài viết không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => router.push("/news")} variant="neon">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại tin tức
          </Button>
        </div>
      </div>
    );
  }

  const publishDate = news.publishedAt || news.createdAt;

  return (
    <div className="relative min-h-screen">
      {/* Sticky nav */}
      <div className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay lại</span>
          </Button>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-lg ${isLiked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero image */}
      {news.featuredImage?.url && (
        <div className="relative h-64 w-full overflow-hidden md:h-[420px] lg:h-[480px]">
          <Image
            src={getImageUrl(news.featuredImage.url)}
            alt={news.featuredImage.alt || news.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article
        className={`container mx-auto max-w-4xl px-4 ${
          news.featuredImage?.url ? "-mt-24 relative z-10" : "pt-8"
        }`}
      >
        <div className="glass rounded-2xl border border-border/40 p-6 md:p-10 shadow-xl">
          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {news.tags.map((tag: string, i: number) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-full bg-[rgb(var(--neon-cyan)/0.1)] text-[rgb(var(--neon-cyan))] border border-[rgb(var(--neon-cyan)/0.2)] text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-5 text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]">
            {news.title}
          </h1>

          {/* Meta bar */}
          <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span className="font-medium">Trần Đình Hiệp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(publishDate)}</span>
              <span className="text-border">•</span>
              <span>{formatTime(publishDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{news.views.toLocaleString()} lượt xem</span>
            </div>
          </div>

          {/* Excerpt */}
          {news.excerpt && (
            <div className="mb-8 rounded-xl border-l-[3px] border-[rgb(var(--neon-violet))] bg-[rgb(var(--neon-violet)/0.05)] px-5 py-4">
              <p className="text-base italic leading-relaxed text-foreground/85 md:text-lg">
                {news.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground/85 leading-[1.85] md:text-[1.05rem]">
              {news.content.split("\n").map((line: string, i: number) => {
                if (!line.trim()) return <br key={i} />;
                return (
                  <p key={i} className="mb-4 last:mb-0">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Actions footer */}
          <div className="mt-10 flex items-center justify-between border-t border-border/40 pt-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`rounded-xl ${
                  isLiked
                    ? "border-red-300 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
                    : ""
                }`}
              >
                <Heart
                  className={`mr-1.5 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                {isLiked ? "Đã thích" : "Thích"}{" "}
                {likeCount > 0 && `(${likeCount})`}
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={handleShare}
            >
              <Share2 className="mr-1.5 h-4 w-4" />
              Chia sẻ
            </Button>
          </div>
        </div>
      </article>

      {/* Related news */}
      {relatedNews.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Tin tức liên quan
            </h2>
            <Link href="/news">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:text-foreground"
              >
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedNews.map((item: ApiNews) => (
              <Link key={item._id} href={`/news/${item._id}`}>
                <div className="group flex gap-4 rounded-xl border border-border/40 bg-card/50 p-3 transition-all duration-200 hover:bg-accent/30 hover:shadow-md">
                  {item.featuredImage?.url && (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={getImageUrl(item.featuredImage.url)}
                        alt={item.featuredImage.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-center min-w-0">
                    <h4 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-[rgb(var(--neon-violet))]">
                      {item.title}
                    </h4>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(
                          item.publishedAt || item.createdAt
                        ).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="text-border">•</span>
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
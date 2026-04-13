"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ArrowRight } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/effects/ScrollReveal";
import { useFeaturedNews } from "@/hooks/useNews";
import { ApiNews } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface NewsSectionProps {
  className?: string;
}

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("vi-VN");

export const NewsSection = memo(function NewsSection({
  className,
}: NewsSectionProps) {
  const { data: featuredNewsData, isLoading: loadingNews } = useFeaturedNews(4);
  const hotNews = useMemo(
    () => featuredNewsData?.data || [],
    [featuredNewsData?.data],
  );

  return (
    <section className={`relative py-10 md:py-20 ${className || ""}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <ScrollReveal className="mb-8 text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            📰 News
          </div>
          <h3 className="py-2 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            <span className="neon-text">Tin tức hot</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Cập nhật những thông tin mới nhất về eFootball và cộng đồng game thủ
          </p>
        </ScrollReveal>

        {loadingNews ? (
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {hotNews.map((news: ApiNews) => (
              <StaggerItem key={news._id}>
                <NewsCard news={news} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <ScrollReveal className="mt-10 text-center md:mt-14" delay={0.1}>
          <Button variant="glass" size="lg" asChild>
            <Link href="/news">
              <span className="hidden md:inline">Xem tất cả tin tức</span>
              <span className="md:hidden">Xem tất cả</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
});

const NewsCard = memo(function NewsCard({ news }: { news: ApiNews }) {
  return (
    <Link href={`/news/${news._id}`} className="block h-full">
      <article className="group relative h-full overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(var(--neon-violet)/0.5)]">
        <div className="relative overflow-hidden">
          <Image
            src={
              news.featuredImage.url
                ? getImageUrl(news.featuredImage.url)
                : getPlaceholderUrl(400, 192)
            }
            alt={news.featuredImage.alt}
            width={400}
            height={192}
            className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
            onError={(e) => {
              e.currentTarget.src = getPlaceholderUrl(400, 192);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute right-2 top-2 md:right-3 md:top-3">
            <span className="rounded-md bg-gradient-to-r from-rose-500 to-pink-500 px-2 py-0.5 text-xs font-bold text-white shadow-[0_0_12px_rgb(244,63,94,0.6)]">
              HOT
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-3 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {news.publishedAt
                ? formatDate(news.publishedAt)
                : formatDate(news.createdAt)}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{news.views} lượt xem</span>
          </div>
          <h4 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-[rgb(var(--neon-cyan))] md:text-base">
            {news.title}
          </h4>
          <p className="line-clamp-2 text-xs text-muted-foreground md:line-clamp-3 md:text-sm">
            {news.content.substring(0, 120)}…
          </p>
          <div className="mt-auto flex items-center justify-end">
            <ArrowRight className="h-4 w-4 text-[rgb(var(--neon-cyan))] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
});

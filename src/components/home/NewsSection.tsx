"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, LoaderIcon } from "lucide-react";
import { useFeaturedNews } from "@/hooks/useNews";
import { ApiNews } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface NewsSectionProps {
  className?: string;
}

// Memoized helper function outside component
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const NewsSection = memo(function NewsSection({
  className,
}: NewsSectionProps) {
  const { data: featuredNewsData, isLoading: loadingNews } = useFeaturedNews(4);

  // Memoize the news array
  const hotNews = useMemo(() => {
    return featuredNewsData?.data || [];
  }, [featuredNewsData?.data]);

  return (
    <section className={`container mx-auto py-8 md:py-20 px-4 lg:px-6 ${className || ""}`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Tin tức hot
          </h3>
          <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Cập nhật những thông tin mới nhất về eFootball và cộng đồng game thủ
          </p>
        </div>

        {loadingNews ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {hotNews.map((news: ApiNews) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 text-sm md:text-lg px-4 py-2 md:px-8 md:py-6"
            asChild
          >
            <Link href="/news">
              <span className="hidden md:inline">Xem tất cả tin tức</span>
              <span className="md:hidden">Xem tất cả</span>
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

// Separate memoized component for news card
const NewsCard = memo(function NewsCard({ news }: { news: ApiNews }) {
  console.log(news.featuredImage.url);
  return (
    <Link href={`/news/${news._id}`}>
      <Card className="group cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm h-full card-hover-smooth perf-layer pt-0">
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
            className="w-full h-32 md:h-48 object-cover image-scale-smooth"
          />
          <div className="absolute top-2 right-2 md:top-4 md:right-4">
            <div className="bg-red-600 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-xs md:text-sm font-bold">
              Hot
            </div>
          </div>
        </div>

        <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-slate-500 mb-2">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>
              {news.publishedAt
                ? formatDate(news.publishedAt)
                : formatDate(news.createdAt)}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{news.views} lượt xem</span>
          </div>
          <CardTitle className="text-sm md:text-lg line-clamp-2 text-hover-smooth group-hover:text-blue-600">
            {news.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 px-3 md:px-6 pb-3 md:pb-6">
          <p className="text-slate-600 line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 text-xs md:text-sm">
            {news.content.substring(0, 100)}...
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs md:text-sm text-slate-500 hidden md:block">
              Tác giả: Trần Đình Hiệp
            </div>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-500 arrow-smooth group-hover:translate-x-1 ml-auto md:ml-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

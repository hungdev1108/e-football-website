"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, LoaderIcon } from "lucide-react";
import { useFeaturedNews } from "@/hooks/useNews";
import { ApiNews } from "@/types";

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
  const { data: featuredNewsData, isLoading: loadingNews } = useFeaturedNews(3);

  // Memoize the news array
  const hotNews = useMemo(() => {
    return featuredNewsData?.data || [];
  }, [featuredNewsData?.data]);

  return (
    <section className={`py-20 px-4 lg:px-6 ${className || ""}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Tin tức hot
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Cập nhật những thông tin mới nhất về eFootball và cộng đồng game thủ
          </p>
        </div>

        {loadingNews ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotNews.map((news: ApiNews) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

// Separate memoized component for news card
const NewsCard = memo(function NewsCard({ news }: { news: ApiNews }) {
  return (
    <Link href={`/news/${news._id}`}>
      <Card className="group cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm h-full card-hover-smooth perf-layer">
        <div className="relative overflow-hidden">
          <Image
            src={news.featuredImage.url}
            alt={news.featuredImage.alt}
            width={400}
            height={192}
            className="w-full h-48 object-cover image-scale-smooth"
          />
          <div className="absolute top-4 right-4">
            <div className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
              Hot
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Clock className="w-4 h-4" />
            <span>
              {news.publishedAt
                ? formatDate(news.publishedAt)
                : formatDate(news.createdAt)}
            </span>
            <span>•</span>
            <span>{news.views} lượt xem</span>
          </div>
          <CardTitle className="text-lg line-clamp-2 text-hover-smooth group-hover:text-blue-600">
            {news.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-slate-600 line-clamp-3 mb-4">
            {news.content.substring(0, 150)}...
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Tác giả: {news.author.fullName || news.author.username}
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500 arrow-smooth group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

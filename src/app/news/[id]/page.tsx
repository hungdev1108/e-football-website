"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Eye, Share2, Heart, MessageCircle } from "lucide-react";
import { useNewsById, useFeaturedNews } from "@/hooks/useNews";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import { ApiNews } from "@/types";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch news detail
  const { data: newsData, isLoading, error } = useNewsById(newsId);
  const { data: relatedNewsData } = useFeaturedNews(4);

  const news = newsData?.data;
  const relatedNews = relatedNewsData?.data || [];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.excerpt || news?.content.substring(0, 150),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link đã được sao chép vào clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài viết</h1>
          <p className="text-gray-600 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => router.push('/news')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách tin tức
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {news.featuredImage?.url && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={getImageUrl(news.featuredImage.url)}
                    alt={news.featuredImage.alt || news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Article Header */}
                <div className="mb-6">
                  {/* Tags */}
                  {news.tags && news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {news.title}
                  </h1>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {news.publishedAt
                          ? formatDate(news.publishedAt)
                          : formatDate(news.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{news.views} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Tác giả: Trần Đình Hiệp</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  {news.excerpt && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                      <p className="text-gray-700 italic text-lg leading-relaxed">
                        {news.excerpt}
                      </p>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br>') }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`${isLiked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Đã thích' : 'Thích'} ({likeCount})
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Bình luận
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Related News */}
              {relatedNews.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Tin tức liên quan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedNews.filter((item: ApiNews) => item._id !== newsId).slice(0, 3).map((item: ApiNews) => (
                      <Link key={item._id} href={`/news/${item._id}`}>
                        <div className="group cursor-pointer border rounded-lg p-3 hover:bg-blue-50 transition-colors">
                          <div className="flex gap-3">
                            {item.featuredImage?.url && (
                              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                                <Image
                                  src={getImageUrl(item.featuredImage.url)}
                                  alt={item.featuredImage.alt || item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {new Date(item.publishedAt || item.createdAt).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
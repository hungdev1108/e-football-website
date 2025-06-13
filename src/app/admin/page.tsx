"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Eye,
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import {
  useAdminBanners,
  useUpdateBanner,
  useDeleteBanner,
} from "@/hooks/useAdminSystem";
import { useFeaturedAccounts } from "@/hooks/useAccounts";
import { useFeaturedNews } from "@/hooks/useNews";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch data
  const { data: bannersData, isLoading: loadingBanners } = useAdminBanners();
  const { data: featuredAccountsData } = useFeaturedAccounts(6);
  const { data: featuredNewsData } = useFeaturedNews(5);

  const updateBannerMutation = useUpdateBanner();
  const deleteBannerMutation = useDeleteBanner();

  const banners = (bannersData?.data as any[]) || [];
  const featuredAccounts = (featuredAccountsData?.data as any[]) || [];
  const featuredNews = (featuredNewsData?.data as any[]) || [];

  const { register, handleSubmit, reset } = useForm();

  const onSubmitBanner = async (data: any) => {
    const formData = new FormData();
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("isActive", data.isActive);

    updateBannerMutation.mutate({ data: formData });
    reset();
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa banner này?")) {
      deleteBannerMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý trang chủ
          </h1>
          <p className="text-gray-600">
            Quản lý banner, nội dung nổi bật và thống kê tổng quan
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="banners">
            <ImageIcon className="h-4 w-4 mr-2" />
            Banner
          </TabsTrigger>
          <TabsTrigger value="featured">
            <TrendingUp className="h-4 w-4 mr-2" />
            Nội dung nổi bật
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="h-4 w-4 mr-2" />
            Thống kê
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng tài khoản
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {featuredAccounts.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tài khoản nổi bật hiện tại
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tin tức</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{featuredNews.length}</div>
                <p className="text-xs text-muted-foreground">Tin tức nổi bật</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Banner hoạt động
                </CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {banners.filter((b: any) => b.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Trên tổng số {banners.length} banner
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Trạng thái
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  Hoạt động
                </div>
                <p className="text-xs text-muted-foreground">
                  Website đang hoạt động bình thường
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner Form */}
            <Card>
              <CardHeader>
                <CardTitle>Thêm Banner Mới</CardTitle>
                <CardDescription>Tạo banner mới cho trang chủ</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmitBanner)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      {...register("title", { required: true })}
                      placeholder="Nhập tiêu đề banner"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Nhập mô tả banner"
                    />
                  </div>

                  <div>
                    <Label htmlFor="link">Link</Label>
                    <Input
                      id="link"
                      {...register("link")}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Hình ảnh</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      {...register("image")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="isActive">Trạng thái</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Hoạt động</SelectItem>
                        <SelectItem value="false">Tạm dừng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={updateBannerMutation.isPending}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {updateBannerMutation.isPending
                      ? "Đang tạo..."
                      : "Tạo Banner"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Banner List */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Banner</CardTitle>
                <CardDescription>Quản lý các banner hiện có</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingBanners ? (
                    <div>Đang tải...</div>
                  ) : banners.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      Chưa có banner nào
                    </div>
                  ) : (
                    banners.map((banner: any) => (
                      <div
                        key={banner._id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{banner.title}</h4>
                          <p className="text-sm text-gray-600">
                            {banner.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                banner.isActive ? "default" : "secondary"
                              }
                            >
                              {banner.isActive ? "Hoạt động" : "Tạm dừng"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBanner(banner._id)}
                            disabled={deleteBannerMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Featured Content Tab */}
        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản nổi bật</CardTitle>
                <CardDescription>
                  {featuredAccounts.length} tài khoản đang hiển thị
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {featuredAccounts.slice(0, 5).map((account: any) => (
                    <div
                      key={account._id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <div className="font-medium">{account.title}</div>
                        <div className="text-sm text-gray-600">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(account.price)}
                        </div>
                      </div>
                      <Badge>{account.status}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/admin/accounts">Quản lý tài khoản</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tin tức nổi bật</CardTitle>
                <CardDescription>
                  {featuredNews.length} tin tức đang hiển thị
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {featuredNews.slice(0, 5).map((news: any) => (
                    <div
                      key={news._id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex-1">
                        <div className="font-medium line-clamp-1">
                          {news.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(news.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/admin/news">Quản lý tin tức</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê website</CardTitle>
              <CardDescription>
                Thông tin tổng quan về hiệu suất website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Thống kê đang được phát triển
                </h3>
                <p className="text-gray-600">
                  Chức năng thống kê chi tiết sẽ được bổ sung trong phiên bản
                  tiếp theo
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

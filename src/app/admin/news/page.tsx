"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Save, X, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  useAdminNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
} from "@/hooks/useAdminNews";
import { useUploadImage } from "@/hooks/useAdminAccounts";

interface NewsFormData {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  status: "published" | "draft" | "archived";
  isFeatured: boolean;
  featuredImage?: {
    url: string;
    alt: string;
  };
}

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: string;
  isFeatured: boolean;
  featuredImage?: string;
  tags: string[] | string;
  createdAt: string;
}

interface NewsApiResponse {
  success: boolean;
  data: NewsItem[];
  total?: number;
  totalPages?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminNewsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    featured: "all",
    page: 1,
    limit: 10,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // API hooks - filter out "all" values before sending to API
  const apiFilters = {
    ...filters,
    status: filters.status === "all" ? "" : filters.status,
    featured: filters.featured === "all" ? "" : filters.featured,
  };
  const { data: newsData, isLoading } = useAdminNews(apiFilters);
  const createNewsMutation = useCreateNews();
  const updateNewsMutation = useUpdateNews();
  const deleteNewsMutation = useDeleteNews();
  const uploadImageMutation = useUploadImage();

  const typedNewsData = newsData as NewsApiResponse;
  const news = typedNewsData?.data || [];
  const totalPages =
    typedNewsData?.pagination?.totalPages || typedNewsData?.totalPages || 1;

  // Form hooks
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
  } = useForm<NewsFormData>();

  // Xử lý upload ảnh
  const handleImageUpload = async (file: File, isEdit = false) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadImageMutation.mutateAsync(formData);
      const uploadResult = response.data as { url: string; filename: string };
      const imageUrl = uploadResult.url;

      const imageData = { url: imageUrl, alt: file.name };

      if (isEdit) {
        setValueEdit("featuredImage", imageData);
      } else {
        setValue("featuredImage", imageData);
      }

      setPreviewImage(imageUrl);
      return imageData;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Tạo preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý tạo tin tức mới
  const onSubmitCreate = async (data: NewsFormData) => {
    try {
      let featuredImageData = data.featuredImage;

      // Upload ảnh nếu có
      if (selectedImage) {
        featuredImageData = await handleImageUpload(selectedImage);
      }

      const newsData = {
        ...data,
        featuredImage: featuredImageData || { url: "", alt: "" },
        tags: data.tags.split(",").map((tag) => tag.trim()),
      };

      await createNewsMutation.mutateAsync(newsData);
      setIsCreateDialogOpen(false);
      reset();
      setSelectedImage(null);
      setPreviewImage("");
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };

  // Xử lý cập nhật tin tức
  const onSubmitEdit = async (data: NewsFormData) => {
    try {
      let featuredImageData = data.featuredImage;

      // Upload ảnh mới nếu có
      if (selectedImage) {
        featuredImageData = await handleImageUpload(selectedImage, true);
      }

      const updatedData = {
        ...data,
        featuredImage: featuredImageData || { url: "", alt: "" },
        tags: data.tags.split(",").map((tag) => tag.trim()),
      };

      await updateNewsMutation.mutateAsync({
        id: editingNews!._id,
        data: updatedData,
      });

      setIsEditDialogOpen(false);
      setEditingNews(null);
      resetEdit();
      setSelectedImage(null);
      setPreviewImage("");
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  // Xử lý xóa tin tức
  const handleDeleteNews = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      try {
        await deleteNewsMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  // Xử lý chỉnh sửa tin tức
  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsEditDialogOpen(true);

    // Điền dữ liệu vào form
    resetEdit({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || "",
      tags: Array.isArray(newsItem.tags)
        ? newsItem.tags.join(", ")
        : newsItem.tags || "",
      status: newsItem.status as "published" | "draft" | "archived",
      isFeatured: newsItem.isFeatured,
      featuredImage: newsItem.featuredImage
        ? { url: newsItem.featuredImage, alt: newsItem.title }
        : undefined,
    });

    if (newsItem.featuredImage) {
      setPreviewImage(newsItem.featuredImage);
    }
  };

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset về trang 1 khi filter
    }));
  };

  // Xử lý phân trang
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Reset form khi đóng dialog
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    reset();
    setSelectedImage(null);
    setPreviewImage("");
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingNews(null);
    resetEdit();
    setSelectedImage(null);
    setPreviewImage("");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Đã xuất bản", variant: "default" as const },
      draft: { label: "Bản nháp", variant: "secondary" as const },
      archived: { label: "Lưu trữ", variant: "outline" as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config?.variant}>{config?.label || status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tức</h1>
          <p className="text-gray-600">Tạo và quản lý tin tức, bài viết</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo tin tức mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo tin tức mới</DialogTitle>
              <DialogDescription>
                Tạo một bài viết tin tức mới cho website
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Nội dung</TabsTrigger>
                  <TabsTrigger value="media">Hình ảnh</TabsTrigger>
                  <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      {...register("title", {
                        required: "Tiêu đề là bắt buộc",
                      })}
                      placeholder="Nhập tiêu đề tin tức"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Tóm tắt</Label>
                    <Textarea
                      id="excerpt"
                      {...register("excerpt")}
                      placeholder="Tóm tắt ngắn về tin tức"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Nội dung *</Label>
                    <Textarea
                      id="content"
                      {...register("content", {
                        required: "Nội dung là bắt buộc",
                      })}
                      placeholder="Nhập nội dung chi tiết..."
                      rows={10}
                      className={errors.content ? "border-red-500" : ""}
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.content.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (cách nhau bằng dấu phẩy)</Label>
                    <Input
                      id="tags"
                      {...register("tags")}
                      placeholder="VD: eFootball, game, thể thao"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div>
                    <Label htmlFor="featuredImage">Ảnh đại diện</Label>
                    <div className="space-y-4">
                      <Input
                        id="featuredImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                        className="cursor-pointer"
                      />

                      {previewImage && (
                        <div className="relative">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={400}
                            height={192}
                            className="w-full max-w-md h-48 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setPreviewImage("");
                              setSelectedImage(null);
                              setValue("featuredImage", undefined);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(
                          "status",
                          value as "published" | "draft" | "archived"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                        <SelectItem value="published">Đã xuất bản</SelectItem>
                        <SelectItem value="archived">Lưu trữ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={watch("isFeatured")}
                      onCheckedChange={(checked: boolean) =>
                        setValue("isFeatured", checked)
                      }
                    />
                    <Label htmlFor="isFeatured">Tin tức nổi bật</Label>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseCreateDialog}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={createNewsMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {createNewsMutation.isPending ? "Đang tạo..." : "Tạo tin tức"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Tìm theo tiêu đề..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="published">Đã xuất bản</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="archived">Lưu trữ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="featured">Nổi bật</Label>
              <Select
                value={filters.featured}
                onValueChange={(value) => handleFilterChange("featured", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="true">Nổi bật</SelectItem>
                  <SelectItem value="false">Thường</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="limit">Số lượng/trang</Label>
              <Select
                value={filters.limit.toString()}
                onValueChange={(value) => handleFilterChange("limit", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách tin tức (
            {typedNewsData?.pagination?.total || typedNewsData?.total || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2">Đang tải...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {filters.search || filters.status || filters.featured
                ? "Không tìm thấy tin tức nào phù hợp với bộ lọc"
                : "Chưa có tin tức nào"}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Nổi bật</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((article: NewsItem) => (
                    <TableRow key={article._id}>
                      <TableCell className="max-w-md">
                        <div>
                          <div className="font-medium truncate">
                            {article.title}
                          </div>
                          {article.excerpt && (
                            <div className="text-sm text-gray-500 truncate">
                              {article.excerpt}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(article.status)}</TableCell>
                      <TableCell>
                        {article.isFeatured ? (
                          <Badge variant="default">Nổi bật</Badge>
                        ) : (
                          <Badge variant="outline">Thường</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(article.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditNews(article)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteNews(article._id)}
                            disabled={deleteNewsMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page <= 1}
                  >
                    Trước
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={page === filters.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page >= totalPages}
                  >
                    Sau
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tin tức</DialogTitle>
            <DialogDescription>Cập nhật thông tin tin tức</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="media">Hình ảnh</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Tiêu đề *</Label>
                  <Input
                    id="edit-title"
                    {...registerEdit("title", {
                      required: "Tiêu đề là bắt buộc",
                    })}
                    placeholder="Nhập tiêu đề tin tức"
                    className={errorsEdit.title ? "border-red-500" : ""}
                  />
                  {errorsEdit.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsEdit.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="edit-excerpt">Tóm tắt</Label>
                  <Textarea
                    id="edit-excerpt"
                    {...registerEdit("excerpt")}
                    placeholder="Tóm tắt ngắn về tin tức"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-content">Nội dung *</Label>
                  <Textarea
                    id="edit-content"
                    {...registerEdit("content", {
                      required: "Nội dung là bắt buộc",
                    })}
                    placeholder="Nhập nội dung chi tiết..."
                    rows={10}
                    className={errorsEdit.content ? "border-red-500" : ""}
                  />
                  {errorsEdit.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsEdit.content.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="edit-tags">
                    Tags (cách nhau bằng dấu phẩy)
                  </Label>
                  <Input
                    id="edit-tags"
                    {...registerEdit("tags")}
                    placeholder="VD: eFootball, game, thể thao"
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div>
                  <Label htmlFor="edit-featuredImage">Ảnh đại diện</Label>
                  <div className="space-y-4">
                    <Input
                      id="edit-featuredImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="cursor-pointer"
                    />

                                          {previewImage && (
                        <div className="relative">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={400}
                            height={192}
                            className="w-full max-w-md h-48 object-cover rounded-lg border"
                          />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPreviewImage("");
                            setSelectedImage(null);
                            setValueEdit("featuredImage", undefined);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div>
                  <Label htmlFor="edit-status">Trạng thái</Label>
                  <Select
                    value={watchEdit("status")}
                    onValueChange={(value) =>
                      setValueEdit(
                        "status",
                        value as "published" | "draft" | "archived"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Đã xuất bản</SelectItem>
                      <SelectItem value="archived">Lưu trữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-isFeatured"
                    checked={watchEdit("isFeatured")}
                    onCheckedChange={(checked: boolean) =>
                      setValueEdit("isFeatured", checked)
                    }
                  />
                  <Label htmlFor="edit-isFeatured">Tin tức nổi bật</Label>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseEditDialog}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={updateNewsMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateNewsMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

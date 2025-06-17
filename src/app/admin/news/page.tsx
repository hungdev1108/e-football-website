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
import { Plus, Edit, Trash2, Save, X, Search, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  useAdminNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
  useToggleFeatured,
} from "@/hooks/useAdminNews";
import { useUploadImage } from "@/hooks/useAdminAccounts";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

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
  featured: boolean;
  isFeatured: boolean;
  featuredImage?: {
    url: string;
    alt: string;
  };
  tags: string[];
  author: {
    _id: string;
    username: string;
    fullName: string;
  };
  views: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface NewsApiResponse {
  success: boolean;
  data: {
    news: NewsItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

// Define error interface for type safety
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Define form render function parameters interface
interface FormRenderProps {
  registerFn: ReturnType<typeof useForm<NewsFormData>>['register'];
  errors: ReturnType<typeof useForm<NewsFormData>>['formState']['errors'];
  setValue: ReturnType<typeof useForm<NewsFormData>>['setValue'];
  watch: ReturnType<typeof useForm<NewsFormData>>['watch'];
  isEdit?: boolean;
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
  const toggleFeaturedMutation = useToggleFeatured();
  const uploadImageMutation = useUploadImage();

  const typedNewsData = newsData as NewsApiResponse;
  const news = typedNewsData?.data?.news || [];
  const pagination = typedNewsData?.data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  // Form hooks
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {
      status: "draft",
      isFeatured: false,
    }
  });

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
  
      // ✅ FIX: Xử lý data để pass validation
      const newsData = {
        title: data.title?.trim() || "",
        content: data.content?.trim() || "",
        excerpt: data.excerpt?.trim() || "",
        status: data.status || "draft",
        
        // ✅ FIX: Chuyển boolean đúng cách
        isFeatured: Boolean(data.isFeatured),
        featured: Boolean(data.isFeatured),
        
        // ✅ FIX: Tags processing
        tags: data.tags 
          ? data.tags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0)
          : [],
        
        // ✅ FIX: FeaturedImage processing - chỉ gửi nếu có URL hợp lệ
        ...(featuredImageData && featuredImageData.url && featuredImageData.url.trim() && {
          featuredImage: {
            url: featuredImageData.url.trim(),
            alt: featuredImageData.alt?.trim() || data.title?.trim() || ""
          }
        })
      };
  
      // ✅ FIX: Validation trước khi gửi
      if (!newsData.title || newsData.title.length < 5) {
        throw new Error('Tiêu đề phải có ít nhất 5 ký tự');
      }
      
      if (!newsData.content || newsData.content.length < 50) {
        throw new Error('Nội dung phải có ít nhất 50 ký tự');
      }
  
      if (!['draft', 'published', 'archived'].includes(newsData.status)) {
        newsData.status = 'draft';
      }
  
      console.log('✅ Processed data:', newsData);
  
      await createNewsMutation.mutateAsync(newsData);
      
      setIsCreateDialogOpen(false);
      reset();
      setSelectedImage(null);
      setPreviewImage("");
      
    } catch (error) {
      console.error("Error creating news:", error);
      
      // Hiển thị error message chi tiết
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Có lỗi xảy ra';
      alert(errorMessage);
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
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
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

  // Xử lý toggle featured
  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await toggleFeaturedMutation.mutateAsync({ id, featured: !currentFeatured });
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  // Xử lý chỉnh sửa tin tức
  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsEditDialogOpen(true);

    // Reset image states trước
    setSelectedImage(null);
    setPreviewImage("");

    // Điền dữ liệu vào form
    resetEdit({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || "",
      tags: Array.isArray(newsItem.tags)
        ? newsItem.tags.join(", ")
        : "",
      status: newsItem.status as "published" | "draft" | "archived",
      isFeatured: newsItem.featured || newsItem.isFeatured,
      featuredImage: newsItem.featuredImage || { url: "", alt: "" },
    });

    // Set preview image sau khi reset form
    if (newsItem.featuredImage?.url) {
      setPreviewImage(getImageUrl(newsItem.featuredImage.url));
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

  const renderFormContent = (props: FormRenderProps) => {
    const { registerFn, errors, setValue, watch, isEdit = false } = props;
    
    return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Nội dung</TabsTrigger>
        <TabsTrigger value="media">Hình ảnh</TabsTrigger>
        <TabsTrigger value="settings">Cài đặt</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}title`}>Tiêu đề *</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}title`}
            {...registerFn("title", {
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
          <Label htmlFor={`${isEdit ? 'edit-' : ''}excerpt`}>Tóm tắt</Label>
          <Textarea
            id={`${isEdit ? 'edit-' : ''}excerpt`}
            {...registerFn("excerpt")}
            placeholder="Tóm tắt ngắn về tin tức"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}content`}>Nội dung *</Label>
          <Textarea
            id={`${isEdit ? 'edit-' : ''}content`}
            {...registerFn("content", {
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
          <Label htmlFor={`${isEdit ? 'edit-' : ''}tags`}>Tags (cách nhau bằng dấu phẩy)</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}tags`}
            {...registerFn("tags")}
            placeholder="VD: eFootball, game, thể thao"
          />
        </div>
      </TabsContent>

      <TabsContent value="media" className="space-y-4">
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}featuredImage`}>Ảnh đại diện</Label>
          <div className="space-y-4">
            <Input
              id={`${isEdit ? 'edit-' : ''}featuredImage`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />

            {(previewImage || (isEdit && watch("featuredImage")?.url)) && (
              <div className="relative group">
                <Image
                  src={
                    previewImage || 
                    (isEdit && watch("featuredImage")?.url ? getImageUrl(watch("featuredImage")?.url || "") : "") ||
                    getPlaceholderUrl(400, 192)
                  }
                  alt="Preview"
                  width={400}
                  height={192}
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 group-hover:scale-110"
                  onClick={() => {
                    setPreviewImage("");
                    setSelectedImage(null);
                    setValue("featuredImage", { url: "", alt: "" });
                  }}
                  title="Xóa hình ảnh"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}status`}>Trạng thái</Label>
          <Select
            value={watch("status")}
            onValueChange={(value) =>
              setValue("status", value as "published" | "draft" | "archived")
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
            id={`${isEdit ? 'edit-' : ''}isFeatured`}
            checked={watch("isFeatured")}
            onCheckedChange={(checked: boolean) =>
              setValue("isFeatured", checked)
            }
          />
          <Label htmlFor={`${isEdit ? 'edit-' : ''}isFeatured`}>Tin tức nổi bật</Label>
        </div>
      </TabsContent>
    </Tabs>
    );
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
              {renderFormContent({ registerFn: register, errors, setValue, watch, isEdit: false })}

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
            Danh sách tin tức ({pagination?.totalItems || 0})
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
              {filters.search || filters.status !== "all" || filters.featured !== "all"
                ? "Không tìm thấy tin tức nào phù hợp với bộ lọc"
                : "Chưa có tin tức nào"}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Nổi bật</TableHead>
                    <TableHead>Lượt xem</TableHead>
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
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{article.author?.fullName}</div>
                          <div className="text-gray-500">@{article.author?.username}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(article.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFeatured(article._id, article.featured || article.isFeatured)}
                          disabled={toggleFeaturedMutation.isPending}
                          className={
                            article.featured || article.isFeatured
                              ? "text-yellow-600 hover:text-yellow-700"
                              : "text-gray-400 hover:text-yellow-600"
                          }
                        >
                          <Star
                            className={`h-4 w-4 ${
                              article.featured || article.isFeatured ? "fill-current" : ""
                            }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{article.views}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
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

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={page === filters.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}

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
            {renderFormContent({ registerFn: registerEdit, errors: errorsEdit, setValue: setValueEdit, watch: watchEdit, isEdit: true })}

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
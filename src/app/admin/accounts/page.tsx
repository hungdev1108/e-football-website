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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Save, X, Search, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  useAdminAccounts,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
  useUploadImage,
} from "@/hooks/useAdminAccounts";

interface AccountFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: "available" | "sold" | "reserved";
  accountDetails: {
    platform: string;
    level: number;
    coins: number;
    players: string;
  };
  images: { url: string; alt: string }[];
}

interface AccountItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: string;
  accountDetails: {
    platform: string;
    level: number;
    coins: number;
    players: string[];
  };
  images: { url: string; alt: string }[];
  createdAt: string;
}

interface AccountApiResponse {
  success: boolean;
  data: AccountItem[];
  total?: number;
  totalPages?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminAccountsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
    page: 1,
    limit: 10,
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // API hooks
  const apiFilters = {
    ...filters,
    status: filters.status === "all" ? "" : filters.status,
    category: filters.category === "all" ? "" : filters.category,
  };
  const { data: accountsData, isLoading } = useAdminAccounts(apiFilters);
  const createAccountMutation = useCreateAccount();
  const updateAccountMutation = useUpdateAccount();
  const deleteAccountMutation = useDeleteAccount();
  const uploadImageMutation = useUploadImage();

  const typedAccountsData = accountsData as AccountApiResponse;
  const accounts = typedAccountsData?.data || [];
  const totalPages =
    typedAccountsData?.pagination?.totalPages || typedAccountsData?.totalPages || 1;

  // Form hooks
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
  } = useForm<AccountFormData>();

  // Xử lý upload nhiều ảnh
  const handleMultipleImageUpload = async (files: File[], isEdit = false) => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImageMutation.mutateAsync(formData);
      const uploadResult = response.data as { url: string; filename: string };
      return { url: uploadResult.url, alt: file.name };
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      
      if (isEdit) {
        const currentImages = watchEdit("images") || [];
        setValueEdit("images", [...currentImages, ...uploadedImages]);
      } else {
        const currentImages = watch("images") || [];
        setValue("images", [...currentImages, ...uploadedImages]);
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedImages(files);

      // Tạo preview URLs
      const previewUrls = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setPreviewImages(previewUrls);
    }
  };

  // Xóa ảnh khỏi danh sách
  const removeImage = (index: number, isEdit = false) => {
    if (isEdit) {
      const currentImages = watchEdit("images") || [];
      const newImages = currentImages.filter((_, i) => i !== index);
      setValueEdit("images", newImages);
    } else {
      const currentImages = watch("images") || [];
      const newImages = currentImages.filter((_, i) => i !== index);
      setValue("images", newImages);
    }
  };

  // Xử lý tạo tài khoản mới
  const onSubmitCreate = async (data: AccountFormData) => {
    try {
      let imagesData = data.images || [];

      // Upload ảnh nếu có
      if (selectedImages.length > 0) {
        const uploadedImages = await handleMultipleImageUpload(selectedImages);
        imagesData = [...imagesData, ...(uploadedImages || [])];
      }

      const accountData = {
        ...data,
        price: Number(data.price),
        collectiveStrength: Number(data.collectiveStrength),
        accountDetails: {
          ...data.accountDetails,
          level: Number(data.accountDetails.level),
          coins: Number(data.accountDetails.coins),
          players: data.accountDetails.players.split(",").map((p) => p.trim()),
        },
        images: imagesData,
      };

      await createAccountMutation.mutateAsync(accountData);
      setIsCreateDialogOpen(false);
      reset();
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  // Xử lý cập nhật tài khoản
  const onSubmitEdit = async (data: AccountFormData) => {
    try {
      let imagesData = data.images || [];

      // Upload ảnh mới nếu có
      if (selectedImages.length > 0) {
        const uploadedImages = await handleMultipleImageUpload(selectedImages, true);
        imagesData = [...imagesData, ...(uploadedImages || [])];
      }

      const updatedData = {
        ...data,
        price: Number(data.price),
        collectiveStrength: Number(data.collectiveStrength),
        accountDetails: {
          ...data.accountDetails,
          level: Number(data.accountDetails.level),
          coins: Number(data.accountDetails.coins),
          players: data.accountDetails.players.split(",").map((p) => p.trim()),
        },
        images: imagesData,
      };

      await updateAccountMutation.mutateAsync({
        id: editingAccount!._id,
        data: updatedData,
      });

      setIsEditDialogOpen(false);
      setEditingAccount(null);
      resetEdit();
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await deleteAccountMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  // Xử lý chỉnh sửa tài khoản
  const handleEditAccount = (account: AccountItem) => {
    setEditingAccount(account);
    setIsEditDialogOpen(true);

    // Điền dữ liệu vào form
    resetEdit({
      title: account.title,
      description: account.description,
      price: account.price,
      category: account.category,
      accountCode: account.accountCode,
      collectiveStrength: account.collectiveStrength,
      status: account.status as "available" | "sold" | "reserved",
      accountDetails: {
        platform: account.accountDetails.platform,
        level: account.accountDetails.level,
        coins: account.accountDetails.coins,
        players: Array.isArray(account.accountDetails.players)
          ? account.accountDetails.players.join(", ")
          : account.accountDetails.players || "",
      },
      images: account.images || [],
    });
  };

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
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
    setSelectedImages([]);
    setPreviewImages([]);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingAccount(null);
    resetEdit();
    setSelectedImages([]);
    setPreviewImages([]);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: "Có sẵn", variant: "default" as const },
      sold: { label: "Đã bán", variant: "secondary" as const },
      reserved: { label: "Đã đặt", variant: "outline" as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config?.variant}>{config?.label || status}</Badge>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản game</h1>
          <p className="text-gray-600">Tạo và quản lý tài khoản eFootball</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo tài khoản mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo tài khoản game mới</DialogTitle>
              <DialogDescription>
                Tạo một tài khoản eFootball mới để bán
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                  <TabsTrigger value="details">Chi tiết game</TabsTrigger>
                  <TabsTrigger value="images">Hình ảnh</TabsTrigger>
                  <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      {...register("title", {
                        required: "Tiêu đề là bắt buộc",
                      })}
                      placeholder="VD: Tài khoản eFootball Legend"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Mô tả *</Label>
                    <Textarea
                      id="description"
                      {...register("description", {
                        required: "Mô tả là bắt buộc",
                      })}
                      placeholder="Mô tả chi tiết về tài khoản..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Giá bán (VND) *</Label>
                      <Input
                        id="price"
                        type="number"
                        {...register("price", {
                          required: "Giá bán là bắt buộc",
                          min: { value: 0, message: "Giá phải lớn hơn 0" },
                        })}
                        placeholder="VD: 500000"
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="accountCode">Mã tài khoản *</Label>
                      <Input
                        id="accountCode"
                        {...register("accountCode", {
                          required: "Mã tài khoản là bắt buộc",
                        })}
                        placeholder="VD: EF2024001"
                        className={errors.accountCode ? "border-red-500" : ""}
                      />
                      {errors.accountCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.accountCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Danh mục *</Label>
                      <Select
                        onValueChange={(value) => setValue("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="legend">Legend</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                          Danh mục là bắt buộc
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="collectiveStrength">Sức mạnh tổng thể</Label>
                      <Input
                        id="collectiveStrength"
                        type="number"
                        {...register("collectiveStrength")}
                        placeholder="VD: 4500"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label htmlFor="platform">Nền tảng *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("accountDetails.platform", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nền tảng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="steam">Steam</SelectItem>
                        <SelectItem value="epic">Epic Games</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="console">Console</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level">Level</Label>
                      <Input
                        id="level"
                        type="number"
                        {...register("accountDetails.level")}
                        placeholder="VD: 85"
                      />
                    </div>

                    <div>
                      <Label htmlFor="coins">Coins</Label>
                      <Input
                        id="coins"
                        type="number"
                        {...register("accountDetails.coins")}
                        placeholder="VD: 50000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="players">Cầu thủ nổi bật</Label>
                    <Textarea
                      id="players"
                      {...register("accountDetails.players")}
                      placeholder="VD: Messi, Ronaldo, Neymar (cách nhau bằng dấu phẩy)"
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div>
                    <Label htmlFor="images">Hình ảnh tài khoản</Label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={async () => {
                            if (selectedImages.length > 0) {
                              await handleMultipleImageUpload(selectedImages);
                              setSelectedImages([]);
                              setPreviewImages([]);
                            }
                          }}
                          disabled={selectedImages.length === 0}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>

                      {/* Preview selected images */}
                      {previewImages.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Ảnh được chọn:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {previewImages.map((preview, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  width={200}
                                  height={150}
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Display uploaded images */}
                      {watch("images")?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Ảnh đã upload:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {watch("images").map((image, index) => (
                              <div key={index} className="relative">
                                <Image
                                  src={image.url}
                                  alt={image.alt}
                                  width={200}
                                  height={150}
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
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
                        setValue("status", value as "available" | "sold" | "reserved")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Có sẵn</SelectItem>
                        <SelectItem value="reserved">Đã đặt</SelectItem>
                        <SelectItem value="sold">Đã bán</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Button type="submit" disabled={createAccountMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {createAccountMutation.isPending ? "Đang tạo..." : "Tạo tài khoản"}
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Tìm theo tiêu đề, mã..."
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
                  <SelectItem value="available">Có sẵn</SelectItem>
                  <SelectItem value="reserved">Đã đặt</SelectItem>
                  <SelectItem value="sold">Đã bán</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="legend">Legend</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
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

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách tài khoản (
            {typedAccountsData?.pagination?.total || typedAccountsData?.total || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2">Đang tải...</p>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {filters.search || filters.status || filters.category
                ? "Không tìm thấy tài khoản nào phù hợp với bộ lọc"
                : "Chưa có tài khoản nào"}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tài khoản</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Sức mạnh</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account: AccountItem) => (
                    <TableRow key={account._id}>
                      <TableCell className="max-w-md">
                        <div className="flex items-center space-x-3">
                          {account.images?.[0] && (
                            <Image
                              src={account.images[0].url}
                              alt={account.images[0].alt}
                              width={50}
                              height={50}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium truncate">
                              {account.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {account.accountCode}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.category}</Badge>
                      </TableCell>
                      <TableCell>{formatPrice(account.price)}</TableCell>
                      <TableCell>{getStatusBadge(account.status)}</TableCell>
                      <TableCell>{account.collectiveStrength}</TableCell>
                      <TableCell>
                        {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAccount(account)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteAccount(account._id)}
                            disabled={deleteAccountMutation.isPending}
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

      {/* Edit Dialog - Similar structure to Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
            <DialogDescription>Cập nhật thông tin tài khoản game</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="details">Chi tiết game</TabsTrigger>
                <TabsTrigger value="images">Hình ảnh</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Tiêu đề *</Label>
                  <Input
                    id="edit-title"
                    {...registerEdit("title", {
                      required: "Tiêu đề là bắt buộc",
                    })}
                    placeholder="VD: Tài khoản eFootball Legend"
                    className={errorsEdit.title ? "border-red-500" : ""}
                  />
                  {errorsEdit.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsEdit.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="edit-description">Mô tả *</Label>
                  <Textarea
                    id="edit-description"
                    {...registerEdit("description", {
                      required: "Mô tả là bắt buộc",
                    })}
                    placeholder="Mô tả chi tiết về tài khoản..."
                    rows={4}
                    className={errorsEdit.description ? "border-red-500" : ""}
                  />
                  {errorsEdit.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsEdit.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Giá bán (VND) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      {...registerEdit("price", {
                        required: "Giá bán là bắt buộc",
                        min: { value: 0, message: "Giá phải lớn hơn 0" },
                      })}
                      placeholder="VD: 500000"
                      className={errorsEdit.price ? "border-red-500" : ""}
                    />
                    {errorsEdit.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsEdit.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="edit-accountCode">Mã tài khoản *</Label>
                    <Input
                      id="edit-accountCode"
                      {...registerEdit("accountCode", {
                        required: "Mã tài khoản là bắt buộc",
                      })}
                      placeholder="VD: EF2024001"
                      className={errorsEdit.accountCode ? "border-red-500" : ""}
                    />
                    {errorsEdit.accountCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsEdit.accountCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Danh mục *</Label>
                    <Select
                      value={watchEdit("category")}
                      onValueChange={(value) => setValueEdit("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legend">Legend</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-collectiveStrength">Sức mạnh tổng thể</Label>
                    <Input
                      id="edit-collectiveStrength"
                      type="number"
                      {...registerEdit("collectiveStrength")}
                      placeholder="VD: 4500"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <Label htmlFor="edit-platform">Nền tảng *</Label>
                  <Select
                    value={watchEdit("accountDetails.platform")}
                    onValueChange={(value) =>
                      setValueEdit("accountDetails.platform", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steam">Steam</SelectItem>
                      <SelectItem value="epic">Epic Games</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="console">Console</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-level">Level</Label>
                    <Input
                      id="edit-level"
                      type="number"
                      {...registerEdit("accountDetails.level")}
                      placeholder="VD: 85"
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-coins">Coins</Label>
                    <Input
                      id="edit-coins"
                      type="number"
                      {...registerEdit("accountDetails.coins")}
                      placeholder="VD: 50000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-players">Cầu thủ nổi bật</Label>
                  <Textarea
                    id="edit-players"
                    {...registerEdit("accountDetails.players")}
                    placeholder="VD: Messi, Ronaldo, Neymar (cách nhau bằng dấu phẩy)"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div>
                  <Label htmlFor="edit-images">Hình ảnh tài khoản</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="edit-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={async () => {
                          if (selectedImages.length > 0) {
                            await handleMultipleImageUpload(selectedImages, true);
                            setSelectedImages([]);
                            setPreviewImages([]);
                          }
                        }}
                        disabled={selectedImages.length === 0}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>

                    {/* Preview selected images */}
                    {previewImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Ảnh được chọn:</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display uploaded images */}
                    {watchEdit("images")?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Ảnh hiện tại:</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {watchEdit("images").map((image, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={image.url}
                                alt={image.alt}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => removeImage(index, true)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
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
                      setValueEdit("status", value as "available" | "sold" | "reserved")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Có sẵn</SelectItem>
                      <SelectItem value="reserved">Đã đặt</SelectItem>
                      <SelectItem value="sold">Đã bán</SelectItem>
                    </SelectContent>
                  </Select>
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
              <Button type="submit" disabled={updateAccountMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateAccountMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
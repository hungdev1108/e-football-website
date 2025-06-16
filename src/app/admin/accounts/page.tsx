"use client";

import React, { useState } from "react";
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
import { toast } from "react-hot-toast";
import {
  useAdminAccounts,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
  useUploadImage,
  useAdminCategories,
} from "@/hooks/useAdminAccounts";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import { PLATFORMS, getPlatformLabel } from "@/constants";

interface AccountFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: "available" | "sold" | "reserved";
  featured: boolean;
  accountDetails: {
    platform: string;
    coins: number;
    gp: number;
    players: string;
  };
  images: { url: string; alt: string }[];
}

interface AccountItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string | { _id: string; name: string; icon?: string };
  accountCode: string;
  collectiveStrength: number;
  status: string;
  featured: boolean;
  accountDetails: {
    platform: string;
    coins: number;
    gp: number;
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

  // ✅ TẤT CẢ HOOKS PHẢI Ở ĐẦU - KHÔNG ĐƯỢC EARLY RETURN TRƯỚC HOOKS
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
  const { data: categoriesData = [], isLoading: categoriesLoading, error: categoriesError } = useAdminCategories();
  
  // Form hooks - PHẢI ở sau tất cả hooks khác
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

  // Ensure categories is always an array
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  
  // Show error message if categories fail to load
  React.useEffect(() => {
    if (categoriesError) {
      toast.error('Không thể tải danh sách categories');
    }
  }, [categoriesError]);

  // ✅ CONDITIONAL RENDERING THAY VÌ EARLY RETURN
  // Show loading state for categories
  if (categoriesLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  const typedAccountsData = accountsData as AccountApiResponse;
  const accounts = typedAccountsData?.data || [];
  const totalPages =
    typedAccountsData?.pagination?.totalPages || typedAccountsData?.totalPages || 1;

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
      toast.error("Lỗi khi upload ảnh");
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
      // Validation cơ bản
      if (!data.title || !data.description || !data.category) {
        toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
      }
      
      if (data.price <= 0) {
        toast.error('Giá phải lớn hơn 0!');
        return;
      }

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
          coins: Number(data.accountDetails.coins) || 0,
          gp: Number(data.accountDetails.gp) || 0,
          players: data.accountDetails.players.split(",").map((p) => p.trim()),
        },
        images: imagesData,
      };

      // Debug: Log dữ liệu được gửi
      console.log('Sending account data:', JSON.stringify(accountData, null, 2));

      await createAccountMutation.mutateAsync(accountData);
      toast.success("Tạo tài khoản thành công!");
      setIsCreateDialogOpen(false);
      reset();
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error: any) {
      console.error("Error creating account:", error);
      
      // Hiển thị lỗi chi tiết hơn
      if (error?.response?.data?.message) {
        toast.error(`Lỗi: ${error.response.data.message}`);
      } else if (error?.message) {
        toast.error(`Lỗi: ${error.message}`);
      } else {
        toast.error("Có lỗi xảy ra khi tạo tài khoản!");
      }
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
          coins: Number(data.accountDetails.coins) || 0,
          gp: Number(data.accountDetails.gp) || 0,
          players: data.accountDetails.players.split(",").map((p) => p.trim()),
        },
        images: imagesData,
      };

      await updateAccountMutation.mutateAsync({
        id: editingAccount!._id,
        data: updatedData,
      });
      toast.success("Cập nhật tài khoản thành công!");
      setIsEditDialogOpen(false);
      resetEdit();
      setEditingAccount(null);
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Có lỗi xảy ra khi cập nhật tài khoản!");
    }
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await deleteAccountMutation.mutateAsync(id);
        toast.success("Xóa tài khoản thành công!");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Có lỗi xảy ra khi xóa tài khoản!");
      }
    }
  };

  // Xử lý chỉnh sửa tài khoản
  const handleEditAccount = (account: AccountItem) => {
    setEditingAccount(account);
    setIsEditDialogOpen(true);

    // Điền dữ liệu vào form
    // Handle category - it might be an object with _id or just a string
    const categoryValue = typeof account.category === 'object' && account.category?._id 
      ? account.category._id 
      : account.category;
    
    resetEdit({
      title: account.title,
      description: account.description,
      price: account.price,
      category: categoryValue,
      accountCode: account.accountCode,
      collectiveStrength: account.collectiveStrength,
      status: account.status as "available" | "sold" | "reserved",
      featured: account.featured || false,
      accountDetails: {
        platform: account.accountDetails.platform,
        coins: account.accountDetails.coins || 0,
        gp: account.accountDetails.gp || 0,
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
    const priceStr = price.toString();
    if (priceStr.length <= 3) {
      return `${price} đ`;
    }
    
    const firstDigit = priceStr[0];
    const remainingStr = priceStr.slice(1);
    
    // Tạo pattern từ phải sang trái theo chuẩn định dạng tiền tệ
    let pattern = '';
    for (let i = 0; i < remainingStr.length; i++) {
      if (i > 0 && (remainingStr.length - i) % 3 === 0) {
        pattern += '.';
      }
      pattern += 'x';
    }
    
    return `${firstDigit}${pattern} đ`;
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
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Select onValueChange={(value) => setValue("price", Number(value))}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Chọn nhanh" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="200000">Xxx.xxx (200K)</SelectItem>
                              <SelectItem value="300000">Xxx.xxx (300K)</SelectItem>
                              <SelectItem value="500000">Xxx.xxx (500K)</SelectItem>
                              <SelectItem value="800000">Xxx.xxx (800K)</SelectItem>
                              <SelectItem value="1000000">Xxx.xxx (1M)</SelectItem>
                              <SelectItem value="2000000">Xxx.xxx (2M)</SelectItem>
                              <SelectItem value="3000000">Xxx.xxx (3M)</SelectItem>
                              <SelectItem value="4000000">Xxx.xxx (4M)</SelectItem>
                              <SelectItem value="5000000">Xxx.xxx (5M)</SelectItem>
                              <SelectItem value="6000000">Xxx.xxx (6M)</SelectItem>
                              <SelectItem value="7000000">Xxx.xxx (7M)</SelectItem>
                              <SelectItem value="8000000">Xxx.xxx (8M)</SelectItem>
                              <SelectItem value="9000000">Xxx.xxx (9M)</SelectItem>
                              <SelectItem value="10000000">Xx.xxx.xxx (10M)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="price"
                            type="number"
                            {...register("price", {
                              required: "Giá bán là bắt buộc",
                              min: { value: 0, message: "Giá phải lớn hơn 0" },
                            })}
                            placeholder="Hoặc nhập thủ công"
                            className={`flex-1 ${errors.price ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accountCode">Mã tài khoản *</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                          HT-
                        </span>
                        <Input
                          id="accountCode"
                          {...register("accountCode", {
                            required: "Mã tài khoản là bắt buộc",
                            pattern: {
                              value: /^HT-\d+$/,
                              message: "Mã tài khoản phải có định dạng HT-xxx"
                            }
                          })}
                          placeholder="099"
                          className={`rounded-l-none ${errors.accountCode ? "border-red-500" : ""}`}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value.startsWith('HT-')) {
                              setValue('accountCode', `HT-${value.replace('HT-', '')}`);
                            }
                          }}
                        />
                      </div>
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
                          {categories.map((category: any) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.icon && `${category.icon} `}{category.name}
                            </SelectItem>
                          ))}
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
                        {PLATFORMS.map((platform) => (
                          <SelectItem key={platform.value} value={platform.value}>
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="coins">Coins</Label>
                      <Input
                        id="coins"
                        type="number"
                        {...register("accountDetails.coins")}
                        placeholder="VD: 50000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gp">GP (Game Points)</Label>
                      <Input
                        id="gp"
                        type="number"
                        {...register("accountDetails.gp")}
                        placeholder="VD: 100000"
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
                                  src={getImageUrl(image.url)}
                                  alt={image.alt}
                                  width={200}
                                  height={150}
                                  className="w-full h-32 object-cover rounded-lg border"
                                  onError={(e) => {
                                    e.currentTarget.src = getPlaceholderUrl(200, 150);
                                  }}
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

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      {...register("featured")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="featured">Tài khoản nổi bật</Label>
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
                  {categories.map((category: any) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.icon && `${category.icon} `}{category.name}
                    </SelectItem>
                  ))}
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Tài khoản</TableHead>
                      <TableHead className="min-w-[120px]">Danh mục</TableHead>
                      <TableHead className="min-w-[80px]">Platform</TableHead>
                      <TableHead className="min-w-[100px]">Giá</TableHead>
                      <TableHead className="min-w-[100px]">Trạng thái</TableHead>
                      <TableHead className="min-w-[60px] text-center">⭐</TableHead>
                      <TableHead className="min-w-[80px]">Sức mạnh</TableHead>
                      <TableHead className="min-w-[100px]">Ngày tạo</TableHead>
                      <TableHead className="min-w-[120px] text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account: AccountItem) => (
                      <TableRow key={account._id}>
                        <TableCell className="min-w-[200px]">
                          <div className="flex items-center space-x-3">
                            {account.images?.[0] && (
                              <Image
                                src={getImageUrl(account.images[0].url)}
                                alt={account.images[0].alt}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = getPlaceholderUrl(40, 40);
                                }}
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-medium truncate text-sm">
                                {account.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {account.accountCode}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <Badge variant="outline" className="text-xs">
                            {typeof account.category === 'object' && account.category?.icon && `${account.category.icon} `}
                            {typeof account.category === 'object' && account.category?.name 
                              ? account.category.name 
                              : account.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[80px]">
                          <Badge variant="secondary" className="text-xs">
                            {getPlatformLabel(account.accountDetails.platform)}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[100px] text-sm">{formatPrice(account.price)}</TableCell>
                        <TableCell className="min-w-[100px]">{getStatusBadge(account.status)}</TableCell>
                        <TableCell className="min-w-[60px] text-center">
                          <div className="flex justify-center">
                            {account.featured ? (
                              <span className="text-yellow-500 text-lg">⭐</span>
                            ) : (
                              <span className="text-gray-400 text-lg">☆</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[80px] text-sm">{account.collectiveStrength}</TableCell>
                        <TableCell className="min-w-[100px] text-sm">
                          {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditAccount(account)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                              onClick={() => handleDeleteAccount(account._id)}
                              disabled={deleteAccountMutation.isPending}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                 </Table>
               </div>

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
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => setValueEdit("price", Number(value))}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn nhanh" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="200000">Xxx.xxx (200K)</SelectItem>
                            <SelectItem value="300000">Xxx.xxx (300K)</SelectItem>
                            <SelectItem value="500000">Xxx.xxx (500K)</SelectItem>
                            <SelectItem value="800000">Xxx.xxx (800K)</SelectItem>
                            <SelectItem value="1000000">Xxx.xxx (1M)</SelectItem>
                            <SelectItem value="2000000">Xxx.xxx (2M)</SelectItem>
                            <SelectItem value="3000000">Xxx.xxx (3M)</SelectItem>
                            <SelectItem value="4000000">Xxx.xxx (4M)</SelectItem>
                            <SelectItem value="5000000">Xxx.xxx (5M)</SelectItem>
                            <SelectItem value="6000000">Xxx.xxx (6M)</SelectItem>
                            <SelectItem value="7000000">Xxx.xxx (7M)</SelectItem>
                            <SelectItem value="8000000">Xxx.xxx (8M)</SelectItem>
                            <SelectItem value="9000000">Xxx.xxx (9M)</SelectItem>
                            <SelectItem value="10000000">Xx.xxx.xxx (10M)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="edit-price"
                          type="number"
                          {...registerEdit("price", {
                            required: "Giá bán là bắt buộc",
                            min: { value: 0, message: "Giá phải lớn hơn 0" },
                          })}
                          placeholder="Hoặc nhập thủ công"
                          className={`flex-1 ${errorsEdit.price ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errorsEdit.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEdit.price.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="edit-accountCode">Mã tài khoản *</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        HT-
                      </span>
                      <Input
                        id="edit-accountCode"
                        {...registerEdit("accountCode", {
                          required: "Mã tài khoản là bắt buộc",
                          pattern: {
                            value: /^HT-\d+$/,
                            message: "Mã tài khoản phải có định dạng HT-xxx"
                          }
                        })}
                        placeholder="099"
                        className={`rounded-l-none ${errorsEdit.accountCode ? "border-red-500" : ""}`}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!value.startsWith('HT-')) {
                            setValueEdit('accountCode', `HT-${value.replace('HT-', '')}`);
                          }
                        }}
                      />
                    </div>
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
                        {categories.map((category: any) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.icon && `${category.icon} `}{category.name}
                          </SelectItem>
                        ))}
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
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-coins">Coins</Label>
                    <Input
                      id="edit-coins"
                      type="number"
                      {...registerEdit("accountDetails.coins")}
                      placeholder="VD: 50000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-gp">GP (Game Points)</Label>
                    <Input
                      id="edit-gp"
                      type="number"
                      {...registerEdit("accountDetails.gp")}
                      placeholder="VD: 100000"
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
                                src={getImageUrl(image.url)}
                                alt={image.alt}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg border"
                                onError={(e) => {
                                  e.currentTarget.src = getPlaceholderUrl(200, 150);
                                }}
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={watchEdit("featured")}
                    onChange={(e) => setValueEdit("featured", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="edit-featured">Tài khoản nổi bật</Label>
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
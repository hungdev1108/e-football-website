"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import {
  Settings,
  Save,
  ImageIcon,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  QrCode,
  CreditCard,
} from "lucide-react";
import {
  useAdminSystemSettings,
  useUpdateSystemSettings,
  useAdminBanners,
  useCreateBanner,
  useUpdateBanner,
  useDeleteBanner,
  useToggleBannerStatus,
  useUpdateLogo,
  useUpdateQRCode,
} from "@/hooks/useAdminSystem";
import type {
  SystemSettingsFormData,
  BannerFormData,
  Banner,
} from "@/types/admin";

export default function AdminSystemPage() {
  const [activeTab, setActiveTab] = useState("settings");
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // Data hooks
  const { data: settingsData, isLoading: settingsLoading } = useAdminSystemSettings();
  const { data: bannersData, isLoading: bannersLoading } = useAdminBanners();

  // Mutation hooks
  const updateSettingsMutation = useUpdateSystemSettings();
  const updateLogoMutation = useUpdateLogo();
  const updateQRCodeMutation = useUpdateQRCode();
  const createBannerMutation = useCreateBanner();
  const updateBannerMutation = useUpdateBanner();
  const deleteBannerMutation = useDeleteBanner();
  const toggleBannerMutation = useToggleBannerStatus();

  // Data extraction  
  interface SystemSettingsData {
    siteName?: string;
    siteDescription?: string;
    siteKeywords?: string;
    siteUrl?: string;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
      workingHours?: string;
    };
    socialMedia?: {
      facebook?: string;
      telegram?: string;
      zalo?: string;
      youtube?: string;
      discord?: string;
    };
    bankingInfo?: {
      bankName?: string;
      accountNumber?: string;
      accountHolder?: string;
      qrCodeImage?: {
        url: string;
        alt: string;
      };
    };
    seoSettings?: {
      metaTitle?: string;
      metaDescription?: string;
      metaKeywords?: string;
      ogImage?: string;
      canonicalUrl?: string;
    };
    features?: {
      enableRegistration?: boolean;
      enableCart?: boolean;
      enableReviews?: boolean;
      maintenanceMode?: boolean;
      enableNotifications?: boolean;
    };
    maintenanceMessage?: string;
    logo?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  }
  
  const settings = useMemo(() => settingsData?.data as SystemSettingsData || {}, [settingsData]);
  const banners = bannersData?.data as Banner[] || [];

  // Form hooks
  const { 
    register: registerSettings, 
    handleSubmit: handleSubmitSettings, 
    reset: resetSettings
  } = useForm<SystemSettingsFormData>();

  const { 
    register: registerBanner, 
    handleSubmit: handleSubmitBanner, 
    reset: resetBanner, 
    setValue: setValueBanner 
  } = useForm<BannerFormData>();

  // Reset form when settings data loads
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      resetSettings({
        siteName: settings.siteName || 'eFootball Shop',
        siteDescription: settings.siteDescription || '',
        siteKeywords: settings.siteKeywords || '',
        siteUrl: settings.siteUrl || '',
        contactInfo: {
          email: settings.contactInfo?.email || '',
          phone: settings.contactInfo?.phone || '',
          address: settings.contactInfo?.address || '',
          workingHours: settings.contactInfo?.workingHours || '',
        },
        socialMedia: {
          facebook: settings.socialMedia?.facebook || '',
          telegram: settings.socialMedia?.telegram || '',
          zalo: settings.socialMedia?.zalo || '',
          youtube: settings.socialMedia?.youtube || '',
          discord: settings.socialMedia?.discord || '',
        },
        bankingInfo: {
          bankName: settings.bankingInfo?.bankName || '',
          accountNumber: settings.bankingInfo?.accountNumber || '',
          accountHolder: settings.bankingInfo?.accountHolder || '',
        },
        seoSettings: {
          metaTitle: settings.seoSettings?.metaTitle || '',
          metaDescription: settings.seoSettings?.metaDescription || '',
          metaKeywords: settings.seoSettings?.metaKeywords || '',
          ogImage: settings.seoSettings?.ogImage || '',
        },
        features: {
          enableRegistration: settings.features?.enableRegistration || false,
          enableCart: settings.features?.enableCart || false,
          enableReviews: settings.features?.enableReviews || false,
          maintenanceMode: settings.features?.maintenanceMode || false,
          enableNotifications: settings.features?.enableNotifications || false,
        },
        maintenanceMessage: settings.maintenanceMessage || '',
      });
    }
  }, [settings, resetSettings]);

  // Handlers
  const onSubmitSettings = async (data: SystemSettingsFormData) => {
    // Fix type compatibility by ensuring all required fields are defined
    const processedData = {
      ...data,
      contactInfo: {
        ...data.contactInfo,
        workingHours: data.contactInfo?.workingHours || ""
      },
      bankingInfo: {
        bankName: data.bankingInfo?.bankName || "",
        accountNumber: data.bankingInfo?.accountNumber || "",
        accountHolder: data.bankingInfo?.accountHolder || "",
        qrCodeImage: {
          url: "",
          alt: "QR Code"
        }
      },
              seoSettings: {
          metaTitle: data.seoSettings?.metaTitle || "",
          metaDescription: data.seoSettings?.metaDescription || "",
          metaKeywords: data.seoSettings?.metaKeywords || "",
          ogImage: data.seoSettings?.ogImage || "",
        },
        features: {
          enableRegistration: data.features?.enableRegistration || false,
          enableCart: data.features?.enableCart || false,
          enableReviews: data.features?.enableReviews || false,
          maintenanceMode: data.features?.maintenanceMode || false,
        }
    };
    updateSettingsMutation.mutate(processedData);
  };

  const onSubmitBanner = async (data: BannerFormData) => {
    if (editingBanner) {
      updateBannerMutation.mutate({ id: editingBanner._id, data });
    } else {
      createBannerMutation.mutate(data);
    }
    setIsBannerDialogOpen(false);
    resetBanner();
    setEditingBanner(null);
    setPreviewImage("");
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      // TODO: Implement image upload when useUploadImage is fixed
      console.log("Image upload disabled temporarily:", file);
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleLogoUpload = async (file: File) => {
    updateLogoMutation.mutate(file);
  };

  const handleQRUpload = async (file: File) => {
    updateQRCodeMutation.mutate(file);
  };

  const handleBannerImageUpload = async (file: File) => {
    const url = await handleImageUpload(file);
    if (url) {
      setValueBanner('image', url);
      setPreviewImage(url);
    }
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    resetBanner({
      title: banner.title,
      image: banner.image,
      link: banner.link || '',
      order: banner.order,
    });
    setPreviewImage(banner.image);
    setIsBannerDialogOpen(true);
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      deleteBannerMutation.mutate(id);
    }
  };

  const handleCloseCreateDialog = () => {
    setIsBannerDialogOpen(false);
    resetBanner();
    setPreviewImage("");
    setEditingBanner(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Website</h1>
          <p className="text-gray-600">Cập nhật thông tin và nội dung website</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Thông tin Website
          </TabsTrigger>
          <TabsTrigger value="banners">
            <ImageIcon className="h-4 w-4 mr-2" />
            Banner & Logo
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Globe className="h-4 w-4 mr-2" />
            Liên hệ & QR
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt nâng cao
          </TabsTrigger>
        </TabsList>

        {/* Website Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung Website</CardTitle>
              <CardDescription>Cập nhật thông tin cơ bản của website</CardDescription>
            </CardHeader>
            <CardContent>
              {settingsLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-2">Đang tải cài đặt...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitSettings(onSubmitSettings)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
                      <div>
                        <Label htmlFor="siteName">Tên website</Label>
                        <Input
                          id="siteName"
                          {...registerSettings("siteName")}
                          placeholder="eFootball Store"
                        />
                      </div>
                      <div>
                        <Label htmlFor="siteDescription">Mô tả website</Label>
                        <Textarea
                          id="siteDescription"
                          {...registerSettings("siteDescription")}
                          placeholder="Cửa hàng tài khoản eFootball uy tín nhất Việt Nam"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="siteKeywords">Từ khóa SEO</Label>
                        <Input
                          id="siteKeywords"
                          {...registerSettings("siteKeywords")}
                          placeholder="eFootball, PES, tài khoản game"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Thông tin liên hệ</h3>
                      <div>
                        <Label htmlFor="contactEmail">Email liên hệ</Label>
                        <Input
                          id="contactEmail"
                          {...registerSettings("contactInfo.email")}
                          placeholder="contact@example.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Số điện thoại</Label>
                        <Input
                          id="contactPhone"
                          {...registerSettings("contactInfo.phone")}
                          placeholder="0123456789"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactAddress">Địa chỉ</Label>
                        <Textarea
                          id="contactAddress"
                          {...registerSettings("contactInfo.address")}
                          placeholder="123 Đường ABC, Quận XYZ"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workingHours">Giờ làm việc</Label>
                        <Input
                          id="workingHours"
                          {...registerSettings("contactInfo.workingHours")}
                          placeholder="8:00 - 22:00 (Thứ 2 - Chủ nhật)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Mạng xã hội</h3>
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          {...registerSettings("socialMedia.facebook")}
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="telegram">Telegram</Label>
                        <Input
                          id="telegram"
                          {...registerSettings("socialMedia.telegram")}
                          placeholder="https://t.me/..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="zalo">Zalo</Label>
                        <Input
                          id="zalo"
                          {...registerSettings("socialMedia.zalo")}
                          placeholder="https://zalo.me/..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input
                          id="youtube"
                          {...registerSettings("socialMedia.youtube")}
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="discord">Discord</Label>
                        <Input
                          id="discord"
                          {...registerSettings("socialMedia.discord")}
                          placeholder="https://discord.gg/..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Thông tin thanh toán</h3>
                      <div>
                        <Label htmlFor="bankName">Tên ngân hàng</Label>
                        <Input
                          id="bankName"
                          {...registerSettings("bankingInfo.bankName")}
                          placeholder="Vietcombank"
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Số tài khoản</Label>
                        <Input
                          id="accountNumber"
                          {...registerSettings("bankingInfo.accountNumber")}
                          placeholder="1234567890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountHolder">Chủ tài khoản</Label>
                        <Input
                          id="accountHolder"
                          {...registerSettings("bankingInfo.accountHolder")}
                          placeholder="NGUYEN VAN A"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={updateSettingsMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateSettingsMutation.isPending ? 'Đang lưu...' : 'Lưu thông tin'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banners & Logo Tab */}
        <TabsContent value="banners" className="space-y-6">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Website</CardTitle>
              <CardDescription>Cập nhật logo chính của website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo">Chọn logo mới</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(file);
                        }}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Định dạng: PNG, JPG, SVG. Kích thước khuyến nghị: 200x60px (tối đa 2MB)
                      </p>
                    </div>
                    
                    {updateLogoMutation.isPending && (
                       <div className="flex items-center space-x-2 text-blue-600">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                         <span className="text-sm">Đang upload logo...</span>
                       </div>
                     )}
                  </div>
                  
                  {settings.logo?.url && (
                    <div>
                      <Label>Logo hiện tại</Label>
                      <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                        <Image 
                          src={settings.logo.url} 
                          alt={settings.logo.alt || "Logo website"}
                          width={settings.logo.width || 200}
                          height={64}
                          className="max-w-full h-16 object-contain mx-auto"
                        />
                        <p className="text-sm text-gray-600 text-center mt-2">
                          Logo hiện tại ({settings.logo.width}x{settings.logo.height}px)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quản lý Banner</CardTitle>
                  <CardDescription>Banner hiển thị trên trang chủ (tối đa 3 banner)</CardDescription>
                </div>
                <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      resetBanner();
                      setEditingBanner(null);
                      setPreviewImage("");
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Banner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBanner ? 'Chỉnh sửa Banner' : 'Thêm Banner mới'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingBanner ? 'Cập nhật thông tin banner' : 'Tạo banner mới cho trang chủ'}
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmitBanner(onSubmitBanner)} className="space-y-6">
                      <div>
                        <Label htmlFor="title">Tiêu đề *</Label>
                        <Input
                          id="title"
                          {...registerBanner("title", { required: "Tiêu đề là bắt buộc" })}
                          placeholder="Nhập tiêu đề banner"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bannerImage">Hình ảnh</Label>
                        <Input
                          id="bannerImage"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleBannerImageUpload(file);
                            }
                          }}
                          className="cursor-pointer"
                        />
                      </div>

                      {previewImage && (
                        <div className="relative">
                          <Image
                            src={previewImage}
                            alt="Banner preview"
                            width={400}
                            height={192}
                            className="w-full max-w-md h-48 object-cover rounded-lg border"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="link">Liên kết (tùy chọn)</Label>
                        <Input
                          id="link"
                          {...registerBanner("link")}
                          placeholder="https://... hoặc /path"
                        />
                      </div>

                      <div>
                        <Label htmlFor="order">Thứ tự hiển thị</Label>
                        <Input
                          id="order"
                          type="number"
                          {...registerBanner("order")}
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCloseCreateDialog}
                        >
                          Hủy
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createBannerMutation.isPending || updateBannerMutation.isPending}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {editingBanner ? 'Cập nhật' : 'Tạo Banner'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {bannersLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-2">Đang tải banner...</p>
                </div>
              ) : banners.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Chưa có banner nào. Tạo banner đầu tiên!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Hình ảnh</TableHead>
                      <TableHead>Liên kết</TableHead>
                      <TableHead>Thứ tự</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner: Banner) => (
                      <TableRow key={banner._id}>
                        <TableCell className="font-medium">{banner.title}</TableCell>
                        <TableCell>
                          <Image 
                            src={banner.image} 
                            alt={banner.title}
                            width={64}
                            height={40}
                            className="w-16 h-10 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>
                          {banner.link ? (
                            <a 
                              href={banner.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {banner.link.substring(0, 30)}...
                            </a>
                          ) : (
                            <span className="text-gray-400">Không có</span>
                          )}
                        </TableCell>
                        <TableCell>{banner.order}</TableCell>
                        <TableCell>
                          <Badge variant={banner.isActive ? "default" : "secondary"}>
                            {banner.isActive ? "Hoạt động" : "Tắt"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleBannerMutation.mutate(banner._id)}
                              disabled={toggleBannerMutation.isPending}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBanner(banner)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteBanner(banner._id)}
                              disabled={deleteBannerMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact & QR Tab */}
        <TabsContent value="contact" className="space-y-6">
          <form onSubmit={handleSubmitSettings(onSubmitSettings)} className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Thông tin liên hệ
                </CardTitle>
                <CardDescription>Thông tin liên hệ hiển thị trên website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="contactEmail"
                      type="email"
                      {...registerSettings("contactInfo.email")}
                      placeholder="contact@efootballstore.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contactPhone">Số điện thoại</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="contactPhone"
                      {...registerSettings("contactInfo.phone")}
                      placeholder="0123456789"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contactAddress">Địa chỉ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="contactAddress"
                      {...registerSettings("contactInfo.address")}
                      placeholder="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="workingHours">Giờ làm việc</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="workingHours"
                      {...registerSettings("contactInfo.workingHours")}
                      placeholder="8:00 - 22:00 (Thứ 2 - Chủ nhật)"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Codes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Mã QR Thanh Toán
                </CardTitle>
                <CardDescription>Upload mã QR cho thanh toán</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="qrPayment">QR Code Thanh Toán</Label>
                    <Input
                      id="qrPayment"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                           handleQRUpload(file);
                         }
                       }}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Chọn file ảnh QR code thanh toán (PNG, JPG - tối đa 5MB)
                    </p>
                  </div>
                  
                  {settings.bankingInfo?.qrCodeImage?.url && (
                    <div>
                      <Label>QR Code hiện tại</Label>
                      <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                        <Image 
                          src={settings.bankingInfo.qrCodeImage.url} 
                          alt="QR Code thanh toán"
                          width={192}
                          height={192}
                          className="w-48 h-48 object-contain mx-auto rounded border bg-white"
                        />
                        <p className="text-sm text-gray-600 text-center mt-2">
                          QR Code thanh toán hiện tại
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Thông tin thanh toán
                </CardTitle>
                <CardDescription>Thông tin tài khoản ngân hàng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bankName">Tên ngân hàng</Label>
                  <Input
                    id="bankName"
                    {...registerSettings("bankingInfo.bankName")}
                    placeholder="Vietcombank"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Số tài khoản</Label>
                  <Input
                    id="accountNumber"
                    {...registerSettings("bankingInfo.accountNumber")}
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="accountHolder">Chủ tài khoản</Label>
                  <Input
                    id="accountHolder"
                    {...registerSettings("bankingInfo.accountHolder")}
                    placeholder="NGUYEN VAN A"
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full"
              disabled={updateSettingsMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {updateSettingsMutation.isPending ? 'Đang lưu...' : 'Lưu thông tin liên hệ'}
            </Button>
          </form>
        </TabsContent>

        {/* Advanced Settings Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <form onSubmit={handleSubmitSettings(onSubmitSettings)} className="space-y-6">
            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Cài đặt SEO
                </CardTitle>
                <CardDescription>Tối ưu hóa công cụ tìm kiếm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...registerSettings("seoSettings.metaTitle")}
                    placeholder="eFootball Store - Cửa hàng tài khoản game uy tín"
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...registerSettings("seoSettings.metaDescription")}
                    placeholder="Mô tả ngắn gọn về website cho công cụ tìm kiếm"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    {...registerSettings("seoSettings.metaKeywords")}
                    placeholder="eFootball, PES, tài khoản game, mua bán"
                  />
                </div>
                <div>
                  <Label htmlFor="ogImage">Open Graph Image URL</Label>
                  <Input
                    id="ogImage"
                    {...registerSettings("seoSettings.ogImage")}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    {...registerSettings("seoSettings.canonicalUrl")}
                    placeholder="https://efootballstore.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Tính năng Website
                </CardTitle>
                <CardDescription>Bật/tắt các tính năng của website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableRegistration"
                      {...registerSettings("features.enableRegistration")}
                      className="rounded"
                    />
                    <Label htmlFor="enableRegistration">Cho phép đăng ký tài khoản</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableCart"
                      {...registerSettings("features.enableCart")}
                      className="rounded"
                    />
                    <Label htmlFor="enableCart">Giỏ hàng</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableReviews"
                      {...registerSettings("features.enableReviews")}
                      className="rounded"
                    />
                    <Label htmlFor="enableReviews">Đánh giá sản phẩm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableNotifications"
                      {...registerSettings("features.enableNotifications")}
                      className="rounded"
                    />
                    <Label htmlFor="enableNotifications">Thông báo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      {...registerSettings("features.maintenanceMode")}
                      className="rounded"
                    />
                    <Label htmlFor="maintenanceMode">Chế độ bảo trì</Label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="maintenanceMessage">Thông báo bảo trì</Label>
                  <Textarea
                    id="maintenanceMessage"
                    {...registerSettings("maintenanceMessage")}
                    placeholder="Website đang trong quá trình bảo trì. Vui lòng quay lại sau!"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full"
              disabled={updateSettingsMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {updateSettingsMutation.isPending ? 'Đang lưu...' : 'Lưu cài đặt nâng cao'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import {
  Settings,
  Image as ImageIcon,
  Upload,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  useAdminSystemSettings,
  useAdminBanners,
  useUpdateLogo,
} from "@/hooks/useAdminSystem";
import { SystemSettings } from "@/types/admin";

interface SystemSettingsFormData {
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    facebook: string;
    youtube: string;
    discord: string;
  };
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

interface LogoFormData {
  logo: FileList;
}

export default function AdminSystemPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Fetch data
  const { data: systemSettings } = useAdminSystemSettings();
  const { data: bannersData } = useAdminBanners();

  // Mutations
  const updateLogoMutation = useUpdateLogo();

  const settings: SystemSettings = systemSettings?.data || {};
  const banners = (bannersData?.data as any[]) || [];

  const { register: registerSettings, handleSubmit: handleSubmitSettings } =
    useForm<SystemSettingsFormData>();
  const { register: registerLogo, handleSubmit: handleSubmitLogo } =
    useForm<LogoFormData>();

  const onSubmitSettings = async (data: SystemSettingsFormData) => {
    try {
      console.log("Updating system settings:", data);
      // API call to update settings
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const onSubmitLogo = async (data: LogoFormData) => {
    try {
      if (data.logo && data.logo[0]) {
        const formData = new FormData();
        formData.append("logo", data.logo[0]);
        updateLogoMutation.mutate(formData);
      }
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt Hệ thống</h1>
          <p className="text-gray-600">
            Quản lý cài đặt chung và thông tin website
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="branding">
            <ImageIcon className="h-4 w-4 mr-2" />
            Logo & Branding
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Thông tin liên hệ
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Globe className="h-4 w-4 mr-2" />
            Bảo trì
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung Website</CardTitle>
              <CardDescription>Thông tin cơ bản về website</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitSettings(onSubmitSettings)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="siteName">Tên website</Label>
                  <Input
                    id="siteName"
                    {...registerSettings("siteName")}
                    placeholder="eFootball Store"
                    defaultValue={settings.siteName}
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription">Mô tả website</Label>
                  <Textarea
                    id="siteDescription"
                    {...registerSettings("siteDescription")}
                    placeholder="Cửa hàng tài khoản eFootball uy tín nhất Việt Nam"
                    defaultValue={settings.siteDescription}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="siteKeywords">Từ khóa SEO</Label>
                  <Input
                    id="siteKeywords"
                    {...registerSettings("siteKeywords")}
                    placeholder="eFootball, PES, tài khoản game, mua bán"
                    defaultValue={settings.siteKeywords}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Trạng thái website
                </CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Chế độ bảo trì
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">Tắt</div>
                <p className="text-xs text-muted-foreground">
                  Website đang mở cho công chúng
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Website</CardTitle>
              <CardDescription>Cập nhật logo chính của website</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitLogo(onSubmitLogo)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="logo">Chọn logo mới</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    {...registerLogo("logo")}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Định dạng: PNG, JPG, SVG. Kích thước khuyến nghị: 200x60px
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={updateLogoMutation.isPending}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {updateLogoMutation.isPending
                    ? "Đang tải lên..."
                    : "Cập nhật Logo"}
                </Button>
              </form>

              {/* Current Logo Preview */}
              <div className="mt-6 p-4 border rounded-lg">
                <Label className="text-sm font-medium">Logo hiện tại:</Label>
                <div className="mt-2 flex items-center justify-center h-20 bg-gray-50 border rounded">
                  <span className="text-2xl font-bold text-blue-600">
                    eFootball Store
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Info */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>
                Cập nhật thông tin liên hệ và mạng xã hội
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitSettings(onSubmitSettings)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email liên hệ</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contactEmail"
                        type="email"
                        {...registerSettings("contactEmail")}
                        placeholder="contact@efootballstore.com"
                        className="pl-10"
                        defaultValue={settings.contactEmail}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contactPhone"
                        {...registerSettings("contactPhone")}
                        placeholder="0123456789"
                        className="pl-10"
                        defaultValue={settings.contactPhone}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactAddress">Địa chỉ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="contactAddress"
                      {...registerSettings("contactAddress")}
                      placeholder="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
                      className="pl-10"
                      defaultValue={settings.contactAddress}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Mạng xã hội</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="facebook" className="text-sm">
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        {...registerSettings("socialLinks.facebook")}
                        placeholder="https://facebook.com/..."
                        defaultValue={settings.socialLinks?.facebook}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube" className="text-sm">
                        YouTube
                      </Label>
                      <Input
                        id="youtube"
                        {...registerSettings("socialLinks.youtube")}
                        placeholder="https://youtube.com/..."
                        defaultValue={settings.socialLinks?.youtube}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord" className="text-sm">
                        Discord
                      </Label>
                      <Input
                        id="discord"
                        {...registerSettings("socialLinks.discord")}
                        placeholder="https://discord.gg/..."
                        defaultValue={settings.socialLinks?.discord}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thông tin liên hệ
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chế độ bảo trì</CardTitle>
              <CardDescription>Bật/tắt chế độ bảo trì website</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitSettings(onSubmitSettings)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    {...registerSettings("maintenanceMode")}
                    className="rounded"
                  />
                  <Label htmlFor="maintenanceMode">Bật chế độ bảo trì</Label>
                </div>

                <div>
                  <Label htmlFor="maintenanceMessage">Thông báo bảo trì</Label>
                  <Textarea
                    id="maintenanceMessage"
                    {...registerSettings("maintenanceMessage")}
                    placeholder="Website đang trong quá trình bảo trì. Vui lòng quay lại sau."
                    defaultValue={settings.maintenanceMessage}
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-800">
                      Lưu ý quan trọng
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Khi bật chế độ bảo trì, tất cả người dùng (trừ admin) sẽ
                    không thể truy cập website. Chỉ bật khi thực sự cần thiết.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Cập nhật cài đặt bảo trì
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

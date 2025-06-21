"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MessageCircle,
  Facebook,
  Copy,
  CheckCircle,
  QrCode,
  Heart,
  Star,
  Shield,
  Clock,
  Award,
  Sparkles,
  X,
  ChevronRight,
  // Zap,
  // Globe,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { ApiGameAccount } from "@/types";
import { useSystemSettings } from "@/hooks/useSystem";
// import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ApiGameAccount;
}

interface SystemSettings {
  contactPhone?: string;
  zaloLink?: string;
  facebookLink?: string;
  paymentQR?: string;
  zaloQR?: string;
  facebookQR?: string;
}

export default function PurchaseModal({
  isOpen,
  onClose,
}: // account,
PurchaseModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { data: settingsData } = useSystemSettings();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };
    checkMobile();
  }, []);

  // Parse settings data with proper type safety
  const settings = (settingsData?.data || {}) as SystemSettings;

  const contactInfo = {
    phone: settings.contactPhone || "0395860670",
    zalo: settings.zaloLink || "https://zalo.me/0395860670",
    facebook:
      settings.facebookLink || "https://www.facebook.com/tran.hiep.229430",
    qrPayment: settings.paymentQR || "/QR_ThanhToan.png",
    qrZalo: settings.zaloQR || "/api/placeholder/150/150",
    qrFacebook: settings.facebookQR || "/api/placeholder/150/150",
  };

  // const formatPrice = (price: number) => {
  //   const priceStr = price.toString();
  //   if (priceStr.length <= 3) {
  //     return `${price} đ`;
  //   }

  //   const firstDigit = priceStr[0];
  //   const remainingLength = priceStr.length - 1;

  //   // Create pattern from right to left
  //   let pattern = '';
  //   for (let i = 0; i < remainingLength; i++) {
  //     if (i > 0 && i % 3 === 0) {
  //       pattern = '.' + pattern;
  //     }
  //     pattern = 'x' + pattern;
  //   }

  //   return `${firstDigit}${pattern} đ`;
  // };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      toast.success(`Đã copy ${label}!`);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      toast.error("Không thể copy!");
    }
  };

  const handleContactClick = (type: string, value: string) => {
    if (type === "phone") {
      window.open(`tel:${value}`, "_self");
    } else if (type === "zalo") {
      window.open(value, "_blank");
    } else if (type === "facebook") {
      window.open(value, "_blank");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-4xl max-h-[85vh] overflow-hidden p-0 bg-transparent border-0 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Animated Header */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-md p-4 sm:p-5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse z-0 pointer-events-none" />

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full transition-all duration-300 backdrop-blur-sm z-100"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative z-1 flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 animate-spin" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold leading-tight">
                    Thanh toán & Liên hệ
                  </h2>
                  <p className="text-sm text-white/90">
                    Quét mã QR hoặc liên hệ trực tiếp để mua tài khoản premium
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(85vh-160px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 pr-2">
              <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
                {/* Account Info Card - Enhanced */}

                {/* Enhanced Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Enhanced QR Payment Section */}
                  <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                    <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 h-2"></div>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <QrCode className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          Quét mã QR thanh toán
                        </h3>
                      </div>

                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative group">
                          {contactInfo.qrPayment &&
                          contactInfo.qrPayment !== "" ? (
                            <div className="relative">
                              <Image
                                src={contactInfo.qrPayment}
                                alt="QR Code Thanh toán"
                                width={200}
                                height={200}
                                className="rounded-2xl border-4 border-green-200 shadow-2xl bg-white p-4 mx-auto group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          ) : (
                            <div className="w-48 h-48 bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100 rounded-2xl border-4 border-green-200 shadow-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                              <QrCode className="h-16 w-16 text-green-400" />
                            </div>
                          )}
                        </div>

                        <div className="text-center space-y-4">
                          <p className="text-green-700 font-semibold text-base">
                            Quét mã QR để chuyển khoản trực tiếp
                          </p>
                          <div className="space-y-3">
                            <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-base rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105">
                              <CreditCard className="h-5 w-5 mr-2" />
                              Chuyển khoản ngay
                            </Button>
                            <p className="text-sm text-gray-500">
                              Hỗ trợ tất cả ngân hàng trong nước
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Contact Section */}
                  <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-2"></div>
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 rounded-xl shadow-xl">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                          Liên hệ trực tiếp
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* Enhanced Phone */}
                        <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-50 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl group">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 via-cyan-600 to-sky-600 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Phone className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-800 text-base mb-1">
                                Hotline 24/7
                              </p>
                              <p className="text-blue-600 font-semibold text-sm">
                                {contactInfo.phone}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Tư vấn miễn phí
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    contactInfo.phone,
                                    "số điện thoại"
                                  )
                                }
                                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm h-8"
                              >
                                {copiedText === "số điện thoại" ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              {isMobile && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleContactClick(
                                      "phone",
                                      contactInfo.phone
                                    )
                                  }
                                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm h-8"
                                >
                                  <Phone className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Zalo */}
                        <div
                          className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-green-200 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group hover:scale-102 transform"
                          onClick={() =>
                            handleContactClick("zalo", contactInfo.zalo)
                          }
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-800 text-base mb-1">
                                Zalo Chat
                              </p>
                              <p className="text-green-600 font-semibold text-sm">
                                Chat trực tiếp với admin
                              </p>
                              <p className="text-gray-500 text-xs">
                                Phản hồi trong 2 phút
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Enhanced Facebook */}
                        <div
                          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-4 border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group hover:scale-102 transform"
                          onClick={() =>
                            handleContactClick("facebook", contactInfo.facebook)
                          }
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Facebook className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-800 text-base mb-1">
                                Facebook
                              </p>
                              <p className="text-indigo-600 font-semibold text-sm">
                                Nhắn tin Messenger
                              </p>
                              <p className="text-gray-500 text-xs">
                                Hỗ trợ 24/7
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-orange-200">
                        <p className="text-center text-sm text-gray-700 font-medium mb-3">
                          🚀 Đặt mua nhanh chóng
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="border-orange-300 text-orange-700 hover:bg-orange-100 rounded-lg text-sm py-2"
                            onClick={() =>
                              handleContactClick("zalo", contactInfo.zalo)
                            }
                          >
                            Chat Zalo
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg text-sm py-2"
                            onClick={() =>
                              handleContactClick(
                                "facebook",
                                contactInfo.facebook
                              )
                            }
                          >
                            Messenger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Trust Badges */}
                <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                      <p className="text-gray-800 font-bold text-lg sm:text-xl">
                        Cảm ơn bạn đã tin tưởng eFootball Store!
                      </p>
                      <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      Hàng ngàn khách hàng đã tin tưởng và lựa chọn chúng tôi
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Badge className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold justify-center hover:scale-105 transform">
                      <Shield className="h-4 w-4 mr-2" />
                      Uy tín #1
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-500 via-cyan-600 to-sky-600 text-white px-4 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold justify-center hover:scale-105 transform">
                      <Clock className="h-4 w-4 mr-2" />
                      Giao nhanh 2h
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white px-4 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold justify-center hover:scale-105 transform">
                      <Award className="h-4 w-4 mr-2" />
                      Bảo hành vĩnh viễn
                    </Badge>
                    <Badge className="bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 text-white px-4 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold justify-center hover:scale-105 transform">
                      <Star className="h-4 w-4 mr-2" />
                      5⭐ Rating
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <p className="text-2xl font-bold text-gray-800">10K+</p>
                      <p className="text-xs text-gray-600">Khách hàng</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <p className="text-2xl font-bold text-gray-800">99.9%</p>
                      <p className="text-xs text-gray-600">Hài lòng</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <p className="text-2xl font-bold text-gray-800">24/7</p>
                      <p className="text-xs text-gray-600">Hỗ trợ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

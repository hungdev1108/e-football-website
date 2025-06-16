'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import { toast } from "sonner";
import { ApiGameAccount } from "@/types";
import { useSystemSettings } from "@/hooks/useSystem";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ApiGameAccount;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  account,
}: PurchaseModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { data: settingsData } = useSystemSettings();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  // Parse settings data
  const settings = settingsData?.data || {};
  const settingsObject = settings;

  const contactInfo = {
    phone: settingsObject.contactPhone || "0395860670",
    zalo: settingsObject.zaloLink || "https://zalo.me/0395860670",
    facebook: settingsObject.facebookLink || "https://facebook.com/efootballstore",
    qrPayment: settingsObject.paymentQR || "/api/placeholder/200/200",
    qrZalo: settingsObject.zaloQR || "/api/placeholder/150/150",
    qrFacebook: settingsObject.facebookQR || "/api/placeholder/150/150",
  };

  const formatPrice = (price: number) => {
    const priceStr = price.toString();
    if (priceStr.length <= 3) {
      return `${price} đ`;
    }
    
    const firstDigit = priceStr[0];
    const remainingLength = priceStr.length - 1;
    
    // Create pattern from right to left
    let pattern = '';
    for (let i = 0; i < remainingLength; i++) {
      if (i > 0 && i % 3 === 0) {
        pattern = '.' + pattern;
      }
      pattern = 'x' + pattern;
    }
    
    return `${firstDigit}${pattern} đ`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      toast.success(`Đã copy ${label}!`);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
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
      <DialogContent className="max-w-4xl w-[85vw] max-h-[80vh] overflow-y-auto p-0 bg-white border-0 shadow-2xl [&>button]:hidden scrollbar-thin">
        {/* Header với nút X duy nhất */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Thanh toán & Liên hệ</h2>
              <p className="text-blue-100 text-sm">Quét mã QR hoặc liên hệ trực tiếp để mua tài khoản</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Account Info Card */}
          <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Image Section - Full Width */}
              <div className="relative w-full">
                {account.images && account.images.length > 0 && account.images[0]?.url ? (
                  <Image
                    src={getImageUrl(account.images[0].url)}
                    alt={account.images[0].alt || account.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getPlaceholderUrl(400, 200, 'No Image');
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Star className="h-16 w-16 text-white" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs px-2 py-1 rounded-full shadow-lg">
                    HOT
                  </Badge>
                </div>
              </div>
              
              {/* Content Section - Below Image */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {account.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {account.description}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base px-4 py-2 rounded-full shadow-lg">
                    💰 {formatPrice(account.price)}
                  </Badge>
                  <Badge variant="outline" className="border border-blue-300 text-blue-700 px-3 py-2 rounded-full bg-blue-50 text-sm">
                    🏦 Hỗ trợ trả góp
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* QR Payment Section */}
            <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1"></div>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Quét mã QR thanh toán
                  </h3>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    {contactInfo.qrPayment && contactInfo.qrPayment !== "" ? (
                      <Image
                        src={contactInfo.qrPayment}
                        alt="QR Code Thanh toán"
                        width={160}
                        height={160}
                        className="rounded-xl border-2 border-green-200 shadow-lg bg-white p-2 mx-auto"
                      />
                    ) : (
                      <div className="w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border-2 border-green-200 shadow-lg flex items-center justify-center mx-auto">
                        <QrCode className="h-14 w-14 text-green-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="text-green-700 font-medium text-sm">
                      Quét mã QR để chuyển khoản trực tiếp
                    </p>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 text-sm rounded-full shadow-lg transition-all duration-300">
                      💳 Chuyển khoản ngay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Liên hệ trực tiếp
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Phone */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg shadow-lg flex-shrink-0">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">Hotline</p>
                        <p className="text-blue-600 font-medium text-xs truncate">{contactInfo.phone}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(contactInfo.phone, "số điện thoại")}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 px-2 py-1 rounded-lg shadow-lg transition-all duration-300 text-xs h-6"
                        >
                          {copiedText === "số điện thoại" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        {isMobile && (
                          <Button
                            size="sm"
                            onClick={() => handleContactClick("phone", contactInfo.phone)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-2 py-1 rounded-lg shadow-lg transition-all duration-300 text-xs h-6"
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Zalo */}
                  <div 
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    onClick={() => handleContactClick("zalo", contactInfo.zalo)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">Zalo</p>
                        <p className="text-green-600 font-medium text-xs">Chat trực tiếp</p>
                      </div>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div 
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    onClick={() => handleContactClick("facebook", contactInfo.facebook)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg flex-shrink-0">
                        <Facebook className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">Facebook</p>
                        <p className="text-indigo-600 font-medium text-xs">Nhắn tin Messenger</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Badges */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-xl p-4 border border-orange-200 shadow-lg">
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <p className="text-gray-800 font-bold text-sm">Cảm ơn bạn đã tin tướng eFootball Store!</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Uy tín hàng đầu
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Giao hàng nhanh
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs">
                <Award className="h-3 w-3 mr-1" />
                Bảo hành tài khoản
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs">
                <Star className="h-3 w-3 mr-1" />
                Chất lượng cao
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
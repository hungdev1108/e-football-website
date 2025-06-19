"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users } from "lucide-react";

interface FeaturesSectionProps {
  className?: string;
}

export const FeaturesSection = memo(function FeaturesSection({
  className,
}: FeaturesSectionProps) {
  return (
    <section
      className={`py-8 md:py-20 px-4 lg:px-6 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 relative overflow-hidden ${
        className || ""
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
            Tại sao chọn chúng tôi?
          </h3>
          <p className="text-sm md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            Khám phá những ưu điểm vượt trội khi sử dụng dịch vụ của EFOOTBALL
            Store
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-64 md:h-80">
            <CardContent className="p-4 md:p-8 text-center h-full flex flex-col justify-center">
              <Shield className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-green-400" />
              <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                Bảo mật tuyệt đối
              </h4>
              <p className="text-blue-100 leading-relaxed text-sm md:text-base line-clamp-3">
                Cam kết bảo mật thông tin khách hàng 100%. Tài khoản được kiểm
                tra kỹ lưỡng trước khi giao dịch.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-64 md:h-80">
            <CardContent className="p-4 md:p-8 text-center h-full flex flex-col justify-center">
              <Zap className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-yellow-400" />
              <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                Giao dịch tức thì
              </h4>
              <p className="text-blue-100 leading-relaxed text-sm md:text-base line-clamp-3">
                Nhận tài khoản ngay lập tức sau khi thanh toán thành công. Hỗ
                trợ 24/7 mọi lúc mọi nơi.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-64 md:h-80">
            <CardContent className="p-4 md:p-8 text-center h-full flex flex-col justify-center">
              <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-blue-400" />
              <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                Cộng đồng lớn
              </h4>
              <p className="text-blue-100 leading-relaxed text-sm md:text-base line-clamp-3">
                Hơn 10,000 game thủ tin tưởng và sử dụng dịch vụ của chúng tôi
                mỗi tháng.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

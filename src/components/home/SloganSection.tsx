"use client";

import { memo } from "react";
import { Shield, Star, DollarSign } from "lucide-react";

interface SloganSectionProps {
  className?: string;
}

export const SloganSection = memo(function SloganSection({
  className,
}: SloganSectionProps) {
  const slogans = [
    {
      icon: Shield,
      title: "UY TÍN",
      description: "Cam kết chất lượng dịch vụ đáng tin cậy",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: Star,
      title: "CHẤT LƯỢNG",
      description: "Sản phẩm và dịch vụ đạt tiêu chuẩn cao",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100"
    },
    {
      icon: DollarSign,
      title: "GIÁ RẺ",
      description: "Giá cả hợp lý, phù hợp mọi túi tiền",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100"
    }
  ];

  return (
    <section className={`relative w-full py-3 md:py-6 ${className || ""}`}>
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {slogans.map((slogan, index) => {
            const IconComponent = slogan.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-lg md:rounded-2xl p-2 md:p-8 shadow-sm md:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${slogan.hoverColor} border border-gray-100`}
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className={`inline-flex items-center justify-center w-8 h-8 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${slogan.color} mb-1 md:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-sm md:shadow-lg`}>
                    <IconComponent className="w-4 h-4 md:w-10 md:h-10 text-white" strokeWidth={2} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xs md:text-2xl font-bold text-gray-800 mb-1 md:mb-3 tracking-wide leading-tight">
                    {slogan.title}
                  </h3>
                  
                  {/* Description - Hidden on mobile */}
                  <p className="hidden md:block text-base text-gray-600 leading-relaxed font-medium">
                    {slogan.description}
                  </p>
                  
                  {/* Decorative line - Hidden on mobile */}
                  <div className={`hidden md:block w-12 h-1 bg-gradient-to-r ${slogan.color} rounded-full mx-auto mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
                
                {/* Decorative elements - Hidden on mobile */}
                <div className="hidden md:block absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="hidden md:block absolute bottom-4 left-4 w-1 h-1 bg-gray-300 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom decorative line - Hidden on mobile */}
        <div className="hidden md:flex mt-12 justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
}); 
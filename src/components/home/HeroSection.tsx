"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, LoaderIcon } from "lucide-react";
import { useBanners } from "@/hooks/useSystem";
import { ApiBanner } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = memo(function HeroSection({
  className,
}: HeroSectionProps) {
  const { data: bannersData, isLoading: loadingBanners } = useBanners();

  const banners =
    bannersData?.data?.filter((banner: ApiBanner) => banner.isActive) || [];

  return (
    <section
      className={`relative h-[550px] md:h-[800px] overflow-hidden ${
        className || ""
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <TrendingUp className="w-5 h-5 mr-3 text-yellow-400" />
              <span className="text-base font-bold">
                UY TÍN - CHẤT LƯỢNG - GIÁ RẺ
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                SHOP ACC EFOOTBALL
              </span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-300 mt-4 block">
                MUA BÁN ACC - NẠP COIN
              </span>
            </h2>

            <div className="space-y-4 text-lg md:text-xl leading-relaxed">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 font-bold">
                  UY TÍN - CHẤT LƯỢNG - GIÁ RẺ
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-bold">
                  Số điện thoại - Zalo: 0395860670
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span className="text-blue-300 font-bold">
                  Số tài khoản ngân hàng: 196666196666
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <span className="text-orange-300 font-bold">
                  TRAN DINH HIEP - MB BANK
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-10 py-5 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/accounts" className="flex items-center">
                  Khám phá ngay
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg px-10 py-5 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Liên hệ ngay</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Display banners if available */}
          <div className="hidden lg:block">
            {loadingBanners ? (
              <div className="flex items-center justify-center h-96">
                <LoaderIcon className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : banners.length > 0 ? (
              <div className="relative">
                <Image
                  src={
                    banners[0].image
                      ? getImageUrl(banners[0].image)
                      : getPlaceholderUrl(500, 384)
                  }
                  alt={banners[0].title}
                  width={500}
                  height={384}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-white font-bold text-lg">
                    {banners[0].title}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">⚽</div>
                    <div className="text-xl font-bold">eFootball Store</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

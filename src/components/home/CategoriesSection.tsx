"use client";

import { memo } from "react";
import Link from "next/link";
// import { useCategories } from "@/hooks/useAccounts";

interface CategoriesSectionProps {
  className?: string;
}

export const CategoriesSection = memo(function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  // const { data: categoriesData, isLoading: loadingCategories } =
  //   useCategories();

  return (
    <section className={`py-8 md:py-20 px-4 lg:px-6 ${className || ""}`}>
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h3
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight py-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2"
            style={{
              fontFamily: "Inter, Roboto, Noto Sans, Arial, sans-serif",
            }}
          >
            Tài khoản theo khoảng giá
          </h3>
          <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Khám phá các loại tài khoản game đa dạng với mức giá phù hợp cho mọi
            nhu cầu của bạn
          </p>
        </div>

        {/* {loadingCategories ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : ( */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-100/50">
            <div className="relative p-6 md:p-8 text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-200/20 to-emerald-200/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-4xl md:text-6xl mb-4 md:mb-6 transform-gpu will-change-transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 filter drop-shadow-lg">
                💸
              </div>
                <h4 className="font-bold text-xl md:text-2xl mb-3 md:mb-4 text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                2trxx - 4trxx
              </h4>
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
                  <span className="text-xs md:text-sm bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    🎯 Phổ biến
                  </span>
                  <span className="text-xs md:text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    ⚡ Nhanh
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-600 mb-5 md:mb-6 leading-relaxed">
                Tài khoản chất lượng, giá hợp lý cho người mới bắt đầu hoặc muốn
                  trải nghiệm. Đội hình cơ bản với các cầu thủ ổn định.
              </p>
              <Link
                href="/accounts?minPrice=2000000&maxPrice=4000000"
                  className="inline-flex items-center justify-center px-4 py-2 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                  <span className="hidden md:inline">Xem tài khoản</span>
                  <span className="md:hidden">Xem</span>
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-amber-50 via-white to-purple-50 border border-amber-100/50">
            <div className="relative p-6 md:p-8 text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-200/20 to-amber-200/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-4xl md:text-6xl mb-4 md:mb-6 transform-gpu will-change-transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 filter drop-shadow-lg">
                🏆
              </div>
                <h4 className="font-bold text-xl md:text-2xl mb-3 md:mb-4 text-slate-800 group-hover:text-amber-600 transition-colors duration-300">
                4trxx - 6trxx
              </h4>
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
                  <span className="text-xs md:text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    🔥 Hot
                  </span>
                  <span className="text-xs md:text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    💎 Chất lượng
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-600 mb-5 md:mb-6 leading-relaxed">
                Tài khoản mạnh, nhiều chỉ số cao, phù hợp cho game thủ muốn nâng
                  cấp trải nghiệm. Đội hình cân bằng với nhiều lựa chọn.
              </p>
              <Link
                href="/accounts?minPrice=4000000&maxPrice=6000000"
                  className="inline-flex items-center justify-center px-4 py-2 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                  <span className="hidden md:inline">Xem tài khoản</span>
                  <span className="md:hidden">Xem</span>
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-rose-50 via-white to-indigo-50 border border-rose-100/50">
            <div className="relative p-6 md:p-8 text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-200/30 to-indigo-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-red-200/20 to-rose-200/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-4xl md:text-6xl mb-4 md:mb-6 transform-gpu will-change-transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 filter drop-shadow-lg">
                👑
              </div>
                <h4 className="font-bold text-xl md:text-2xl mb-3 md:mb-4 text-slate-800 group-hover:text-rose-600 transition-colors duration-300">
                6trxx - 10trxx
              </h4>
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
                  <span className="text-xs md:text-sm bg-gradient-to-r from-rose-500 to-red-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    👑 VIP
                  </span>
                  <span className="text-xs md:text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-full font-medium shadow-md">
                    🚀 Đỉnh cao
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-600 mb-5 md:mb-6 leading-relaxed">
                Tài khoản VIP, chỉ số cực cao, đội hình khủng dành cho game thủ
                  đỉnh cao. Sở hữu những cầu thủ huyền thoại.
              </p>
              <Link
                href="/accounts?minPrice=6000000&maxPrice=10000000"
                  className="inline-flex items-center justify-center px-4 py-2 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold hover:from-rose-600 hover:to-red-600 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                  <span className="hidden md:inline">Xem tài khoản</span>
                  <span className="md:hidden">Xem</span>
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </Link>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
});

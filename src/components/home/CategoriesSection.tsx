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
    <section className={`py-20 px-4 lg:px-6 ${className || ""}`}>
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h3
            className="text-4xl md:text-5xl font-bold leading-tight py-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2"
            style={{
              fontFamily: "Inter, Roboto, Noto Sans, Arial, sans-serif",
            }}
          >
            Tài khoản theo khoảng giá
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá các loại tài khoản game đa dạng với mức giá phù hợp cho mọi
            nhu cầu của bạn
          </p>
        </div>

        {/* {loadingCategories ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : ( */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm card-hover-smooth perf-layer rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="p-8 text-center">
              <div className="text-5xl mb-6 transform-gpu will-change-transform transition-transform duration-200 ease-out group-hover:scale-110">
                💸
              </div>
              <h4 className="font-bold text-xl mb-3 text-slate-800 text-hover-smooth group-hover:text-blue-600">
                2trxx - 4trxx
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Tài khoản chất lượng, giá hợp lý cho người mới bắt đầu hoặc muốn
                trải nghiệm.
              </p>
              <Link
                href="/accounts?minPrice=2000000&maxPrice=4000000"
                className="inline-block mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Xem tài khoản
              </Link>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm card-hover-smooth perf-layer rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="p-8 text-center">
              <div className="text-5xl mb-6 transform-gpu will-change-transform transition-transform duration-200 ease-out group-hover:scale-110">
                🏆
              </div>
              <h4 className="font-bold text-xl mb-3 text-slate-800 text-hover-smooth group-hover:text-blue-600">
                4trxx - 6trxx
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Tài khoản mạnh, nhiều chỉ số cao, phù hợp cho game thủ muốn nâng
                cấp trải nghiệm.
              </p>
              <Link
                href="/accounts?minPrice=4000000&maxPrice=6000000"
                className="inline-block mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Xem tài khoản
              </Link>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm card-hover-smooth perf-layer rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="p-8 text-center">
              <div className="text-5xl mb-6 transform-gpu will-change-transform transition-transform duration-200 ease-out group-hover:scale-110">
                👑
              </div>
              <h4 className="font-bold text-xl mb-3 text-slate-800 text-hover-smooth group-hover:text-blue-600">
                6trxx - 10trxx
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Tài khoản VIP, chỉ số cực cao, đội hình khủng dành cho game thủ
                đỉnh cao.
              </p>
              <Link
                href="/accounts?minPrice=6000000&maxPrice=10000000"
                className="inline-block mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Xem tài khoản
              </Link>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
});

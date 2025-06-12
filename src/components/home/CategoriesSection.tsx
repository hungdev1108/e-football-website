"use client";

import { memo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";
import { useCategories } from "@/hooks/useAccounts";
import { ApiCategory } from "@/types";

interface CategoriesSectionProps {
  className?: string;
}

export const CategoriesSection = memo(function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();
  const categories = categoriesData?.data || [];

  return (
    <section className={`py-20 px-4 lg:px-6 ${className || ""}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Danh mục tài khoản
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá các loại tài khoản game đa dạng với mức giá phù hợp cho mọi
            nhu cầu của bạn
          </p>
        </div>

        {loadingCategories ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category: ApiCategory) => (
              <Link
                key={category._id}
                href={`/accounts?category=${category._id}`}
              >
                <Card className="group cursor-pointer border-0 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm card-hover-smooth perf-layer">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-6 transform-gpu will-change-transform transition-transform duration-200 ease-out group-hover:scale-110">
                      {category.icon || "🎮"}
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-slate-800 text-hover-smooth group-hover:text-blue-600">
                      {category.name}
                    </h4>
                    {category.description && (
                      <p className="text-sm text-slate-600 mb-4">
                        {category.description}
                      </p>
                    )}
                    {category.accountCount !== undefined && (
                      <div className="text-xs text-slate-500">
                        {category.accountCount} tài khoản
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

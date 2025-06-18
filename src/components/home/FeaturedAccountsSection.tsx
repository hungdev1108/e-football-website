"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useFeaturedAccounts } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface FeaturedAccountsSectionProps {
  className?: string;
}

// Memoized helper functions outside component
const formatPrice = (price: number): string => {
  if (price === -1) {
    return "📞 Liên hệ";
  }

  const priceStr = price.toString();
  if (priceStr.length <= 3) {
    return `${price} đ`;
  }

  const firstDigit = priceStr[0];
  const remainingStr = priceStr.slice(1);

  // Tạo pattern từ phải sang trái theo chuẩn định dạng tiền tệ
  let pattern = "";
  for (let i = 0; i < remainingStr.length; i++) {
    if (i > 0 && (remainingStr.length - i) % 3 === 0) {
      pattern += ".";
    }
    pattern += "x";
  }

  return `${firstDigit}${pattern} đ`;
};

const getPlatformIcon = (platform: string): string => {
  switch (platform) {
    case "steam":
      return "💻";
    case "mobile":
      return "📱";
    case "ps4":
    case "ps5":
      return "🎮";
    case "xbox":
      return "🎮";
    default:
      return "🎮";
  }
};

const getPlatformLabel = (platform: string): string => {
  switch (platform) {
    case "steam":
      return "Steam PC";
    case "mobile":
      return "Mobile";
    case "ps4":
      return "PlayStation 4";
    case "ps5":
      return "PlayStation 5";
    case "xbox":
      return "Xbox";
    default:
      return platform;
  }
};

export const FeaturedAccountsSection = memo(function FeaturedAccountsSection({
  className,
}: FeaturedAccountsSectionProps) {
  const { data: featuredAccountsData, isLoading: loadingAccounts } =
    useFeaturedAccounts(8);

  // Memoize the accounts array
  const featuredAccounts = useMemo(() => {
    return featuredAccountsData?.data || [];
  }, [featuredAccountsData?.data]);

  return (
    <section
      className={`py-8 md:py-20 px-4 lg:px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden ${
        className || ""
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h3
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight py-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2"
            style={{
              fontFamily: "Inter, Roboto, Noto Sans, Arial, sans-serif",
            }}
          >
            Tài khoản nổi bật
          </h3>
          <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Những tài khoản game chất lượng cao được chọn lọc kỹ càng
          </p>
        </div>

        {loadingAccounts ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredAccounts.map((account: ApiGameAccount) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 text-sm md:text-lg px-4 py-2 md:px-8 md:py-6"
            asChild
          >
            <Link href="/accounts">
              <span className="hidden md:inline">Xem tất cả tài khoản</span>
              <span className="md:hidden">Xem tất cả</span>
              <svg
                className="ml-2 w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

// Separate memoized component for account card
const AccountCard = memo(function AccountCard({
  account,
}: {
  account: ApiGameAccount;
}) {
  return (
    <Link href={`/accounts/${account._id}`}>
      <Card className="group cursor-pointer overflow-hidden border-0 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl p-0 h-[280px] md:h-[350px] flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={
              getImageUrl(account.images[0]?.url) || getPlaceholderUrl(300, 200)
            }
            alt={account.images[0]?.alt || account.title}
            width={300}
            height={192}
            className="w-full h-32 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Platform badge */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <Badge
              variant="secondary"
              className="bg-white/95 backdrop-blur-sm text-slate-700 text-xs md:text-sm shadow-md border-0"
            >
              <span className="md:hidden">
                {getPlatformIcon(account.accountDetails.platform)}
              </span>
              <span className="hidden md:inline">
                {getPlatformIcon(account.accountDetails.platform)}{" "}
                {getPlatformLabel(account.accountDetails.platform)}
              </span>
            </Badge>
          </div>

          {/* Account code badge */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs md:text-sm shadow-md border-0">
              {account.accountCode}
            </Badge>
          </div>

          {/* Sold overlay */}
          {account.status === "sold" && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Badge
                variant="destructive"
                className="text-sm md:text-lg px-3 py-2 md:px-6 md:py-3 bg-red-600 shadow-lg"
              >
                ĐÃ BÁN
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-1 px-3 md:px-4 pt-3 md:pt-4">
          <CardTitle className="text-sm md:text-lg line-clamp-2 md:line-clamp-1 text-slate-800 group-hover:text-blue-600 transition-colors duration-300 font-semibold">
            {account.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs md:text-sm text-slate-500 mt-1 overflow-hidden text-ellipsis">
            {account.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 px-3 md:px-4 pb-3 md:pb-4 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <div className="flex items-center gap-1 md:gap-2 bg-amber-50 px-2 py-1 rounded-lg">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-amber-500 fill-current" />
              <span className="text-xs md:text-sm font-semibold text-amber-700">
                {account.collectiveStrength}
              </span>
            </div>
            <div className={`text-base md:text-xl font-bold ${
              account.price === -1 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            }`}>
              {formatPrice(account.price)}
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm py-1.5 md:py-3 px-2 md:px-4 rounded-lg md:rounded-xl font-semibold mt-auto cursor-pointer"
            disabled={account.status !== "available"}
          >
            <span className="hidden md:inline">
              {account.status === "available"
                ? "Xem chi tiết"
                : "Không khả dụng"}
            </span>
            <span className="md:hidden">
              {account.status === "available" ? "Xem chi tiết" : "Hết hàng"}
            </span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

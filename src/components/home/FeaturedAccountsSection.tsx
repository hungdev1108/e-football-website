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
import { Star, ArrowRight, LoaderIcon } from "lucide-react";
import { useFeaturedAccounts } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface FeaturedAccountsSectionProps {
  className?: string;
}

// Memoized helper functions outside component
const formatPrice = (price: number): string => {
  const priceStr = price.toString();
  if (priceStr.length <= 3) {
    return `${price} đ`;
  }
  
  const firstDigit = priceStr[0];
  const remainingStr = priceStr.slice(1);
  
  // Tạo pattern từ phải sang trái theo chuẩn định dạng tiền tệ
  let pattern = '';
  for (let i = 0; i < remainingStr.length; i++) {
    if (i > 0 && (remainingStr.length - i) % 3 === 0) {
      pattern += '.';
    }
    pattern += 'x';
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
    useFeaturedAccounts(6);

  // Memoize the accounts array
  const featuredAccounts = useMemo(() => {
    return featuredAccountsData?.data || [];
  }, [featuredAccountsData?.data]);

  return (
    <section
      className={`py-20 px-4 lg:px-6 bg-gradient-to-br from-slate-100/50 to-blue-50/30 ${
        className || ""
      }`}
    >
      <div className="container mx-auto">
        <div className="text-center mb-8">
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
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredAccounts.map((account: ApiGameAccount) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 text-lg px-8 py-6"
            asChild
          >
            <Link href="/accounts">
              Xem tất cả tài khoản
              <ArrowRight className="ml-2 w-5 h-5" />
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
      <Card className="group cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm card-hover-smooth perf-layer pt-0">
        <div className="relative overflow-hidden">
          <Image
            src={
              getImageUrl(account.images[0]?.url) || getPlaceholderUrl(300, 200)
            }
            alt={account.images[0]?.alt || account.title}
            width={300}
            height={192}
            className="w-full h-32 md:h-48 object-cover image-scale-smooth"
          />
          <div className="absolute top-2 left-2 md:top-4 md:left-4">
            <Badge variant="secondary" className="bg-white/90 text-slate-700 text-xs md:text-sm">
              <span className="md:hidden">{getPlatformIcon(account.accountDetails.platform)}</span>
              <span className="hidden md:inline">
                {getPlatformIcon(account.accountDetails.platform)}{" "}
                {getPlatformLabel(account.accountDetails.platform)}
              </span>
            </Badge>
          </div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4">
            <Badge className="bg-blue-600 text-xs md:text-sm">{account.accountCode}</Badge>
          </div>
          {account.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm md:text-lg px-2 py-1 md:px-4 md:py-2">
                ĐÃ BÁN
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg line-clamp-2 text-hover-smooth group-hover:text-blue-600">
            {account.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs md:text-sm hidden md:block">
            {account.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 px-3 md:px-6 pb-3 md:pb-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-1 md:gap-2">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current" />
              <span className="text-xs md:text-sm font-medium">
                {account.collectiveStrength}
              </span>
            </div>
            <div className="text-sm md:text-xl font-bold text-blue-600">
              {formatPrice(account.price)}
            </div>
          </div>

          <Button
            className="w-full mt-2 md:mt-4 button-hover-smooth group-hover:bg-blue-700 text-xs md:text-sm py-2 md:py-3"
            disabled={account.status !== "available"}
          >
            {account.status === "available" ? "Xem chi tiết" : "Không khả dụng"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

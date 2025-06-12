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
import { Star, Users, ArrowRight, LoaderIcon } from "lucide-react";
import { useFeaturedAccounts } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";

interface FeaturedAccountsSectionProps {
  className?: string;
}

// Memoized helper functions outside component
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
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
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Tài khoản nổi bật
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Những tài khoản game chất lượng cao được chọn lọc kỹ càng
          </p>
        </div>

        {loadingAccounts ? (
          <div className="flex items-center justify-center h-64">
            <LoaderIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <Card className="group cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm card-hover-smooth perf-layer">
        <div className="relative overflow-hidden">
          <Image
            src={account.images[0]?.url || "/api/placeholder/300/200"}
            alt={account.images[0]?.alt || account.title}
            width={300}
            height={192}
            className="w-full h-48 object-cover image-scale-smooth"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-slate-700">
              {getPlatformIcon(account.accountDetails.platform)}{" "}
              {getPlatformLabel(account.accountDetails.platform)}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600">{account.accountCode}</Badge>
          </div>
          {account.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                ĐÃ BÁN
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-2 text-hover-smooth group-hover:text-blue-600">
            {account.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {account.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">
                {account.collectiveStrength}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                Level {account.accountDetails.level}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(account.price)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {account.seller.username}
              </div>
              <div className="text-xs text-gray-500">
                {account.views} lượt xem
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-4 button-hover-smooth group-hover:bg-blue-700"
            disabled={account.status !== "available"}
          >
            {account.status === "available" ? "Xem chi tiết" : "Không khả dụng"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/effects/TiltCard";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/effects/ScrollReveal";
import { useFeaturedAccounts } from "@/hooks/useAccounts";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";

interface FeaturedAccountsSectionProps {
  className?: string;
}

const formatPrice = (price: number): string => {
  if (price === -1) return "📞 Liên hệ";
  const priceStr = price.toString();
  if (priceStr.length <= 3) return `${price} đ`;
  const firstDigit = priceStr[0];
  const remainingStr = priceStr.slice(1);
  let pattern = "";
  for (let i = 0; i < remainingStr.length; i++) {
    if (i > 0 && (remainingStr.length - i) % 3 === 0) pattern += ".";
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
    useFeaturedAccounts(999);

  const featuredAccounts = useMemo(
    () => featuredAccountsData?.data || [],
    [featuredAccountsData?.data],
  );

  return (
    <section
      className={`relative overflow-hidden py-10 md:py-16 ${className || ""}`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <ScrollReveal className="mb-8 text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            ⭐ Featured
          </div>
          <h3 className="py-2 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            <span className="neon-text">Tài khoản nổi bật</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Những tài khoản game chất lượng cao được chọn lọc kỹ càng
          </p>
        </ScrollReveal>

        {loadingAccounts ? (
          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[420px] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
            {featuredAccounts.map((account: ApiGameAccount) => (
              <StaggerItem key={account._id}>
                <AccountCard account={account} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <ScrollReveal className="mt-10 text-center md:mt-14" delay={0.1}>
          <Button variant="glass" size="lg" asChild>
            <Link href="/accounts">
              <span className="hidden md:inline">Xem tất cả tài khoản</span>
              <span className="md:hidden">Xem tất cả</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
});

const AccountCard = memo(function AccountCard({
  account,
}: {
  account: ApiGameAccount;
}) {
  return (
    <Link href={`/accounts/${account._id}`} className="block">
      <TiltCard className="group relative h-[380px] md:h-[420px] rounded-2xl">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl glass transition-all duration-300 group-hover:shadow-[0_20px_60px_-20px_rgb(var(--neon-violet)/0.55)]">
          <div
            className="relative h-40 w-full overflow-hidden bg-muted md:h-44"
            style={{
              backgroundImage: `url(${
                getImageUrl(account.images[0]?.url) ||
                getPlaceholderUrl(640, 295)
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

            <div className="absolute left-3 top-3 md:left-4 md:top-4">
              <Badge className="border-0 bg-background/70 text-foreground text-xs shadow-md backdrop-blur md:text-sm">
                <span className="md:hidden">
                  {getPlatformIcon(account.accountDetails.platform)}
                </span>
                <span className="hidden md:inline">
                  {getPlatformIcon(account.accountDetails.platform)}{" "}
                  {getPlatformLabel(account.accountDetails.platform)}
                </span>
              </Badge>
            </div>

            <div className="absolute right-3 top-3 md:right-4 md:top-4">
              <Badge className="border-0 bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-violet))] text-white text-xs shadow-[0_0_15px_rgb(var(--neon-violet)/0.6)] md:text-sm">
                {account.accountCode}
              </Badge>
            </div>

            {account.status === "sold" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <Badge
                  variant="destructive"
                  className="px-3 py-1.5 text-sm md:px-6 md:py-2.5 md:text-base"
                >
                  ĐÃ BÁN
                </Badge>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
            <h4 className="line-clamp-1 h-5 text-base font-semibold text-foreground transition-colors group-hover:text-[rgb(var(--neon-cyan))] md:h-7 md:text-lg">
              {account.title}
            </h4>
            <p className="mt-1 line-clamp-2 h-10 text-sm leading-5 text-muted-foreground">
              {account.description}
            </p>

            <div className="mt-3 flex items-center justify-between gap-2 md:mt-4">
              <div className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border/50 bg-background/40 px-2 py-1 backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-foreground md:text-sm">
                  {account.collectiveStrength}
                </span>
              </div>
              <div
                className={`flex-shrink-0 text-right text-sm font-bold md:text-lg ${
                  account.price === -1
                    ? "neon-text animate-pulse"
                    : "neon-text"
                }`}
              >
                {formatPrice(account.price)}
              </div>
            </div>

            <Button
              variant="neon"
              className="mt-3 w-full"
              disabled={account.status !== "available"}
            >
              {account.status === "available" ? "Xem chi tiết" : "Không khả dụng"}
            </Button>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
});

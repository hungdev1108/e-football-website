"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Calendar,
  ShoppingCart,
  Heart,
  Share2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Coins,
  Trophy,
  Gamepad2,
  Shield,
  Clock,
  MessageCircle,
  CheckCircle2,
  Zap,
  Phone,
  Tag,
  Monitor,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAccount } from "@/hooks/useAccounts";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiGameAccount } from "@/types";
import { getImageUrl, getPlaceholderUrl } from "@/utils/imageUtils";
import PurchaseModal from "@/components/ui/PurchaseModal";

/* ─── Image Gallery ─── */
const ImageGallery = ({
  images,
  title,
}: {
  images: { url: string; alt?: string }[];
  title: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  // Touch
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50 && current < images.length - 1) setCurrent(current + 1);
    if (d < -50 && current > 0) setCurrent(current - 1);
  };

  // Keyboard
  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        if (e.key === "Escape") setFullscreen(false);
      }
    };
    window.addEventListener("keydown", cb);
    return () => window.removeEventListener("keydown", cb);
  }, [fullscreen, current]);

  // Auto-slide
  useEffect(() => {
    if (images.length > 1 && !fullscreen) {
      const t = setInterval(next, 6000);
      return () => clearInterval(t);
    }
  }, [current, fullscreen, images.length]);

  if (!images?.length) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-muted/50 md:h-96">
        <span className="text-muted-foreground">Không có hình ảnh</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-black/90 group">
        <div
          className="relative h-72 w-full sm:h-80 md:h-[440px] lg:h-[520px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={getImageUrl(images[current]?.url) || getPlaceholderUrl(800, 600)}
            alt={images[current]?.alt || title}
            fill
            className="object-contain transition-all duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 transition-opacity group-hover:opacity-100" />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <button
            onClick={() => setFullscreen(true)}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 opacity-0 group-hover:opacity-100"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                i === current
                  ? "border-[rgb(var(--neon-violet))] ring-2 ring-[rgb(var(--neon-violet)/0.3)]"
                  : "border-border/40 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={getImageUrl(img.url)}
                alt={img.alt || `Ảnh ${i + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <Image
            src={getImageUrl(images[current]?.url) || getPlaceholderUrl(1200, 800)}
            alt={images[current]?.alt || title}
            fill
            className="object-contain p-4"
            priority
          />
          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

/* ─── Stat Chip ─── */
const StatChip = ({
  icon: Icon,
  label,
  value,
  color = "violet",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: "violet" | "cyan" | "emerald" | "pink";
}) => {
  const colors = {
    violet: "from-[rgb(var(--neon-violet)/0.12)] to-[rgb(var(--neon-violet)/0.04)] border-[rgb(var(--neon-violet)/0.2)] text-[rgb(var(--neon-violet))]",
    cyan: "from-[rgb(var(--neon-cyan)/0.12)] to-[rgb(var(--neon-cyan)/0.04)] border-[rgb(var(--neon-cyan)/0.2)] text-[rgb(var(--neon-cyan))]",
    emerald: "from-[rgb(var(--neon-emerald)/0.12)] to-[rgb(var(--neon-emerald)/0.04)] border-[rgb(var(--neon-emerald)/0.2)] text-[rgb(var(--neon-emerald))]",
    pink: "from-[rgb(var(--neon-pink)/0.12)] to-[rgb(var(--neon-pink)/0.04)] border-[rgb(var(--neon-pink)/0.2)] text-[rgb(var(--neon-pink))]",
  };
  return (
    <div className={`flex items-center gap-3 rounded-xl border bg-gradient-to-br p-4 ${colors[color]}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${colors[color]} backdrop-blur`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
export default function AccountDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const params = useParams();
  const accountId = params.id as string;

  const { data: accountData, isLoading } = useAccount(accountId);
  const account = accountData?.data as ApiGameAccount;

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const formatPrice = (price: number) => {
    if (price === -1) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const formatDate = (d: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
  };

  const getPlatformLabel = (p: string) => {
    const map: Record<string, string> = { steam: "Steam PC", mobile: "Mobile", ps4: "PS4", ps5: "PS5", xbox: "Xbox" };
    return map[p] || p;
  };

  const handlePurchase = () => {
    if (account.status !== "available") {
      toast.error("Tài khoản này không còn khả dụng!");
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: account.title, text: account.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép link!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích");
  };

  /* Loading */
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <Skeleton className="mb-6 h-8 w-32 rounded-xl" />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <Skeleton className="h-[440px] w-full rounded-2xl" />
            <div className="flex gap-2">
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-10 w-1/2 rounded" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  /* Not found */
  if (!account) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="mb-4 text-7xl">😞</div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Không tìm thấy tài khoản</h2>
          <p className="mb-6 text-muted-foreground">Tài khoản không tồn tại hoặc đã bị xóa.</p>
          <Link href="/accounts">
            <Button variant="neon" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = account.status === "available";

  return (
    <div className="relative min-h-screen">
      {/* Sticky breadcrumb */}
      <div
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 shadow-sm backdrop-blur-xl border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/accounts">
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Tài khoản game</span>
            </Button>
          </Link>
          {isScrolled && (
            <div className="flex items-center gap-2">
              <span className="hidden truncate text-sm font-semibold text-foreground md:block md:max-w-[200px] lg:max-w-xs">
                {account.title}
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={handleLike}>
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ─── LEFT: Gallery + Details ─── */}
          <div className="space-y-6">
            <ImageGallery images={account.images || []} title={account.title} />

            {/* Title & meta (mobile) */}
            <div className="lg:hidden space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isAvailable
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-500"}`} />
                  {isAvailable ? "Có sẵn" : "Đã bán"}
                </span>
                {account.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Star className="h-3 w-3" /> Nổi bật
                  </span>
                )}
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {account.accountCode}
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                {account.title}
              </h1>
              {/* Price Mobile */}
              <div className="glass rounded-2xl p-5 border border-border/40">
                <div className={`text-3xl font-black ${
                  account.price === -1
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "neon-text-tri"
                }`}>
                  {formatPrice(account.price)}
                </div>
                <Button
                  className={`mt-4 w-full h-12 rounded-xl text-base font-bold transition-all ${
                    isAvailable
                      ? "bg-gradient-to-r from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))] text-white shadow-lg shadow-[rgb(var(--neon-violet)/0.3)] hover:shadow-xl hover:shadow-[rgb(var(--neon-violet)/0.5)] hover:-translate-y-0.5"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={handlePurchase}
                  disabled={!isAvailable}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isAvailable ? "Mua ngay" : "Đã bán"}
                </Button>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={handleLike}>
                    <Heart className={`mr-1.5 h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    {isLiked ? "Đã thích" : "Thích"}
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={handleShare}>
                    <Share2 className="mr-1.5 h-4 w-4" /> Chia sẻ
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl border border-border/40 p-5 md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Gamepad2 className="h-5 w-5 text-[rgb(var(--neon-violet))]" />
                Mô tả chi tiết
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 md:text-base">
                {account.description}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatChip icon={Star} label="Sức mạnh" value={account.collectiveStrength} color="violet" />
              <StatChip icon={Coins} label="Coins" value={(account.accountDetails?.coins || 0).toLocaleString()} color="cyan" />
              <StatChip icon={Gamepad2} label="GP" value={(account.accountDetails?.gp || 0).toLocaleString()} color="emerald" />
              <StatChip icon={Eye} label="Lượt xem" value={account.views.toLocaleString()} color="pink" />
            </div>

            {/* Technical details */}
            <div className="glass rounded-2xl border border-border/40 p-5 md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Shield className="h-5 w-5 text-[rgb(var(--neon-emerald))]" />
                Thông tin kỹ thuật
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--neon-cyan)/0.1)]">
                    <Monitor className="h-5 w-5 text-[rgb(var(--neon-cyan))]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Nền tảng</p>
                    <p className="font-semibold text-foreground">{getPlatformLabel(account.accountDetails?.platform || "mobile")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--neon-violet)/0.1)]">
                    <Tag className="h-5 w-5 text-[rgb(var(--neon-violet))]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Danh mục</p>
                    <p className="font-semibold text-foreground">{account.category?.name || "Chưa phân loại"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--neon-emerald)/0.1)]">
                    <Calendar className="h-5 w-5 text-[rgb(var(--neon-emerald))]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Ngày đăng</p>
                    <p className="font-semibold text-foreground">{formatDate(account.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--neon-pink)/0.1)]">
                    <Trophy className="h-5 w-5 text-[rgb(var(--neon-pink))]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Mã tài khoản</p>
                    <p className="font-semibold text-foreground">{account.accountCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Sticky sidebar (desktop) ─── */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-5">
              {/* Purchase card */}
              <div className="glass rounded-2xl border border-border/40 p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isAvailable
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                    {isAvailable ? "Có sẵn" : "Đã bán"}
                  </span>
                  {account.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <Star className="h-3 w-3" /> Nổi bật
                    </span>
                  )}
                </div>

                <h1 className="mb-4 text-xl font-bold leading-snug text-foreground">
                  {account.title}
                </h1>

                {/* Price */}
                <div className="mb-5 rounded-xl bg-gradient-to-br from-[rgb(var(--neon-violet)/0.08)] to-[rgb(var(--neon-pink)/0.05)] border border-[rgb(var(--neon-violet)/0.15)] p-5 text-center">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {account.price === -1 ? "Giá" : "Giá bán"}
                  </p>
                  <div className={`text-3xl font-black ${
                    account.price === -1 ? "text-emerald-600 dark:text-emerald-400" : "neon-text-tri"
                  }`}>
                    {formatPrice(account.price)}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full h-13 rounded-xl text-base font-bold transition-all duration-300 ${
                    isAvailable
                      ? "bg-gradient-to-r from-[rgb(var(--neon-violet))] to-[rgb(var(--neon-pink))] text-white shadow-lg shadow-[rgb(var(--neon-violet)/0.3)] hover:shadow-xl hover:shadow-[rgb(var(--neon-violet)/0.5)] hover:-translate-y-0.5 active:translate-y-0"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={handlePurchase}
                  disabled={!isAvailable}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isAvailable ? "Mua ngay" : "Đã bán"}
                </Button>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className={`rounded-xl transition-all ${isLiked ? "border-red-300 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className={`mr-1.5 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Đã thích" : "Thích"}
                  </Button>
                  <Button variant="outline" className="rounded-xl" onClick={handleShare}>
                    <Share2 className="mr-1.5 h-4 w-4" />
                    Chia sẻ
                  </Button>
                </div>

                {/* Quick stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/40 p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{account.collectiveStrength}</p>
                    <p className="text-xs text-muted-foreground">Sức mạnh</p>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{account.views.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Lượt xem</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="glass rounded-2xl border border-border/40 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Phone className="h-4 w-4 text-[rgb(var(--neon-cyan))]" />
                  Liên hệ hỗ trợ
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://zalo.me/0395860670"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-blue-500/5 border border-blue-500/10 p-3 transition-colors hover:bg-blue-500/10"
                  >
                    <span className="text-xl">📱</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Zalo</p>
                      <p className="font-semibold text-foreground">0395 860 670</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Giờ hoạt động</p>
                      <p className="text-sm font-medium text-foreground">8:00 – 22:00 hàng ngày</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="glass rounded-2xl border border-border/40 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Shield className="h-4 w-4 text-[rgb(var(--neon-emerald))]" />
                  Cam kết
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Tài khoản chính chủ 100%",
                    "Bảo hành vĩnh viễn",
                    "Hỗ trợ 24/7",
                    "Hoàn tiền nếu không đúng mô tả",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[rgb(var(--neon-emerald))]" />
                      <span className="text-sm text-foreground/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {account && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          account={account}
        />
      )}
    </div>
  );
}

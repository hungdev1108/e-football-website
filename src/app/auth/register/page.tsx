"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Shield,
  Zap,
  Star,
  Check,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    // acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp!");
        return;
      }

      // if (!formData.acceptTerms) {
      //   toast.error("Vui lòng đồng ý với điều khoản sử dụng!");
      //   return;
      // }

      // TODO: Integrate with actual API when backend is ready
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Đăng ký thành công!");
      router.push("/auth/login");
    } catch {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const benefits = [
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description: "Tài khoản được bảo mật với công nghệ cao cấp",
    },
    {
      icon: Zap,
      title: "Giao dịch nhanh chóng",
      description: "Mua bán tài khoản chỉ trong vài phút",
    },
    {
      icon: Star,
      title: "Ưu đãi độc quyền",
      description: "Giảm giá và deal hot dành riêng cho thành viên",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-80">
        <div className="aurora-blob absolute left-10 top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgb(var(--neon-violet) / 0.6), transparent 65%)" }} />
        <div className="aurora-blob absolute right-10 top-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgb(var(--neon-cyan) / 0.55), transparent 65%)", animationDelay: "4s" }} />
        <div className="aurora-blob absolute -bottom-32 left-20 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgb(var(--neon-pink) / 0.45), transparent 65%)", animationDelay: "8s" }} />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-foreground text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-4xl">⚽</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <h1 className="neon-text-tri mb-4 text-5xl font-black">
              EFOOTBALL
            </h1>
            <p className="text-xl font-semibold text-muted-foreground mb-8">
              Premium Store
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 glass rounded-2xl border border-border/60"
                >
                  <benefit.icon className="w-8 h-8 text-green-400" />
                  <div className="text-left">
                    <p className="font-semibold">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
              <div className="flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-400 mr-2" />
                <span className="text-xl font-bold">Miễn phí đăng ký</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Tham gia cộng đồng 10,000+ game thủ tin tưởng
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            {/* Back to Home Button */}
            <div className="mb-8">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">⚽</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="neon-text-tri text-2xl font-black">
                    EFOOTBALL
                  </h1>
                  <p className="text-xs font-medium text-muted-foreground -mt-1">
                    Premium Store
                  </p>
                </div>
              </div>
            </div>

            <Card className="glass border border-border/60 shadow-[0_30px_80px_-20px_rgb(var(--neon-violet)/0.5)]">
              <CardHeader className="space-y-2 pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-black text-center neon-text-tri">
                  Tạo tài khoản mới
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground text-base">
                  Gia nhập cộng đồng game thủ EFOOTBALL lớn nhất
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-sm font-semibold text-foreground/90"
                      >
                        Tên người dùng
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[rgb(var(--neon-violet))] transition-colors" />
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="pl-12 pr-4 py-3 h-12 text-base border-2 bg-background/40 border-border/60 focus:border-[rgb(var(--neon-violet))] rounded-xl transition-all duration-300 focus:ring-4 focus:ring-[rgb(var(--neon-violet)/0.25)]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground/90"
                      >
                        Địa chỉ Email
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[rgb(var(--neon-violet))] transition-colors" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-12 pr-4 py-3 h-12 text-base border-2 bg-background/40 border-border/60 focus:border-[rgb(var(--neon-violet))] rounded-xl transition-all duration-300 focus:ring-4 focus:ring-[rgb(var(--neon-violet)/0.25)]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[rgb(var(--neon-violet))] transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-12 pr-12 py-3 h-12 text-base border-2 bg-background/40 border-border/60 focus:border-[rgb(var(--neon-violet))] rounded-xl transition-all duration-300 focus:ring-4 focus:ring-[rgb(var(--neon-violet)/0.25)]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-muted-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Xác nhận mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[rgb(var(--neon-violet))] transition-colors" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-12 pr-12 py-3 h-12 text-base border-2 bg-background/40 border-border/60 focus:border-[rgb(var(--neon-violet))] rounded-xl transition-all duration-300 focus:ring-4 focus:ring-[rgb(var(--neon-violet)/0.25)]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-muted-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked: boolean) =>
                        setFormData((prev) => ({
                          ...prev,
                          acceptTerms: checked,
                        }))
                      }
                      className="w-5 h-5 mt-1"
                    />
                    <Label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium text-muted-foreground leading-relaxed"
                    >
                      Tôi đồng ý với{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-violet))] transition-colors"
                      >
                        điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-violet))] transition-colors"
                      >
                        chính sách bảo mật
                      </Link>
                    </Label>
                  </div> */}

                  <Button
                    type="submit"
                    variant="neon"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Đang tạo tài khoản...</span>
                      </div>
                    ) : (
                      "Tạo tài khoản"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card/80 backdrop-blur px-4 text-muted-foreground font-medium">
                      Hoặc đăng ký với
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="glass"
                    className="h-12 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="glass"
                    className="h-12 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center pt-6">
                  <p className="text-muted-foreground">
                    Đã có tài khoản?{" "}
                    <Link
                      href="/auth/login"
                      className="font-semibold text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-violet))] transition-colors"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

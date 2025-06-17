import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EFOOTBALL Store - Chuyên bán tài khoản game EFOOTBALL",
    template: "%s | EFOOTBALL Store",
  },
  
  description:
    "Chuyên bán tài khoản game EFOOTBALL chất lượng cao, giá tốt nhất thị trường. Giao dịch nhanh chóng, an toàn, uy tín.",
  keywords: [
    "efootball",
    "tài khoản game",
    "mua bán tài khoản",
    "game bóng đá",
    "fifa",
    "pes",
    "konami",
  ],
  icons: {
    icon: "/efootball-logo.png",
    shortcut: "/efootball-logo.png",
    apple: "/efootball-logo.png", // nếu muốn hỗ trợ Apple touch icon
  },
  authors: [{ name: "EFOOTBALL Store Team" }],
  creator: "EFOOTBALL Store",
  publisher: "EFOOTBALL Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://efootball-store.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    title: "EFOOTBALL Store - Chuyên bán tài khoản game EFOOTBALL",
    description:
      "Chuyên bán tài khoản game EFOOTBALL chất lượng cao, giá tốt nhất thị trường.",
    siteName: "EFOOTBALL Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "EFOOTBALL Store - Chuyên bán tài khoản game EFOOTBALL",
    description:
      "Chuyên bán tài khoản game EFOOTBALL chất lượng cao, giá tốt nhất thị trường.",
    creator: "@efootballstore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" />
      <body
        className={`${inter.className} antialiased min-h-screen bg-background`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

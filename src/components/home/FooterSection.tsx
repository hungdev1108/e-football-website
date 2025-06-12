"use client";

import { memo } from "react";
import Link from "next/link";

interface FooterSectionProps {
  className?: string;
}

export const FooterSection = memo(function FooterSection({
  className,
}: FooterSectionProps) {
  return (
    <footer
      className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 lg:px-6 ${
        className || ""
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">⚽</span>
              </div>
              <div>
                <h4 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  EFOOTBALL
                </h4>
                <p className="text-sm text-slate-400">Premium Store</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Nền tảng mua bán tài khoản eFootball uy tín và chất lượng nhất
              Việt Nam. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho game
              thủ.
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Online 24/7</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="font-bold mb-6 text-xl">Liên kết nhanh</h5>
            <ul className="space-y-4 text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">🏠</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Trang chủ
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/accounts"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">🎮</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Tài khoản game
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">📰</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Tin tức
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">📧</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Liên hệ
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h5 className="font-bold mb-6 text-xl">Tài khoản</h5>
            <ul className="space-y-4 text-slate-300">
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">🔑</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Đăng nhập
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">📝</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Đăng ký
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-3 text-lg">❓</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    Câu hỏi thường gặp
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-slate-500 flex items-center">
                  <span className="mr-3 text-lg">🔒</span>
                  Bảo mật & quyền riêng tư
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-bold mb-6 text-xl">Liên hệ</h5>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center">
                <span className="mr-3 text-lg">📧</span>
                <div>
                  <div className="font-medium">support@efootball-store.com</div>
                  <div className="text-sm text-slate-400">
                    Email hỗ trợ 24/7
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg">📱</span>
                <div>
                  <div className="font-medium">0395860670</div>
                  <div className="text-sm text-slate-400">
                    Hotline bán hàng - Zalo
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg">💬</span>
                <div>
                  <div className="font-medium">Zalo: 0395860670</div>
                  <div className="text-sm text-slate-400">Chat trực tiếp</div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg">🏦</span>
                <div>
                  <div className="font-medium">196666196666</div>
                  <div className="text-sm text-slate-400">
                    TRAN DINH HIEP - MB BANK
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg">🕒</span>
                <div>
                  <div className="font-medium">8:00 - 22:00 hàng ngày</div>
                  <div className="text-sm text-slate-400">Thời gian hỗ trợ</div>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h6 className="font-bold mb-4">Phương thức thanh toán</h6>
              <div className="flex space-x-3">
                <div className="w-10 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">
                  💳
                </div>
                <div className="w-10 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-sm font-bold">
                  🏧
                </div>
                <div className="w-10 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center text-sm font-bold">
                  💰
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; 2025 EFOOTBALL Store. All rights reserved. Made with ❤️ in
              Vietnam
            </p>
            <div className="flex space-x-8 text-sm text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">
                Chính sách bảo mật
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Điều khoản sử dụng
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Chính sách đổi trả
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

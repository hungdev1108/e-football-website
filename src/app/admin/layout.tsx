'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Users, Newspaper, Settings, LogOut, Shield } from "lucide-react";
import { useAuthStore } from "@/store/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    title: "Trang chủ",
    href: "/admin",
    icon: Home,
    description: "Quản lý banner, featured content",
  },
  {
    title: "Tài khoản Game",
    href: "/admin/accounts",
    icon: Users,
    description: "Quản lý danh sách tài khoản game",
  },
  {
    title: "Tin tức",
    href: "/admin/news",
    icon: Newspaper,
    description: "Quản lý tin tức và bài viết",
  },
  {
    title: "Hệ thống",
    href: "/admin/system",
    icon: Settings,
    description: "Quản lý logo, banner, cài đặt chung",
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { 
    isAdminAuthenticated, 
    adminUser, 
    adminLogout
  } = useAuthStore();

  // SIMPLIFIED AUTH CHECK - chỉ chạy 1 lần
  useEffect(() => {
    console.log('🔍 Auth check triggered. Pathname:', pathname);
    console.log('🔍 Current auth state:', { isAdminAuthenticated, adminUser });

    // If on login page, don't check auth
    if (pathname === '/admin/login') {
      console.log('✅ On login page, no auth check needed');
      setLoading(false);
      setAuthChecked(true);
      return;
    }

    // If auth already checked, don't check again
    if (authChecked) {
      console.log('✅ Auth already checked');
      setLoading(false);
      return;
    }

    const verifyAuth = async () => {
      console.log('🔍 Starting auth verification...');
      
      // Check localStorage token
      const token = localStorage.getItem('admin_token');
      console.log('🔍 Token from localStorage:', token ? '***EXISTS***' : 'NULL');
      
      if (!token) {
        console.log('❌ No token found, redirecting to login');
        setAuthChecked(true);
        setLoading(false);
        router.push('/admin/login');
        return;
      }

      try {
        console.log('🔍 Verifying token with backend...');
        
        const response = await fetch('http://14.225.211.212:5002/api/auth/admin-verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('🔍 Verify response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Auth verified successfully:', data);
          setAuthChecked(true);
          setLoading(false);
        } else {
          console.log('❌ Auth verification failed');
          localStorage.removeItem('admin_token');
          setAuthChecked(true);
          setLoading(false);
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        // FOR DEVELOPMENT: Allow access if check fails
        console.log('🔧 Development mode: allowing access despite error');
        setAuthChecked(true);
        setLoading(false);
      }
    };

    verifyAuth();
  }, [pathname, router, adminUser, authChecked, isAdminAuthenticated]); // Add missing dependencies

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('admin_token');
    adminLogout();
    setAuthChecked(false);
    router.push('/admin/login');
  };

  // Show loading while checking auth (but not on login page)
  if (loading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang xác thực admin...</p>
          <p className="text-xs text-gray-400 mt-2">
            Checking authentication status...
          </p>
        </div>
      </div>
    );
  }

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Admin Panel
              </h1>
              <p className="text-xs text-gray-500">
                Welcome, {adminUser?.username || 'Admin'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100",
                    isActive
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "text-gray-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quản lý nội dung
              </h2>
              <p className="text-sm text-gray-600">
                Chỉnh sửa và cập nhật nội dung website
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
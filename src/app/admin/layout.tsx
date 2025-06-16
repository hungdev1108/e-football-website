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
  // Tạm thời ẩn chức năng quản lý hệ thống - đang phát triển
  // {
  //   title: "Hệ thống",
  //   href: "/admin/system",
  //   icon: Settings,
  //   description: "Quản lý logo, banner, cài đặt chung",
  // },
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
    adminLogout,
    checkAdminAuth
  } = useAuthStore();

  // IMPROVED AUTH CHECK
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

    // If already authenticated in store, allow access
    if (isAdminAuthenticated && adminUser) {
      console.log('✅ Already authenticated in store');
      setLoading(false);
      setAuthChecked(true);
      return;
    }

    const verifyAuth = async () => {
      console.log('🔍 Starting auth verification...');
      
      try {
        // Use the store's checkAdminAuth method
        const isValid = await checkAdminAuth();
        
        if (isValid) {
          console.log('✅ Auth verified successfully');
          setAuthChecked(true);
          setLoading(false);
        } else {
          console.log('❌ Auth verification failed, redirecting to login');
          setAuthChecked(true);
          setLoading(false);
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        console.log('❌ Redirecting to login due to error');
        setAuthChecked(true);
        setLoading(false);
        router.push('/admin/login');
      }
    };

    verifyAuth();
  }, [pathname, router, isAdminAuthenticated, adminUser, checkAdminAuth]);

  const handleLogout = () => {
    console.log('🚪 Logging out...');
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
    return children;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-white border-r border-gray-200 shadow-lg flex-shrink-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        "lg:relative lg:flex",
        "fixed inset-y-0 left-0 z-50",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">Admin Panel</span>
                <div className="text-xs text-gray-500">E-Football Shop</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-4 px-4">
             <div className="mb-4">
               <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Menu chính</h3>
               <div className="space-y-1">
                 {sidebarItems.map((item) => {
                   const Icon = item.icon;
                   const isActive = pathname === item.href;
                   
                   return (
                     <Link
                       key={item.href}
                       href={item.href}
                       className={cn(
                         "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                         isActive
                           ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                           : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                       )}
                       onClick={() => setSidebarOpen(false)}
                     >
                       <div className={cn(
                         "p-2 rounded-lg transition-colors",
                         isActive 
                           ? "bg-white/20" 
                           : "bg-gray-100 group-hover:bg-gray-200"
                       )}>
                         <Icon className={cn(
                           "h-4 w-4",
                           isActive ? "text-white" : "text-gray-600 group-hover:text-gray-700"
                         )} />
                       </div>
                       <div className="flex-1">
                         <div className="font-medium">{item.title}</div>
                         <div className={cn(
                           "text-xs mt-0.5",
                           isActive ? "text-white/80" : "text-gray-500"
                         )}>{item.description}</div>
                       </div>
                     </Link>
                   );
                 })}
               </div>
             </div>
           </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50/50">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {adminUser?.username?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {adminUser?.username || 'Admin'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {adminUser?.role || 'Administrator'}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-6 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="hidden lg:block lg:h-5 lg:w-px lg:bg-gray-300" />
              <div className="flex items-center gap-x-2">
                <span className="text-sm text-gray-500">Chào mừng,</span>
                <span className="text-sm font-semibold text-gray-900">
                  {adminUser?.username || 'Admin'}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {new Date().toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
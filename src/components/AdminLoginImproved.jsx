'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lock, User, Shield, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLoginImproved() {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  
  const router = useRouter();
  const { isAuthenticated, login, tokenStatus, isRefreshing } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🔄 Already authenticated, redirecting immediately...');
      setSuccess(true);
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  // Show token info if authenticated
  useEffect(() => {
    if (isAuthenticated && tokenStatus) {
      setShowTokenInfo(true);
    }
  }, [isAuthenticated, tokenStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    console.log('🔐 Admin login attempt:', { username: credentials.username, password: '***' });
    
    try {
      const result = await login(credentials);
      console.log('🔐 Login result:', result);
      console.log('🔐 Login result type:', typeof result);
      console.log('🔐 Login result success property:', result?.success);
      
      // Check if result is successful
      // Handle both object response and string response
      const isSuccess = result && (
        result.success === true || 
        (typeof result === 'string' && result.includes('thành công')) ||
        (result.message && result.message.includes('thành công'))
      );
      
      if (isSuccess) {
        console.log('✅ Admin login successful');
        setSuccess(true);
        setCredentials({ username: '', password: '' });
        
        // Show success message briefly then redirect
        console.log('🔄 Redirecting to admin dashboard...');
        setTimeout(() => {
          router.push('/admin');
        }, 800);
      } else {
        console.log('❌ Login failed:', result);
        const errorMessage = result?.message || result || 'Đăng nhập thất bại';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('❌ Admin login error:', error);
      setError('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (tokenStatus) => {
    if (!tokenStatus) return '';
    
    const { hoursRemaining, minutesRemaining } = tokenStatus;
    
    if (hoursRemaining > 0) {
      return `${hoursRemaining}h ${minutesRemaining}m`;
    }
    return `${minutesRemaining}m`;
  };

  const getTokenStatusColor = (tokenStatus) => {
    if (!tokenStatus) return 'text-gray-500';
    
    if (tokenStatus.willRefreshSoon) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md relative overflow-hidden">
          {/* Success Overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center z-50 rounded-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-white text-center"
                >
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 drop-shadow-lg" />
                  <h3 className="text-xl font-bold drop-shadow-md">Đăng nhập thành công!</h3>
                  <p className="text-sm opacity-90 mt-2">Đang chuyển hướng đến dashboard...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              Admin Panel Pro
            </CardTitle>
            <p className="text-muted-foreground">
              Hệ thống quản trị EFOOTBALL Store
            </p>
            
            {/* Token Status Display */}
            <AnimatePresence>
              {showTokenInfo && tokenStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Token còn lại:</span>
                    <span className={`font-mono ${getTokenStatusColor(tokenStatus)}`}>
                      {formatTimeRemaining(tokenStatus)}
                    </span>
                  </div>
                  
                  {tokenStatus.willRefreshSoon && (
                    <div className="mt-2 text-xs text-yellow-600 text-center">
                      🔄 Sẽ tự động làm mới token sớm
                    </div>
                  )}
                  
                  {isRefreshing && (
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-blue-600">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Đang làm mới token...</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md border border-red-200"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tên đăng nhập Admin</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Nhập tên đăng nhập admin"
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                      ...credentials, 
                      username: e.target.value
                    })}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mật khẩu Admin</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu admin"
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                      ...credentials, 
                      password: e.target.value
                    })}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || success}
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Thành công!
                  </>
                ) : (
                  'Đăng nhập Admin'
                )}
              </Button>
              
              {/* System Info */}
              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>🔐 Token tự động làm mới mỗi 24 giờ</p>
                <p>🚀 Hệ thống bảo mật enterprise-level</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px]">EFOOTBALL v2.0</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
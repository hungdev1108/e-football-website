declare module '@/services/tokenInterceptor' {
  interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
  }

  class TokenInterceptor {
    constructor();
    
    request(url: string, options?: RequestInit): Promise<ApiResponse>;
    get(url: string, options?: RequestInit): Promise<ApiResponse>;
    post(url: string, data?: unknown, options?: RequestInit): Promise<ApiResponse>;
    put(url: string, data?: unknown, options?: RequestInit): Promise<ApiResponse>;
    patch(url: string, data?: unknown, options?: RequestInit): Promise<ApiResponse>;
    delete(url: string, options?: RequestInit): Promise<ApiResponse>;
    upload(url: string, formData: FormData, options?: RequestInit): Promise<ApiResponse>;
    
    getToken(): string | null;
    getRefreshToken(): string | null;
    shouldRefreshToken(): boolean;
    refreshToken(): Promise<string>;
    isAuthenticated(): boolean;
    logout(): void;
  }

  const tokenInterceptor: TokenInterceptor;
  export default tokenInterceptor;
} 
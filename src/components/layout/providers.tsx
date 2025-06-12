"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { AxiosError } from "axios";

interface ProvidersProps {
  children: React.ReactNode;
}

// Create QueryClient outside component to avoid recreation
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 minutes (increased for better caching)
        gcTime: 15 * 60 * 1000, // 15 minutes
        retry: (failureCount, error: Error | AxiosError) => {
          if (
            "response" in error &&
            error.response?.status &&
            error.response.status >= 400 &&
            error.response.status < 500 &&
            error.response.status !== 429
          ) {
            return false;
          }
          return failureCount < 2; // Reduced retry count
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 20000), // Reduced max delay
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false, // Changed to false for better performance
      },
      mutations: {
        retry: (failureCount, error: Error | AxiosError) => {
          if (
            "response" in error &&
            error.response?.status &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            return false;
          }
          return failureCount < 1; // Reduced retry count
        },
      },
    },
  });

let queryClient: QueryClient;

export function Providers({ children }: ProvidersProps) {
  // Use singleton pattern for QueryClient
  const client = useMemo(() => {
    if (!queryClient) {
      queryClient = createQueryClient();
    }
    return queryClient;
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, // Reduced duration
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2500,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

'use client';

import { trpc } from '@/config/trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';

// Define proper TRPC error types compatible with React Query
interface TRPCErrorData {
  code:
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'BAD_REQUEST'
    | 'INTERNAL_SERVER_ERROR'
    | 'TIMEOUT';
  zodError?: Record<string, unknown>;
  stack?: string;
}

// Use Error as the base type for React Query compatibility
type QueryError = Error & {
  data?: TRPCErrorData;
};

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Enhanced v5 patterns
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always',
            retry: (failureCount, error: QueryError) => {
              // Smart retry logic
              if (error?.data?.code === 'UNAUTHORIZED') return false;
              if (error?.data?.code === 'FORBIDDEN') return false;
              if (error?.data?.code === 'NOT_FOUND') return false;
              return failureCount < 3;
            },
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // Enhanced logging for development
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          // Enhanced headers with error handling
          async headers() {
            const baseHeaders: Record<string, string> = {
              'Content-Type': 'application/json',
            };

            // Add auth headers if available
            if (typeof window !== 'undefined') {
              const authToken = localStorage.getItem('auth-token');
              if (authToken) {
                baseHeaders.Authorization = `Bearer ${authToken}`;
              }
            }

            return baseHeaders;
          },
          // Enhanced fetch options
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* ReactQueryDevtools removed due to import issues */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

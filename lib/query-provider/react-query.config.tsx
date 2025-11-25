'use client';

import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useApiError } from '@/hooks/useApiError';

interface Props {
  children: React.ReactNode;
}

export default function QueryProvider(props: Props) {
  const { children } = props;

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: false,
          retry: 0,
        },
        mutations: {
          throwOnError: false,
        },
      },
    }),
  );

  const { handleError } = useApiError();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            onError={(error, errorInfo) => {
              // Capture error in Sentry before showing fallback UI
              if (typeof window !== 'undefined') {
                if (process.env.NODE_ENV === 'production') {
                  return;
                }

                // import('@sentry/nextjs').then((Sentry) => {
                //   Sentry.captureException(error, {
                //     contexts: {
                //       react: {
                //         componentStack: errorInfo.componentStack,
                //       },
                //     },
                //   });
                // });
              }
            }}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div className="flex flex-col items-center justify-center h-screen">
                <p>{handleError(error)}</p>
                <button onClick={resetErrorBoundary}>재시도</button>
              </div>
            )}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

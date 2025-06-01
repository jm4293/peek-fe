'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IProps {
  children: React.ReactNode;
}

export default function QueryProvider(props: IProps) {
  const { children } = props;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // throwOnError: true,
        throwOnError: false,
        retry: 0,
      },
      mutations: {
        throwOnError: false,
        onError: (error) => {
          console.error('Mutation error:', error);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

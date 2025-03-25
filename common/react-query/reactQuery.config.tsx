'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProps {
  children: ReactNode;
}

export default function QueryProvider(props: IProps) {
  const { children } = props;

  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

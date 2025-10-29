'use client';

import { useIsMutating } from '@tanstack/react-query';

import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function GlobalLoading() {
  const isMutating = useIsMutating();

  if (isMutating === 0) {
    return null;
  }

  return <LoadingSpinner />;
}

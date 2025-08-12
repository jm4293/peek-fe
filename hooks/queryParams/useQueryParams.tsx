'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// 타입 정의 추가
type QueryValue = string | number | boolean | null | undefined;
type QueryObject = Record<string, QueryValue>;

interface UseQueryParamsReturn {
  searchParams: URLSearchParams;
  setQuery: (key: string, value: QueryValue) => void;
  setQueries: (queryObject: QueryObject) => void;
  getQuery: (key: string) => string | null;
  hasQuery: (key: string) => boolean;
}

export const useQueryParams = (): UseQueryParamsReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = useCallback(
    (key: string, value: QueryValue): void => {
      const params = new URLSearchParams(searchParams);

      if (value !== null && value !== undefined && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const setQueries = useCallback(
    (queryObject: QueryObject): void => {
      const params = new URLSearchParams(searchParams);

      Object.entries(queryObject).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return {
    searchParams,
    setQuery,
    setQueries,
    getQuery: (key: string) => searchParams.get(key),
    hasQuery: (key: string) => searchParams.has(key),
  };
};

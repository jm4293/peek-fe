'use client';

import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import currencyApi from '../api';

export const useCurrencyList = () => {
  return useQuery({
    queryKey: QueryKeys.currency.list(),
    queryFn: () => currencyApi.getCurrencyList(),
    select: (res) => res.data.currencyList,
    refetchInterval: 60000, // 1분마다 재호출 (60000ms = 60초)
  });
};

import { useQuery } from '@tanstack/react-query';

import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api/stock.api';

export const useStockCategoryList = () => {
  return useQuery({
    queryKey: QueryKeys.stock.stockCategoryList(),
    queryFn: () => stockApi.getStockCategoryList(),
    select: (res) => res.data.stockCategoryList,
    staleTime: QUERY_CACHE_TIME_SIX,
  });
};

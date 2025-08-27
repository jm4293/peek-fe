import { useQuery } from '@tanstack/react-query';

import stockApi from '@/services/stock';

import { QueryKeys } from '@/shared/constant/query-key';

export const useStockToken = () => {
  return useQuery({
    queryKey: QueryKeys.stock.token(),
    queryFn: () => stockApi.getToken(),
    select: (res) => res.data.token,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};

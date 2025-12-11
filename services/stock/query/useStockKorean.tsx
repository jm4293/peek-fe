import { useQuery } from '@tanstack/react-query';

import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api/stock.api';
import { GetStockKoreanDetailReq } from '../type';

interface Props extends GetStockKoreanDetailReq {}

export const useStockKorean = (props: Props) => {
  const { code } = props;

  return useQuery({
    queryKey: QueryKeys.stock.stockKorean(code),
    queryFn: () => stockApi.getStockKorean(props),
    select: (res) => res.data.stockKoreanCompany,
    staleTime: QUERY_CACHE_TIME_SIX,
  });
};

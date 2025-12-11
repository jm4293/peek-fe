import { useQuery } from '@tanstack/react-query';

import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api/stock.api';
import { GetStockKoreanIndexCandleListReq } from '../type';

interface Props extends GetStockKoreanIndexCandleListReq {}

export const useStockKoreanIndexCandleList = (props: Props) => {
  const { code, ...rest } = props;

  return useQuery({
    queryKey: QueryKeys.stock.stockKoreanIndexCandleList(code),
    queryFn: () => stockApi.getStockKoreanIndexCandleList(props),
    select: (res) => ({
      code,
      candleList: res.data.candleList,
      count: res.data.count,
    }),
    staleTime: QUERY_CACHE_TIME_SIX,
  });
};

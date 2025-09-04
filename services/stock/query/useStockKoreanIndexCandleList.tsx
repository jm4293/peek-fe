import { useQuery } from '@tanstack/react-query';

import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api';
import { IGetStockKoreanIndexCandleListDto } from '../dto';

interface IProps extends IGetStockKoreanIndexCandleListDto {}

export const useStockKoreanIndexCandleList = (props: IProps) => {
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

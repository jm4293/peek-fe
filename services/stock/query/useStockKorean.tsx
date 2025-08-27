import { useQuery } from '@tanstack/react-query';

import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api';
import { IGetStockKoreanDto } from '../dto';

interface IProps extends IGetStockKoreanDto {}

export const useStockKorean = (props: IProps) => {
  const { code } = props;

  return useQuery({
    queryKey: QueryKeys.stock.stockKorean(code),
    queryFn: () => stockApi.getStockKorean(props),
    select: (res) => res.data.stockKorean,
    staleTime: QUERY_CACHE_TIME_SIX,
  });
};

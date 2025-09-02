import { useInfiniteQuery } from '@tanstack/react-query';

import StockApi, { IGetStockKoreanRankDto, IStockKoreanRankListRes } from '@/services/stock';

import { QueryKeys } from '@/shared/constant/query-key';

interface IProps extends Omit<IGetStockKoreanRankDto, 'page'> {}

export const useStockKoreanRankList = (props: IProps) => {
  const { type } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.stock.stockKoreanList(type),
    queryFn: ({ pageParam }) => StockApi.getStockKoreanRank({ ...props, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IStockKoreanRankListRes, cur) => {
          const { stockKoreanRankList, total } = cur.data;

          return {
            stockKoreanRankList: [...acc.stockKoreanRankList, ...stockKoreanRankList],
            total,
            nextPage: cur.data.nextPage,
          };
        },
        { stockKoreanRankList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

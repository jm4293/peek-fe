import { useInfiniteQuery } from '@tanstack/react-query';

import StockApi, { IGetStockKoreanListDto, IStockKoreanListRes } from '@/services/stock';

import { QueryKeys } from '@/shared/constant/query-key';

interface IProps extends Omit<IGetStockKoreanListDto, 'page'> {}

export const useStockKoreanList = (props: IProps) => {
  const { text, kind } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.stock.stockKoreanList(text),
    queryFn: ({ pageParam }) => StockApi.getStockKoreanList({ ...props, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IStockKoreanListRes, cur) => {
          const { stockKoreanList, total } = cur.data;

          return {
            stockKoreanList: [...acc.stockKoreanList, ...stockKoreanList],
            total,
            nextPage: cur.data.nextPage,
          };
        },
        { stockKoreanList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

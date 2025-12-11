import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api/stock.api';
import { GetStockKoreanListReq, GetStockKoreanListRes } from '../type';

interface Props extends Omit<GetStockKoreanListReq, 'page'> {}

export const useStockKoreanList = (props: Props) => {
  const { text, kind } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.stock.stockKoreanList(text),
    queryFn: ({ pageParam }) => stockApi.getStockKoreanList({ ...props, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: GetStockKoreanListRes, cur) => {
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

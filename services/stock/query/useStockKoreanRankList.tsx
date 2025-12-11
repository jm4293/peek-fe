import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api/stock.api';
import { GetStockKoreanRankListReq } from '../type';

interface Props extends Omit<GetStockKoreanRankListReq, 'page'> {}

export const useStockKoreanRankList = (props: Props) => {
  const { type } = props;

  // return useInfiniteQuery({
  //   queryKey: QueryKeys.stock.stockKoreanList(type),
  //   queryFn: ({ pageParam }) => stockApi.getStockKoreanRank({ ...props, page: pageParam }),
  //   getNextPageParam: (lastPage) => {
  //     const { nextPage } = lastPage.data;

  //     return nextPage;
  //   },
  //   select: (data) => {
  //     return data.pages.reduce(
  //       (acc: IStockKoreanRankListRes, cur) => {
  //         const { stockKoreanRankList, total } = cur.data;

  //         return {
  //           stockKoreanRankList: [...acc.stockKoreanRankList, ...stockKoreanRankList],
  //           total,
  //           nextPage: cur.data.nextPage,
  //         };
  //       },
  //       { stockKoreanRankList: [], total: 0, nextPage: null },
  //     );
  //   },
  //   initialPageParam: 1,
  // });
};

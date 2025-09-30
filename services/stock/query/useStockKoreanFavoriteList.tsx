import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import stockApi from '../api';
import { IStockKoreanFavoriteRes } from '../response';

export const useStockKoreanFavoriteList = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.stock.stockKoreanFavoriteList(),
    queryFn: ({ pageParam }) => stockApi.getStockKoreanFavoriteList({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IStockKoreanFavoriteRes, cur) => {
          const { favoriteStockList, total } = cur.data;

          return {
            favoriteStockList: [...acc.favoriteStockList, ...favoriteStockList],
            total,
            nextPage: cur.data.nextPage,
          };
        },
        { favoriteStockList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi, { IBoardListRes } from '@/services/board';

import { QueryKeys } from '@/shared/constant/query-key';

export const useMineBoardList = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.board.mineList(),
    queryFn: ({ pageParam }) => BoardApi.getBoardListMine(pageParam),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IBoardListRes, cur) => {
          const { boards, total, nextPage } = cur.data;

          return { boards: [...acc.boards, ...boards], total, nextPage };
        },
        { boards: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

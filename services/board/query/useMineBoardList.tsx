import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import boardApi from '../api/board.api';
import { GetBoardListRes } from '../type';

export const useMineBoardList = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.board.mineList(),
    queryFn: ({ pageParam }) => boardApi.getBoardListMine({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: GetBoardListRes, cur) => {
          const { boardList, total, nextPage } = cur.data;

          return { boardList: [...acc.boardList, ...boardList], total, nextPage };
        },
        { boardList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

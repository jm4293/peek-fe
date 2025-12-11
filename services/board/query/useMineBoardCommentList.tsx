import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import boardApi from '../api/board.api';
import { GetBoardCommentListRes } from '../type';

export const useBoardCommentListMine = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.board.mineCommentList(),
    queryFn: ({ pageParam }) => boardApi.getBoardCommentListMine({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: GetBoardCommentListRes, cur) => {
          const { boardCommentList, total, nextPage } = cur.data;

          return { boardCommentList: [...acc.boardCommentList, ...boardCommentList], total, nextPage };
        },
        { boardCommentList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

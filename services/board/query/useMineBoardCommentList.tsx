import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi, { IBoardCommentListRes } from '@/services/board';

import { QueryKeys } from '@/shared/query-key';

export const useBoardCommentListMineQuery = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.board.mineCommentList(),
    queryFn: ({ pageParam }) => BoardApi.getBoardCommentListMine(pageParam),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IBoardCommentListRes, cur) => {
          const { boardComments, total, nextPage } = cur.data;

          return { boardComments: [...acc.boardComments, ...boardComments], total, nextPage };
        },
        { boardComments: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

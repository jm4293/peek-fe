import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi, { IBoardCommentListRes } from '@/services/board';

import { QueryKeys } from '@/shared/constant/query-key';

export const useBoardCommentListMine = () => {
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
          const { boardCommentList, total, nextPage } = cur.data;

          return { boardCommentList: [...acc.boardCommentList, ...boardCommentList], total, nextPage };
        },
        { boardCommentList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { IBoardCommentListRes } from '@/types/res';

interface IProps {
  boardId: number | undefined;
}

export const useBoardCommentListQuery = (props: IProps) => {
  const { boardId } = props;

  return useInfiniteQuery({
    queryKey: ['board-comment-list', boardId],
    queryFn: ({ pageParam = 1 }) => BoardApi.getBoardCommentList({ boardId: Number(boardId), pageParam }),
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
    enabled: !!boardId,
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { IBoardCommentListRes } from '@/types/res';

interface IProps {
  boardSeq: number | undefined;
}

export const useBoardCommentListQuery = (props: IProps) => {
  const { boardSeq } = props;

  return useInfiniteQuery({
    queryKey: ['board-comment-list', boardSeq],
    queryFn: ({ pageParam = 1 }) => BoardApi.getBoardCommentList({ boardSeq: Number(boardSeq), pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data.data;

      return nextPage;
    },

    select: (data) => {
      return data.pages.reduce(
        (acc: IBoardCommentListRes, cur) => {
          const { boardComments, total, nextPage } = cur.data.data;

          return { boardComments: [...acc.boardComments, ...boardComments], total, nextPage };
        },
        { boardComments: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
    enabled: !!boardSeq,
  });
};

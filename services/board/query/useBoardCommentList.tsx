import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi, { IBoardCommentListRes } from '@/services/board';

import { QueryKeys } from '@/shared/query-key';

interface IProps {
  boardId: string;
}

export const useBoardCommentList = (props: IProps) => {
  const { boardId } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.board.commentList(boardId),
    queryFn: ({ pageParam }) => BoardApi.getBoardCommentList({ boardId, page: pageParam }),
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

import { useInfiniteQuery } from '@tanstack/react-query';
import BoardApi from '@/api/board/board.api';
import { IBoardListRes } from '@/types/res';

export const useBoardListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['board-list'],
    queryFn: ({ pageParam }) => BoardApi.getBoardList(pageParam),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IBoardListRes, cur) => {
          const { boards, total, nextPage } = cur.data.data;

          return { boards: [...acc.boards, ...boards], total, nextPage };
        },
        { boards: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

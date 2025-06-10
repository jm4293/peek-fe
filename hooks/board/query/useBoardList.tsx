import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { IBoardListRes } from '@/types/res';

interface IProps {
  category: number | null;
}

export const useBoardList = (props: IProps) => {
  const { category } = props;

  return useInfiniteQuery({
    queryKey: ['board-list', category],
    queryFn: ({ pageParam }) => BoardApi.getBoardList({ pageParam, category }),
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

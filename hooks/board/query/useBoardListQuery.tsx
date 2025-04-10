import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { IMARKET_TYPE } from '@/constant/stock';

import { IBoardListRes } from '@/types/res';

interface IProps {
  marketType: IMARKET_TYPE;
}

export const useBoardListQuery = (props: IProps) => {
  const { marketType } = props;

  return useInfiniteQuery({
    queryKey: ['board-list', marketType],
    queryFn: ({ pageParam }) => BoardApi.getBoardList({ pageParam, marketType }),
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

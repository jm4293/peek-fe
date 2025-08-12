import { useInfiniteQuery } from '@tanstack/react-query';

import BoardApi, { IBoardListDto, IBoardListRes } from '@/services/board';

import { QueryKeys } from '@/shared/query-key';

interface IProps extends Omit<IBoardListDto, 'page'> {}

export const useBoardList = (props: IProps) => {
  const { category } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.board.list(category),
    queryFn: ({ pageParam }) => BoardApi.getBoardList({ page: pageParam, category }),
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

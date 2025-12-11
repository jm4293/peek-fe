import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import boardApi from '../api/board.api';
import { GetBoardListReq, GetBoardListRes } from '../type';

interface Props extends Omit<GetBoardListReq, 'page'> {}

export const useBoardList = (props: Props) => {
  const { stockCategory, sort, text } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.board.list(stockCategory, sort, text),
    queryFn: ({ pageParam }) => boardApi.getBoardList({ page: pageParam, stockCategory, sort, text }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: GetBoardListRes, cur) => {
          const { boardList, total, nextPage } = cur.data;

          return { boardList: [...acc.boardList, ...boardList], total, nextPage };
        },
        { boardList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};

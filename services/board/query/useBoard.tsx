import { useQuery } from '@tanstack/react-query';

import BoardApi from '@/services/board';

import { QueryKeys } from '@/shared/constant/query-key';

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: QueryKeys.board.detail(boardId),
    queryFn: () => BoardApi.getBoardDetail(Number(boardId)),
    select: (res) => res.data.board,
    enabled: !!boardId,
  });
};

import { useQuery } from '@tanstack/react-query';

import BoardApi from '@/services/board';

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ['board-detail', boardId],
    queryFn: () => BoardApi.getBoardDetail(Number(boardId)),
    select: (res) => res.data.board,
    enabled: !!boardId,
  });
};

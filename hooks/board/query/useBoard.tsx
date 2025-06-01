import { useQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ['board-detail', boardId],
    queryFn: () => BoardApi.getBoardDetail(Number(boardId)),
    select: (res) => res.data,
    enabled: !!boardId,
  });
};

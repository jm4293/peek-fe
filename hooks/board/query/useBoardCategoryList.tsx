import { useQuery } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { QUERY_STALE_TIME_ONE } from '@/constant/expire-time';

export const useBoardCategoryList = () => {
  return useQuery({
    queryKey: ['board-category-list'],
    queryFn: () => BoardApi.getBoardCategoryList(),
    select: (res) => res.data,
    staleTime: QUERY_STALE_TIME_ONE,
  });
};

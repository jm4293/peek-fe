import { useQuery } from '@tanstack/react-query';

import homeApi from '../api/home.api';

export const useHomeRecentBoardListQuery = () => {
  return useQuery({
    queryKey: ['home-recent-board-list'],
    queryFn: () => homeApi.getRecentBoardList(),
    // select: (res) => res.data.data.boards,
  });
};

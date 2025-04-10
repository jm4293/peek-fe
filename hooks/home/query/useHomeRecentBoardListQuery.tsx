import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import HomeApi from '@/api/home/home.api';

import { IHomeRecentBoardListRes } from '@/types/res';
import { ResConfig } from '@/types/res.config';

export const useHomeRecentBoardListQuery = () => {
  return useQuery({
    queryKey: ['home-recent-board-list'],
    queryFn: () => HomeApi.getRecentBoardList(),
    select: (res: AxiosResponse<ResConfig<IHomeRecentBoardListRes>, any>) => res.data.data.boards,
  });
};

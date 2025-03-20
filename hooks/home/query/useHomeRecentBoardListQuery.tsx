import { useQuery } from '@tanstack/react-query';
import HomeApi from '@/api-url/home/home.api';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IHomeRecentBoardListRes } from '@/types/res';

export const useHomeRecentBoardListQuery = () => {
  return useQuery({
    queryKey: ['home-recent-board-list'],
    queryFn: () => HomeApi.getRecentBoardList(),
    select: (res: AxiosResponse<ResConfig<IHomeRecentBoardListRes>, any>) => res.data.data.boards,
  });
};

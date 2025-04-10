import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import UserApi from '@/api/user/user.api';

import { IMyInfoRes } from '@/types/res';
import { ResConfig } from '@/types/res.config';

type MyInfoRes = AxiosResponse<ResConfig<IMyInfoRes>, any>;

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res: MyInfoRes) => {
      const { email, nickname, name, thumbnail, userAccountType } = res.data.data;

      return { email, name, nickname, thumbnail, userAccountType };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
  });
};

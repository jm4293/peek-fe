import { useQuery } from '@tanstack/react-query';
import UserApi from '@/api-url/user/user.api';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IMyInfoRes } from '@/types/res';
import { SessionStorage } from '@/utils';

type MyInfoRes = AxiosResponse<ResConfig<IMyInfoRes>, any>;

export const useMyInfoQuery = () => {
  const isAuth = SessionStorage.getItem('state');

  return useQuery({
    queryKey: ['user-my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res: MyInfoRes) => {
      const { email, nickname, name, thumbnail, userAccountType } = res.data.data;

      return { email, name, nickname, thumbnail, userAccountType };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
    enabled: !!isAuth,
  });
};

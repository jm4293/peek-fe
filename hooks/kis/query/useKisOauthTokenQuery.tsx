import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import KisApi from '@/api/kis/kis.api';

import { IKisOauthTokenRes } from '@/types/res';
import { ResConfig } from '@/types/res.config';

type KisOauthTokenRes = AxiosResponse<ResConfig<IKisOauthTokenRes>, any>;

export const useKisOauthTokenQuery = () => {
  return useQuery({
    queryKey: ['kis-oauth-token'],
    queryFn: () => KisApi.getOauthToken(),
    select: (res: KisOauthTokenRes) => res.data.data.kisToken,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};

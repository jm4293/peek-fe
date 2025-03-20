import { useQuery } from '@tanstack/react-query';
import KisApi from '@/api-url/kis/kis.api';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IKisOauthTokenRes } from '@/types/res';

type KisOauthTokenRes = AxiosResponse<ResConfig<IKisOauthTokenRes>, any>;

export const useKisOauthTokenQuery = () => {
  return useQuery({
    queryKey: ['kis-oauth-token'],
    queryFn: () => KisApi.getOauthToken(),
    select: (res: KisOauthTokenRes) => res.data.data.kisToken,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};

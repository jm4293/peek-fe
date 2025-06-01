import { useQuery } from '@tanstack/react-query';

import UserApi from '@/api/user/user.api';

import { QUERY_STALE_TIME_ONE } from '@/constant/expire-time';

export const useMyInfo = (enable: boolean) => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res) => res.data,
    enabled: enable,
    staleTime: QUERY_STALE_TIME_ONE,
  });
};

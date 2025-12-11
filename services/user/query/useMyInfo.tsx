import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME_ONE } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/constant/query-key';

import userApi from '../api/user.api';

export const useMyInfo = () => {
  return useQuery({
    queryKey: QueryKeys.user.myInfo(),
    queryFn: () => userApi.getMyInfo(),
    select: (res) => res.data.userInfo,
    staleTime: QUERY_STALE_TIME_ONE,
  });
};

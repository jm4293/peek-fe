import { useQuery } from '@tanstack/react-query';

import UserApi from '@/services/user';

import { QUERY_STALE_TIME_ONE } from '@/shared/constant/expire-time';
import { QueryKeys } from '@/shared/query-key';

export const useMyInfo = () => {
  return useQuery({
    queryKey: QueryKeys.user.myInfo(),
    queryFn: () => UserApi.getMyInfo(),
    select: (res) => res.data.my,
    staleTime: QUERY_STALE_TIME_ONE,
  });
};

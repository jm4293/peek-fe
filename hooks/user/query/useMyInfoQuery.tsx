import { useQuery } from '@tanstack/react-query';

import UserApi from '@/api/user/user.api';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res) => {
      // const { email, nickname, name, thumbnail, userAccountType } = res.data.data;
      //
      // return { email, name, nickname, thumbnail, userAccountType };

      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
  });
};

import { useInfiniteQuery } from '@tanstack/react-query';

import userApi from '../api/user.api';

export const useNotificationListQuery = () => {
  // return useInfiniteQuery({
  //   queryKey: ['notification-list'],
  //   queryFn: ({ pageParam }) => userApi.getNotificationList(pageParam),
  //   getNextPageParam: (lastPage: any) => {
  //     const { nextPage } = lastPage.data.data;
  //
  //     return nextPage;
  //   },
  //   select: (data) => {
  //     return data.pages;
  //   },
  //   initialPageParam: 1,
  // });
};

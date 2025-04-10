import { useMutation, useQueryClient } from '@tanstack/react-query';

import UserApi from '@/api/user/user.api';

import { IReadNotificationDto } from '@/types/dto';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const readNotificationMutation = useMutation({
    mutationFn: (dto: IReadNotificationDto) => UserApi.postNotificationRead(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const readAllNotificationMutation = useMutation({
    mutationFn: () => UserApi.postNotificationReadAll(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationSeq: number) => UserApi.deleteNotification(notificationSeq),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  return {
    readNotificationMutation,
    readAllNotificationMutation,
    deleteNotificationMutation,
  };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import UserApi from '@/api/user/user.api';

import { IReadNotificationDto, IUpdateUserDto, IUpdateUserPasswordDto } from '@/types/dto';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (dto: IUpdateUserDto) => UserApi.updateUser(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['my-info'] });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (dto: IUpdateUserPasswordDto) => UserApi.updatePassword(dto),
  });

  const readNotificationMutation = useMutation({
    mutationFn: (dto: IReadNotificationDto) => UserApi.postNotificationRead(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['notification-list'] });
    },
  });

  const readAllNotificationMutation = useMutation({
    mutationFn: () => UserApi.postNotificationReadAll(),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['notification-list'] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationSeq: number) => UserApi.deleteNotification(notificationSeq),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['notification-list'] });
    },
  });

  return {
    updateUserMutation,
    updatePasswordMutation,
    readNotificationMutation,
    readAllNotificationMutation,
    deleteNotificationMutation,
  };
};

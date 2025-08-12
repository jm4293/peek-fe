import { useMutation, useQueryClient } from '@tanstack/react-query';

import UserApi, {
  IReadNotificationDto,
  IUpdateUserDto,
  IUpdateUserPasswordDto,
  IUpdateUserThumbnailDto,
} from '@/services/user';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (dto: IUpdateUserDto) => UserApi.updateUser(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['my-info'] });
    },
  });

  const updateThumbnailMutation = useMutation({
    mutationFn: (dto: IUpdateUserThumbnailDto) => UserApi.updateThumbnail(dto),
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
    updateThumbnailMutation,
    updatePasswordMutation,
    readNotificationMutation,
    readAllNotificationMutation,
    deleteNotificationMutation,
  };
};

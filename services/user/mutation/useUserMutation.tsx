'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useModal, useToast } from '@/hooks/modal';

import UserApi, {
  IReadNotificationDto,
  IUpdateUserDto,
  IUpdateUserPasswordDto,
  IUpdateUserThumbnailDto,
} from '@/services/user';

import { QueryKeys } from '@/shared/query-key';

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const updateUserMutation = useMutation({
    mutationFn: (dto: IUpdateUserDto) => UserApi.updateUser(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
      openToast({ message: '회원정보 수정 완료', type: 'success' });
      router.push('/user');
      router.refresh();
    },
  });

  const updateThumbnailMutation = useMutation({
    mutationFn: (dto: IUpdateUserThumbnailDto) => UserApi.updateThumbnail(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (dto: IUpdateUserPasswordDto) => UserApi.updatePassword(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
      openToast({ message: '비밀번호 변경 완료', type: 'success' });
      router.push('/user');
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openModal({
        content: message,
        onConfirm: closeModal,
      });
    },
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

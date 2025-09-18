'use client';

import { LocalStorageUtil, SessionStorageUtil } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useModal, useToast } from '@/hooks/modal';

import { ICheckEmailCodeDto, ICheckEmailDto } from '@/services/auth';
import UserApi, {
  IReadNotificationDto,
  IResetPasswordDto,
  IUpdateUserDto,
  IUpdateUserPasswordDto,
  IUpdateUserThumbnailDto,
} from '@/services/user';

import { QueryKeys } from '@/shared/constant/query-key';

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

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => UserApi.checkEmail(dto),
  });

  const checkEmailCodeMutation = useMutation({
    mutationFn: (dto: ICheckEmailCodeDto) => UserApi.checkEmailCode(dto),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (dto: IResetPasswordDto) => UserApi.resetPassword(dto),
    onSuccess: (_, variables) => {
      const { email } = variables;

      openToast({ message: '비밀번호 재설정이 완료되었습니다.', type: 'success' });
      router.replace(`/auth/login?email=${email}`);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (dto: IUpdateUserPasswordDto) => UserApi.updatePassword(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
      openToast({ message: '비밀번호가 변경되었습니다.', type: 'success' });
      router.push('/user');
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openModal({ content: message, onConfirm: closeModal });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: () => UserApi.withdraw(),
    onSuccess: () => {
      queryClient.clear();
      LocalStorageUtil.clear();
      SessionStorageUtil.clear();
      openToast({ message: '탈퇴가 완료되었습니다.', type: 'success' });
      router.push('/home');
      router.refresh();
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

  const notificationTokenMutation = useMutation({
    mutationFn: (token: string) => UserApi.postRegisterPushToken({ pushToken: token }),
  });

  return {
    updateUserMutation,
    updateThumbnailMutation,
    checkEmailMutation,
    checkEmailCodeMutation,
    resetPasswordMutation,
    updatePasswordMutation,
    withdrawMutation,
    readNotificationMutation,
    readAllNotificationMutation,
    deleteNotificationMutation,
    notificationTokenMutation,
  };
};
